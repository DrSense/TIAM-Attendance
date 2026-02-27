# Firebase Integration Guide

## Overview

The app now has Firebase Firestore as the cloud backend for real-time data sync across devices.

## Files

- `app-firebase.js` - Firebase-integrated version
- `firebase-config.js` - Firebase configuration (needs your credentials)
- `index-firebase.html` - HTML entry point for Firebase version
- `app.js` - Original localStorage version (still works)

## Setup Steps

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name: `tiam-attendance`
4. Disable Google Analytics (optional)
5. Click "Create project"

### 2. Enable Firestore Database

1. In Firebase Console, click "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select location closest to you
5. Click "Enable"

### 3. Get Firebase Configuration

1. In Firebase Console, click the gear icon → "Project settings"
2. Scroll down to "Your apps"
3. Click the web icon `</>`
4. Register app name: `TIAM Attendance`
5. Copy the `firebaseConfig` object

### 4. Update Configuration File

Edit `firebase-config.js` and replace with your values:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "tiam-attendance.firebaseapp.com",
  projectId: "tiam-attendance",
  storageBucket: "tiam-attendance.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

### 5. Set Firestore Security Rules

In Firebase Console → Firestore Database → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write to attendance collection
    match /attendance/{document} {
      allow read, write: if true;
    }
    
    // For production, use authentication:
    // allow read, write: if request.auth != null;
  }
}
```

Click "Publish"

### 6. Test the App

```bash
npm run dev
```

Open: `http://localhost:8000/index-firebase.html`

## Firestore Collections

### `attendance` Collection

Each document contains:
```javascript
{
  id: "C001",              // Child ID
  name: "Emma Johnson",    // Child name
  home: "Springfield",     // Home location
  status: "checked-in",    // Status
  time: "2024-01-15T09:30:00.000Z", // ISO timestamp
  timestamp: 1705315800000 // Unix timestamp for ordering
}
```

## Features

### ✓ Real-time Sync
- Data syncs across all devices
- Multiple volunteers can use simultaneously
- Dashboard updates automatically

### ✓ Cloud Storage
- No localStorage limits
- Data persists across devices
- Accessible from anywhere

### ✓ Scalability
- Handles thousands of records
- Fast queries with indexing
- Automatic backups

## Switching Between Versions

### Use Firebase Version
```html
<!-- index-firebase.html -->
<script type="module" src="app-firebase.js"></script>
```

### Use LocalStorage Version
```html
<!-- index.html -->
<script type="module" src="app.js"></script>
```

## Production Deployment

### 1. Enable Authentication (Recommended)

```bash
# In Firebase Console
Authentication → Get Started → Email/Password → Enable
```

Update security rules:
```javascript
match /attendance/{document} {
  allow read, write: if request.auth != null;
}
```

### 2. Add Authentication to App

Add to `app-firebase.js`:
```javascript
import { getAuth, signInAnonymously } from 'firebase/auth';

const auth = getAuth(app);
await signInAnonymously(auth);
```

### 3. Set Up Indexes

Firestore will prompt you to create indexes when needed. Click the link in console errors.

### 4. Deploy to Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize
firebase init hosting

# Deploy
firebase deploy
```

## Offline Support

Firebase SDK includes offline persistence by default:
- Writes are cached locally
- Syncs when connection returns
- Works seamlessly offline/online

## Data Management

### View Data
Firebase Console → Firestore Database → Data tab

### Export Data
```bash
gcloud firestore export gs://YOUR_BUCKET_NAME
```

### Backup Strategy
- Enable automatic backups in Firebase Console
- Export data weekly
- Keep CSV exports from dashboard

## Cost Estimation

Firebase Free Tier (Spark Plan):
- 50K reads/day
- 20K writes/day
- 1GB storage

For typical VBS event (100 children, 3 days):
- ~300 writes (check-ins/outs)
- ~1000 reads (dashboard views)
- Well within free tier

## Troubleshooting

### "Permission denied" error
- Check Firestore security rules
- Ensure rules allow read/write
- For production, add authentication

### Data not appearing
- Check Firebase Console → Firestore → Data
- Verify `firebase-config.js` has correct values
- Check browser console for errors

### Slow performance
- Create indexes for queries
- Use pagination for large datasets
- Enable offline persistence

## Migration from LocalStorage

To migrate existing data:

```javascript
// Run in browser console
const oldData = JSON.parse(localStorage.getItem('attendance'));
oldData.forEach(async (record) => {
  await addDoc(collection(db, 'attendance'), record);
});
```

## Security Best Practices

1. **Never commit `firebase-config.js` with real credentials**
   - Add to `.gitignore`
   - Use environment variables in production

2. **Enable Authentication**
   - Require sign-in for production
   - Use Firebase Auth

3. **Set Proper Security Rules**
   - Restrict write access
   - Validate data structure

4. **Monitor Usage**
   - Check Firebase Console → Usage
   - Set up billing alerts

## Support

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Guides](https://firebase.google.com/docs/firestore)
- [Firebase Console](https://console.firebase.google.com/)

---

**Your app now has enterprise-grade cloud storage!** ✓
