// paypal checkout page

function renderOrderSummary() {
  var items = cart.items;
  var el = document.getElementById('order-summary');
  if (!el) return;

  if (!items.length) {
    el.innerHTML = '<p>No hay artículos en el carrito.</p>';
    return;
  }

  var rows = items.map(function(i) {
    return '<div style="display:flex;justify-content:space-between;align-items:center;margin:.35rem 0">' +
      '<div>' +
        '<strong>' + escapeHtml(i.nombre) + '</strong>' +
        '<div style="font-size:.9rem;color:#6b7280">Cantidad: ' + (i.cantidad || 1) + '</div>' +
      '</div>' +
      '<div class="precio">$' + formatCurrency((i.precio || 0) * (i.cantidad || 1)) + '</div>' +
    '</div>';
  }).join('');

  el.innerHTML = '<div>' + rows + '</div>' +
    '<div style="text-align:right;margin-top:1rem"><strong>Total: $' + formatCurrency(cart.total()) + '</strong></div>';
}

function initPayPal() {
  if (typeof paypal === 'undefined') {
    console.warn('paypal sdk not loaded yet');
    return;
  }

  if (!cart.items.length) return;

  var total = cart.total();

  paypal.Buttons({
    createOrder: function(data, actions) {
      return actions.order.create({
        purchase_units: [{ amount: { value: formatCurrency(total) } }]
      });
    },
    onApprove: function(data, actions) {
      return actions.order.capture().then(function() {
        cart.clear();
        window.location.href = 'success.html';
      });
    },
    onCancel: function() {
      window.location.href = 'cancel.html';
    },
    onError: function(err) {
      console.error(err);
      showToast('Error procesando el pago');
    }
  }).render('#paypal-buttons');
}

document.addEventListener('DOMContentLoaded', function() {
  renderOrderSummary();
  // small delay for paypal sdk to finish loading
  setTimeout(initPayPal, 600);
});
