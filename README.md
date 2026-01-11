# Ordino Website

Financial clarity for everyday life. Simple, itemized financial insights that help people understand their spending and stay in control of their money.

## 🚨 IMPORTANT: Transferring to Replit

**This is a COMPLETE, production-ready application.** If transferring to Replit:

1. **READ FIRST:** See `/REPLIT_SETUP.md` for detailed instructions
2. **USE CHECKLIST:** Follow `/TRANSFER_CHECKLIST.md` step-by-step  
3. **DISABLE AI:** Turn off Replit AI immediately after import
4. **INCLUDE `.replit`:** This configuration file prevents AI interference

**Recommended Transfer Method:** GitHub → Replit (preserves structure, prevents AI modifications)

---

## 🌟 Features

- **Marketing Website:**
  - Home page with hero section and features
  - Comprehensive Features page
  - Plan Benefits with pricing comparison
  - Resources (Guides & Blogs)
  - Support & Contact
  - About Us page
  - Legal information

- **Full Application:**
  - Complete authentication system
  - Receipt management and uploads
  - Transaction tracking
  - Analytics and insights
  - Budget management
  - AI-powered financial assistant (Vero)
  - Gamification system with badges
  - 28 financial subcategories

- **Design:**
  - Brand colors: #E9F0F1 (background), #686867 (text), #162a2c, #5e6c5b (green), #ffa47d (orange)
  - Bricolage Grotesque font for logo
  - Helvetica World for all other text
  - Fully responsive design
  - Desktop-first with persistent sidebar (1024px+)
  - Mobile-optimized interface

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Local Development

1. Clone or download this repository
2. Run `npm install`
3. Run `npm run dev`
4. Open http://localhost:5173

## 📦 Tech Stack

- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS v4
- **Animations:** Motion (Framer Motion)
- **Icons:** Lucide React
- **UI Components:** Radix UI
- **Charts:** Recharts
- **Backend:** Supabase (optional)

## 🌐 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

**Quick Deploy to Vercel:**
```bash
npm i -g vercel
vercel
```

## 📁 Project Structure

```
ordino-website/
├── components/
│   ├── marketing/          # Marketing pages
│   │   ├── MarketingHome.tsx
│   │   ├── FeaturesPage.tsx
│   │   ├── MarketingBenefits.tsx
│   │   ├── ResourcesPage.tsx
│   │   ├── SupportPage.tsx
│   │   ├── AboutPage.tsx
│   │   └── LegalPage.tsx
│   ├── ui/                 # Reusable UI components
│   ├── AuthPage.tsx
│   ├── HomeHub.tsx
│   ├── DesktopHomeHub.tsx
│   ├── ReceiptsPage.tsx
│   ├── TransactionsPage.tsx
│   ├── AnalyticsComparison.tsx
│   ├── InsightsPage.tsx
│   ├── ProfilePage.tsx
│   └── ... (other app components)
├── styles/
│   └── globals.css         # Global styles and Tailwind config
├── utils/
│   └── supabase/           # Supabase configuration
├── App.tsx                 # Main application component
├── main.tsx               # Application entry point
├── index.html             # HTML template
├── package.json           # Dependencies
├── vite.config.ts         # Vite configuration
└── README.md
```

## 🎨 Brand Guidelines

### Colors
- Background: `#E9F0F1`
- Primary Text: `#686867`
- Dark Text: `#162a2c`
- Green (CTAs): `#5e6c5b`
- Orange (Accents): `#ffa47d`

### Typography
- Logo: Bricolage Grotesque
- All other text: Helvetica World

### Design Principles
- Clean and minimalist
- Professional yet approachable
- Focus on clarity and simplicity
- Consistent spacing and alignment

## 🔧 Configuration

### Environment Variables (Optional)

Create a `.env` file for Supabase integration:

```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## 📱 Responsive Design

- **Desktop (1024px+):** Persistent sidebar navigation
- **Tablet (768px-1023px):** Responsive grid layouts
- **Mobile (<768px):** Bottom tab navigation

## 🔐 Authentication

The app includes a complete authentication flow:
- Login page
- Signup page  
- Password reset
- User profile management
- Secure session handling

## 📊 Features Overview

### Marketing Side
- Responsive navigation
- Animated sections
- Feature showcases
- Pricing comparison tables
- Resource library
- Contact forms

### Application Side
- Receipt scanning and storage
- Transaction categorization
- Budget tracking
- Analytics dashboards
- AI financial assistant
- Achievement system
- Export functionality

## 🤝 Support

For deployment help, see [DEPLOYMENT.md](./DEPLOYMENT.md)

## 📄 License

© 2024 Ordino. All rights reserved.

---

**Ready to deploy?** Check out [DEPLOYMENT.md](./DEPLOYMENT.md) for step-by-step instructions!