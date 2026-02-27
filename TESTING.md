# TIAM Attendance - Testing Guide

## Quick Start Testing

1. **Start the server:**
   ```bash
   npm start
   ```

2. **Open in browser:**
   - Desktop: http://localhost:8000
   - Mobile: http://YOUR_IP:8000

## Feature Testing Checklist

### Home Screen
- [ ] Logo displays correctly
- [ ] App title "TIAM Attendance" is visible
- [ ] Event name "VBS 2026" is shown
- [ ] "Start Scanning" button is large and clickable
- [ ] "View Attendance" button is visible
- [ ] Buttons navigate to correct screens

### Scanner Screen
- [ ] Camera permission prompt appears
- [ ] Video feed displays (if camera allowed)
- [ ] Back button returns to home
- [ ] Instruction text is clear
- [ ] Scanner box has blue border
- [ ] Click video to simulate scan (demo mode)

### Scan Flow Testing
1. Click video area to simulate scan
2. Verify child info appears:
   - [ ] Child name displays
   - [ ] Home location displays
3. Test Check-in button:
   - [ ] Green button is visible
   - [ ] Click records attendance
   - [ ] Success message appears
   - [ ] Auto-returns to scanner after 2 seconds
4. Test Check-out button:
   - [ ] Blue button is visible
   - [ ] Click records attendance
   - [ ] Success message appears

### Error State Testing
1. **Duplicate Check-in:**
   - Scan same child twice in one day
   - [ ] Orange warning appears
   - [ ] Message: "Already Checked In Today"
   - [ ] Auto-dismisses after 3 seconds

2. **Unknown Child:**
   - Modify code to scan invalid ID
   - [ ] Red error appears
   - [ ] Message: "Child Not Found"
   - [ ] Auto-dismisses after 3 seconds

### Dashboard Screen
- [ ] Back button returns to home
- [ ] Search bar is functional
- [ ] Filter dropdown has all options
- [ ] Table displays attendance records
- [ ] Export CSV button works

### Dashboard Functionality
1. **Search Testing:**
   - Type child name
   - [ ] Table filters in real-time
   - Type child ID
   - [ ] Table filters correctly
   - Clear search
   - [ ] All records return

2. **Filter Testing:**
   - Select "Today"
   - [ ] Shows only today's records
   - Select "Checked In"
   - [ ] Shows only check-in records
   - Select "Checked Out"
   - [ ] Shows only check-out records
   - Select "All Records"
   - [ ] Shows everything

3. **Export Testing:**
   - Click "Export CSV"
   - [ ] File downloads
   - [ ] CSV contains all records
   - [ ] Columns are correct
   - [ ] Data is properly formatted

### Mobile Testing

#### Android Chrome
- [ ] App loads quickly
- [ ] Camera works
- [ ] Touch targets are large enough
- [ ] No horizontal scrolling
- [ ] Buttons are easily tappable
- [ ] Vibration works on scan

#### iOS Safari
- [ ] App loads quickly
- [ ] Camera permission works
- [ ] Video displays correctly
- [ ] Touch targets work well
- [ ] No layout issues
- [ ] Smooth navigation

### PWA Testing

1. **Installation:**
   - [ ] "Add to Home Screen" option appears
   - [ ] Install prompt works
   - [ ] Icon appears on home screen
   - [ ] App opens in standalone mode

2. **Offline Mode:**
   - Install app
   - Turn off internet
   - [ ] App still opens
   - [ ] UI loads correctly
   - [ ] Can view cached data
   - [ ] Service worker active

3. **Manifest:**
   - [ ] Theme color matches (#2A6F97)
   - [ ] Background color is white
   - [ ] Portrait orientation enforced
   - [ ] App name displays correctly

### Performance Testing

1. **Load Time:**
   - Clear cache
   - Reload page
   - [ ] Loads in under 1 second

2. **Scan Speed:**
   - Time from scan to confirmation
   - [ ] Completes in under 3 seconds

3. **Database Operations:**
   - Record attendance
   - [ ] Saves in under 500ms
   - Load dashboard
   - [ ] Displays in under 1 second

### Accessibility Testing

1. **Outdoor Visibility:**
   - Test in bright sunlight
   - [ ] Text is readable
   - [ ] Buttons are visible
   - [ ] Contrast is sufficient

2. **Large Buttons:**
   - [ ] All buttons ≥ 48px height
   - [ ] Easy to tap with finger
   - [ ] Adequate spacing between buttons

3. **Text Size:**
   - [ ] All text is readable
   - [ ] No text too small
   - [ ] Generous line spacing

### Browser Compatibility

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Chrome
- [ ] Mobile Safari

### Data Persistence

1. **LocalStorage:**
   - Record attendance
   - Close browser
   - Reopen app
   - [ ] Data persists
   - [ ] Records still visible

2. **Multiple Sessions:**
   - Record attendance
   - Open new tab
   - [ ] Data syncs
   - [ ] Same records visible

### Edge Cases

1. **No Camera:**
   - Deny camera permission
   - [ ] Error message displays
   - [ ] App doesn't crash
   - [ ] Can still access dashboard

2. **Empty State:**
   - Clear localStorage
   - Open dashboard
   - [ ] Empty state message shows
   - [ ] No errors in console

3. **Many Records:**
   - Add 50+ attendance records
   - [ ] Table scrolls properly
   - [ ] Performance remains good
   - [ ] Export still works

### Security Testing

- [ ] No console errors
- [ ] No XSS vulnerabilities
- [ ] LocalStorage data is valid JSON
- [ ] No sensitive data exposed

## Test Data

### Sample Children IDs
- C001 - Emma Johnson (Springfield)
- C002 - Noah Williams (Riverside)
- C003 - Olivia Brown (Lakeside)
- C004 - Liam Davis (Springfield)
- C005 - Ava Martinez (Hillview)

### Test Scenarios

**Scenario 1: Morning Check-in**
1. Scan C001 (Emma)
2. Click Check-in
3. Verify success message
4. Check dashboard shows record

**Scenario 2: Afternoon Check-out**
1. Scan C001 (Emma)
2. Should show duplicate warning
3. Scan C002 (Noah)
4. Click Check-out
5. Verify success message

**Scenario 3: Multiple Children**
1. Scan and check-in C001, C002, C003
2. Go to dashboard
3. Verify all 3 records appear
4. Filter by "Checked In"
5. Export CSV

## Performance Benchmarks

Target metrics:
- Initial load: < 1 second
- Camera start: < 1 second
- Scan detection: < 1 second
- Database write: < 500ms
- Total scan flow: < 3 seconds

## Reporting Issues

When reporting bugs, include:
1. Device/browser information
2. Steps to reproduce
3. Expected vs actual behavior
4. Screenshots if applicable
5. Console errors (if any)

## Automated Testing (Future)

For production, consider adding:
- Unit tests (Jest)
- E2E tests (Playwright/Cypress)
- Performance monitoring
- Error tracking (Sentry)

## QR Code Testing

1. Open `qr-generator.html`
2. Print QR codes
3. Test scanning with real camera
4. Verify correct child data appears

## Notes

- Demo mode: Click video to simulate scan
- Real QR scanning requires jsQR library
- LocalStorage has ~5-10MB limit
- Clear data: localStorage.clear() in console
