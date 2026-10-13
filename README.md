# CareX — Healthcare Marketplace MVP

CareX is a modern, high-polish healthcare and companionship marketplace connecting families with trusted local caregivers for elderly care, hospital accompaniment, and everyday support.

Built with **HTML5, CSS3, and Vanilla JavaScript** — zero backend required, lightweight, fast, and fully responsive across all viewports (360px, 390px, 430px, 768px, 1024px, 1440px+).

---

## 🚀 Live Deployment on Vercel

This project is pre-configured and 100% ready for deployment on **Vercel**.

### Deploy Steps:

1. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPO_NAME>.git
   git branch -M main
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
   - Select your GitHub repository.
   - Framework Preset: **Other** (Static HTML).
   - Root Directory: `./` (leave default).
   - Click **Deploy**.

That's it! Your site will be live on a `*.vercel.app` domain in seconds with clean URLs and custom caching headers.

---

## 🌟 Key Features

- **Linear & Apple-Inspired Visual Polish**: Clean surfaces, subtle 1px borders, smooth spring animations, and calm healthcare aesthetics.
- **Mobile-First Responsive Engine**: Zero horizontal overflow at any screen width, custom slide-in drawer navigation with backdrop blur.
- **Interactive Marketplace**: Real-time multi-attribute filtering (service, location, price, rating, availability).
- **Live GPS Tracking Simulation**: High-fidelity companion dispatch radar map card.
- **Interactive Dashboards**:
  - **Customer Dashboard**: Overview, active care bookings, secure payment flow, and direct messages.
  - **Provider Dashboard**: Request acceptance/decline, job inbox, live availability toggle, and earnings metrics.
- **Notification & Toast System**: Bell indicator with unread count and animated popover, plus toast alerts.
- **Demo Authentication**: LocalStorage-powered role authentication with one-click demo credentials autofill.

---

## 📂 Project Structure

```
carex/
├── index.html               # Main flagship landing page
├── about.html               # About & Project Team page
├── find-care.html           # Caregiver marketplace & directory
├── provider-profile.html    # Public provider profile & booking modal
├── customer-dashboard.html  # Family / customer management portal
├── provider-dashboard.html  # Provider operations & jobs portal
├── login.html               # Demo login portal
├── register.html            # 6-step provider onboarding wizard
├── 404.html                 # Custom branded 404 page
├── vercel.json              # Vercel deployment configuration
├── .gitignore               # Git ignore rules
├── css/
│   ├── style.css            # Unified design system & components
│   └── responsive.css       # Viewport-specific responsive overrides
└── js/
    ├── app.js               # Global state, theme, modals, drawers & filters
    ├── customer.js          # Customer booking & payment logic
    └── provider.js          # Provider job & availability logic
```

---

## 🔐 Demo Credentials

- **Customer Account**:
  - Email: `user@gmail.com`
  - Password: `1234`
- **Provider Account**:
  - Email: `provider@gmail.com`
  - Password: `1234`

---

## 📄 License & Disclaimer

Prototype demonstration project — not intended as an emergency medical service.
© 2026 CareX.
