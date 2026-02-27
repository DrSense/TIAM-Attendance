# TIAM Attendance PWA - Project Overview

## Project Summary

A Progressive Web App designed for church volunteers to quickly track child attendance at events like VBS (Vacation Bible School) using QR code scanning. Built with vanilla JavaScript for maximum performance and minimal dependencies.

## Design Philosophy

**Clarity over beauty, speed over features, care over complexity**

The app embodies:
- Simplicity
- Warmth
- Reliability
- Speed
- Trust

## File Structure

```
TIAM-Attendance/
├── index.html              # Main HTML entry point
├── manifest.json           # PWA manifest
├── sw.js                   # Service worker for offline capability
├── styles.css              # Global styles and design system
├── app.js                  # Main application logic (demo mode)
├── app-enhanced.js         # Enhanced version with real QR scanning
├── config.js               # Configuration file
├── package.json            # NPM configuration
├── .gitignore             # Git ignore rules
│
├── icon.svg               # SVG icon source
├── icon-192.png           # PWA icon 192x192
├── icon-512.png           # PWA icon 512x512
├── generate-icons.html    # Tool to generate PNG icons
├── qr-generator.html      # QR code generator for testing
│
├── doc.md                 # Original design specification
├── README.md              # User documentation
├── DEPLOYMENT.md          # Deployment guide
├── TESTING.md             # Testing guide
└── PROJECT.md             # This file
```

## Technology Stack

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Custom properties, Grid, Flexbox
- **JavaScript (ES6+)**: Vanilla JS, no frameworks
- **Web APIs**: 
  - MediaDevices (camera access)
  - LocalStorage (data persistence)
  - Service Worker (offline capability)
  - Vibration API (haptic feedback)

### PWA Features
- Installable on mobile devices
- Offline-first architecture
- Fast load times (<1 second)
- Responsive design
- Native app feel

## Core Features

### 1. Home Screen
- Clean landing page
- Large, accessible buttons
- Clear call-to-action
- Event information display

### 2. Scanner Screen
- Real-time camera feed
- QR code detection
- Child information display
- Quick check-in/check-out
- Auto-reset after recording
- Error handling

### 3. Dashboard Screen
- Attendance table
- Real-time search
- Status filtering
- CSV export
- Responsive layout

## Design System

