# TIAM Attendance PWA — Starter Project Structure

This structure assumes:

* React + Vite frontend
* Firebase backend (Firestore + Hosting)
* PWA support enabled
* QR scanning using html5-qrcode

The goal is clarity, speed, and maintainability.

---

# 1. Root Folder Structure

```
tiam-attendance/
│
├── public/
│   ├── icons/
│   │   ├── icon-192.png
│   │   ├── icon-512.png
│   │
│   ├── manifest.json
│   ├── favicon.ico
│
├── src/
│   ├── app/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── hooks/
│   ├── utils/
│   ├── styles/
│   ├── config/
│   ├── App.jsx
│   ├── main.jsx
│
├── .firebaserc
├── firebase.json
├── package.json
├── vite.config.js
└── README.md
```

---

# 2. Public Folder

## `/public/icons/`

Contains PWA icons.

Required:

* icon-192.png
* icon-512.png

Used for installable app display.

---

## `/public/manifest.json`

Defines PWA behavior:

Contains:

* app name
* theme color
* display mode (standalone)
* icons list

---

# 3. Source Code Structure

---

## `/src/config/`

### `firebase.js`

Initializes Firebase SDK.

Responsibilities:

* Connect to Firestore
* Export database instance
* Export helper functions if needed

---

## `/src/services/`

Handles all external data operations.

### `attendanceService.js`

Functions:

* logCheckIn(childId)
* logCheckOut(childId)
* fetchAttendance(day)
* exportCSV()

### `childrenService.js`

Functions:

* fetchChildById(id)
* fetchAllChildren()

Keeps database logic separate from UI.

---

## `/src/utils/`

Helper logic.

### `qrParser.js`

Extracts child ID from QR scan result.

### `dateUtils.js`

Handles:

* day detection
* timestamp formatting
* attendance session logic

### `csvExport.js`

Converts attendance data into downloadable CSV.

---

## `/src/hooks/`

Reusable logic.

### `useScanner.js`

Controls:

* camera lifecycle
* scan detection
* scan throttling

### `useAttendance.js`

Manages:

* check-in/out state
* duplicate detection
* status messaging

---

## `/src/components/`

Reusable UI blocks.

### Core Components

#### `Button.jsx`

Props:

* label
* color
* onClick
* loading state

---

#### `Header.jsx`

Top bar with:

* back button
* title
* logo

---

#### `ScannerBox.jsx`

Wraps html5-qrcode scanner.

Handles:

* camera mounting
* scan callback
* cleanup

---

#### `ResultCard.jsx`

Displays:

* child name
* home
* action buttons

Hidden until scan success.

---

#### `StatusMessage.jsx`

Shows:

* success messages
* warnings
* errors

Auto-dismiss logic included.

---

#### `AttendanceTable.jsx`

Used in dashboard.

Displays:

* child rows
* attendance status
* timestamps

---

## `/src/pages/`

Top-level route screens.

---

### `Home.jsx`

Shows:

* logo
* event name
* Start Scanning button
* Dashboard button

---

### `Scanner.jsx`

Contains:

* Header
* Instruction text
* ScannerBox
* ResultCard
* StatusMessage

Handles full scan workflow.

---

### `Dashboard.jsx`

Contains:

* Search bar
* Day filter
* AttendanceTable
* Export button

Fetches attendance data on load.

---

## `/src/styles/`

### `globals.css`

Defines:

* colors
* typography
* spacing
* button styles

### `layout.css`

Handles:

* container widths
* card styles
* grid spacing

---

# 4. Core App Files

---

## `App.jsx`

Responsibilities:

* Router setup
* Page routes
* Layout wrapper

Routes:

* `/` → Home
* `/scan` → Scanner
* `/dashboard` → Dashboard

---

## `main.jsx`

Entry point.

Responsibilities:

* Mount React app
* Register service worker
* Load global styles

---

# 5. Firebase Config Files

---

## `firebase.json`

Defines:

* hosting directory (`dist`)
* rewrite rules for SPA routing

---

## `.firebaserc`

Links project to Firebase account.

---

# 6. Required Dependencies

```
react
react-router-dom
firebase
html5-qrcode
```

Optional:

```
papaparse (for CSV export)
```

---

# 7. Suggested Development Order

1. Setup Firebase connection
2. Build child lookup service
3. Implement scanner component
4. Add check-in/out logging
5. Build dashboard table
6. Add CSV export
7. Enable PWA manifest + install

