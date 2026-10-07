/**
 * CAREX — CORE CLIENT LOGIC & INTERACTION ENGINE
 * Modern Vanilla JavaScript Architecture
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
  // 2. PROVIDERS DIRECTORY (CURATED DEMO DATA WITH IMAGES)
  // --------------------------------------------------------------------------
  window.carexProviders = [
    {
      id: 'aisha',
      name: 'Aisha Khan',
      service: 'Elderly Care',
      role: 'Care Provider',
      location: 'Shaheen Bagh',
      rating: 4.9,
      reviewsCount: 38,
      price: 18000,
      unit: 'month',
      experience: '5 years',
      available: true,
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      copy: 'Routine support, compassionate companionship and transparent daily family updates.'
    },
    {
      id: 'rahul',
      name: 'Rahul Mehta',
      service: 'Hospital Companion',
      role: 'Care Companion',
      location: 'Jamia Nagar',
      rating: 4.8,
      reviewsCount: 42,
      price: 800,
      unit: 'day',
      experience: '3 years',
      available: true,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      copy: 'Hospital accompaniment, appointment check-ins, queue navigation and transport support.'
    },
    {
      id: 'meena',
      name: 'Meena Sharma',
      service: 'Elderly Care',
      role: 'Care Provider',
      location: 'Okhla',
      rating: 4.9,
      reviewsCount: 64,
      price: 20000,
      unit: 'month',
      experience: '7 years',
      available: false,
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
      copy: 'Daily routines, medication reminders, wholesome meal assistance and gentle mobility help.'
    },
    {
      id: 'farah',
      name: 'Farah Ahmed',
      service: 'Appointment Assistance',
      role: 'Care Companion',
      location: 'Saket',
      rating: 4.7,
      reviewsCount: 29,
      price: 950,
      unit: 'visit',
      experience: '4 years',
      available: true,
      image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=600&q=80',
      copy: 'Attentive support for clinic visits, doctor notes transcription and diagnostic tests.'
    },
    {
      id: 'neeraj',
      name: 'Neeraj Singh',
      service: 'Everyday Assistance',
      role: 'Care Provider',
      location: 'Lajpat Nagar',
      rating: 4.6,
      reviewsCount: 22,
      price: 16000,
      unit: 'month',
      experience: '6 years',
      available: true,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
      copy: 'Reliable grocery errands, walking companionship and gentle household assistance.'
    },
    {
      id: 'kavita',
      name: 'Kavita Verma',
      service: 'Hospital Companion',
      role: 'Care Companion',
      location: 'Greater Kailash',
      rating: 4.9,
      reviewsCount: 51,
      price: 1100,
      unit: 'day',
      experience: '5 years',
      available: true,
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
      copy: 'Empathetic guidance during hospital admissions, post-surgery discharges and check-ups.'
    }
  ];

  // --------------------------------------------------------------------------
  // 3. INITIAL STATE DEFAULTS
  // --------------------------------------------------------------------------
  const requiredDemoState = {
    theme: 'light',
    auth: { loggedIn: false, role: 'customer', email: '', name: '' },
    notifications: [
      { id: 1, title: 'New care request', message: 'Sufian requested hospital companion assistance for today at 10:30 AM.', time: 'Just now', unread: true },
      { id: 2, title: 'Payment confirmation', message: 'Your secure payment of ₹18,000 has been confirmed.', time: '2h ago', unread: true }
    ],
    booking: null
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
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:#38bdf8; flex-shrink:0;">
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
  // 5. THEME TOGGLE (LIGHT / DARK)
  // --------------------------------------------------------------------------
  const applyTheme = (theme) => {
    const target = theme || 'light';
    document.body.classList.toggle('dark', target === 'dark');
    document.documentElement.style.colorScheme = target;
    store.set('theme', target);

    // Update toggle icons
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
      btn.innerHTML = target === 'dark'
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
    });
  };

  const initTheme = () => {
    const saved = store.get('theme', 'light');
    applyTheme(saved);

    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
      btn.addEventListener('click', () => {
        const current = document.body.classList.contains('dark') ? 'dark' : 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        showToast(`Theme changed to ${next} mode.`);
      });
    });
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
              <a href="index.html" class="brand">
                <span class="brand-mark">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 2v20M2 12h20M7 7l10 10M17 7L7 17"></path>
                  </svg>
                </span>
                <span class="brand-name">Care<span>X</span></span>
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
              <a href="#" data-request-care>Request Care</a>
              <a href="index.html#how-it-works">How It Works</a>
              <a href="about.html">About</a>
              <a href="login.html">Login</a>
            </nav>
            <div class="drawer-footer">
              <button class="btn btn-primary w-full" type="button" data-request-care>Request Care</button>
              <button class="btn btn-secondary w-full" type="button" data-modal-target="user-type-modal">Become a Care Provider</button>
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

    // Close on navigation click inside drawer
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

  const ensureModals = () => {
    // User type / Role selection modal
    if (!document.getElementById('user-type-modal')) {
      const modalMarkup = `
        <div class="modal" id="user-type-modal" aria-hidden="true">
          <div class="modal-panel">
            <div class="modal-header">
              <h2>How would you like to use CareX?</h2>
              <button class="modal-close" type="button" data-close-modal="user-type-modal" aria-label="Close dialog">×</button>
            </div>
            <div class="selection-grid">
              <article class="selection-card">
                <h3>I Need Care</h3>
                <p>Find trusted local care providers or hospital companions for yourself or family.</p>
                <button class="btn btn-primary" type="button" data-route-customer>Continue as Customer</button>
              </article>
              <article class="selection-card">
                <h3>Become a Provider</h3>
                <p>Offer elderly care, companionship or appointment assistance in your community.</p>
                <button class="btn btn-secondary" type="button" data-route-register>Register as Provider</button>
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
                <span class="eyebrow">Match with a caregiver</span>
                <h2>Request Care</h2>
              </div>
              <button class="modal-close" type="button" data-close-modal="care-request-modal" aria-label="Close dialog">×</button>
            </div>
            <form id="care-request-form">
              <div class="grid-2">
                <div class="field">
                  <label for="care-beneficiary">Who needs help?</label>
                  <select id="care-beneficiary">
                    <option>Parent</option>
                    <option>Grandparent</option>
                    <option>Myself</option>
                    <option>Other family member</option>
                  </select>
                </div>
                <div class="field">
                  <label for="care-service">Service required</label>
                  <select id="care-service">
                    <option>Hospital Companion</option>
                    <option>Elderly Care</option>
                    <option>Appointment Assistance</option>
                    <option>Everyday Assistance</option>
                  </select>
                </div>
                <div class="field">
                  <label for="care-location">Location</label>
                  <select id="care-location">
                    <option>Shaheen Bagh</option>
                    <option>Jamia Nagar</option>
                    <option>Okhla</option>
                    <option>Saket</option>
                    <option>Lajpat Nagar</option>
                    <option>Greater Kailash</option>
                  </select>
                </div>
                <div class="field">
                  <label for="care-date">Date</label>
                  <input id="care-date" type="date" required value="${new Date().toISOString().split('T')[0]}">
                </div>
              </div>
              <div class="field" style="margin-top:1rem;">
                <label for="care-duration">Duration</label>
                <select id="care-duration">
                  <option>One appointment visit (4 hours)</option>
                  <option>Full day support (8 hours)</option>
                  <option>Regular monthly support</option>
                </select>
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
              <h2>CareX Safety Standards</h2>
              <button class="modal-close" type="button" data-close-modal="safety-modal" aria-label="Close dialog">×</button>
            </div>
            <p style="color:var(--text-secondary); margin-bottom:1rem; font-size:0.95rem;">
              CareX is a prototype marketplace connecting families with verified local care companions. All provider profiles, rates, and bookings in this demo are simulated for product demonstration.
            </p>
            <p style="color:var(--text-secondary); margin-bottom:1.5rem; font-size:0.95rem;">
              <strong>Medical Disclaimer:</strong> CareX providers offer non-medical companionship, appointment navigation, and daily assistance. For life-threatening emergencies, call emergency services or visit the nearest hospital emergency room.
            </p>
            <button class="btn btn-primary w-full" type="button" data-close-modal="safety-modal">Understood</button>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', safetyMarkup);
    }
  };

  // --------------------------------------------------------------------------
  // 8. SCROLL ANIMATIONS (INTERSECTION OBSERVER)
  // --------------------------------------------------------------------------
  const initScrollAnimations = () => {
    // Respect user's motion preferences
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
  // 9. AUTH & DEMO WORKFLOWS
  // --------------------------------------------------------------------------
  const initAuth = () => {
    // Quick routing helpers
    document.querySelectorAll('[data-route-login]').forEach(btn => {
      btn.addEventListener('click', () => window.location.href = 'login.html');
    });

    document.querySelectorAll('[data-route-customer]').forEach(btn => {
      btn.addEventListener('click', () => {
        store.set('auth', { loggedIn: true, role: 'customer', email: 'user@gmail.com', name: 'Priya Sharma' });
        showToast('Logged in as Priya Sharma (Customer)');
        setTimeout(() => window.location.href = 'customer-dashboard.html', 300);
      });
    });

    document.querySelectorAll('[data-route-register]').forEach(btn => {
      btn.addEventListener('click', () => {
        window.location.href = 'register.html';
      });
    });

    // Request Care trigger
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
      const provider = window.carexProviders.find(p => p.service.toLowerCase().includes(service.toLowerCase())) || window.carexProviders[0];

      const newBooking = {
        id: Date.now(),
        provider: provider.name,
        service,
        location,
        date,
        status: 'REQUESTED',
        price: provider.price,
        unit: provider.unit
      };

      store.set('booking', newBooking);
      closeModal('care-request-modal');
      showToast(`Request sent to ${provider.name}.`);

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

    // Demo Login Form on login.html
    const loginForm = document.getElementById('demo-login-form');
    loginForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email')?.value?.trim().toLowerCase();
      const pass = document.getElementById('login-password')?.value?.trim();

      if (email === 'user@gmail.com' && pass === '1234') {
        store.set('auth', { loggedIn: true, role: 'customer', email, name: 'Priya Sharma' });
        showToast('Welcome back, Priya!');
        setTimeout(() => window.location.href = 'customer-dashboard.html', 400);
        return;
      }

      if (email === 'provider@gmail.com' && pass === '1234') {
        store.set('auth', { loggedIn: true, role: 'provider', email, name: 'Aisha Khan' });
        showToast('Welcome back, Aisha!');
        setTimeout(() => window.location.href = 'provider-dashboard.html', 400);
        return;
      }

      showToast('Demo login: use user@gmail.com / 1234 or provider@gmail.com / 1234');
    });

    // Quick Fill demo buttons on login.html
    document.querySelectorAll('[data-quick-login]').forEach(btn => {
      btn.addEventListener('click', () => {
        const role = btn.dataset.quickLogin;
        const emailInput = document.getElementById('login-email');
        const passInput = document.getElementById('login-password');
        if (role === 'customer') {
          if (emailInput) emailInput.value = 'user@gmail.com';
          if (passInput) passInput.value = '1234';
          showToast('Prefilled Customer demo credentials.');
        } else {
          if (emailInput) emailInput.value = 'provider@gmail.com';
          if (passInput) passInput.value = '1234';
          showToast('Prefilled Provider demo credentials.');
        }
      });
    });
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
  // 11. REGISTRATION STEPPER WIZARD (FOR REGISTER.HTML)
  // --------------------------------------------------------------------------
  const initRegistrationStepper = () => {
    const formSteps = document.querySelectorAll('.form-step');
    const stepIndicators = document.querySelectorAll('.stepper .step');
    if (!formSteps.length) return;

    let currentStep = 0;

    const showStep = (idx) => {
      formSteps.forEach((step, i) => {
        step.classList.toggle('active', i === idx);
      });
      stepIndicators.forEach((ind, i) => {
        ind.classList.toggle('active', i <= idx);
      });
      currentStep = idx;
      window.scrollTo({ top: 120, behavior: 'smooth' });
    };

    document.querySelectorAll('[data-step-next]').forEach(btn => {
      btn.addEventListener('click', () => {
        const delta = parseInt(btn.dataset.stepNext, 10);
        const next = currentStep + delta;
        if (next >= 0 && next < formSteps.length) {
          showStep(next);
        }
      });
    });

    document.querySelectorAll('[data-submit-demo]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelector('.step-form')?.classList.add('hidden');
        document.querySelector('.success-state')?.classList.remove('hidden');
        document.querySelector('.success-state')?.style.setProperty('display', 'block');
        store.set('auth', { loggedIn: true, role: 'provider', email: 'provider@gmail.com', name: 'Aisha Khan' });
        showToast('CareX Provider profile created successfully!');
      });
    });
  };

  // --------------------------------------------------------------------------
  // 12. FIND CARE FILTERING ENGINE (FOR FIND-CARE.HTML)
  // --------------------------------------------------------------------------
  const initFindCareFilters = () => {
    const filterControls = ['service', 'location', 'price', 'rating', 'availability']
      .map(id => document.getElementById(id))
      .filter(Boolean);

    if (!filterControls.length) return;

    const filterProviders = () => {
      const cards = [...document.querySelectorAll('.provider-card')];
      const service = (document.getElementById('service')?.value || '').trim().toLowerCase();
      const location = (document.getElementById('location')?.value || '').trim().toLowerCase();
      const rating = Number(document.getElementById('rating')?.value || 0);
      const availability = document.getElementById('availability')?.value || 'Any';
      const priceBand = document.getElementById('price')?.value || 'Any';

      let matchedCount = 0;

      cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        const priceMatch = card.textContent.match(/₹[\d,]+/g);
        const cardPrice = priceMatch ? Number(priceMatch[0].replace(/[^\d]/g, '')) : 0;
        const ratingMatch = card.textContent.match(/(4\.[0-9]+)/g);
        const cardRating = ratingMatch ? Number(ratingMatch[0]) : 0;
        const isAvailable = text.includes('available') && !text.includes('not available');

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

        const shouldShow = matchesService && matchesLocation && matchesRating && matchesPrice && matchesAvailability;
        card.style.display = shouldShow ? '' : 'none';
        if (shouldShow) matchedCount++;
      });
    };

    // Prepopulate service query parameter if present
    const params = new URLSearchParams(window.location.search);
    const selectedService = params.get('service');
    if (selectedService) {
      const serviceControl = document.getElementById('service');
      if (serviceControl) {
        const opt = [...serviceControl.options].find(o => o.value.toLowerCase().includes(selectedService.toLowerCase()) || o.text.toLowerCase().includes(selectedService.toLowerCase()));
        if (opt) serviceControl.value = opt.value;
      }
    }

    filterControls.forEach(ctrl => ctrl.addEventListener('change', filterProviders));
    filterProviders();
  };

  // --------------------------------------------------------------------------
  // 13. DOM READY INITIALIZATION
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

    // Close modal on outer overlay click
    document.querySelectorAll('.modal').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(modal.id);
      });
    });

    // Escape key listener for open modals and drawer
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal.open').forEach(m => closeModal(m.id));
        const drawer = document.getElementById('mobile-drawer');
        if (drawer?.classList.contains('open')) {
          drawer.classList.remove('open');
          document.body.style.overflow = '';
        }
      }
    });

    // Active link highlighting
    const currentPage = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a, .drawer-links a').forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });

    // Fallback handler for all images
    document.querySelectorAll('img').forEach(img => {
      img.addEventListener('error', function() {
        this.onerror = null;
        this.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' fill='%2364748b' font-family='sans-serif' font-size='16' text-anchor='middle' dy='.3em'%3ECareX Companion%3C/text%3E%3C/svg%3E";
      });
    });

    // Year footer
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  });
})();
