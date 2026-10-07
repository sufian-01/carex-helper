document.addEventListener('DOMContentLoaded', () => {
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
          <div class="inline-actions">
            <span class="status-chip status-CONFIRMED">Confirmed</span>
          </div>
        </div>
        <div class="item-row">
          <div>
            <strong>Elderly Care with Meena Sharma</strong>
            <p class="text-muted" style="font-size:0.85rem; margin-top:2px;">Starts 15 Oct 2026 · Okhla · ₹20,000/month</p>
          </div>
          <div class="inline-actions">
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
          ${paymentButton}
        </div>
      </div>
    `;
  };

  renderBooking();

  document.addEventListener('click', (event) => {
    const payButton = event.target.closest('[data-pay-booking]');
    if (!payButton) return;

    const booking = window.carexState.get('booking', {
      service: 'Elderly Care',
      provider: 'Meena Sharma',
      location: 'Okhla',
      date: '15 Oct 2026',
      price: 20000
    });
    booking.status = 'CONFIRMED';
    window.carexState.set('booking', booking);
    renderBooking();
    window.showToast('Payment successful — your CareX care booking is confirmed!');
  });

  document.querySelector('[data-search-dashboard]')?.addEventListener('click', () => {
    const service = document.getElementById('customer-service')?.value || 'Hospital Companion';
    window.location.href = `find-care.html?service=${encodeURIComponent(service)}`;
  });
});