---

# 8. Final Principle

Keep:

* Database logic in services
* UI in components
* Pages thin and focused
* Hooks reusable

If each file has one responsibility,
the project will scale cleanly.

---

# TIAM Attendance System — Technical Stack Documentation

## 1. Project Overview

This system provides a QR-based attendance tracking solution for TIAM’s 3-day Vacation Bible School (VBS) program.

The system enables:

* QR badge generation for each child
* Mobile QR scanning for check-in and check-out
* Real-time attendance logging
* Centralized cloud storage
* Filtering, reporting, and CSV export

The architecture is optimized for:

* Zero cost deployment
* Fast development
* Reliability on moderate internet connections
* Smartphone-only usage for volunteers

---

## 2. Core Technology Stack

### 2.1 Frontend

**Framework:** React (with Vite)

**Why chosen**

* Extremely fast setup and build times
* Lightweight output suitable for mobile browsers
* Component-based UI for scanner + admin pages
* Works perfectly with Firebase SDK

**Responsibilities**

* QR scanner interface
* Check-in / check-out controls
* Volunteer-friendly mobile UI
* Admin reporting dashboard

---

### 2.2 QR Scanning Library

**Library:** html5-qrcode (open source)

**Why chosen**

* Runs directly in browser (no app install required)
* Uses device camera via WebRTC
* Fast and lightweight
* Works on Android and iOS browsers

**Responsibilities**

* Reads QR badge data
* Sends scanned ID to frontend logic
* Triggers attendance logging

---

### 2.3 Backend & Database

**Platform:** Firebase

**Services Used**

* Firestore (NoSQL cloud database)
* Firebase Hosting (static web deployment)

**Why chosen**

* Free tier sufficient for this event
* Real-time database sync
* No server maintenance required
* Global CDN ensures fast loading in India
* Built-in HTTPS security

---

## 3. Database Design

### Collection: `children`

Stores child identity records.

Fields:

* `childId` (string, unique)
* `name` (string)
* `home` (string)
* `qrCodeId` (string)

---

### Collection: `attendance_logs`

Stores all scan events.

Fields:

* `childId` (string)
* `timestamp` (datetime)
* `status` ("checkin" or "checkout")
* `day` (integer: 1, 2, or 3)

---

## 4. System Workflow

### Step 1 — QR Code Creation

* Unique ID generated per child
* QR contains encoded child ID
* Codes printed on badges

### Step 2 — Volunteer Scanning

* Volunteer opens attendance web page
* Camera scans QR badge
* Volunteer selects:

  * Check-in OR
  * Check-out

### Step 3 — Logging

* Frontend sends record to Firestore
* Database stores timestamped entry
* Entry instantly available for reporting

### Step 4 — Admin Monitoring

Admin interface allows:

* Filter by day
* Search by child name or ID
* View absentees
* Export CSV report

---

## 5. Hosting & Deployment

**Hosting platform:** Firebase Hosting

Benefits:

* Free SSL certificate
* Global CDN distribution
* Instant deployment via CLI
* Reliable access from Bangalore

---

## 6. Performance Considerations

The system is optimized for:

* Minimal data transfer per scan
* Fast page load (<1 second on mobile)
* Offline tolerance for short connectivity drops
* Efficient Firestore queries for reports

Estimated load for event:

* ~600 attendance writes total
* <5MB database usage
* Minimal bandwidth consumption

All within Firebase free tier limits.

---

## 7. Security & Reliability

* HTTPS enforced by hosting platform
* Firestore rules restrict unauthorized writes
* QR codes contain IDs only (no sensitive data)
* Database backups exportable as CSV anytime

---

## 8. Future Scalability

This system can later evolve into:

* Church-wide attendance platform
* School attendance solution
* Event management SaaS
* Multi-location tracking system

The architecture already supports scaling without redesign.

---

## 9. Summary

This stack provides:

* Zero-cost deployment
* Fast development cycle
* Reliable real-time tracking
* Mobile-first usability
* Future scalability

It is the most efficient technical solution for TIAM’s VBS attendance needs.

---


# TIAM Attendance System — System Architecture

## 1. Architecture Overview

The system follows a simple cloud-based client architecture optimized for:

* Mobile-first usage
* Minimal infrastructure
* Real-time data storage
* Fast deployment
* Zero-cost operation

