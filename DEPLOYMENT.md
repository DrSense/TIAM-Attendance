# TIAM Attendance - Deployment Guide

## Local Development

1. **Start the development server:**
   ```bash
   npm start
   ```
   Or use Python:
   ```bash
   python -m http.server 8000
   ```

2. **Access the app:**
   - Desktop: `http://localhost:8000`
   - Mobile (same network): `http://YOUR_IP:8000`

## Production Deployment

### Option 1: Static Hosting (Recommended)

Deploy to any static hosting service:

**Netlify:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

**Vercel:**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

**GitHub Pages:**
1. Push code to GitHub repository
2. Go to Settings → Pages
3. Select branch and root folder
4. Save

### Option 2: Traditional Web Server

**Apache:**
1. Copy all files to `/var/www/html/tiam-attendance/`
2. Ensure `.htaccess` allows routing:
   ```apache
   RewriteEngine On
   RewriteBase /
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule . /index.html [L]
   ```

**Nginx:**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/tiam-attendance;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## SSL Certificate (Required for PWA)

PWAs require HTTPS. Use Let's Encrypt:

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d your-domain.com
```

## Backend Integration

For production, replace localStorage with a backend API:

1. **Create API endpoints:**
   - `GET /api/children` - Get all children
   - `GET /api/children/:id` - Get child by ID
   - `POST /api/attendance` - Record attendance
   - `GET /api/attendance` - Get attendance records

2. **Update app.js:**
   Replace DB object methods with fetch calls:
   ```javascript
   async getChild(id) {
     const response = await fetch(`/api/children/${id}`);
     return response.json();
   }
   ```

## Database Setup

**Recommended: PostgreSQL or MySQL**

```sql
CREATE TABLE children (
  id VARCHAR(10) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  home VARCHAR(100) NOT NULL
);

CREATE TABLE attendance (
  id SERIAL PRIMARY KEY,
  child_id VARCHAR(10) REFERENCES children(id),
  status VARCHAR(20) NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## QR Code Generation

Generate QR codes for each child:

**Using Python:**
```python
import qrcode

children = ['C001', 'C002', 'C003', 'C004', 'C005']

for child_id in children:
    qr = qrcode.QRCode(box_size=10, border=4)
    qr.add_data(child_id)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")
    img.save(f"qr_{child_id}.png")
```

**Using Node.js:**
```javascript
const QRCode = require('qrcode');

const children = ['C001', 'C002', 'C003', 'C004', 'C005'];

children.forEach(id => {
  QRCode.toFile(`qr_${id}.png`, id, {
    width: 300,
    margin: 2
  });
});
```

## Performance Optimization

1. **Enable Gzip compression** on server
2. **Set cache headers** for static assets
3. **Minify CSS/JS** for production
4. **Use CDN** for font files

## Monitoring

Add analytics to track usage:

```javascript
// Add to app.js
if (window.gtag) {
  gtag('event', 'scan_complete', {
    'event_category': 'attendance',
    'event_label': status
  });
}
```

## Security Checklist

- [ ] HTTPS enabled
- [ ] API authentication implemented
- [ ] Input validation on backend
- [ ] Rate limiting on API endpoints
- [ ] CORS properly configured
- [ ] SQL injection prevention
- [ ] XSS protection headers

## Testing

Test on multiple devices:
- [ ] Android Chrome
- [ ] iOS Safari
- [ ] Desktop browsers
- [ ] Outdoor lighting conditions
- [ ] Offline mode
- [ ] Camera permissions

## Backup Strategy

1. **Daily database backups**
2. **Export attendance data weekly**
3. **Store backups in multiple locations**

## Support

For issues or questions, refer to the README.md file.
