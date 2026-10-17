document.addEventListener('DOMContentLoaded', () => {
  // 1. Identify active provider from URL or Auth state
  const params = new URLSearchParams(window.location.search);
  let providerId = params.get('id');

  if (!providerId) {
    const auth = JSON.parse(localStorage.getItem('carex-auth') || '{}');
    if (auth.loggedIn && auth.role === 'provider' && auth.providerId) {
      providerId = auth.providerId;
    } else {
      providerId = 'aisha';
    }
  }

  providerId = providerId.toLowerCase();
  const providers = window.getCarexProviders ? window.getCarexProviders() : [];
  let currentProvider = providers.find(p => p.id === providerId || (p.username && p.username.toLowerCase() === providerId)) || providers[0];

  // 2. Hydrate Dashboard UI with Current Provider
  const hydrateProviderUI = (provider) => {
    if (!provider) return;
    currentProvider = provider;

    const heading = document.getElementById('provider-welcome-heading');
    const locationSub = document.getElementById('provider-location-sub');
    const avatar = document.getElementById('sidebar-provider-avatar');
    const sidebarName = document.getElementById('sidebar-provider-name');
    const sidebarRole = document.getElementById('sidebar-provider-role');
    const publicLink = document.getElementById('sidebar-public-profile-link');
    const rateSub = document.getElementById('metric-rate-sub');
    const earningsVal = document.getElementById('metric-earnings-val');

    if (heading) heading.textContent = `Welcome back, ${provider.name.split(' ')[0]}`;
    if (locationSub) locationSub.textContent = `Active operating area: ${provider.location}`;
    if (avatar && provider.image) avatar.src = provider.image;
    if (sidebarName) sidebarName.textContent = provider.name;
    if (sidebarRole) sidebarRole.textContent = provider.role || 'Care Provider';
    if (publicLink) publicLink.href = `provider-profile.html?id=${encodeURIComponent(provider.id)}`;
    if (rateSub) rateSub.textContent = `₹${Number(provider.price).toLocaleString()} / ${provider.unit || 'month'}`;
    if (earningsVal) {
      const estimated = provider.unit === 'month' ? provider.price * 2.5 : provider.price * 32;
      earningsVal.textContent = `₹${Number(estimated).toLocaleString()}`;
    }
  };

  hydrateProviderUI(currentProvider);

  // 3. Availability Toggle Sync
  const availability = document.querySelector('[data-provider-availability]');
  const syncAvailability = () => {
    const available = localStorage.getItem(`carex-provider-available-${currentProvider.id}`) !== 'false';
    if (availability) {
      availability.checked = available;
      const label = document.querySelector('.availability-status-text');
      if (label) {
        label.textContent = available ? 'Available' : 'Offline';
      }
    }
  };

  syncAvailability();

  availability?.addEventListener('change', () => {
    localStorage.setItem(`carex-provider-available-${currentProvider.id}`, String(availability.checked));
    syncAvailability();
    window.showToast(availability.checked ? 'Your profile is live and accepting family requests.' : 'Your profile is currently paused.');
  });

  // 4. Booking Requests Engine
  const list = document.querySelector('[data-provider-requests]');
  const renderRequests = () => {
    if (!list) return;
    const booking = window.carexState?.get('booking', null);

    if (!booking || booking.status === 'CANCELLED') {
      list.innerHTML = `
        <div class="item-row">
          <div>
            <strong>Hospital Companion request from Priya Sharma</strong>
            <p class="text-muted" style="font-size:0.85rem; margin-top:2px;">Today at 10:30 AM · AIIMS OPD · Remuneration: ₹${currentProvider.dailyPrice || 800}</p>
          </div>
          <div class="inline-actions" style="display:flex; gap:0.5rem;">
            <button class="btn btn-primary btn-sm" type="button" data-accept-request>Accept</button>
            <button class="btn btn-danger btn-sm" type="button" data-decline-request>Decline</button>
          </div>
        </div>
        <div class="item-row">
          <div>
            <strong>Ongoing Elderly Care inquiry from Tariq Khan</strong>
            <p class="text-muted" style="font-size:0.85rem; margin-top:2px;">Starts Next Monday · ${currentProvider.location} · Remuneration: ₹${Number(currentProvider.price).toLocaleString()}/${currentProvider.unit || 'month'}</p>
          </div>
          <div class="inline-actions" style="display:flex; gap:0.5rem;">
            <button class="btn btn-primary btn-sm" type="button" data-accept-request>Accept</button>
            <button class="btn btn-danger btn-sm" type="button" data-decline-request>Decline</button>
          </div>
        </div>
      `;
      return;
    }

    if (booking.status === 'ACCEPTED') {
      list.innerHTML = `
        <div class="item-row">
          <div>
            <strong>${booking.service} with ${booking.beneficiary || 'Family Organizer'}</strong>
            <p class="text-muted" style="font-size:0.85rem; margin-top:2px;">${booking.date} · ${booking.location} · Payment: ₹${booking.price}</p>
          </div>
          <span class="status-chip status-ACCEPTED">Accepted</span>
        </div>
      `;
      return;
    }

    list.innerHTML = `
      <div class="item-row">
        <div>
          <strong>${booking.service} request from Family Organizer</strong>
          <p class="text-muted" style="font-size:0.85rem; margin-top:2px;">${booking.date} · ${booking.location} · Remuneration: ₹${booking.price}</p>
        </div>
        <div class="inline-actions" style="display:flex; gap:0.5rem;">
          <button class="btn btn-primary btn-sm" type="button" data-accept-request>Accept</button>
          <button class="btn btn-danger btn-sm" type="button" data-decline-request>Decline</button>
        </div>
      </div>
    `;
  };

  renderRequests();

  // 5. Click handlers for requests
  document.addEventListener('click', (event) => {
    const accept = event.target.closest('[data-accept-request]');
    const decline = event.target.closest('[data-decline-request]');

    if (accept) {
      const booking = window.carexState?.get('booking', {
        service: currentProvider.service || 'Hospital Companion',
        provider: currentProvider.name,
        location: currentProvider.location,
        date: 'Today',
        price: currentProvider.dailyPrice || 800
      });
      booking.status = 'ACCEPTED';
      window.carexState?.set('booking', booking);
      renderRequests();
      window.showToast('Booking accepted! Notification dispatched to family.');
      return;
    }

    if (decline) {
      const booking = window.carexState?.get('booking', {});
      booking.status = 'CANCELLED';
      window.carexState?.set('booking', booking);
      renderRequests();
      window.showToast('Booking request declined.');
      return;
    }
  });

  // 6. WhatsApp Live Chat Hook
  document.getElementById('provider-chat-trigger-btn')?.addEventListener('click', () => {
    if (window.openProviderChat) {
      window.openProviderChat(currentProvider.id);
    }
  });

  // 7. Profile Edit Modal & Handlers
  const openEditModal = () => {
    document.getElementById('edit-name').value = currentProvider.name;
    document.getElementById('edit-service').value = currentProvider.service;
    document.getElementById('edit-price').value = currentProvider.price;
    document.getElementById('edit-daily-price').value = currentProvider.dailyPrice || 850;
    document.getElementById('edit-location').value = currentProvider.location;
    document.getElementById('edit-phone').value = currentProvider.phone || '+91 98110 23456';
    document.getElementById('edit-experience').value = currentProvider.experience;
    document.getElementById('edit-hospitals').value = currentProvider.hospitals || 'AIIMS, Safdarjung, Holy Family';
    document.getElementById('edit-bio').value = currentProvider.bio || currentProvider.copy;

    if (window.openModal) {
      window.openModal('edit-profile-modal');
    }
  };

  document.getElementById('topbar-edit-profile-btn')?.addEventListener('click', openEditModal);
  document.getElementById('sidebar-edit-profile-btn')?.addEventListener('click', openEditModal);

  // Form submission for Edit Profile
  const editForm = document.getElementById('edit-profile-form');
  editForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const updatedName = document.getElementById('edit-name').value.trim();
    const updatedService = document.getElementById('edit-service').value;
    const updatedPrice = parseInt(document.getElementById('edit-price').value, 10);
    const updatedDailyPrice = parseInt(document.getElementById('edit-daily-price').value, 10);
    const updatedLocation = document.getElementById('edit-location').value.trim();
    const updatedPhone = document.getElementById('edit-phone').value.trim();
    const updatedExperience = document.getElementById('edit-experience').value.trim();
    const updatedHospitals = document.getElementById('edit-hospitals').value.trim();
    const updatedBio = document.getElementById('edit-bio').value.trim();

    // Mutate provider object
    currentProvider.name = updatedName;
    currentProvider.service = updatedService;
    currentProvider.price = updatedPrice;
    currentProvider.dailyPrice = updatedDailyPrice;
    currentProvider.location = updatedLocation;
    currentProvider.phone = updatedPhone;
    currentProvider.experience = updatedExperience;
    currentProvider.hospitals = updatedHospitals;
    currentProvider.bio = updatedBio;
    currentProvider.copy = updatedBio.length > 90 ? updatedBio.slice(0, 90) + '...' : updatedBio;

    // Save to master storage
    const allProviders = window.getCarexProviders ? window.getCarexProviders() : [];
    const idx = allProviders.findIndex(p => p.id === currentProvider.id);
    if (idx !== -1) {
      allProviders[idx] = currentProvider;
      if (window.saveCarexProviders) {
        window.saveCarexProviders(allProviders);
      }
    }

    // Refresh UI & close
    hydrateProviderUI(currentProvider);
    if (window.closeModal) {
      window.closeModal('edit-profile-modal');
    }
    window.showToast('Profile updated successfully! Live in marketplace.');
  });
});