The architecture consists of four main layers:

1. QR Identity Layer
2. Client Interface Layer
3. Cloud Processing Layer
4. Reporting & Admin Layer

---

## 2. Step-by-Step System Flow

---

## Step 1 — Child Registration & Identity Creation

**Purpose:** Create a digital identity for each child.

### Process

1. Admin prepares a spreadsheet with:

   * Child Name
   * Unique ID
   * Home/Origin

2. Script generates a QR code for each child.

3. Each QR encodes only the child’s unique ID.

4. QR codes are printed onto badges/cards.

### Output

* Printed QR badges
* Database populated with child records

---

## Step 2 — QR Badge Distribution (Day 1)

**Purpose:** Assign persistent identity tokens.

### Process

1. Caregivers receive QR badges.
2. Each child keeps the same badge for all 3 days.
3. QR becomes the attendance identifier.

### Output

* Physical identity token per child
* No need to reissue badges daily

---

## Step 3 — Volunteer Scanning Interface

**Purpose:** Provide a simple mobile tool for attendance capture.

### Interface Requirements

* Mobile browser access (no installation)
* Camera-based QR scanning
* Two buttons:

  * Check-in
  * Check-out

### Process

1. Volunteer opens attendance URL.
2. Page loads QR scanner.
3. Volunteer scans badge.
4. Child ID extracted instantly.
5. Volunteer selects attendance action.

### Output

* Validated scan event sent to cloud backend

---

## Step 4 — Cloud Attendance Logging

**Purpose:** Store each scan as a structured attendance record.

### Process

1. Frontend sends scan data to database:

   * Child ID
   * Timestamp
   * Status (check-in or check-out)
   * Day identifier

2. Cloud database stores entry immediately.

3. Data becomes available in real time.

### Output

* Immutable attendance log entry
* Centralized dataset for reporting

---

## Step 5 — Data Validation Layer

**Purpose:** Prevent incorrect or duplicate entries.

### Validation Rules

* Reject scans with unknown child ID
* Prevent multiple check-ins without checkout
* Prevent checkout before check-in
* Ensure correct day assignment

### Output

* Clean and reliable attendance records

---

## Step 6 — Real-Time Monitoring

**Purpose:** Allow organizers to view attendance instantly.

### Capabilities

* List of checked-in children
* List of absentees
* Attendance count per day
* Status of each child (present / left / absent)

### Output

* Live operational visibility

---

## Step 7 — Reporting & Export System

**Purpose:** Provide structured reports after or during the event.

### Report Features

* Filter by day
* Search by child name
* Search by ID
* Identify absentees automatically
* Export to CSV or Excel

### Output

* Downloadable attendance reports
* Historical event records

---

## 8. Logical Architecture Diagram (Text Representation)

```
[Printed QR Badge]
        ↓
[Volunteer Mobile Browser]
        ↓
[QR Scanner Interface]
        ↓
[Frontend Logic Validation]
        ↓
[Cloud Database Storage]
        ↓
[Admin Dashboard Queries]
        ↓
[Reports & CSV Export]
```

---

## 9. Reliability Design Considerations

* Minimal network payload per scan
* Short retry logic on failed submissions
* Optimized database queries for mobile speed
* Persistent cloud storage prevents data loss

---

## 10. Scalability Considerations

This architecture supports:

* More children
* More event days
* Multiple locations
* Different attendance types
* Future mobile app expansion

No redesign required to scale.

---

## 11. Security Considerations

* QR codes contain only IDs, not personal data
* HTTPS enforced for all requests
* Database access rules restrict unauthorized writes
* Reports downloadable only by admin users

---

## 12. Summary

The system architecture ensures:

* Fast QR-based attendance capture
* Reliable cloud storage
* Real-time monitoring
* Easy volunteer operation
* Simple reporting workflow

It is optimized for small to medium events but can scale into a full attendance platform if required.

---


# TIAM Attendance PWA — Branding, UI & UX Documentation

---

# 1. Product Identity

## 1.1 App Name Options

Primary name:
**TIAM Attendance**


Recommended public name:
**TIAM Attendance**

Reason:

* Clear purpose
* Professional
* Reusable for future events
* Church-friendly tone

---

# 2. Brand Personality

The app should feel:

* Calm
* Trustworthy
* Gentle
* Organized
* Child-safe
* Church-friendly
* Minimal but warm

Avoid:

