import firebaseConfig from './firebase-config.js';

// Initialize Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Lucide Icons (inline SVG)
const icons = {
  check: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',
  arrowLeft: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>',
  camera: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>',
  users: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
  download: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>',
  search: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',
  alertCircle: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>',
  loader: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-spin"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>',
  inbox: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path></svg>'
};

// Database
const DB = {
  children: [],
  
  getChild(id) {
    return this.children.find(c => c.id === id);
  },
  
  async getAttendance() {
    try {
      const q = query(collection(db, 'attendance'), orderBy('timestamp', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ docId: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching attendance:', error);
      return [];
    }
  },
  
  async addAttendance(childId, status) {
    try {
      const child = this.getChild(childId);
      if (!child) return false;
      
      const now = new Date();
      const record = {
        id: childId,
        name: child.name,
        age: child.age || null,
        sex: child.sex || null,
        home: child.home,
        status,
        time: now.toISOString(),
        timestamp: now.getTime(),
        checkInTime: status === 'checked-in' ? now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : null
      };
      
      await addDoc(collection(db, 'attendance'), record);
      return true;
    } catch (error) {
      console.error('Error adding attendance:', error);
      return false;
    }
  },
  
  async checkDuplicate(childId) {
    try {
      const today = new Date().toDateString();
      const records = await this.getAttendance();
      return records.some(record => {
        const recordDate = new Date(record.time).toDateString();
        return record.id === childId && record.status === 'checked-in' && recordDate === today;
      });
    } catch (error) {
      console.error('Error checking duplicate:', error);
      return false;
    }
  }
};

// Router
class Router {
  constructor() {
    this.routes = {};
    this.currentRoute = null;
  }
  
  register(path, handler) {
    this.routes[path] = handler;
  }
  
  navigate(path) {
    if (this.routes[path]) {
      this.currentRoute = path;
      this.routes[path]();
      window.history.pushState({}, '', path);
    }
  }
  
  init() {
    window.addEventListener('popstate', () => {
      const path = window.location.pathname;
      if (this.routes[path]) {
        this.currentRoute = path;
        this.routes[path]();
      } else {
        this.navigate('/');
      }
    });
    
    // Handle initial route
    const path = window.location.pathname === '/' || window.location.pathname === '/index.html' 
      ? '/' 
      : window.location.pathname;
    
    if (this.routes[path]) {
      this.currentRoute = path;
      this.routes[path]();
    } else {
      this.navigate('/');
    }
  }
}

const router = new Router();
const app_element = document.getElementById('app');

// Home Screen
function renderHome() {
  app_element.innerHTML = `
    <div class="min-h-screen flex items-center justify-center p-4">
      <div class="w-full max-w-md">
        <div class="flex justify-center mb-8">
          <div class="w-18 h-18 bg-white rounded-xl flex items-center justify-center shadow-lg p-3">
            <img src="Logo.png" alt="TIAM Logo" class="w-full h-full object-contain">
          </div>
        </div>
        
        <h1 class="text-4xl font-bold text-center text-navy mb-2">TIAM Attendance</h1>
        <p class="text-xl text-center text-gray-600 mb-12">VBS 2026</p>
        
        <div class="space-y-4">
          <button id="startScanBtn" class="w-full h-14 bg-gold text-navy rounded-xl font-semibold text-lg flex items-center justify-center gap-3 hover:bg-opacity-90 transition-all shadow-lg active:scale-95">
            ${icons.camera}
            Start Scanning
          </button>
          
          <button id="viewAttendanceBtn" class="w-full h-14 bg-white border-2 border-navy text-navy rounded-xl font-semibold text-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition-all shadow-sm active:scale-95">
            ${icons.users}
            View Attendance
          </button>
        </div>
      </div>
    </div>
  `;
  
  document.getElementById('startScanBtn').addEventListener('click', () => {
    router.navigate('/scan');
  });
  
  document.getElementById('viewAttendanceBtn').addEventListener('click', () => {
    router.navigate('/dashboard');
  });
  
  showInstallPrompt();
}

// Scanner Screen
let stream = null;
let scannerActive = false;

function renderScanner() {
  app_element.innerHTML = `
    <div class="min-h-screen bg-warm-bg">
      <div class="bg-navy text-white px-3 py-3 flex items-center sticky top-0 z-50 shadow-lg">
        <button id="backBtn" class="flex items-center gap-1.5 hover:opacity-80 transition-opacity flex-shrink-0 min-w-0">
          ${icons.arrowLeft}
          <span class="font-semibold text-sm sm:text-base">Back</span>
        </button>
        <h1 class="text-base sm:text-xl font-semibold flex-1 text-center px-2 truncate">Scanner</h1>
        <div class="w-14 sm:w-16 flex-shrink-0"></div>
      </div>
      
      <div class="max-w-md mx-auto p-4">
        
        <div class="bg-white rounded-2xl p-4 shadow-lg">
          <div class="relative aspect-square rounded-xl overflow-hidden border-2 border-gold bg-black shadow-md">
            <video id="video" autoplay playsinline class="w-full h-full object-cover"></video>
          </div>
        </div>
        
        <div id="messageArea" class="mt-4"></div>
        <div id="resultPanel" class="hidden mt-4"></div>
        
        <p class="text-center text-sm text-gray-500 mt-4">Tip: Click video for demo scan</p>
      </div>
    </div>
  `;
  
  document.getElementById('backBtn').addEventListener('click', () => {
    stopScanner();
    router.navigate('/');
  });
  
  startScanner();
}

async function startScanner() {
  const video = document.getElementById('video');
  const messageArea = document.getElementById('messageArea');
  
  try {
    messageArea.innerHTML = `
      <div class="flex items-center justify-center gap-3 text-navy">
        ${icons.loader}
        <span class="font-medium">Starting camera...</span>
      </div>
    `;
    
    // iOS Safari compatibility: request with constraints
    const constraints = {
      video: {
        facingMode: 'environment',
        width: { ideal: 1280 },
        height: { ideal: 720 }
      }
    };
    
    stream = await navigator.mediaDevices.getUserMedia(constraints);
    
    video.srcObject = stream;
    video.setAttribute('playsinline', 'true');
    video.setAttribute('webkit-playsinline', 'true');
    await video.play();
    scannerActive = true;
    messageArea.innerHTML = '';
    
    video.addEventListener('click', simulateScan);
    
  } catch (error) {
    messageArea.innerHTML = `
      <div class="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
        <div class="flex items-start gap-3">
          ${icons.alertCircle}
          <div>
            <p class="font-semibold text-red-800">Camera access denied</p>
            <p class="text-sm text-red-600 mt-1">Please enable camera permissions</p>
          </div>
        </div>
      </div>
    `;
  }
}

function stopScanner() {
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
    stream = null;
  }
  scannerActive = false;
}

function simulateScan() {
  if (!scannerActive) return;
  
  // Simulate scanning a random QR code
  const randomNum = Math.floor(Math.random() * 100) + 1;
  const randomId = `QR${String(randomNum).padStart(3, '0')}`;
  
  handleScan(randomId);
}

async function handleScan(childId) {
  const child = DB.getChild(childId);
  const resultPanel = document.getElementById('resultPanel');
  const messageArea = document.getElementById('messageArea');
  const video = document.getElementById('video');
  
  if (!child) {
    // Show registration form for new QR code
    if (video) {
      video.classList.add('animate-flash-green');
      setTimeout(() => video.classList.remove('animate-flash-green'), 500);
    }
    
    resultPanel.innerHTML = `
      <div class="bg-white rounded-2xl p-4 sm:p-6 shadow-xl border border-gray-100 animate-slide-up">
        <h3 class="text-base sm:text-lg font-semibold text-navy mb-3">New: ${childId}</h3>
        <p class="text-xs sm:text-sm text-gray-600 mb-3">Enter child information:</p>
        
        <div class="space-y-2.5">
          <div>
            <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Name</label>
            <input type="text" id="childName" placeholder="Emma Johnson" 
              class="w-full px-3 py-2 text-sm sm:text-base border-2 border-gray-200 rounded-lg focus:border-gold focus:outline-none">
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Age</label>
              <input type="number" id="childAge" placeholder="8" min="1" max="18"
                class="w-full px-3 py-2 text-sm sm:text-base border-2 border-gray-200 rounded-lg focus:border-gold focus:outline-none">
            </div>
            <div>
              <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Sex</label>
              <select id="childSex" class="w-full px-3 py-2 text-sm sm:text-base border-2 border-gray-200 rounded-lg focus:border-gold focus:outline-none">
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Home/Church</label>
            <input type="text" id="childHome" placeholder="Springfield" 
              class="w-full px-3 py-2 text-sm sm:text-base border-2 border-gray-200 rounded-lg focus:border-gold focus:outline-none">
          </div>
        </div>
        
        <div class="grid grid-cols-2 gap-2 sm:gap-3 mt-4 sm:mt-6">
          <button id="saveRegisterBtn" class="h-11 sm:h-12 bg-gold text-navy rounded-xl font-semibold text-sm sm:text-base flex items-center justify-center gap-1.5 sm:gap-2 hover:bg-opacity-90 transition-all active:scale-95 shadow-md">
            ${icons.check}
            <span class="hidden xs:inline">Save &</span> Check-in
          </button>
          <button id="cancelRegisterBtn" class="h-11 sm:h-12 bg-white border-2 border-navy text-navy rounded-xl font-semibold text-sm sm:text-base flex items-center justify-center gap-1.5 sm:gap-2 hover:bg-gray-50 transition-all active:scale-95 shadow-sm">
            ${icons.arrowLeft}
            Cancel
          </button>
        </div>
      </div>
    `;
    
    resultPanel.classList.remove('hidden');
    
    document.getElementById('saveRegisterBtn').addEventListener('click', async () => {
      const name = document.getElementById('childName').value.trim();
      const age = document.getElementById('childAge').value.trim();
      const sex = document.getElementById('childSex').value;
      const home = document.getElementById('childHome').value.trim();
      
      if (!name || !age || !sex || !home) {
        messageArea.innerHTML = `
          <div class="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg animate-slide-in">
            <p class="font-semibold text-red-800">Please fill in all fields</p>
          </div>
        `;
        setTimeout(() => messageArea.innerHTML = '', 3000);
        return;
      }
      
      // Add to local database
      DB.children.push({ id: childId, name, age: parseInt(age), sex, home });
      
      // Record attendance
      await recordAttendance(childId, 'checked-in');
    });
    
    document.getElementById('cancelRegisterBtn').addEventListener('click', () => {
      resultPanel.classList.add('hidden');
      resultPanel.innerHTML = '';
    });
    
    return;
  }
  
  const isDuplicate = await DB.checkDuplicate(childId);
  if (isDuplicate) {
    messageArea.innerHTML = `
      <div class="bg-orange-50 border-l-4 border-care-orange p-4 rounded-lg animate-slide-in">
        <div class="flex items-start gap-3">
          ${icons.alertCircle}
          <div>
            <p class="font-semibold text-orange-800">Already Checked In Today</p>
          </div>
        </div>
      </div>
    `;
    setTimeout(() => {
      messageArea.innerHTML = '';
    }, 3000);
    return;
  }
  
  if (video) {
    video.classList.add('animate-flash-green');
    setTimeout(() => video.classList.remove('animate-flash-green'), 500);
  }
  
  resultPanel.innerHTML = `
    <div class="bg-white rounded-2xl p-4 sm:p-6 shadow-xl border border-gray-100 animate-slide-up">
      <div class="space-y-3">
        <div>
          <p class="text-xs text-gray-500 mb-1">Name</p>
          <p class="text-lg sm:text-xl font-semibold text-navy break-words">${child.name}</p>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <p class="text-xs text-gray-500 mb-1">Age</p>
            <p class="text-base sm:text-lg font-medium text-gray-700">${child.age || 'N/A'}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500 mb-1">Sex</p>
            <p class="text-base sm:text-lg font-medium text-gray-700">${child.sex || 'N/A'}</p>
          </div>
        </div>
        <div>
          <p class="text-xs text-gray-500 mb-1">Home</p>
          <p class="text-base sm:text-lg font-medium text-gray-700 break-words">${child.home}</p>
        </div>
      </div>
      
      <div class="grid grid-cols-2 gap-2 sm:gap-3 mt-4 sm:mt-6">
        <button id="checkinBtn" class="h-11 sm:h-12 bg-gold text-navy rounded-xl font-semibold text-sm sm:text-base flex items-center justify-center gap-1.5 sm:gap-2 hover:bg-opacity-90 transition-all active:scale-95 shadow-md">
          ${icons.check}
          Check-in
        </button>
        <button id="checkoutBtn" class="h-11 sm:h-12 bg-white border-2 border-navy text-navy rounded-xl font-semibold text-sm sm:text-base flex items-center justify-center gap-1.5 sm:gap-2 hover:bg-gray-50 transition-all active:scale-95 shadow-sm">
          ${icons.arrowLeft}
          Check-out
        </button>
      </div>
    </div>
  `;
  
  resultPanel.classList.remove('hidden');
  
  document.getElementById('checkinBtn').addEventListener('click', () => {
    recordAttendance(childId, 'checked-in');
  });
  
  document.getElementById('checkoutBtn').addEventListener('click', () => {
    recordAttendance(childId, 'checked-out');
  });
}

async function recordAttendance(childId, status) {
  const messageArea = document.getElementById('messageArea');
  const resultPanel = document.getElementById('resultPanel');
  
  messageArea.innerHTML = `
    <div class="flex items-center justify-center gap-3 text-faith-blue">
      ${icons.loader}
      <span class="font-medium">Saving...</span>
    </div>
  `;
  
  const success = await DB.addAttendance(childId, status);
  
  if (success) {
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
    
    messageArea.innerHTML = `
      <div class="bg-gradient-to-r from-gold/10 to-gold/5 border-l-4 border-gold p-4 rounded-lg animate-slide-in shadow-md">
        <div class="flex items-start gap-3">
          <div class="text-gold">${icons.check}</div>
          <div>
            <p class="font-semibold text-navy">Attendance Recorded Successfully</p>
            <p class="text-sm text-gray-600 mt-1">Returning to scanner...</p>
          </div>
        </div>
      </div>
    `;
    
    resultPanel.classList.add('hidden');
    
    setTimeout(() => {
      messageArea.innerHTML = '';
      resultPanel.innerHTML = '';
    }, 2000);
  } else {
    messageArea.innerHTML = `
      <div class="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
        <p class="font-semibold text-red-800">Failed to save. Please try again.</p>
      </div>
    `;
    setTimeout(() => {
      messageArea.innerHTML = '';
    }, 3000);
  }
}

// Dashboard Screen
async function renderDashboard() {
  app_element.innerHTML = `
    <div class="min-h-screen bg-warm-bg">
      <div class="bg-navy text-white px-3 py-3 flex items-center sticky top-0 z-50 shadow-lg">
        <button id="backBtn" class="flex items-center gap-1.5 hover:opacity-80 transition-opacity flex-shrink-0 min-w-0">
          ${icons.arrowLeft}
          <span class="font-semibold text-sm sm:text-base">Back</span>
        </button>
        <h1 class="text-base sm:text-xl font-semibold flex-1 text-center px-2 truncate">Dashboard</h1>
        <div class="w-14 sm:w-16 flex-shrink-0"></div>
      </div>
      
      <div class="max-w-4xl mx-auto p-4">
        <div class="relative mb-4">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            ${icons.search}
          </div>
          <input type="text" id="searchBar" placeholder="Search name or ID" 
            class="w-full h-12 pl-10 pr-4 rounded-xl border-2 border-gray-200 focus:border-gold focus:outline-none transition-colors bg-white">
        </div>
        
        <select id="filterDropdown" class="w-full h-12 px-4 rounded-xl border-2 border-gray-200 focus:border-gold focus:outline-none mb-4 bg-white">
          <option value="all">All</option>
          <option value="day1">Day 1</option>
          <option value="day2">Day 2</option>
          <option value="day3">Day 3</option>
        </select>
        
        <div id="tableContainer" class="mb-4">
          ${renderTableWithLoading()}
        </div>
        
        <button id="exportBtn" class="w-full h-12 bg-gold text-navy rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all shadow-lg active:scale-95">
          ${icons.download}
          Export CSV
        </button>
      </div>
    </div>
  `;
  
  document.getElementById('backBtn').addEventListener('click', () => {
    router.navigate('/');
  });
  
  const attendance = await DB.getAttendance();
  const tableContainer = document.getElementById('tableContainer');
  if (tableContainer) {
    tableContainer.innerHTML = renderTable(attendance);
  }
  
  const searchBar = document.getElementById('searchBar');
  const filterDropdown = document.getElementById('filterDropdown');
  const exportBtn = document.getElementById('exportBtn');
  
  if (searchBar) searchBar.addEventListener('input', () => filterTable(attendance));
  if (filterDropdown) filterDropdown.addEventListener('change', () => filterTable(attendance));
  if (exportBtn) exportBtn.addEventListener('click', () => exportCSV(attendance));
}

function renderTableWithLoading() {
  return `
    <div class="space-y-2">
      ${[1,2,3,4,5].map(() => `
        <div class="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
      `).join('')}
    </div>
  `;
}

function renderTable(records) {
  if (records.length === 0) {
    return `
      <div class="bg-white rounded-2xl p-12 text-center shadow-sm">
        <div class="flex justify-center mb-4 text-gray-300">
          ${icons.inbox}
        </div>
        <p class="text-gray-500 text-lg font-medium">No attendance recorded yet</p>
        <p class="text-gray-400 text-sm mt-2">Start scanning to log entries</p>
      </div>
    `;
  }
  
  const cards = records.map(record => {
    const time = new Date(record.time).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    const statusColor = record.status === 'checked-in' ? 'bg-gold' : 'bg-navy';
    const statusText = record.status === 'checked-in' ? 'Checked In' : 'Checked Out';
    
    return `
      <div class="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div class="flex items-start justify-between mb-2">
          <div class="flex-1 min-w-0 pr-2">
            <h3 class="font-semibold text-navy text-base sm:text-lg truncate">${record.name}</h3>
            <p class="text-xs sm:text-sm text-gray-500 mt-0.5 truncate">${record.id} • ${record.age || 'N/A'}y • ${record.sex || 'N/A'}</p>
          </div>
          <span class="inline-flex items-center gap-1.5 flex-shrink-0">
            <span class="w-2 h-2 rounded-full ${statusColor}"></span>
            <span class="text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap">${statusText}</span>
          </span>
        </div>
        <div class="flex items-center justify-between text-xs sm:text-sm">
          <span class="text-gray-600 truncate pr-2">${record.home}</span>
          <span class="text-gray-500 whitespace-nowrap">${time}</span>
        </div>
      </div>
    `;
  }).join('');
  
  const desktopTable = `
    <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-navy text-white">
            <tr>
              <th class="px-4 py-3 text-left text-sm font-semibold">Name</th>
              <th class="px-4 py-3 text-left text-sm font-semibold">ID</th>
              <th class="px-4 py-3 text-left text-sm font-semibold">Age</th>
              <th class="px-4 py-3 text-left text-sm font-semibold">Sex</th>
              <th class="px-4 py-3 text-left text-sm font-semibold">Home</th>
              <th class="px-4 py-3 text-left text-sm font-semibold">Status</th>
              <th class="px-4 py-3 text-left text-sm font-semibold">Time</th>
            </tr>
          </thead>
          <tbody>
            ${records.map(record => {
              const time = new Date(record.time).toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
              });
              const statusColor = record.status === 'checked-in' ? 'bg-gold' : 'bg-navy';
              const statusText = record.status === 'checked-in' ? 'Checked In' : 'Checked Out';
              
              return `
                <tr class="border-b border-gray-100 hover:bg-gold/5 transition-colors">
                  <td class="px-4 py-3 font-medium text-navy">${record.name}</td>
                  <td class="px-4 py-3 text-gray-600">${record.id}</td>
                  <td class="px-4 py-3 text-gray-600">${record.age || 'N/A'}</td>
                  <td class="px-4 py-3 text-gray-600">${record.sex || 'N/A'}</td>
                  <td class="px-4 py-3 text-gray-600">${record.home}</td>
                  <td class="px-4 py-3">
                    <span class="inline-flex items-center gap-2">
                      <span class="w-2 h-2 rounded-full ${statusColor}"></span>
                      <span class="text-sm text-gray-700">${statusText}</span>
                    </span>
                  </td>
                  <td class="px-4 py-3 text-gray-600 text-sm">${time}</td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
  
  return `
    <div class="hidden md:block">${desktopTable}</div>
    <div class="md:hidden space-y-3">${cards}</div>
  `;
}

function filterTable(allRecords) {
  const searchTerm = document.getElementById('searchBar').value.toLowerCase();
  const filter = document.getElementById('filterDropdown').value;
  let records = [...allRecords];
  
  if (filter === 'day1' || filter === 'day2' || filter === 'day3') {
    const dayNum = parseInt(filter.replace('day', ''));
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() - (3 - dayNum));
    const targetDateStr = targetDate.toDateString();
    records = records.filter(r => new Date(r.time).toDateString() === targetDateStr);
  }
  
  if (searchTerm) {
    records = records.filter(r => 
      r.name.toLowerCase().includes(searchTerm) || 
      r.id.toLowerCase().includes(searchTerm)
    );
  }
  
  document.getElementById('tableContainer').innerHTML = renderTable(records);
}

