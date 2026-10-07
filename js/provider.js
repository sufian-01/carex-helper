document.addEventListener('DOMContentLoaded', () => {
  const availability = document.querySelector('[data-provider-availability]');
  const list = document.querySelector('[data-provider-requests]');

  const syncAvailability = () => {
    const available = localStorage.getItem('carex-provider-available') !== 'false';
    if (availability) {
      availability.checked = available;
      const label = document.querySelector('.availability-status-text');
      if (label) {
        label.textContent = available ? 'Available for bookings' : 'Currently offline';
      }
    }
  };

  syncAvailability();

  availability?.addEventListener('change', () => {
    localStorage.setItem('carex-provider-available', String(availability.checked));
    syncAvailability();
    window.showToast(availability.checked ? 'Your profile is now live and accepting bookings.' : 'Your profile is currently paused.');
  });

  const renderRequests = () => {
    if (!list) return;
    const booking = window.carexState?.get('booking', null);

    if (!booking || booking.status === 'CANCELLED') {
      list.innerHTML = `
        <div class="item-row">
          <div>
            <strong>Hospital Companion request from Priya</strong>
            <p class="text-muted" style="font-size:0.85rem; margin-top:2px;">Today at 10:30 AM · AIIMS · Expected earnings: ₹800</p>
          </div>
          <div class="inline-actions" style="display:flex; gap:0.5rem;">
            <button class="btn btn-primary btn-sm" type="button" data-accept-request>Accept</button>
            <button class="btn btn-danger btn-sm" type="button" data-decline-request>Decline</button>
          </div>
        </div>
        <div class="item-row">
          <div>
            <strong>Elderly Care inquiry from Tariq</strong>
            <p class="text-muted" style="font-size:0.85rem; margin-top:2px;">Starts Next Monday · Shaheen Bagh · Expected: ₹18,000/mo</p>
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
            <strong>${booking.service} with ${booking.beneficiary || 'Family'}</strong>
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
          <strong>${booking.service} request from Family</strong>
          <p class="text-muted" style="font-size:0.85rem; margin-top:2px;">${booking.date} · ${booking.location} · Expected payment: ₹${booking.price}</p>
        </div>
        <div class="inline-actions" style="display:flex; gap:0.5rem;">
          <button class="btn btn-primary btn-sm" type="button" data-accept-request>Accept</button>
          <button class="btn btn-danger btn-sm" type="button" data-decline-request>Decline</button>
        </div>
      </div>
    `;
  };

  renderRequests();

  document.addEventListener('click', (event) => {
    const accept = event.target.closest('[data-accept-request]');
    const decline = event.target.closest('[data-decline-request]');
    const reply = event.target.closest('[data-reply-msg]');

    if (accept) {
      const booking = window.carexState.get('booking', {
        service: 'Hospital Companion',
        provider: 'Aisha Khan',
        location: 'AIIMS',
        date: 'Today',
        price: 800
      });
      booking.status = 'ACCEPTED';
      window.carexState.set('booking', booking);
      renderRequests();
      window.showToast('Booking accepted! Notification sent to the family.');
      return;
    }

    if (decline) {
      const booking = window.carexState.get('booking', {});
      booking.status = 'CANCELLED';
      window.carexState.set('booking', booking);
      renderRequests();
      window.showToast('Booking request declined.');
      return;
    }

    if (reply) {
      const row = reply.closest('.item-row');
      const small = row?.querySelector('p');
      if (small) small.textContent = 'You: Thank you for reaching out. I have confirmed your appointment details!';
      reply.textContent = 'Sent';
      reply.disabled = true;
      window.showToast('Message sent to the family.');
    }
  });
});