### Colors
- **Faith Blue** (#2A6F97): Trust, stability
- **Grace White** (#FFFFFF): Clean, accessible
- **Hope Green** (#4CAF50): Success, confirmation
- **Care Orange** (#FF9800): Warnings, attention
- **Gentle Gray** (#F4F6F8): Subtle backgrounds

### Typography
- **Font**: Inter (Google Fonts)
- **Sizes**: 24px (titles), 18px (headers), 16px (buttons), 15px (body)
- **Weight**: 400 (regular), 600 (semibold), 700 (bold)

### Spacing
- 8px grid system
- 16px container padding
- 40px section margins
- 16px button gaps

### Components
- **Buttons**: 52px height, 12px radius, full width
- **Cards**: 14px radius, soft shadow
- **Container**: 480px max width, centered
- **Scanner**: Square aspect ratio, blue border

## User Flow

```
Home Screen
    ├─→ Start Scanning → Scanner Screen
    │                        ├─→ Scan QR Code
    │                        ├─→ Display Child Info
    │                        ├─→ Check-in/Check-out
    │                        ├─→ Confirmation
    │                        └─→ Auto-reset
    │
    └─→ View Attendance → Dashboard Screen
                             ├─→ Search Records
                             ├─→ Filter by Status
                             ├─→ Export CSV
                             └─→ Back to Home
```

## Data Model

### Child Object
```javascript
{
  id: 'C001',           // Unique identifier
  name: 'Emma Johnson', // Full name
  home: 'Springfield'   // Home location
}
```

### Attendance Record
```javascript
{
  id: 'C001',              // Child ID
  name: 'Emma Johnson',    // Child name
  home: 'Springfield',     // Home location
  status: 'checked-in',    // 'checked-in' or 'checked-out'
  time: '2026-06-15T09:30:00.000Z', // ISO timestamp
  timestamp: 1718442600000 // Unix timestamp
}
```

## Performance Targets

- **App Load**: <1 second
- **Camera Start**: <1 second
- **Scan Detection**: <1 second
- **Database Write**: <500ms
- **Total Scan Flow**: <3 seconds

## Browser Support

### Desktop
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Mobile
- Chrome for Android 90+
- Safari for iOS 14+
- Samsung Internet 14+

## Accessibility Features

- Large tap targets (≥48px)
- High contrast colors
- Clear visual hierarchy
- No hidden menus
- Generous spacing
- Readable font sizes
- Outdoor visibility optimized

## Security Considerations

### Current (Demo)
- Client-side only
- LocalStorage for data
- No authentication
- No encryption

### Production Recommendations
- HTTPS required (PWA requirement)
- Backend API integration
- User authentication
- Data encryption
- Input validation
- Rate limiting
- CORS configuration
- SQL injection prevention

## Scalability

### Current Capacity
- LocalStorage: ~5-10MB
- Estimated: 1000-5000 records
- Single event/session

### Production Scaling
- Backend database (PostgreSQL/MySQL)
- Multi-event support
- Multi-user access
- Real-time sync
- Cloud storage
- Analytics integration

## Development Workflow

### Setup
```bash
# Clone repository
git clone <repo-url>

# Navigate to directory
cd TIAM-Attendance

# Start development server
npm start
```

### Testing
```bash
# Open in browser
http://localhost:8000

# Mobile testing (same network)
http://YOUR_IP:8000
```

### Deployment
```bash
# Build for production (if using build tools)
npm run build

# Deploy to hosting service
netlify deploy --prod
# or
vercel --prod
```

## Customization

Edit `config.js` to customize:
- Event name and year
- Brand colors
- UI timing
- Messages and labels
- Feature toggles
- API endpoints

## Future Enhancements

### Phase 2
- [ ] Real QR code scanning (jsQR integration)
- [ ] Backend API integration
- [ ] User authentication
- [ ] Multi-event support
- [ ] Photo capture
- [ ] Parent notifications

### Phase 3
- [ ] Analytics dashboard
- [ ] Reporting tools
- [ ] Parent portal
- [ ] Check-in kiosk mode
- [ ] Badge printing
- [ ] Emergency contacts

### Phase 4
- [ ] Multi-location support
- [ ] Volunteer management
- [ ] Scheduling system
- [ ] Communication tools
- [ ] Mobile apps (React Native)

## Known Limitations

1. **Demo Mode**: Click video to simulate scan (no real QR detection)
2. **LocalStorage**: Limited capacity, browser-specific
3. **No Backend**: Data not synced across devices
4. **No Auth**: Anyone can access all features
5. **Single Event**: No multi-event support
6. **No Offline Sync**: Changes while offline don't sync

## Contributing

### Code Style
- Use ES6+ features
- Follow existing patterns
- Comment complex logic
- Keep functions small
- Maintain design system

### Testing
- Test on multiple devices
- Verify offline mode
- Check accessibility
- Validate performance
- Test edge cases

## License

MIT License - See LICENSE file for details

## Support

For questions or issues:
1. Check README.md
2. Review TESTING.md
3. Consult DEPLOYMENT.md
4. Check browser console for errors

## Credits

- **Design**: Based on doc.md specifications
- **Fonts**: Inter by Rasmus Andersson (Google Fonts)
- **Icons**: Custom SVG design
- **Inspiration**: Ministry service tools

## Version History

### v1.0.0 (Current)
- Initial release
- Three-screen navigation
- Demo QR scanning
- LocalStorage persistence
- PWA support
- CSV export
- Responsive design

---

**Built with care for ministry and service** ✓
