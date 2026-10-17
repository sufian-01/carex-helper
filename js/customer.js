document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. LIVE AS-YOU-TYPE PROVIDER SEARCH ENGINE
  // --------------------------------------------------------------------------
  const searchInput = document.getElementById('cust-live-search-input');
  const searchGrid = document.getElementById('cust-search-results-grid');
  const searchCountPill = document.getElementById('cust-search-count-pill');

  const renderSearchResults = (query = '') => {
    if (!searchGrid) return;
    const providers = window.getCarexProviders ? window.getCarexProviders() : [];
    const cleanQuery = query.trim().toLowerCase();

    const filtered = providers.filter(p => {
      if (!cleanQuery) return true;
      const haystack = `${p.name} ${p.service} ${p.role || ''} ${p.location} ${p.hospitals || ''} ${p.bio || ''}`.toLowerCase();
      return haystack.includes(cleanQuery);
    });

    if (searchCountPill) {
      searchCountPill.textContent = `${filtered.length} Verified Available`;
    }

    if (filtered.length === 0) {
      searchGrid.innerHTML = `
        <div style="grid-column:1/-1; text-align:center; padding:2rem 1rem; background:var(--bg-subtle); border-radius:var(--radius-lg); border:1px dashed var(--border);">
          <strong style="color:var(--text-main); font-size:1rem;">No companions matched "${query}"</strong>
          <p style="color:var(--text-muted); font-size:0.85rem; margin-top:0.25rem;">Try searching for "AIIMS", "Hospital Companion", or "Shaheen Bagh"</p>
        </div>
      `;
      return;
    }

    searchGrid.innerHTML = filtered.map(p => `
      <div style="background:var(--bg-surface); border:1px solid var(--border); border-radius:var(--radius-lg); padding:1rem; display:flex; flex-direction:column; gap:0.75rem; box-shadow:var(--shadow-xs);">
        <div style="display:flex; align-items:center; gap:0.75rem;">
          <img src="${p.image}" alt="${p.name}" style="width:46px; height:46px; border-radius:50%; object-fit:cover; border:1px solid var(--border);" />
          <div style="overflow:hidden;">
            <div style="display:flex; align-items:center; gap:0.35rem;">
              <strong style="font-size:0.95rem; color:var(--text-main);">${p.name}</strong>
              <span style="color:var(--primary); font-size:0.8rem; font-weight:700;">★ ${p.rating}</span>
            </div>
            <span style="display:block; font-size:0.78rem; color:var(--primary); font-weight:600;">${p.service}</span>
            <span style="display:block; font-size:0.75rem; color:var(--text-muted);">${p.location}</span>
          </div>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.85rem; padding-top:0.5rem; border-top:1px solid var(--border);">
          <strong style="color:var(--text-main);">₹${Number(p.price).toLocaleString()} <span style="font-size:0.75rem; color:var(--text-muted); font-weight:normal;">/${p.unit}</span></strong>
          <div style="display:flex; gap:0.4rem;">
            <a href="provider-profile.html?id=${encodeURIComponent(p.id)}" class="btn btn-ghost btn-sm" style="padding:0.25rem 0.55rem; font-size:0.78rem;">Profile</a>
            <button class="btn btn-secondary btn-sm" type="button" onclick="window.openProviderChat('${p.id}')" style="padding:0.25rem 0.55rem; font-size:0.78rem; border-color:var(--whatsapp-border); color:var(--whatsapp-accent);">
              Chat
            </button>
            <button class="btn btn-primary btn-sm" type="button" data-request-care style="padding:0.25rem 0.55rem; font-size:0.78rem;">
              Book
            </button>
          </div>
        </div>
      </div>
    `).join('');
  };

  renderSearchResults('');

  searchInput?.addEventListener('input', (e) => {
    renderSearchResults(e.target.value);
  });

  window.applyCustomerSearch = (term) => {
    if (searchInput) {
      searchInput.value = term;
    }
    renderSearchResults(term);
  };

  // --------------------------------------------------------------------------
  // 2. CUSTOM CARE REQUESTS (POSTING & LISTING)
  // --------------------------------------------------------------------------
  const DEFAULT_CUSTOM_REQUESTS = [
    {
      id: 1,
      title: 'Hospital OPD Escort for Mother',
      service: 'Hospital Companion',
      location: 'AIIMS New Delhi',
      date: 'Tomorrow, 10:30 AM',
      budget: '₹800',
      status: 'Matching nearby companions'
    },
    {
      id: 2,
      title: 'Daily Evening Walk & Medicine Reminder',
      service: 'Elderly Care',
      location: 'Shaheen Bagh, New Delhi',
      date: 'Daily 5:00 PM – 7:00 PM',
      budget: '₹18,000 / month',
      status: 'Matched with Aisha Khan'
    }
  ];

  const getCustomRequests = () => {
    const saved = localStorage.getItem('carex-customRequests');
    return saved ? JSON.parse(saved) : DEFAULT_CUSTOM_REQUESTS;
  };

  const saveCustomRequests = (reqs) => {
    localStorage.setItem('carex-customRequests', JSON.stringify(reqs));
  };

  const renderCustomRequests = () => {
    const listEl = document.getElementById('cust-active-requests-list');
    const badgeEl = document.getElementById('stat-active-requests-val');
    if (!listEl) return;

    const reqs = getCustomRequests();
    if (badgeEl) badgeEl.textContent = reqs.length;

    if (reqs.length === 0) {
      listEl.innerHTML = `
        <div style="text-align:center; padding:1.5rem; background:var(--bg-subtle); border-radius:var(--radius-md); border:1px dashed var(--border);">
          <p style="color:var(--text-muted); font-size:0.88rem;">No active requests right now.</p>
          <button class="btn btn-secondary btn-sm" type="button" onclick="window.openModal('custom-request-modal')" style="margin-top:0.5rem;">+ Create Care Request</button>
        </div>
      `;
      return;
    }

    listEl.innerHTML = reqs.map(r => `
      <div class="item-row" id="req-row-${r.id}">
        <div>
          <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
            <strong>${r.title}</strong>
            <span class="status-chip status-ACCEPTED" style="font-size:0.75rem;">${r.status}</span>
          </div>
          <p class="text-muted" style="font-size:0.83rem; margin-top:3px;">
            ${r.service} · ${r.location} · ${r.date} · Budget: ${r.budget}
          </p>
        </div>
        <div style="display:flex; gap:0.4rem;">
          <a href="find-care.html" class="btn btn-secondary btn-sm">Find Companion</a>
          <button class="btn btn-ghost btn-sm" type="button" onclick="window.deleteCustomRequest(${r.id})">Cancel</button>
        </div>
      </div>
    `).join('');
  };

  renderCustomRequests();

  window.deleteCustomRequest = (id) => {
    const reqs = getCustomRequests().filter(r => r.id !== id);
    saveCustomRequests(reqs);
    renderCustomRequests();
    window.showToast('Request cancelled.');
  };

  document.getElementById('post-custom-request-btn')?.addEventListener('click', () => {
    if (window.openModal) {
      window.openModal('custom-request-modal');
    }
  });

  const customReqForm = document.getElementById('custom-care-request-form');
  customReqForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('req-title').value.trim();
    const service = document.getElementById('req-service').value;
    const location = document.getElementById('req-location').value.trim();
    const date = document.getElementById('req-date').value.trim();
    const budget = document.getElementById('req-budget').value.trim();

    const newReq = {
      id: Date.now(),
      title,
      service,
      location,
      date,
      budget,
      status: 'Matching nearby companions'
    };

    const reqs = getCustomRequests();
    reqs.unshift(newReq);
    saveCustomRequests(reqs);
    renderCustomRequests();

    if (window.closeModal) {
      window.closeModal('custom-request-modal');
    }
    customReqForm.reset();
    window.showToast('Care request published! Local companions notified.');
  });

  // --------------------------------------------------------------------------
  // 3. BOOKINGS AND PAYMENT LOGIC
  // --------------------------------------------------------------------------
  const list = document.querySelector('[data-customer-bookings]');
  if (!list) return;

  const renderBooking = () => {
    const booking = window.carexState?.get('booking', null);
    if (!booking) {
      list.innerHTML = `
        <div class="item-row">
          <div>
            <strong>Hospital Companion with Aisha Khan</strong>
            <p class="text-muted" style="font-size:0.85rem; margin-top:2px;">Today at 10:30 AM · AIIMS New Delhi · ₹800</p>
          </div>
          <div class="inline-actions" style="display:flex; align-items:center; gap:0.5rem;">
            <span class="status-chip status-CONFIRMED">Confirmed</span>
            <button class="btn btn-secondary btn-sm" type="button" onclick="window.openProviderChat('aisha')">Chat</button>
          </div>
        </div>
        <div class="item-row">
          <div>
            <strong>Elderly Care with Meena Sharma</strong>
            <p class="text-muted" style="font-size:0.85rem; margin-top:2px;">Starts 15 Oct 2026 · Okhla · ₹20,000/month</p>
          </div>
          <div class="inline-actions" style="display:flex; align-items:center; gap:0.5rem;">
            <span class="status-chip status-ACCEPTED">Accepted</span>
            <button class="btn btn-primary btn-sm" type="button" data-pay-booking>Pay Securely</button>
          </div>
        </div>
      `;
      return;
    }

    const statusClass = `status-${String(booking.status).toUpperCase()}`;
    const paymentButton = booking.status === 'ACCEPTED'
      ? '<button class="btn btn-primary btn-sm" type="button" data-pay-booking>Pay Securely</button>'
      : '';
    const chatBtn = `<button class="btn btn-secondary btn-sm" type="button" onclick="window.openProviderChat('${booking.providerId || 'aisha'}')">Chat</button>`;

    list.innerHTML = `
      <div class="item-row">
        <div>
          <strong>${booking.service} with ${booking.provider}</strong>
          <p class="text-muted" style="font-size:0.85rem; margin-top:2px;">
            ${booking.date} · ${booking.location || 'Shaheen Bagh'} · ₹${booking.price?.toLocaleString?.() || booking.price}
          </p>
        </div>
        <div class="inline-actions" style="display:flex; align-items:center; gap:0.65rem;">
          <span class="status-chip ${statusClass}">${booking.status}</span>
          ${chatBtn}
          ${paymentButton}
        </div>
      </div>
    `;
  };

  renderBooking();

  document.addEventListener('click', (event) => {
    const payButton = event.target.closest('[data-pay-booking]');
    if (!payButton) return;

    const booking = window.carexState?.get('booking', {
      service: 'Elderly Care',
      provider: 'Meena Sharma',
      location: 'Okhla',
      date: '15 Oct 2026',
      price: 20000
    });
    booking.status = 'CONFIRMED';
    window.carexState?.set('booking', booking);
    renderBooking();
    window.showToast('Payment successful — your CareX companion booking is confirmed!');
  });
});