* Corporate coldness
* Loud colors
* Complex layouts
* Gamified UI

This is not a tech product — it is a **service tool for ministry and care**.

---

# 3. Color System

## Primary Colors

**Faith Blue**

* HEX: `#2A6F97`
* Used for headers, buttons, highlights
* Represents trust and stability

**Grace White**

* HEX: `#FFFFFF`
* Main background
* Keeps UI clean and accessible

---

## Secondary Colors

**Hope Green**

* HEX: `#4CAF50`
* Check-in confirmations
* Success states

**Care Orange**

* HEX: `#FF9800`
* Warnings or attention prompts

**Gentle Gray**

* HEX: `#F4F6F8`
* Cards and panels background

---

# 4. Typography

## Heading Font

**Inter / Poppins**

* Clean
* Highly readable on mobile
* Modern but warm

## Body Font

**Inter / System Sans-serif**

Font sizes:

* App Title: 24px
* Section Headers: 18px
* Buttons: 16px
* Body Text: 15px

Spacing should be generous for readability.

---

# 5. Logo Concept

## Visual Direction

The logo should communicate:

* Care
* Order
* Presence
* Ministry

### Symbol ideas:

* Checkmark inside a circle
* Open book with checkmark
* Child silhouette + checkmark
* QR square with heart symbol

### Logo colors:

Faith Blue + Hope Green

### Usage:

* Splash screen
* Login page
* Header bar
* PWA icon

---

# 6. PWA Design Principles

This app must behave like a **native app without installation friction**.

### PWA Requirements

* Installable from browser
* Offline splash capability
* Fast load (<1 sec)
* Works on Android & iOS
* Full-screen launch mode

### Manifest Properties

* Name: TIAM Attendance
* Display: standalone
* Orientation: portrait
* Theme color: Faith Blue
* Background color: Grace White

---

# 7. User Experience Design

The UX must optimize for:

* Volunteers under time pressure
* Outdoor lighting conditions
* Fast scanning flow
* Minimal learning curve

Every screen must answer:
**“What is the volunteer supposed to do right now?”**

---

# 8. Screen Architecture

---

## 8.1 Home Screen

Purpose:
Landing page for volunteers.

Elements:

* App logo
* Event name
* Big button: “Start Scanning”
* Small button: “View Attendance”

Design:
Large tap targets
Centered layout
High contrast buttons

---

## 8.2 Scanner Screen

Purpose:
Primary operational screen.

Layout:

* Camera scanner box centered
* Instruction text above: “Scan Child QR Badge”
* Result panel below scan area

After scan:

* Child Name appears
* Home displayed
* Two buttons appear:

  ✔ Check-in (Green)
  ⬅ Check-out (Blue)

Buttons must be large and spaced.

Confirmation message:
“Attendance recorded successfully”

Auto-return to scanner after 2 seconds.

---

## 8.3 Admin Dashboard Screen

Purpose:
Monitoring and reporting.

Layout:

* Search bar
* Day filter dropdown
* Attendance table
* Export button

Table columns:

* Child Name
* ID
* Home
* Status
* Time

Use alternating row colors for readability.

---

# 9. Interaction Design

## Feedback Signals

### Successful scan

* Soft vibration (if supported)
* Green highlight flash
* Confirmation message

### Invalid scan

* Red message
* “Child not recognized”

### Duplicate scan

* Orange message
* “Already checked in”

---

# 10. Accessibility Design

The app must support:

* Outdoor usage
* Older volunteers
* Small phone screens

Therefore:

* Large buttons
* High contrast colors
* Minimum text
* Clear labels
* No hidden menus

---

# 11. Performance Design

The UI must:

* Load instantly
* Avoid animations during scanning
* Cache assets locally
* Send minimal data per request

Goal:
**Scan → Confirm → Next within 2 seconds**

---

# 12. Emotional UX Goals

The app should make volunteers feel:

* Confident
* Calm
* In control
* Helpful
* Supported by the system

The app should never feel:

* Confusing
* Slow
* Technical
* Risky

---

# 13. Future Branding Scalability

This design system allows expansion into:

* Church attendance platform
* Sunday school management system
* Multi-branch TIAM tools
* Event coordination system

The brand must remain reusable beyond VBS.

---

# 14. Summary

The TIAM Attendance PWA should embody:

* Simplicity
* Warmth
* Reliability
* Speed
* Trust

