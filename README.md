# CareX — Healthcare & Companion Marketplace MVP

CareX is a modern, high-polish healthcare and companionship marketplace connecting families with trusted local caregivers for elderly care, hospital accompaniment, and everyday support.

Built with **HTML5, CSS3, and Vanilla JavaScript** — zero backend required, lightweight, fast, and fully responsive across all viewports (360px, 390px, 430px, 768px, 1024px, 1440px+).

---

## 🚀 Live Deployment on Vercel

This repository is pre-configured and 100% ready for instant deployment on **Vercel**.

### Quick Deployment Steps:

1. **Commit and Push to GitHub**:
   ```bash
   git add .
   git commit -m "feat: complete premium CareX redesign, multi-provider auth, admin approval, and WhatsApp chat"
   git push origin main
   ```

2. **Deploy on Vercel**:
   - Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
   - Select your GitHub repository (`carex`).
   - Framework Preset: **Other** (Static HTML).
   - Root Directory: `./` (leave default).
   - Click **Deploy**.

Your application will be live on `https://<your-project>.vercel.app` with clean URLs, HTTPS, and asset caching headers from `vercel.json`.

---

## 🌟 Key Platform Features

### 1. Default Premium Dark Theme & Clean Typography
- Obsidian & midnight canvas (`#060b14`, `#0b1526`, `#101e34`) with light typography and cyan/electric-sky accents.
- Inter & Manrope typography hierarchy — non-flashy, calm healthcare aesthetic.
- Light/Dark theme toggle persists seamlessly via `localStorage`.

### 2. Multi-Provider Identity & Authentication
- Every provider has their own independent login identity:
  - **Username**: Provider's first name / ID (e.g. `aisha`, `rahul`, `meena`, `farah`, `neeraj`, `kavita`).
  - **Password**: `1234`.
- Logging in opens their specific, individualized dashboard (`provider-dashboard.html?id=[providerId]`) with their own metrics, jobs, rates, and messages.
- **Customer Account**: `priya` / `1234` (opens `customer-dashboard.html`).
- **Admin Portal**: `admin` / `1234` (opens `admin.html`).

### 3. Provider Profile Edit Feature
- Providers can directly edit their profile information from their dashboard (`provider-dashboard.html`):
  - Full Legal Name
  - Specialization / Role
  - Monthly & Daily Rates
  - Operating Neighborhood & Familiar Hospitals
  - Phone Number & WhatsApp
  - Public Bio & Introduction
- Edits persist to `localStorage` and immediately update their public marketplace listing and profile page (`provider-profile.html?id=[id]`).

### 4. Admin Verification & Approval Queue (`admin.html`)
- Dedicated administrative control center to review incoming caregiver registrations.
- **Verification Queue**: Review applicant documents, rates, background details, and contact information.
- **1-Click Actions**:
  - `✓ Approve & Publish`: Moves applicant to the live marketplace, generates username, sets default password (`1234`), and allows immediate login.
  - `✕ Reject`: Removes application or requests additional verification.
- **Live Directory Table**: Overview of all active caregivers with quick profile access.

### 5. WhatsApp-Style Live Chatbot System
- Seamless family-to-caregiver communication modal modeled after WhatsApp:
  - Private encrypted chat headers with provider photo and online status.
  - Speech bubbles with sent/delivered tick marks (`✓✓`) and timestamp.
  - Interactive quick-reply chip prompts.
  - Simulated companion typing indicator with context-aware realistic replies.
  - Persistent chat history stored per provider (`carex-chat-{id}`).

### 6. Customer Dashboard & Live As-You-Type Search
- Instant live search bar filtering companions by name, hospital (e.g. AIIMS), or locality (Shaheen Bagh, Jamia Nagar, Okhla).
- Popular filter chips for 1-click discovery.
- **Post Custom Care Request**: Families can post custom requirements (hospital visit date, budget, wheelchair aid) and track companion matching.
- **Secure Payment Simulation**: Instant confirmation and status updates.

### 7. Executive Leadership & Team
Built by our dedicated team with empathy, deep vision, and modern design:
- **SAMIA NAAZ** — Chief Executive Officer (CEO)
- **RIVA NAAZ** — Chief Technology Officer (CTO)
- **SHAULAT JAHAN** — Chief Operating Officer (COO)
- **SANA** — Chief Marketing Officer (CMO)
- **HEENA PARVEEN** — HR Manager (HR)

---

## 📂 Project Architecture

```
carex/
├── index.html               # Flagship landing page with Hero, Services, Tracking, & Marketplace
├── about.html               # About CareX, mission, problem/solution, and 5-member team
├── find-care.html           # Caregiver directory with live search, filters, & WhatsApp chat
├── provider-profile.html    # Dynamic public provider profile & booking modal (?id=...)
├── customer-dashboard.html  # Family portal: live search, custom requests, bookings, & chat
├── provider-dashboard.html  # Provider portal: edit profile, availability toggle, & inbox
├── admin.html               # Admin verification queue & marketplace management
├── login.html               # Multi-provider, customer, and admin demo sign-in
├── register.html            # 6-step provider onboarding wizard with admin queue dispatch
├── 404.html                 # Branded error 404 page
├── vercel.json              # Vercel deployment configuration with clean URLs & security headers
├── .gitignore               # Git ignore rules
├── css/
│   ├── style.css            # Obsidian design system, WhatsApp modal, cards & layout
│   └── responsive.css       # Zero-overflow rules for 360px, 390px, 430px, 768px, 1024px+
└── js/
    ├── app.js               # Multi-provider auth, WhatsApp chat engine, modals & drawer
    ├── customer.js          # Customer live search, custom request posting, & bookings
    └── provider.js          # Provider identity resolver, profile edit engine, & job inbox
```

---

## 🔐 Credentials Cheat Sheet (Default Password: `1234`)

| Role | Username / Identifier | Password | Destination Portal |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin` | `1234` | `admin.html` |
| **Customer** | `priya` | `1234` | `customer-dashboard.html` |
| **Provider (Aisha)** | `aisha` | `1234` | `provider-dashboard.html?id=aisha` |
| **Provider (Rahul)** | `rahul` | `1234` | `provider-dashboard.html?id=rahul` |
| **Provider (Meena)** | `meena` | `1234` | `provider-dashboard.html?id=meena` |
| **Provider (Farah)** | `farah` | `1234` | `provider-dashboard.html?id=farah` |
| **Provider (Neeraj)** | `neeraj` | `1234` | `provider-dashboard.html?id=neeraj` |
| **Provider (Kavita)** | `kavita` | `1234` | `provider-dashboard.html?id=kavita` |

---

## 📄 License & Disclaimer

Prototype demonstration project — not intended as an emergency medical service.  
© 2026 CareX. All rights reserved.
