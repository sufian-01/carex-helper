/**
 * CAREX — CORE CLIENT LOGIC & INTERACTION ENGINE
 * Multi-Provider Authentication, Admin Approval Queue,
 * WhatsApp-Style Live Messaging & Profile Management System
 */
(() => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. LOCAL STORAGE STATE STORE
  // --------------------------------------------------------------------------
  const store = {
    get(key, fallback) {
      try {
        const raw = localStorage.getItem(`carex-${key}`);
        return raw === null ? fallback : JSON.parse(raw);
      } catch {
        return fallback;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(`carex-${key}`, JSON.stringify(value));
      } catch (err) {
        console.warn('Storage set error:', err);
      }
    }
  };

  window.carexState = store;

  // --------------------------------------------------------------------------
  // 2. CURATED DEFAULT PROVIDERS WITH HIGH-RES AUTHENTIC IMAGERY
  // --------------------------------------------------------------------------
  const DEFAULT_PROVIDERS = [
    {
      id: 'aisha',
      username: 'aisha',
      name: 'Aisha Khan',
      password: '1234',
      service: 'Elderly Care',
      role: 'Care Provider',
      location: 'Shaheen Bagh',
      rating: 4.9,
      reviewsCount: 38,
      price: 18000,
      unit: 'month',
      dailyPrice: 900,
      experience: '5 years',
      available: true,
      phone: '+91 98110 23456',
      languages: 'Hindi, English, Urdu',
      hospitals: 'Holy Family, Fortis Escorts, Max Saket',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      copy: 'Routine support, compassionate companionship and transparent daily family updates.',
      bio: 'Aisha is a certified geriatric caregiver with 5 years of experience supporting elderly patients recovering from surgeries and managing daily age-related routines. She specializes in empathetic companionship, gentle mobility exercises, and keeping family members updated with daily reports.'
    },
    {
      id: 'rahul',
      username: 'rahul',
      name: 'Rahul Mehta',
      password: '1234',
      service: 'Hospital Companion',
      role: 'Care Companion',
      location: 'Jamia Nagar',
      rating: 4.8,
      reviewsCount: 42,
      price: 800,
      unit: 'day',
      dailyPrice: 800,
      experience: '3 years',
      available: true,
      phone: '+91 98731 88921',
      languages: 'Hindi, English',
      hospitals: 'AIIMS New Delhi, Safdarjung, Max Super Speciality',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      copy: 'Hospital accompaniment, appointment check-ins, queue navigation and transport support.',
      bio: 'Rahul has accompanied over 100 seniors through complex multi-department hospital appointments at AIIMS and Safdarjung. Calm, patient, and detail-oriented, Rahul handles OPD registration queues, lab sample submissions, and doctor note transcriptions so seniors never feel disoriented.'
    },
    {
      id: 'meena',
      username: 'meena',
      name: 'Meena Sharma',
      password: '1234',
      service: 'Elderly Care',
      role: 'Care Provider',
      location: 'Okhla',
      rating: 4.9,
      reviewsCount: 64,
      price: 20000,
      unit: 'month',
      dailyPrice: 1000,
      experience: '7 years',
      available: true,
      phone: '+91 98102 77610',
      languages: 'Hindi, Punjabi, English',
      hospitals: 'Apollo Hospital, Fortis Okhla, Holy Family',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
      copy: 'Daily routines, medication reminders, wholesome meal assistance and gentle mobility help.',
      bio: 'Meena is an experienced community eldercare specialist with 7 years of background in memory care, stroke rehabilitation accompaniment, and nutrition support. Known for her warmth and reliability, she treats every elder with the dignity of family.'
    },
    {
      id: 'farah',
      username: 'farah',
      name: 'Farah Ahmed',
      password: '1234',
      service: 'Appointment Assistance',
      role: 'Care Companion',
      location: 'Saket',
      rating: 4.7,
      reviewsCount: 29,
      price: 950,
      unit: 'visit',
      dailyPrice: 950,
      experience: '4 years',
      available: true,
      phone: '+91 99580 33412',
      languages: 'Hindi, English, Urdu',
      hospitals: 'Max Saket, PSRI Hospital, Batra Hospital',
      image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=600&q=80',
      copy: 'Attentive support for clinic visits, doctor notes transcription and diagnostic tests.',
      bio: 'Farah assists seniors with outpatient consultation visits, diagnostics escort, and prescription validation. Patient and punctual, she ensures that every medical instruction from the physician is clearly documented and sent directly to family members.'
    },
    {
      id: 'neeraj',
      username: 'neeraj',
      name: 'Neeraj Singh',
      password: '1234',
      service: 'Everyday Assistance',
      role: 'Care Provider',
      location: 'Lajpat Nagar',
      rating: 4.6,
      reviewsCount: 22,
      price: 16000,
      unit: 'month',
      dailyPrice: 850,
      experience: '6 years',
      available: true,
      phone: '+91 97110 55490',
      languages: 'Hindi, English',
      hospitals: 'Moolchand, AIIMS, Vimhans',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
      copy: 'Reliable grocery errands, walking companionship and gentle household assistance.',
      bio: 'Neeraj provides reliable daily errand assistance, safe neighborhood walking escort, and basic mobility assistance for elderly gentlemen and couples. He is CPR-trained and has 6 years of experience in elder physical assistance.'
    },
    {
      id: 'kavita',
      username: 'kavita',
      name: 'Kavita Verma',
      password: '1234',
      service: 'Hospital Companion',
      role: 'Care Companion',
      location: 'Greater Kailash',
      rating: 4.9,
      reviewsCount: 51,
      price: 1100,
      unit: 'day',
      dailyPrice: 1100,
      experience: '5 years',
      available: true,
      phone: '+91 98115 67890',
      languages: 'Hindi, English',
      hospitals: 'Max Saket, Apollo Spectra, Moolchand',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
      copy: 'Empathetic guidance during hospital admissions, post-surgery discharges and check-ups.',
      bio: 'Kavita is a former nursing assistant who transitioned into personalized elder hospital accompaniment. She is calm in high-pressure clinical settings and provides gentle support during admissions, discharge procedures, and ongoing physical therapy visits.'
    }
  ];

  // Demo pending applicants awaiting Admin review
  const DEFAULT_PENDING_PROVIDERS = [
    {
      id: 'applicant-101',
      name: 'Zubair Khan',
      service: 'Hospital Companion & Mobility',
      role: 'Care Companion',
      location: 'Jamia Nagar',
      phone: '+91 98710 44321',
      experience: '4 years',
      dailyPrice: 1200,
      price: 1200,
      unit: 'day',
      languages: 'Hindi, Urdu, English',
      hospitals: 'Safdarjung, AIIMS, Holy Family',
      appliedAt: 'Today, 11:20 AM',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
      bio: 'Physiotherapy diploma graduate specializing in post-surgery walking guidance, wheelchair transfers, and OPD appointment accompaniment.'
    },
    {
      id: 'applicant-102',
      name: 'Nargis Bano',
      service: 'Elderly Care',
      role: 'Care Provider',
      location: 'Okhla Vihar',
      phone: '+91 98120 55432',
      experience: '6 years',
      price: 17000,
      dailyPrice: 850,
      unit: 'month',
      languages: 'Hindi, Urdu',
      hospitals: 'Fortis Escorts, Holy Family',
      appliedAt: 'Yesterday, 4:45 PM',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      bio: 'Dedicated home caregiver experienced in daily medication management, blood pressure monitoring, and gentle walking companionship for senior citizens.'
    }
  ];

  // Initialize or fetch live providers
  const getProviders = () => {
    return store.get('providers-data', DEFAULT_PROVIDERS);
  };

  const saveProviders = (providers) => {
    store.set('providers-data', providers);
    window.carexProviders = providers;
  };

  // Initialize or fetch pending applicants
  const getPendingProviders = () => {
    return store.get('pending-providers', DEFAULT_PENDING_PROVIDERS);
  };

  const savePendingProviders = (pending) => {
    store.set('pending-providers', pending);
  };

  // Sync to window for global access
  window.carexProviders = getProviders();
  window.getCarexProviders = getProviders;
  window.saveCarexProviders = saveProviders;
  window.getPendingProviders = getPendingProviders;
  window.savePendingProviders = savePendingProviders;

  // --------------------------------------------------------------------------
  // 3. INITIAL STATE DEFAULTS (DARK THEME IS THE DEFAULT)
  // --------------------------------------------------------------------------
  const requiredDemoState = {
    theme: 'dark', // Sleek dark mode by default
    auth: { loggedIn: false, role: 'customer', email: '', name: '', providerId: '' },
    notifications: [
      { id: 1, title: 'New care inquiry', message: 'Priya Sharma sent a hospital companion request for AIIMS.', time: 'Just now', unread: true },
      { id: 2, title: 'Security verified', message: 'Identity credentials verified successfully.', time: '2h ago', unread: true }
    ],
    booking: null,
    customRequests: [
      {
        id: 101,
        title: 'Hospital Escort for Mother',
        hospital: 'AIIMS New Delhi',
        date: 'Next Tuesday (10:30 AM)',
        notes: 'Needs wheelchair assistance and OPD registration queue help.',
        status: 'OPEN'
      }
    ]
  };

  Object.entries(requiredDemoState).forEach(([key, val]) => {
    if (store.get(key, null) === null) {
      store.set(key, val);
    }
  });

  // --------------------------------------------------------------------------
  // 4. TOAST NOTIFICATION SYSTEM (LINEAR/APPLE STYLE)
  // --------------------------------------------------------------------------
  const ensureToastContainer = () => {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      container.setAttribute('aria-live', 'polite');
      container.setAttribute('aria-atomic', 'true');
      document.body.appendChild(container);
    }
    return container;
  };

  const showToast = (message, iconSvg = null) => {
    const container = ensureToastContainer();
    const toast = document.createElement('div');
    toast.className = 'toast';
    
    const icon = iconSvg || `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color:#0ea5e9; flex-shrink:0;">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>
    `;

    toast.innerHTML = `${icon}<span>${message}</span>`;
    container.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('show'));

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 260);
    }, 3200);
  };
  window.showToast = showToast;

  // --------------------------------------------------------------------------
  // 5. THEME ENGINE — DEFAULT DARK THEME WITH LIGHT FONT
  // --------------------------------------------------------------------------
  // 5. THEME ENGINE — PERMANENT OBSIDIAN DARK THEME
  // --------------------------------------------------------------------------
  const applyTheme = (theme) => {
    // Permanent Dark Theme: user specified "dark light mode khtm krdo , sirf dark mode rehne do"
    document.body.classList.add('dark');
    document.body.classList.remove('light');
    document.documentElement.style.colorScheme = 'dark';
    store.set('theme', 'dark');

    // Hide theme toggles if any remain in DOM
    document.querySelectorAll('[data-theme-toggle], .theme-toggle').forEach(btn => {
      btn.style.display = 'none';
    });
  };

  const initTheme = () => {
    applyTheme('dark');
  };

  // --------------------------------------------------------------------------
  // 6. MOBILE DRAWER NAVIGATION
  // --------------------------------------------------------------------------
  const ensureMobileDrawer = () => {
    if (!document.getElementById('mobile-drawer')) {
      const drawerHtml = `
        <div class="mobile-drawer-overlay" id="mobile-drawer" aria-hidden="true">
          <div class="drawer-backdrop" data-drawer-close></div>
          <div class="drawer-panel">
            <div class="drawer-header">
              <a href="index.html" class="brand" aria-label="CareX Home">
                <img src="assets/carex-logo-dark.png" alt="CareX" class="brand-logo-img" />
              </a>
              <button class="drawer-close" type="button" aria-label="Close menu" data-drawer-close>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <nav class="drawer-links">
              <a href="index.html">Home</a>
              <a href="find-care.html">Find Care</a>
              <a href="about.html">About</a>
              <a href="customer-dashboard.html">Customer Dashboard</a>
              <a href="provider-dashboard.html">Provider Portal</a>
              <a href="admin.html">Admin Approval</a>
              <a href="login.html">Sign In</a>
            </nav>
            <div class="drawer-footer">
              <button class="btn btn-primary w-full" type="button" data-request-care>Request Care</button>
              <a href="register.html" class="btn btn-secondary w-full">Join as Care Provider</a>
            </div>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', drawerHtml);
    }
  };

  const initDrawer = () => {
    ensureMobileDrawer();
    const drawer = document.getElementById('mobile-drawer');

    const openDrawer = () => {
      drawer?.classList.add('open');
      drawer?.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };

    const closeDrawer = () => {
      drawer?.classList.remove('open');
      drawer?.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    document.querySelectorAll('[data-drawer-open], [data-mobile-toggle]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openDrawer();
      });
    });

    document.querySelectorAll('[data-drawer-close]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        closeDrawer();
      });
    });

    drawer?.querySelectorAll('.drawer-links a').forEach(link => {
      link.addEventListener('click', () => closeDrawer());
    });
  };

  // --------------------------------------------------------------------------
  // 7. MODALS MANAGER
  // --------------------------------------------------------------------------
  const openModal = (id) => {
    const modal = document.getElementById(id);
    if (modal) {
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = (id) => {
    const modal = document.getElementById(id);
    if (modal) {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  window.openModal = openModal;
  window.closeModal = closeModal;

  const ensureModals = () => {
    // Role selection modal
    if (!document.getElementById('user-type-modal')) {
      const modalMarkup = `
        <div class="modal" id="user-type-modal" aria-hidden="true">
          <div class="modal-panel">
            <div class="modal-header">
              <h2>Select Portal</h2>
              <button class="modal-close" type="button" data-close-modal="user-type-modal" aria-label="Close dialog">×</button>
            </div>
            <div class="selection-grid">
              <article class="selection-card">
                <h3>Family & Customer</h3>
                <p>Book trusted care companions and review scheduled appointments.</p>
                <a href="customer-dashboard.html" class="btn btn-primary">Customer Portal</a>
              </article>
              <article class="selection-card">
                <h3>Care Provider</h3>
                <p>Manage appointments, earnings, and live availability.</p>
                <a href="login.html" class="btn btn-secondary">Provider Login</a>
              </article>
            </div>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', modalMarkup);
    }

    // Care Request Match modal
    if (!document.getElementById('care-request-modal')) {
      const bookingMarkup = `
        <div class="modal" id="care-request-modal" aria-hidden="true">
          <div class="modal-panel">
            <div class="modal-header">
              <div>
                <span class="eyebrow">Direct Companion Match</span>
                <h2>Request Care Support</h2>
              </div>
              <button class="modal-close" type="button" data-close-modal="care-request-modal" aria-label="Close dialog">×</button>
            </div>
            <form id="care-request-form">
              <div class="grid-2">
                <div class="field">
                  <label for="care-beneficiary">Who needs assistance?</label>
                  <select id="care-beneficiary">
                    <option>Parent (Mother/Father)</option>
                    <option>Grandparent</option>
                    <option>Self</option>
                    <option>Other Family Member</option>
                  </select>
                </div>
                <div class="field">
                  <label for="care-service">Service Required</label>
                  <select id="care-service">
                    <option value="Hospital Companion">Hospital Companion</option>
                    <option value="Elderly Care">Elderly Home Care</option>
                    <option value="Appointment Assistance">Appointment Assistance</option>
                    <option value="Everyday Assistance">Everyday Assistance</option>
                  </select>
                </div>
                <div class="field">
                  <label for="care-location">Location</label>
                  <select id="care-location">
                    <option value="Shaheen Bagh">Shaheen Bagh</option>
                    <option value="Jamia Nagar">Jamia Nagar</option>
                    <option value="Okhla">Okhla</option>
                    <option value="Saket">Saket</option>
                    <option value="Lajpat Nagar">Lajpat Nagar</option>
                    <option value="Greater Kailash">Greater Kailash</option>
                  </select>
                </div>
                <div class="field">
                  <label for="care-date">Date Required</label>
                  <input id="care-date" type="date" required value="${new Date().toISOString().split('T')[0]}">
                </div>
              </div>
              <div class="field" style="margin-top:1rem;">
                <label for="care-notes">Special Requirements / Hospital Details</label>
                <textarea id="care-notes" placeholder="e.g. Appointment at AIIMS Cardiology OPD at 10:30 AM. Wheelchair needed." rows="2"></textarea>
              </div>
              <div style="margin-top:1.5rem; display:flex; justify-content:flex-end; gap:0.75rem;">
                <button class="btn btn-ghost" type="button" data-close-modal="care-request-modal">Cancel</button>
                <button class="btn btn-primary" type="submit">Submit Request</button>
              </div>
            </form>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', bookingMarkup);
    }

    // Safety info modal
    if (!document.getElementById('safety-modal')) {
      const safetyMarkup = `
        <div class="modal" id="safety-modal" aria-hidden="true">
          <div class="modal-panel">
            <div class="modal-header">
              <h2>CareX Verification Standards</h2>
              <button class="modal-close" type="button" data-close-modal="safety-modal" aria-label="Close dialog">×</button>
            </div>
            <p style="color:var(--text-secondary); margin-bottom:1rem; font-size:0.95rem; line-height:1.6;">
              Every CareX companion passes government ID checks, address authentication, reference calls, and an orientation on elder sensitivity and hospital logistics.
            </p>
            <p style="color:var(--text-secondary); margin-bottom:1.5rem; font-size:0.95rem; line-height:1.6;">
              <strong>Emergency Disclaimer:</strong> CareX provides trusted logistical companionship and daily routine aid. We do not provide acute clinical procedures or ambulance emergency services.
            </p>
            <button class="btn btn-primary w-full" type="button" data-close-modal="safety-modal">Understood</button>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', safetyMarkup);
    }
  };

  // --------------------------------------------------------------------------
  // 8. MULTI-PROVIDER AUTHENTICATION & LOGIN ENGINE
  // --------------------------------------------------------------------------
  const initAuth = () => {
    // Quick role routing helpers
    document.querySelectorAll('[data-route-login]').forEach(btn => {
      btn.addEventListener('click', () => window.location.href = 'login.html');
    });

    document.querySelectorAll('[data-request-care]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal('care-request-modal');
      });
    });

    // Request care form submission
    const requestForm = document.getElementById('care-request-form');
    requestForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const service = document.getElementById('care-service')?.value || 'Hospital Companion';
      const location = document.getElementById('care-location')?.value || 'Shaheen Bagh';
      const date = document.getElementById('care-date')?.value || new Date().toISOString().split('T')[0];
      const notes = document.getElementById('care-notes')?.value || '';
      
      const providers = getProviders();
      const matched = providers.find(p => p.service.toLowerCase().includes(service.toLowerCase())) || providers[0];

      const newBooking = {
        id: Date.now(),
        provider: matched.name,
        providerId: matched.id,
        service,
        location,
        date,
        notes,
        status: 'REQUESTED',
        price: matched.price,
        unit: matched.unit
      };

      store.set('booking', newBooking);
      closeModal('care-request-modal');
      showToast(`Request sent to ${matched.name}. Opening dashboard...`);

      const auth = store.get('auth', { loggedIn: false });
      if (!auth.loggedIn) {
        store.set('auth', { loggedIn: true, role: 'customer', email: 'user@gmail.com', name: 'Priya Sharma' });
      }

      setTimeout(() => {
        window.location.href = 'customer-dashboard.html';
      }, 700);
    });

    // Safety info trigger
    document.querySelectorAll('[data-safety-info]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal('safety-modal');
      });
    });

    // Login Form Handler (Multi-provider authentication)
    const loginForm = document.getElementById('demo-login-form');
    loginForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const identifier = document.getElementById('login-email')?.value?.trim().toLowerCase();
      const pass = document.getElementById('login-password')?.value?.trim();

      if (!identifier || !pass) {
        showToast('Please enter username and password.');
        return;
      }

      // Check Admin Login
      if (identifier === 'admin' && pass === '1234') {
        store.set('auth', { loggedIn: true, role: 'admin', email: 'admin@carex.com', name: 'CareX Administrator' });
        showToast('Welcome, Administrator!');
        setTimeout(() => window.location.href = 'admin.html', 400);
        return;
      }

      // Check Customer Logins
      if ((identifier === 'user@gmail.com' || identifier === 'priya' || identifier === 'customer') && pass === '1234') {
        store.set('auth', { loggedIn: true, role: 'customer', email: 'user@gmail.com', name: 'Priya Sharma' });
        showToast('Welcome back, Priya!');
        setTimeout(() => window.location.href = 'customer-dashboard.html', 400);
        return;
      }

      // Check All Providers in the Directory
      const providers = getProviders();
      const matchedProvider = providers.find(p => {
        const pId = p.id.toLowerCase();
        const pName = p.name.toLowerCase();
        const pUser = (p.username || p.id).toLowerCase();
        return (identifier === pId || identifier === pName || identifier === pUser || identifier === `${pUser}@carex.com`);
      });

      if (matchedProvider) {
        if (pass === '1234' || pass === matchedProvider.password) {
          store.set('auth', {
            loggedIn: true,
            role: 'provider',
            providerId: matchedProvider.id,
            email: `${matchedProvider.id}@carex.com`,
            name: matchedProvider.name
          });
          showToast(`Welcome back, ${matchedProvider.name}!`);
          setTimeout(() => {
            window.location.href = `provider-dashboard.html?id=${encodeURIComponent(matchedProvider.id)}`;
          }, 400);
          return;
        } else {
          showToast('Incorrect password. Default password is 1234');
          return;
        }
      }

      showToast('Account not found. Use provider name (e.g. "aisha", "rahul") or "priya" with pass 1234');
    });

    // 1-Click Quick Fill on login.html
    document.querySelectorAll('[data-quick-login]').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.quickLogin;
        const emailInput = document.getElementById('login-email');
        const passInput = document.getElementById('login-password');

        if (target === 'customer') {
          if (emailInput) emailInput.value = 'priya';
          if (passInput) passInput.value = '1234';
          showToast('Prefilled Customer (Priya)');
        } else if (target === 'admin') {
          if (emailInput) emailInput.value = 'admin';
          if (passInput) passInput.value = '1234';
          showToast('Prefilled Administrator (admin)');
        } else {
          // Provider quick login
          if (emailInput) emailInput.value = target;
          if (passInput) passInput.value = '1234';
          showToast(`Prefilled Provider (${target.toUpperCase()})`);
        }
      });
    });
  };

  // --------------------------------------------------------------------------
  // 9. WHATSAPP-STYLE LIVE CHAT ENGINE
  // --------------------------------------------------------------------------
  const DEFAULT_GREETINGS = {
    aisha: 'Hello! This is Aisha Khan from CareX. How can I help with your family member today?',
    rahul: 'Hi! Rahul Mehta here. Need hospital accompaniment for an upcoming appointment?',
    meena: 'Namaste! Meena Sharma here. Are you looking for regular elderly support at home?',
    farah: 'Hello! Farah here. Feel free to ask about appointment accompaniment and doctor notes.',
    neeraj: 'Hi there, Neeraj Singh here. Let me know which neighborhood you need assistance in.',
    kavita: 'Hello! Kavita Verma here. I can accompany your loved one to clinic checkups.'
  };

  const getChatHistory = (providerId) => {
    const defaultMessages = [
      {
        id: 1,
        sender: 'provider',
        text: DEFAULT_GREETINGS[providerId] || 'Hello! I am a verified CareX companion. How can I support your family today?',
        time: '10:30 AM'
      }
    ];
    return store.get(`chat-${providerId}`, defaultMessages);
  };

  const saveChatHistory = (providerId, messages) => {
    store.set(`chat-${providerId}`, messages);
  };

  const formatChatTime = () => {
    const d = new Date();
    let hours = d.getHours();
    let minutes = d.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutes} ${ampm}`;
  };

  // Automated intelligent responses tailored to elderly care context
  const generateSimulatedReply = (text, providerName) => {
    const lower = text.toLowerCase();
    if (lower.includes('hospital') || lower.includes('aiims') || lower.includes('opd') || lower.includes('doctor')) {
      return `Yes, I regularly accompany elders to hospital appointments! I can assist with OPD queues, registration, and taking doctor notes. What time is your appointment?`;
    }
    if (lower.includes('price') || lower.includes('rate') || lower.includes('cost') || lower.includes('charge')) {
      return `My verified transparent rate is listed on my profile. For hospital companion day visits, it is ₹800–₹1,100/day. All bookings are coordinated safely through CareX.`;
    }
    if (lower.includes('available') || lower.includes('tomorrow') || lower.includes('today') || lower.includes('when')) {
      return `Yes, I am currently available for bookings! You can click "Book with me" on my profile or send a request, and I will confirm immediately.`;
    }
    if (lower.includes('medicine') || lower.includes('wheelchair') || lower.includes('walk')) {
      return `I am well-experienced in assisting with mobility, wheelchair transfers, and medication schedule reminders. Your family member will be in very safe hands.`;
    }
    return `Thank you for your message! I would be glad to help your family. Could you share the appointment date and neighborhood location?`;
  };

  // Open the WhatsApp Chat Modal for a specific provider
  window.openProviderChat = (providerId) => {
    const providers = getProviders();
    const provider = providers.find(p => p.id === providerId) || providers[0];
    
    let chatModal = document.getElementById('whatsapp-chat-modal');
    if (!chatModal) {
      const markup = `
        <div class="chat-modal-overlay" id="whatsapp-chat-modal" aria-hidden="true">
          <div class="whatsapp-card" role="dialog" aria-label="Live Chat with Companion">
            <!-- Header -->
            <div class="whatsapp-header">
              <div class="whatsapp-header-left">
                <button class="whatsapp-back-btn" type="button" aria-label="Close Chat" onclick="window.closeProviderChat()">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                  </svg>
                </button>
                <div class="whatsapp-avatar-wrap">
                  <img id="chat-provider-img" src="" alt="Companion Avatar" />
                  <span class="whatsapp-online-dot"></span>
                </div>
                <div class="whatsapp-user-info">
                  <strong id="chat-provider-name">Companion</strong>
                  <span class="whatsapp-status-text">Online · Verified CareX Companion</span>
                </div>
              </div>
              <div class="whatsapp-header-actions">
                <button class="whatsapp-action-icon" type="button" title="Voice Call" onclick="window.showToast('Voice call simulated — companion alerted.')">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </button>
                <button class="whatsapp-action-icon" type="button" title="Close" onclick="window.closeProviderChat()">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Chat Canvas -->
            <div class="whatsapp-body" id="chat-messages-container">
              <div class="whatsapp-encryption-pill">
                🔒 Messages are private & coordinated securely through CareX.
              </div>
              <!-- Bubbles dynamically rendered here -->
            </div>

            <!-- Quick Suggestion Chips -->
            <div class="whatsapp-chips-scroll">
              <button class="whatsapp-chip" type="button" onclick="window.sendPredefinedMessage('Are you available tomorrow for a hospital visit?')">Available tomorrow?</button>
              <button class="whatsapp-chip" type="button" onclick="window.sendPredefinedMessage('Can you accompany my parent to AIIMS?')">Can you go to AIIMS?</button>
              <button class="whatsapp-chip" type="button" onclick="window.sendPredefinedMessage('What are your hourly and daily companion rates?')">Rates inquiry</button>
            </div>

            <!-- Input Bar -->
            <form class="whatsapp-footer" id="chat-send-form" onsubmit="window.handleChatSubmit(event)">
              <input id="chat-text-input" type="text" placeholder="Type a message..." autocomplete="off" required />
              <button class="whatsapp-send-btn" type="submit" aria-label="Send message">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </form>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', markup);
      chatModal = document.getElementById('whatsapp-chat-modal');
    }

    // Set Provider details in chat header
    chatModal.dataset.activeProviderId = provider.id;
    const imgEl = document.getElementById('chat-provider-img');
    const nameEl = document.getElementById('chat-provider-name');
    if (imgEl) imgEl.src = provider.image;
    if (nameEl) nameEl.textContent = provider.name;

    // Render conversation
    window.renderChatMessages(provider.id);

    chatModal.classList.add('open');
    chatModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus input
    setTimeout(() => {
      document.getElementById('chat-text-input')?.focus();
    }, 200);
  };

  window.closeProviderChat = () => {
    const chatModal = document.getElementById('whatsapp-chat-modal');
    if (chatModal) {
      chatModal.classList.remove('open');
      chatModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  window.renderChatMessages = (providerId) => {
    const container = document.getElementById('chat-messages-container');
    if (!container) return;

    const messages = getChatHistory(providerId);
    let html = `<div class="whatsapp-encryption-pill">🔒 Messages are private & coordinated securely through CareX.</div>`;

    messages.forEach(msg => {
      const isUser = msg.sender === 'user';
      html += `
        <div class="whatsapp-bubble ${isUser ? 'user-bubble' : 'provider-bubble'}">
          <p>${msg.text}</p>
          <div class="bubble-meta">
            <span>${msg.time}</span>
            ${isUser ? '<span class="whatsapp-ticks">✓✓</span>' : ''}
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
    container.scrollTop = container.scrollHeight;
  };

  window.handleChatSubmit = (e) => {
    e.preventDefault();
    const input = document.getElementById('chat-text-input');
    const text = input?.value?.trim();
    if (!text) return;

    const chatModal = document.getElementById('whatsapp-chat-modal');
    const providerId = chatModal?.dataset.activeProviderId || 'aisha';
    const providers = getProviders();
    const provider = providers.find(p => p.id === providerId) || providers[0];

    const messages = getChatHistory(providerId);
    const newMsg = {
      id: Date.now(),
      sender: 'user',
      text,
      time: formatChatTime()
    };
    messages.push(newMsg);
    saveChatHistory(providerId, messages);
    window.renderChatMessages(providerId);
    input.value = '';

    // Show companion typing indicator
    const container = document.getElementById('chat-messages-container');
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'whatsapp-bubble provider-bubble typing-bubble';
    typingIndicator.innerHTML = `
      <div class="typing-dots">
        <span></span><span></span><span></span>
      </div>
    `;
    container.appendChild(typingIndicator);
    container.scrollTop = container.scrollHeight;

    // Simulated companion response after 1.2s
    setTimeout(() => {
      typingIndicator.remove();
      const replyText = generateSimulatedReply(text, provider.name);
      messages.push({
        id: Date.now(),
        sender: 'provider',
        text: replyText,
        time: formatChatTime()
      });
      saveChatHistory(providerId, messages);
      window.renderChatMessages(providerId);

      // Play subtle tick audio simulation
      showToast(`New message from ${provider.name}`);
    }, 1200);
  };

  window.sendPredefinedMessage = (text) => {
    const input = document.getElementById('chat-text-input');
    if (input) {
      input.value = text;
      document.getElementById('chat-send-form')?.dispatchEvent(new Event('submit'));
    }
  };

  // --------------------------------------------------------------------------
  // 10. NOTIFICATION POPOVER & TOASTS
  // --------------------------------------------------------------------------
  const initNotifications = () => {
    document.querySelectorAll('[data-notification-toggle]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const popover = document.querySelector('.notification-popover');
        popover?.classList.toggle('open');
      });
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.notification-bell-wrap')) {
        document.querySelectorAll('.notification-popover.open').forEach(p => p.classList.remove('open'));
      }
    });
  };

  // --------------------------------------------------------------------------
  // 11. REGISTRATION WIZARD WITH ADMIN APPROVAL FLOW
  // --------------------------------------------------------------------------
  const initRegistrationStepper = () => {
    const formSteps = document.querySelectorAll('.form-step');
    const stepIndicators = document.querySelectorAll('.stepper-btn, .stepper .step');
    if (!formSteps.length) return;

    let currentStep = 0;

    const updateStep6Summary = () => {
      const name = document.getElementById('provider-name')?.value?.trim() || 'Aisha Khan';
      const city = document.getElementById('provider-city')?.value?.trim() || 'New Delhi';
      const area = document.getElementById('provider-area')?.value?.trim() || 'Shaheen Bagh';
      const experience = document.getElementById('provider-experience')?.value?.trim() || '5 years';
      const monthlyRate = document.getElementById('provider-monthly')?.value?.trim() || '18,000';
      const dailyRate = document.getElementById('provider-daily')?.value?.trim() || '800';
      const days = document.getElementById('provider-days')?.value?.trim() || 'Monday – Friday';
      const hours = document.getElementById('provider-hours')?.value?.trim() || '9:00 AM – 6:00 PM';
      
      const initials = name.split(/\s+/).filter(Boolean).map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'CP';
      
      const summaryAvatar = document.getElementById('summary-avatar');
      const summaryName = document.getElementById('summary-name');
      const summaryRoleArea = document.getElementById('summary-role-area');
      const summaryDetails = document.getElementById('summary-details');

      if (summaryAvatar) summaryAvatar.textContent = initials;
      if (summaryName) summaryName.textContent = name;
      if (summaryRoleArea) summaryRoleArea.textContent = `Care Companion · ${area}, ${city}`;
      if (summaryDetails) {
        summaryDetails.innerHTML = `
          Rate: <strong>₹${monthlyRate.replace(/[^\d]/g, '') || '18,000'}/month</strong> · Hospital Companion: <strong>₹${dailyRate.replace(/[^\d]/g, '') || '800'}/day</strong><br />
          Experience: <strong>${experience}</strong> · Schedule: <strong>${days} (${hours})</strong><br />
          <span style="display:inline-block; margin-top:6px; color:var(--primary); font-size:0.82rem; font-weight:600;">● Ready for CareX Admin Verification</span>
        `;
      }
    };

    const showStep = (idx) => {
      if (idx < 0 || idx >= formSteps.length) return;
      formSteps.forEach((step, i) => {
        step.classList.toggle('active', i === idx);
        step.style.display = i === idx ? 'block' : 'none';
      });
      stepIndicators.forEach((ind, i) => {
        ind.classList.toggle('active', i === idx);
        ind.classList.toggle('completed', i < idx);
      });
      currentStep = idx;

      if (idx === formSteps.length - 1) {
        updateStep6Summary();
      }

      window.scrollTo({ top: 120, behavior: 'smooth' });
    };

    // Direct click on stepper buttons
    stepIndicators.forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        showStep(idx);
      });
    });

    // Next / Back buttons
    document.querySelectorAll('[data-step-next]').forEach(btn => {
      btn.addEventListener('click', () => {
        const delta = parseInt(btn.dataset.stepNext, 10);
        if (delta > 0) {
          // Validate required fields in the current step before advancing
          const currentFormStep = formSteps[currentStep];
          if (currentFormStep) {
            const requiredFields = currentFormStep.querySelectorAll('input[required], select[required], textarea[required]');
            for (const input of requiredFields) {
              if (!input.value.trim()) {
                input.focus();
                showToast(`Please fill in required field: ${input.labels?.[0]?.textContent || input.id}`);
                return;
              }
            }
          }
        }
        const next = currentStep + delta;
        if (next >= 0 && next < formSteps.length) {
          showStep(next);
        }
      });
    });

    document.querySelectorAll('[data-submit-demo]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const name = document.getElementById('provider-name')?.value?.trim() || 'New Provider';
        const phone = document.getElementById('provider-phone')?.value?.trim() || '+91 98000 11111';
        const city = document.getElementById('provider-city')?.value?.trim() || 'New Delhi';
        const area = document.getElementById('provider-area')?.value?.trim() || 'Shaheen Bagh';
        const experience = document.getElementById('provider-experience')?.value?.trim() || '3 years';
        const monthlyRate = parseInt(document.getElementById('provider-monthly')?.value?.replace(/[^\d]/g, '') || '18000', 10);
        const dailyRate = parseInt(document.getElementById('provider-daily')?.value?.replace(/[^\d]/g, '') || '850', 10);
        const bio = document.getElementById('provider-bio')?.value?.trim() || 'Compassionate and certified care companion.';
        const languages = document.getElementById('provider-languages')?.value?.trim() || 'Hindi, English';
        
        const username = name.toLowerCase().replace(/[^a-z0-9]/g, '') || `provider${Date.now().toString().slice(-4)}`;

        const applicant = {
          id: username,
          username: username,
          password: '1234',
          name,
          phone,
          location: `${area}, ${city}`,
          experience,
          price: monthlyRate,
          dailyPrice: dailyRate,
          unit: 'month',
          service: 'Elderly Care & Hospital Companion',
          role: 'Care Companion',
          appliedAt: 'Just now',
          languages,
          bio,
          rating: 5.0,
          reviewsCount: 1,
          available: true,
          hospitals: 'AIIMS, Safdarjung, Holy Family',
          image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80'
        };

        const pending = getPendingProviders();
        pending.unshift(applicant);
        savePendingProviders(pending);

        const form = document.querySelector('.step-form');
        if (form) {
          form.classList.add('hidden');
          form.style.display = 'none';
        }
        const stepperEl = document.querySelector('.stepper');
        if (stepperEl) stepperEl.style.display = 'none';

        const successState = document.querySelector('.success-state');
        if (successState) {
          successState.classList.remove('hidden');
          successState.style.display = 'block';
        }
        
        window.scrollTo({ top: 100, behavior: 'smooth' });
        showToast('Application submitted to CareX Admin for verification!');
      });
    });
  };

  // --------------------------------------------------------------------------
  // 12. LIVE SEARCH & FILTERING (FOR FIND-CARE.HTML)
  // --------------------------------------------------------------------------
  const initFindCareFilters = () => {
    const liveSearchInput = document.getElementById('live-search-input');
    const filterControls = ['service', 'location', 'price', 'rating', 'availability']
      .map(id => document.getElementById(id))
      .filter(Boolean);

    const filterProviders = () => {
      const cards = [...document.querySelectorAll('.provider-card')];
      const query = (liveSearchInput?.value || '').trim().toLowerCase();
      const service = (document.getElementById('service')?.value || '').trim().toLowerCase();
      const location = (document.getElementById('location')?.value || '').trim().toLowerCase();
      const rating = Number(document.getElementById('rating')?.value || 0);
      const availability = document.getElementById('availability')?.value || 'Any';
      const priceBand = document.getElementById('price')?.value || 'Any';

      let count = 0;

      cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        const priceMatch = card.textContent.match(/₹[\d,]+/g);
        const cardPrice = priceMatch ? Number(priceMatch[0].replace(/[^\d]/g, '')) : 0;
        const ratingMatch = card.textContent.match(/(4\.[0-9]+)/g);
        const cardRating = ratingMatch ? Number(ratingMatch[0]) : 0;
        const isAvailable = text.includes('available') && !text.includes('not available');

        let matchesSearch = !query || text.includes(query);
        let matchesPrice = true;
        if (priceBand === '₹10k - ₹15k') matchesPrice = cardPrice >= 10000 && cardPrice <= 15000;
        else if (priceBand === '₹15k - ₹20k') matchesPrice = cardPrice >= 15000 && cardPrice <= 20000;
        else if (priceBand === '₹20k+') matchesPrice = cardPrice >= 20000;

        const matchesService = !service || text.includes(service);
        const matchesLocation = !location || text.includes(location);
        const matchesRating = !rating || cardRating >= rating;
        const matchesAvailability = availability === 'Any'
          || (availability === 'Available' && isAvailable)
          || (availability === 'Limited' && !isAvailable)
          || (availability === 'Booked' && !isAvailable);

        const shouldShow = matchesSearch && matchesService && matchesLocation && matchesRating && matchesPrice && matchesAvailability;
        card.style.display = shouldShow ? '' : 'none';
        if (shouldShow) count++;
      });

      const countBadge = document.getElementById('matched-providers-count');
      if (countBadge) countBadge.textContent = `${count} Companion${count === 1 ? '' : 's'} Available`;
    };

    liveSearchInput?.addEventListener('input', filterProviders);
    filterControls.forEach(ctrl => ctrl.addEventListener('change', filterProviders));

    // Preset query param
    const params = new URLSearchParams(window.location.search);
    const selectedService = params.get('service');
    if (selectedService) {
      const serviceControl = document.getElementById('service');
      if (serviceControl) {
        const opt = [...serviceControl.options].find(o => o.value.toLowerCase().includes(selectedService.toLowerCase()) || o.text.toLowerCase().includes(selectedService.toLowerCase()));
        if (opt) serviceControl.value = opt.value;
      }
    }

    filterProviders();
  };

  // --------------------------------------------------------------------------
  // 13. SCROLL ANIMATIONS (INTERSECTION OBSERVER)
  // --------------------------------------------------------------------------
  const initScrollAnimations = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  };

  // --------------------------------------------------------------------------
  // 14. 3D SPATIAL TILT & PARALLAX ENGINE
  // --------------------------------------------------------------------------
  const init3DInteraction = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cards = document.querySelectorAll('.live-map-card-3d, .hero-image-card');
    cards.forEach(card => {
      const container = card.closest('.live-map-3d-scene, .hero-media-wrap') || card.parentElement;
      if (!container) return;

      let bounds;
      let rafId = null;

      const handleMouseEnter = () => {
        bounds = container.getBoundingClientRect();
      };

      const handleMouseMove = (e) => {
        if (!bounds) bounds = container.getBoundingClientRect();
        const x = e.clientX - bounds.left;
        const y = e.clientY - bounds.top;
        const xPct = (x / bounds.width - 0.5) * 2; // -1 to 1
        const yPct = (y / bounds.height - 0.5) * 2; // -1 to 1

        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          const rotX = -yPct * 7.5;
          const rotY = xPct * 9.5;
          card.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
        });
      };

      const handleMouseLeave = () => {
        if (rafId) cancelAnimationFrame(rafId);
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      };

      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    });
  };

  // --------------------------------------------------------------------------
  // 15. TEAM 3D FLIP CARDS INTERACTION
  // --------------------------------------------------------------------------
  const initTeamFlipCards = () => {
    document.querySelectorAll('.team-flip-card').forEach(card => {
      card.addEventListener('click', () => {
        card.classList.toggle('flipped');
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.classList.toggle('flipped');
        }
      });
    });
  };

  // --------------------------------------------------------------------------
  // 16. DOM READY INITIALIZATION
  // --------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    ensureModals();
    ensureToastContainer();
    initTheme();
    initDrawer();
    initAuth();
    initNotifications();
    initScrollAnimations();
    initRegistrationStepper();
    initFindCareFilters();
    init3DInteraction();
    initTeamFlipCards();

    // Modal triggers
    document.querySelectorAll('[data-modal-target]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(btn.dataset.modalTarget);
      });
    });

    document.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal(btn.dataset.closeModal);
      });
    });

    // Outer click close
    document.querySelectorAll('.modal').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(modal.id);
      });
    });

    // Escape listener
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal.open').forEach(m => closeModal(m.id));
        window.closeProviderChat();
        const drawer = document.getElementById('mobile-drawer');
        if (drawer?.classList.contains('open')) {
          drawer.classList.remove('open');
          document.body.style.overflow = '';
        }
      }
    });

    // Active nav link
    const currentPage = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a, .drawer-links a').forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });

    // Graceful Image Fallbacks
    document.querySelectorAll('img').forEach(img => {
      img.addEventListener('error', function() {
        this.onerror = null;
        this.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%230f1d30'/%3E%3Ctext x='50%25' y='50%25' fill='%2338bdf8' font-family='sans-serif' font-size='16' text-anchor='middle' dy='.3em'%3ECareX Companion%3C/text%3E%3C/svg%3E";
      });
    });

    // Copyright year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  });
})();
