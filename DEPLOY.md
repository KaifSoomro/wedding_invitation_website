# 🚀 Quick Deployment Guide

## Prerequisites
- Node.js 18+ installed
- npm 9+ installed
- Vercel account (free tier works)

## Step 1: Install Dependencies

```bash
npm install
```

This will install all required packages including the new testing dependencies.

## Step 2: Configure Environment (Optional)

If you want to enable analytics and error tracking:

```bash
# Copy the example file
cp .env.example .env
```

Then edit `.env` and add your keys:
```env
# Enable analytics
VITE_ENABLE_ANALYTICS=true
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Enable error tracking
VITE_ENABLE_ERROR_TRACKING=true
VITE_SENTRY_DSN=https://xxxxxxxxx@sentry.io/xxxxxxx
```

**Note:** Without these keys, the app will work perfectly fine. Analytics and error tracking are optional features.

## Step 3: Test (Optional but Recommended)

```bash
# Run all tests
npm test

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

## Step 4: Build

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

## Step 5: Preview Locally

```bash
npm run preview
```

Open http://localhost:4173 to test the production build locally.

## Step 6: Deploy to Vercel

### Option A: Vercel CLI (Fastest)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### Option B: GitHub Integration (Recommended for CI/CD)

1. Push your code to GitHub:
```bash
git add .
git commit -m "Production ready deployment"
git push origin main
```

2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Vite configuration
6. Click "Deploy"

### Option C: Manual Upload

1. Build the project: `npm run build`
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project" → "Upload"
4. Upload the `dist/` folder
5. Deploy

## Step 7: Post-Deployment Configuration

### Update URLs in Your Code

After deployment, you'll get a URL like `https://your-project.vercel.app`

Update these files with your actual domain:

1. **index.html** (lines with `wedding-card-designer.vercel.app`):
   - Open Graph URLs
   - Twitter Card URLs
   - Canonical URL

2. **public/sitemap.xml** (all URLs):
   - Replace example domain with your actual domain

3. **public/robots.txt**:
   - Update sitemap URL

### Configure Custom Domain (Optional)

1. Go to your Vercel project settings
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

### Add Environment Variables in Vercel (If Using Analytics/Monitoring)

1. Go to your project settings in Vercel
2. Click "Environment Variables"
3. Add your keys:
   - `VITE_GA_MEASUREMENT_ID`
   - `VITE_SENTRY_DSN`
   - `VITE_ENABLE_ANALYTICS=true`
   - `VITE_ENABLE_ERROR_TRACKING=true`
4. Redeploy for changes to take effect

## Step 8: Verify Deployment

Check these URLs work:
- ✅ https://your-domain.com/ (Home)
- ✅ https://your-domain.com/editor (Editor)
- ✅ https://your-domain.com/templates (Templates)
- ✅ https://your-domain.com/help (Help/FAQ)
- ✅ https://your-domain.com/privacy (Privacy Policy)
- ✅ https://your-domain.com/terms (Terms of Service)
- ✅ https://your-domain.com/robots.txt (SEO)
- ✅ https://your-domain.com/sitemap.xml (SEO)

## Step 9: Add Assets (Recommended)

Create and add these image assets to the `public/` folder:

### Required for PWA/SEO:
- `favicon-16x16.png` (16x16px)
- `favicon-32x32.png` (32x32px)
- `apple-touch-icon.png` (180x180px)
- `android-chrome-192x192.png` (192x192px)
- `android-chrome-512x512.png` (512x512px)
- `og-image.jpg` (1200x630px for social sharing)

You can use tools like:
- [Favicon Generator](https://favicon.io/)
- [Real Favicon Generator](https://realfavicongenerator.net/)

## Step 10: Setup Analytics (Optional)

### For Google Analytics:
1. Create account at [analytics.google.com](https://analytics.google.com/)
2. Create a GA4 property
3. Copy your Measurement ID (G-XXXXXXXXXX)
4. Add to Vercel environment variables
5. Redeploy

### For Plausible Analytics:
1. Create account at [plausible.io](https://plausible.io/)
2. Add your domain
3. Add `VITE_PLAUSIBLE_DOMAIN=your-domain.com` to environment variables
4. Redeploy

## Step 11: Setup Error Tracking (Optional)

### For Sentry:
1. Create account at [sentry.io](https://sentry.io/)
2. Create a React project
3. Copy your DSN
4. Install Sentry package:
```bash
npm install @sentry/react
```
5. Add to Vercel environment variables
6. Redeploy

## Troubleshooting

### Build Fails
- Ensure Node.js version is 18 or higher
- Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
- Check for TypeScript/ESLint errors: `npm run lint`

### Routes Not Working
- Vercel.json is configured correctly with rewrites
- This is already done in your project

### PWA Not Installing
- Ensure you're using HTTPS (Vercel provides this automatically)
- Check site.webmanifest is accessible
- Verify service-worker.js is in the build output

### Analytics Not Tracking
- Verify environment variables are set in Vercel
- Check browser console for errors
- Ensure analytics is enabled: `VITE_ENABLE_ANALYTICS=true`
- May need to disable ad blockers for testing

## 🎉 You're Live!

Your wedding card designer is now:
- ✅ Deployed and accessible
- ✅ Secure with HTTPS
- ✅ SEO optimized
- ✅ PWA enabled
- ✅ Ready for users

## Next Steps

1. Share your URL with test users
2. Monitor analytics and errors
3. Gather feedback
4. Iterate and improve

## Support

For issues or questions:
- Check [PRODUCTION_READY.md](./PRODUCTION_READY.md) for complete details
- Review [PRODUCTION_CHECKLIST.md](./PRODUCTION_CHECKLIST.md) for checklist
- Contact: Your support email

---

**Happy Deploying!** 🚀