function exportCSV(records) {
  if (records.length === 0) return;
  
  const csv = [
    ['Name', 'ID', 'Age', 'Sex', 'Home', 'Status', 'Time'],
    ...records.map(r => [
      r.name,
      r.id,
      r.age || 'N/A',
      r.sex || 'N/A',
      r.home,
      r.status,
      new Date(r.time).toLocaleString()
    ])
  ].map(row => row.join(',')).join('\n');
  
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `attendance-${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// Register routes
router.register('/', renderHome);
router.register('/scan', renderScanner);
router.register('/dashboard', renderDashboard);

// Initialize app
router.init();

// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch(() => {});
}

// PWA Install Prompt
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
});

function showInstallPrompt() {
  if (localStorage.getItem('installPromptShown')) return;
  if (window.matchMedia('(display-mode: standalone)').matches) return;
  
  setTimeout(() => {
    const promptHtml = `
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
        <div class="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-slide-up">
          <h2 class="text-xl font-bold text-navy mb-3">Install TIAM Attendance</h2>
          <p class="text-gray-600 mb-6">Access faster and work offline-ready.</p>
          <div class="space-y-3">
            <button id="installBtn" class="w-full h-12 bg-gold text-navy rounded-xl font-semibold hover:bg-opacity-90 transition-all active:scale-95">
              Install
            </button>
            <button id="notNowBtn" class="w-full h-12 bg-white border-2 border-navy text-navy rounded-xl font-semibold hover:bg-gray-50 transition-all active:scale-95">
              Not Now
            </button>
          </div>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', promptHtml);
    
    document.getElementById('installBtn').addEventListener('click', async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        await deferredPrompt.userChoice;
        deferredPrompt = null;
      }
      closeInstallPrompt();
    });
    
    document.getElementById('notNowBtn').addEventListener('click', closeInstallPrompt);
  }, 3000);
}

function closeInstallPrompt() {
  const prompt = document.querySelector('.fixed.inset-0');
  if (prompt) prompt.remove();
  localStorage.setItem('installPromptShown', 'true');
}

// Add custom animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slide-in {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slide-up {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes flash-green {
    0%, 100% { filter: brightness(1); }
    50% { filter: brightness(1.3) hue-rotate(90deg); }
  }
  .animate-slide-in { animation: slide-in 0.3s ease; }
  .animate-slide-up { animation: slide-up 0.3s ease; }
  .animate-fade-in { animation: fade-in 0.3s ease; }
  .animate-flash-green { animation: flash-green 0.5s ease; }
`;
document.head.appendChild(style);
