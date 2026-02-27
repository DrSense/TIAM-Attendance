# TIAM Attendance PWA

A Progressive Web App for church event attendance tracking with **Firebase cloud backend**.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Firebase (10 minutes)

See **[SETUP.md](SETUP.md)** for step-by-step Firebase configuration.

Quick version:
1. Create Firebase project at https://console.firebase.google.com/
2. Enable Firestore Database
3. Copy your config to `firebase-config.js`
4. Set security rules

### 3. Run the App
```bash
npm run dev
```

Open http://localhost:8000

## Features

- ✓ **Cloud Storage** - Firebase Firestore backend
- ✓ **Real-time Sync** - Multi-device support
- ✓ **Fast QR Scanning** - Quick check-in/check-out
- ✓ **Offline Capable** - Works without internet
- ✓ **Mobile Optimized** - High contrast for outdoor use
- ✓ **PWA Ready** - Installable on mobile devices
- ✓ **Dashboard** - Search, filter, export CSV

## Usage

### For Volunteers

1. Tap "Start Scanning"
2. Point camera at QR badge (or click video for demo)
3. Tap "Check-in" or "Check-out"
4. Done! Auto-returns to scanner

### For Administrators

1. Tap "View Attendance"
2. Search by name or ID
3. Filter by day
4. Export as CSV

## Architecture

- **Frontend**: Vanilla JavaScript (no frameworks)
- **Backend**: Firebase Firestore
- **Storage**: Cloud + offline cache
- **Auth**: Optional (see FIREBASE.md)

## Files

- `index.html` - Main entry point
- `app-tailwind.js` - Application with Tailwind CSS + Lucide icons
- `firebase-config.js` - Your Firebase credentials
- `manifest.json` - PWA configuration

## Documentation

- **[SETUP.md](SETUP.md)** - Quick Firebase setup (START HERE)
- **[FIREBASE.md](FIREBASE.md)** - Detailed Firebase guide
- **[TESTING.md](TESTING.md)** - Testing checklist
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Production deployment
- **[COMPARISON.md](COMPARISON.md)** - LocalStorage vs Firebase

## Alternative Versions

This app uses Tailwind CSS for styling and Firebase for backend.

For custom CSS or localStorage versions, see the git history.

## Browser Support

- Chrome/Edge 90+ (recommended)
- Safari 14+ (iOS 14+)
- Firefox 88+

## PWA Installation

**Android**: Menu → "Add to Home Screen"  
**iOS**: Share → "Add to Home Screen"

## Design System

- **Faith Blue** (#2A6F97) - Primary
- **Hope Green** (#4CAF50) - Success
- **Care Orange** (#FF9800) - Warnings
- **Grace White** (#FFFFFF) - Background
- **Gentle Gray** (#F4F6F8) - Cards

## Performance

- Load time: <1 second
- Scan flow: <3 seconds
- Database write: <500ms

## Data Structure

### Firestore Collection: `attendance`
```javascript
{
  id: "C001",
  name: "Emma Johnson",
  home: "Springfield",
  status: "checked-in",
  time: "2024-01-15T09:30:00.000Z",
  timestamp: 1705315800000
}
```

## Security

**Development**: Test mode (open access)  
**Production**: Enable Firebase Authentication (see FIREBASE.md)

## Cost

Firebase Free Tier:
- 50K reads/day
- 20K writes/day
- 1GB storage

Typical VBS event: Well within free tier ✓

## Troubleshooting

**"Permission denied" error**
- Check Firestore security rules
- Verify firebase-config.js

**Data not syncing**
- Check internet connection
- Verify Firebase Console shows data
- Check browser console (F12)

**Camera not working**
- Allow camera permissions
- Use HTTPS or localhost

## Support

- Firebase issues: See [FIREBASE.md](FIREBASE.md)
- General help: See [TESTING.md](TESTING.md)
- Deployment: See [DEPLOYMENT.md](DEPLOYMENT.md)

## License

MIT

---

**Built with care for ministry and service** ✓
