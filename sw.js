const CACHE_NAME = 'tiam-attendance-v3';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles-compiled.css',
  '/app-tailwind.js',
  '/firebase-config.js',
  '/manifest.json',
  '/Logo.png',
  '/android-chrome-192x192.png',
  '/android-chrome-512x512.png',
  '/favicon.ico',
  '/favicon-16x16.png',
  '/favicon-32x32.png',
  '/apple-touch-icon.png'
];

const OFFLINE_QUEUE_KEY = 'offline-attendance-queue';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  // Network first for Firebase API calls
  if (event.request.url.includes('firestore.googleapis.com')) {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          // If offline, return error response
          return new Response(
            JSON.stringify({ error: 'offline' }),
            { headers: { 'Content-Type': 'application/json' } }
          );
        })
    );
    return;
  }
  
  // Cache first for app files
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
      .catch(() => {
        // Return offline page if available
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
      })
  );
});

// Handle background sync for offline queue
self.addEventListener('sync', event => {
  if (event.tag === 'sync-attendance') {
    event.waitUntil(syncOfflineQueue());
  }
});

async function syncOfflineQueue() {
  try {
    // Get offline queue from IndexedDB
    const db = await openDB();
    const queue = await getQueue(db);
    
    if (queue.length === 0) return;
    
    console.log(`Syncing ${queue.length} offline attendance records...`);
    
    // Send each queued item to Firebase
    for (const item of queue) {
      try {
        // This will be handled by the app's Firebase code
        await fetch('/api/sync-attendance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item)
        });
      } catch (error) {
        console.error('Failed to sync item:', error);
        // Keep in queue for next sync
        return;
      }
    }
    
    // Clear queue after successful sync
    await clearQueue(db);
    console.log('Offline queue synced successfully');
    
  } catch (error) {
    console.error('Error syncing offline queue:', error);
  }
}

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('tiam-attendance-db', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('offline-queue')) {
        db.createObjectStore('offline-queue', { keyPath: 'id', autoIncrement: true });
      }
    };
  });
}

function getQueue(db) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['offline-queue'], 'readonly');
    const store = transaction.objectStore('offline-queue');
    const request = store.getAll();
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

function clearQueue(db) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['offline-queue'], 'readwrite');
    const store = transaction.objectStore('offline-queue');
    const request = store.clear();
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}