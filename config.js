// Configuration file for TIAM Attendance PWA
// Modify these values to customize the app for your event

const CONFIG = {
  // Event Information
  event: {
    name: 'VBS 2026',
    organization: 'TIAM',
    year: 2026
  },
  
  // Branding Colors (from design system)
  colors: {
    faithBlue: '#2A6F97',
    graceWhite: '#FFFFFF',
    hopeGreen: '#4CAF50',
    careOrange: '#FF9800',
    gentleGray: '#F4F6F8',
    errorRed: '#f44336'
  },
  
  // Typography
  typography: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
    sizes: {
      appTitle: '24px',
      sectionHeader: '18px',
      button: '16px',
      body: '15px'
    }
  },
  
  // UI Behavior
  ui: {
    autoReturnDelay: 2000, // ms - time before scanner resets after recording
    errorDismissDelay: 3000, // ms - time before error messages auto-dismiss
    vibrationDuration: 100, // ms - haptic feedback duration
    maxContainerWidth: '480px',
    buttonHeight: '52px',
    borderRadius: '12px'
  },
  
  // Scanner Settings
  scanner: {
    preferredCamera: 'environment', // 'environment' or 'user'
    scanInterval: 100, // ms - how often to check for QR codes
    demoMode: true // true = click to simulate, false = real scanning only
  },
  
  // Data Management
  data: {
    storageKey: 'attendance',
    childrenKey: 'children',
    enableDuplicateCheck: true,
    duplicateCheckWindow: 'day' // 'day', 'session', or 'none'
  },
  
  // Features
  features: {
    enableVibration: true,
    enableOfflineMode: true,
    enableCSVExport: true,
    enableSearch: true,
    enableFilters: true
  },
  
  // API Configuration (for backend integration)
  api: {
    enabled: false,
    baseUrl: 'https://api.example.com',
    endpoints: {
      children: '/api/children',
      attendance: '/api/attendance',
      export: '/api/export'
    },
    timeout: 5000 // ms
  },
  
  // PWA Settings
  pwa: {
    name: 'TIAM Attendance',
    shortName: 'TIAM',
    description: 'Church event attendance tracking',
    themeColor: '#2A6F97',
    backgroundColor: '#FFFFFF',
    display: 'standalone',
    orientation: 'portrait'
  },
  
  // Performance
  performance: {
    targetLoadTime: 1000, // ms
    targetScanTime: 1000, // ms
    targetDbWriteTime: 500, // ms
    targetTotalFlowTime: 3000 // ms
  },
  
  // Sample Data (for demo/testing)
  sampleChildren: [
    { id: 'C001', name: 'Emma Johnson', home: 'Springfield' },
    { id: 'C002', name: 'Noah Williams', home: 'Riverside' },
    { id: 'C003', name: 'Olivia Brown', home: 'Lakeside' },
    { id: 'C004', name: 'Liam Davis', home: 'Springfield' },
    { id: 'C005', name: 'Ava Martinez', home: 'Hillview' }
  ],
  
  // Messages
  messages: {
    scanInstruction: 'Scan Child QR Badge',
    scanSuccess: 'Attendance Recorded',
    scanReturning: 'Returning to scanner...',
    childNotFound: 'Child Not Found',
    childNotFoundDetail: 'Please try again or contact admin.',
    duplicateCheckIn: 'Already Checked In Today',
    cameraLoading: 'Starting camera...',
    cameraError: 'Camera access denied. Please enable camera permissions.',
    emptyState: 'No attendance recorded yet.',
    emptyStateDetail: 'Start scanning to log entries.'
  },
  
  // Table Configuration
  table: {
    columns: ['Name', 'ID', 'Home', 'Status', 'Time'],
    rowHeight: '48px',
    alternatingRows: true,
    stickyHeader: true
  },
  
  // Export Configuration
  export: {
    filePrefix: 'attendance',
    format: 'csv',
    includeHeaders: true,
    dateFormat: 'locale' // 'locale' or 'iso'
  }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}
