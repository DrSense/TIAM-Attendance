# Vercel Deployment Fixes

## Issues Fixed

### 1. **Routing Issues on Vercel**
**Problem**: Direct navigation to `/scan` or `/dashboard` returns 404  
**Solution**: Added `vercel.json` with SPA rewrites to route all paths to `index.html`

### 2. **iOS Safari Camera Issues**
**Problem**: Camera doesn't start on iPhone/iPad  
**Solution**: 
- Added `playsinline` and `webkit-playsinline` attributes
- Explicit `video.play()` call
- Better camera constraints for iOS compatibility

### 3. **Android Compatibility**
**Problem**: Touch interactions and zoom issues  
**Solution**:
- Added `viewport-fit=cover` for notch support
- Disabled text selection and tap highlights
- Fixed input font size to prevent auto-zoom (16px minimum)

### 4. **Service Worker Issues**
**Problem**: SW not registering properly on Vercel  
**Solution**: Added proper headers in `vercel.json` for service worker scope

## Files Modified

1. **vercel.json** (NEW)
   - SPA routing rewrites
   - Service worker headers
   - Security headers

2. **app-tailwind.js**
   - iOS camera compatibility
   - Better route initialization
   - Explicit video play

3. **index.html**
   - iOS/Android meta tags
   - PWA capability tags
   - Mobile-specific styles

## Deployment Steps

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## Testing Checklist

- [ ] Direct URL navigation works (`/scan`, `/dashboard`)
- [ ] Camera works on iOS Safari
- [ ] Camera works on Android Chrome
- [ ] No zoom on input focus
- [ ] PWA installs correctly
- [ ] Service worker registers
- [ ] Back button works properly

## Browser Support

✅ iOS Safari 14+  
✅ Android Chrome 90+  
✅ Desktop Chrome/Edge/Firefox  

## Common Issues

**Camera permission denied**: User must grant camera access in browser settings  
**404 on refresh**: Ensure `vercel.json` is deployed  
**Zoom on input**: Check input font-size is 16px minimum
