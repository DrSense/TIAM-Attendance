# TIAM Attendance - Quick Start Guide

## Get Running in 60 Seconds

### Step 1: Start the Server
```bash
# Option A: Using npm
npm start

# Option B: Using Python
python -m http.server 8000

# Option C: Using Node.js
npx serve -l 8000
```

### Step 2: Open in Browser
```
Desktop: http://localhost:8000
Mobile:  http://YOUR_IP_ADDRESS:8000
```

### Step 3: Start Using
1. Click **"Start Scanning"**
2. Allow camera access
3. Click the video area to simulate a scan (demo mode)
4. Click **"Check-in"** or **"Check-out"**
5. Done! ✓

## First Time Setup

### For Desktop Testing
1. Open Chrome or Firefox
2. Navigate to `http://localhost:8000`
3. Click "Start Scanning"
4. Allow camera when prompted
5. Click video to test

### For Mobile Testing
1. Find your computer's IP address:
   - Windows: `ipconfig` (look for IPv4)
   - Mac/Linux: `ifconfig` or `ip addr`
2. On mobile browser, go to `http://YOUR_IP:8000`
3. Test the app

### Install as PWA (Mobile)
**Android:**
1. Open in Chrome
2. Tap menu (⋮)
3. Tap "Add to Home screen"
4. Tap "Add"

**iOS:**
1. Open in Safari
2. Tap Share button
3. Tap "Add to Home Screen"
4. Tap "Add"

## Demo Features

### Sample Children (Click video to scan)
- C001 - Emma Johnson (Springfield)
- C002 - Noah Williams (Riverside)
- C003 - Olivia Brown (Lakeside)
- C004 - Liam Davis (Springfield)
- C005 - Ava Martinez (Hillview)

### Test Scenarios

**Basic Check-in:**
1. Start Scanning
2. Click video (random child appears)
3. Click "Check-in"
4. See success message
5. Auto-returns to scanner

**View Records:**
1. Go back to home
2. Click "View Attendance"
3. See all recorded attendance
4. Try search and filters
5. Export CSV

**Duplicate Prevention:**
1. Scan same child twice
2. See warning message
3. Prevents duplicate check-ins

## Customization

### Change Event Name
Edit `index.html` or `app.js`:
```javascript
<p class="event-name">VBS 2026</p>
// Change to your event name
```

### Change Colors
Edit `styles.css`:
```css
:root {
  --faith-blue: #2A6F97;    /* Your primary color */
  --hope-green: #4CAF50;    /* Your success color */
  --care-orange: #FF9800;   /* Your warning color */
}
```

### Add More Children
Edit `app.js`, find the `children` array:
```javascript
children: [
  { id: 'C001', name: 'Your Child', home: 'Location' },
  // Add more here
]
```

## Troubleshooting

### Camera Not Working
- **Check permissions**: Allow camera access in browser
- **HTTPS required**: Use localhost or HTTPS for camera
- **Wrong camera**: App uses rear camera by default

### App Not Loading
- **Check port**: Make sure port 8000 is not in use
- **Check firewall**: Allow connections on port 8000
- **Try different browser**: Chrome recommended

### Data Not Saving
- **Check localStorage**: Make sure it's enabled
- **Check browser**: Private/incognito mode may block storage
- **Clear and retry**: `localStorage.clear()` in console

### PWA Not Installing
- **HTTPS required**: PWA needs HTTPS (localhost works)
- **Manifest issues**: Check manifest.json is accessible
- **Service worker**: Check sw.js is registered

## Production Checklist

Before going live:
- [ ] Replace demo children with real data
- [ ] Set up backend API (optional)
- [ ] Configure HTTPS
- [ ] Test on target devices
- [ ] Generate real QR codes
- [ ] Train volunteers
- [ ] Have backup plan

## Generate QR Codes

### Option 1: Use Built-in Generator
1. Open `qr-generator.html` in browser
2. Click "Print All Codes"
3. Print or save as PDF

### Option 2: Online Tools
- qr-code-generator.com
- qr.io
- goqr.me

### Option 3: Python Script
```python
pip install qrcode[pil]
python -c "import qrcode; qr = qrcode.make('C001'); qr.save('C001.png')"
```

## Getting Help

1. **README.md** - Full documentation
2. **TESTING.md** - Testing guide
3. **DEPLOYMENT.md** - Production deployment
4. **PROJECT.md** - Technical details

## Next Steps

### For Development
1. Read PROJECT.md for architecture
2. Review config.js for settings
3. Check TESTING.md for test cases
4. Explore app.js for logic

### For Production
1. Read DEPLOYMENT.md
2. Set up backend database
3. Configure API endpoints
4. Generate real QR codes
5. Train users
6. Deploy to hosting

## Tips for Success

✓ **Test thoroughly** before event day
✓ **Have backup** (paper forms)
✓ **Train volunteers** in advance
✓ **Check camera** works on all devices
✓ **Print QR codes** clearly
✓ **Have admin access** to dashboard
✓ **Export data** regularly

## Support

Need help? Check:
- Browser console for errors (F12)
- Network tab for failed requests
- Application tab for storage issues
- Console tab for JavaScript errors

---

**You're ready to go! Start the server and begin scanning.** ✓
