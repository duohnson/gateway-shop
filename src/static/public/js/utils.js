// shard utiilties

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function showToast(msg) {
  // remove any old toast
  var old = document.querySelector('.ui-toast');
  if (old) old.remove();

  var el = document.createElement('div');
  el.className = 'ui-toast';
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(function() { el.remove(); }, 3200);
}

function formatCurrency(val) {
  var n = parseFloat(val);
  if (isNaN(n)) return '0.00';
  return n.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
