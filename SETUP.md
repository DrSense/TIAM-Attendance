# Firebase Setup - Quick Start

## You chose: Firebase Cloud Backend ✓

Your app is now configured to use Firebase. Follow these steps:

## Step 1: Create Firebase Project (5 minutes)

1. Go to https://console.firebase.google.com/
2. Click "Add project"
3. Name: `tiam-attendance`
4. Disable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Firestore (2 minutes)

1. In Firebase Console, click "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode"
4. Select your region
5. Click "Enable"

## Step 3: Get Your Config (1 minute)

1. Click the gear icon ⚙️ → "Project settings"
2. Scroll to "Your apps"
3. Click the web icon `</>`
4. Register app: `TIAM Attendance`
5. Copy the `firebaseConfig` object

## Step 4: Update firebase-config.js (1 minute)

Open `firebase-config.js` and replace with your values:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

export default firebaseConfig;
```

## Step 5: Set Security Rules (1 minute)

In Firebase Console → Firestore → Rules, paste:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /attendance/{document} {
      allow read, write: if true;
    }
  }
}
```

Click "Publish"

## Step 6: Test It! (30 seconds)

```bash
npm run dev
```

Open http://localhost:8000

Try scanning (click video) and check Firebase Console → Firestore → Data

## That's It! 🎉

Your app now has:
- ✓ Cloud storage
- ✓ Real-time sync
- ✓ Multi-device support
- ✓ Automatic backups

## Troubleshooting

**"Permission denied" error?**
- Check Firestore rules allow read/write
- Verify firebase-config.js has correct values

**Data not appearing?**
- Check Firebase Console → Firestore → Data
- Look for browser console errors (F12)

**Need help?**
- See FIREBASE.md for detailed guide
- Check Firebase Console for errors

## Next Steps

1. Add more children to the database
2. Generate QR codes (see qr-generator.html)
3. Test with multiple devices
4. Deploy to production (see DEPLOYMENT.md)

---

**Your Firebase backend is ready!** ✓
