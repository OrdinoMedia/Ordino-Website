# 🚀 Ordino Website - Quick Start Guide

## From Figma Make to Live Website in 5 Steps

### ⚡ Step 1: Get Your Code

Your code is ready! You have two options:

**Option A: Export from Figma Make**
- Look for "Export" or "Download" button
- Download ZIP file with all code
- Extract to your computer

**Option B: Access via Git/GitHub**
- If code is in a repository, clone it:
  ```bash
  git clone YOUR_REPOSITORY_URL
  cd ordino-website
  ```

---

### 🛠 Step 2: Install Dependencies

Open terminal in your project folder:

```bash
# Install all required packages
npm install
```

This will install ~50 packages including React, Vite, Tailwind, and all UI components.

⏱️ Takes 2-3 minutes

---

### ✅ Step 3: Test Locally

```bash
# Start development server
npm run dev
```

Your site will open at: **http://localhost:5173**

✨ You should see the Ordino homepage!

**Test these pages:**
- Homepage
- Features
- Plan Benefits  
- Support
- About Us
- Legal

---

### 🏗️ Step 4: Build for Production

```bash
# Create optimized production build
npm run build
```

This creates a `dist` folder with your production-ready files.

⏱️ Takes 30-60 seconds

**Verify the build:**
```bash
npm run preview
```

---

### 🌐 Step 5: Deploy to Your Domain

Choose the easiest option for you:

## 🟢 Option 1: Vercel (RECOMMENDED - Easiest!)

**Why Vercel?**
- ✅ 3 commands to deploy
- ✅ Automatic HTTPS
- ✅ Free SSL certificate
- ✅ Global CDN
- ✅ Easy custom domain setup

**Deploy Now:**
```bash
# Install Vercel CLI
npm install -g vercel

# Login (opens browser)
vercel login

# Deploy to production
vercel --prod
```

**Add Your Domain:**
1. Go to vercel.com → your project
2. Settings → Domains
3. Add your domain (e.g., ordino.com)
4. Update DNS at your registrar:
   ```
   A Record:    @ → 76.76.21.21
   CNAME:       www → cname.vercel-dns.com
   ```
5. Wait 5-10 minutes for DNS propagation
6. Done! ✅

**Total Time: ~10 minutes**

---

## 🔵 Option 2: Netlify

**Why Netlify?**
- ✅ Drag-and-drop deployment
- ✅ Free SSL
- ✅ Form handling built-in

**Deploy Now:**

**Method A - Drag & Drop:**
1. Build: `npm run build`
2. Go to netlify.com
3. Drag `dist` folder to deploy area
4. Done!

**Method B - CLI:**
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

**Add Domain:**
1. Site Settings → Domain Management
2. Add custom domain
3. Configure DNS:
   ```
   A Record:    @ → 75.2.60.5
   CNAME:       www → your-site.netlify.app
   ```

**Total Time: ~15 minutes**

---

## 🟡 Option 3: Traditional Hosting (cPanel/FTP)

If you already have web hosting:

```bash
# Build your site
npm run build
```

**Upload:**
1. Open FileZilla/cPanel File Manager
2. Navigate to `public_html` or `www`
3. Upload all files from `dist` folder
4. Create `.htaccess` file:
   ```apache
   RewriteEngine On
   RewriteBase /
   RewriteRule ^index\.html$ - [L]
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule . /index.html [L]
   ```

**Total Time: ~20 minutes**

---

## 🎯 Complete Example: Vercel Deployment

Here's exactly what you'll see:

```bash
$ npm install -g vercel
# Installing...

$ vercel login
> Opening browser for login...
> Success! Logged in

$ vercel --prod
> Deploying ~/ordino-website
> Analyzing...
> Building...
> Uploading...
> ✅ Production: https://ordino-abc123.vercel.app

Now add your domain in the dashboard!
```

Then in Vercel dashboard:
1. Click your project
2. Settings → Domains  
3. Add "ordino.com"
4. Vercel shows you DNS records
5. Add those records at your domain registrar
6. Wait 5-10 minutes
7. Visit ordino.com → You're live! 🎉

---

## 📋 Pre-Deployment Checklist

Before deploying, verify:

- [ ] `npm install` completed successfully
- [ ] `npm run dev` works (test locally)
- [ ] `npm run build` completes without errors
- [ ] `npm run preview` shows correct site
- [ ] You have a domain name (or ready to use subdomain)
- [ ] You've chosen a hosting platform (Vercel recommended)

---

## 🔧 Troubleshooting

### "npm: command not found"
Install Node.js from nodejs.org (v20 or higher)

### Build errors
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Port 5173 already in use
```bash
npm run dev -- --port 3000
```

### CSS not loading
Make sure `globals.css` is in `/styles/` folder

---

## 🎨 Customization Before Deploy

Want to customize first?

**Update Metadata (index.html):**
```html
<title>Your Title Here</title>
<meta name="description" content="Your description" />
```

**Update Colors (styles/globals.css):**
Already configured with Ordino brand colors!

**Update Content:**
All marketing content is in `/components/marketing/`

---

## 📊 What You're Deploying

Your Ordino website includes:

**Marketing Pages:**
- Homepage with hero section
- Features showcase
- Pricing & benefits comparison
- Resources (Guides & Blogs)
- Support & contact
- About Us
- Legal information

**Full Application:**
- Authentication system
- Receipt management
- Transaction tracking
- Analytics & insights
- Budget tools
- AI assistant (Vero)
- Achievement system

**Design:**
- Fully responsive
- Desktop-first with sidebar
- Mobile optimized
- Brand colors & typography
- Smooth animations

---

## 🚀 Deploy Commands Summary

**Vercel (Recommended):**
```bash
npm install -g vercel
vercel login
vercel --prod
```

**Netlify:**
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

**Manual:**
```bash
npm run build
# Upload 'dist' folder to hosting
```

---

## ⏱️ Total Time Estimate

- Download code: 1 minute
- Install dependencies: 3 minutes
- Test locally: 2 minutes
- Deploy to Vercel: 5 minutes
- Configure domain: 10 minutes (+ DNS wait time)

**Total: ~20 minutes + DNS propagation (0-24 hours, usually 5-10 min)**

---

## 🎯 Next Steps After Deployment

1. ✅ Test all pages on live site
2. ✅ Check mobile responsiveness
3. ✅ Test forms and interactions
4. ✅ Run Google PageSpeed Insights
5. ✅ Set up analytics (optional)
6. ✅ Monitor for any errors

---

## 🆘 Need Help?

**Platform Documentation:**
- Vercel: https://vercel.com/docs
- Netlify: https://docs.netlify.com
- Vite: https://vitejs.dev

**For detailed guides:**
- See `DEPLOYMENT.md` for platform-specific instructions
- See `FILE_STRUCTURE.md` for file organization
- See `README.md` for technical overview

---

## 🎉 You're Ready!

Your Ordino website is production-ready and can be deployed right now!

**Recommended path:**
```bash
npm install
npm run dev      # Test it
npm run build    # Build it
vercel --prod    # Deploy it! 🚀
```

Good luck with your launch! 🎊