Its design must prioritize:
**clarity over beauty, speed over features, and care over complexity.**

---


# TIAM Attendance PWA — Screen Wireframes (Developer Ready)

This document provides layout blueprints for each screen.
All spacing uses an 8px grid system.

---

# 1. Global Layout Rules

## Container

* Max width: 480px
* Center aligned
* Padding: 16px
* Background: Grace White

## Card Style

* Background: white
* Border radius: 14px
* Padding: 16px
* Shadow: soft (0 2px 6px rgba(0,0,0,0.06))

## Button Style

* Height: 52px
* Radius: 12px
* Font weight: 600
* Full width

---

# 2. Home Screen Wireframe

## Layout Structure

```
[ LOGO ]

TIAM Attendance

[ Event Name ]
VBS 2026

[ Primary Button ]
Start Scanning

[ Secondary Button ]
View Attendance
```

## Spacing

* Logo top margin: 40px
* Title margin-top: 16px
* Buttons margin-top: 40px
* Gap between buttons: 16px

## Interaction

Start Scanning → Opens Scanner Screen
View Attendance → Opens Admin Screen

---

# 3. Scanner Screen Wireframe

## Layout Structure

```
Header Bar
-------------------------
< Back        TIAM Attendance

Instruction Text
"Scan Child QR Badge"

[ Camera Scanner Box ]

Scan Result Panel (hidden until scan)

Child Name: _______
Home: _______

[ Check-in Button ]   [ Check-out Button ]
```

## Scanner Box

* Aspect ratio: square
* Border radius: 14px
* Thin blue border
* Centered

## Result Panel Behavior

Initially hidden.

After scan:

* Slide in below scanner
* Show child info
* Show buttons

Buttons must be side-by-side on large screens,
stacked vertically on small screens.

---

# 4. Confirmation State

After user taps Check-in or Check-out:

```
✓ Attendance Recorded

Returning to scanner...
```

## Behavior

* Show success message
* Green highlight background
* Auto-clear after 2 seconds
* Scanner resets automatically

No manual reset needed.

---

# 5. Error States

## Unknown QR

```
⚠ Child Not Found

Please try again or contact admin.
```

Red message box
Auto-dismiss after 3 seconds

---

## Duplicate Check-in

```
⚠ Already Checked In Today
```

Orange message box
Allow override only if admin mode enabled.

---

# 6. Admin Dashboard Wireframe

## Layout Structure

```
Header Bar
-------------------------
< Back        Attendance Dashboard

[ Search Field ]
Search name or ID

[ Filter Dropdown ]
Day 1 | Day 2 | Day 3 | All

Attendance Table

---------------------------------
Name | ID | Home | Status | Time
---------------------------------

[ Export CSV Button ]
```

## Table Design

* Row height: 48px
* Alternating row colors
* Sticky header

Status colors:

* Checked-in → Green dot
* Checked-out → Blue dot
* Absent → Gray dot

---

# 7. Empty State Screens

## No Scans Yet

```
No attendance recorded yet.
Start scanning to log entries.
```

Centered text
Soft gray tone

---

# 8. Loading States

## Scanner Loading

```
Starting camera...
```

Spinner + text
Should last <1 second

---

## Dashboard Loading

Skeleton rows:

* 5 placeholder rows
* Gray shimmer animation

---

# 9. Mobile Optimization Rules

* All tap targets ≥ 48px height
* No side scrolling allowed
* Avoid nested menus
* Only one action per screen focus

---

# 10. PWA Install Prompt Screen

Optional overlay after first launch:

```
Install TIAM Attendance

Access faster and work offline-ready.

[ Install Button ]
[ Not Now ]
```

Only show once per device.

---

# 11. Navigation Rules

Only three routes allowed:

* `/` → Home
* `/scan` → Scanner
* `/dashboard` → Admin

No deep navigation tree.

Keep flow flat and simple.

---

# 12. Animation Guidelines

Allowed:

* Fade transitions
* Slide-in panels
* Button press ripple

Avoid:

* Long animations
* Parallax effects
* Complex transitions

Speed > aesthetics.

---

# 13. UX Timing Targets

* App load: under 1 second
* Scan detection: under 1 second
* Database write: under 500ms
* Total scan flow: under 3 seconds

---

# 14. Final Design Principle

Every screen must answer instantly:

**What should I do next?**

If a screen requires explanation,
it needs simplification.

---
