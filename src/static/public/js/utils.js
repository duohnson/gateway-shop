// shared helpers used across pages

function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  var d = document.createElement('div');
  d.appendChild(document.createTextNode(str));
  return d.innerHTML;
}

function showToast(text, duration) {
  duration = duration || 2500;
  var t = document.createElement('div');
  t.className = 'ui-toast';
  t.textContent = text;
  Object.assign(t.style, {
    position: 'fixed', right: '20px', bottom: '20px',
    background: '#111', color: '#fff', padding: '12px 18px',
    borderRadius: '8px', boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
    zIndex: 9999, opacity: 0, transform: 'translateY(10px)',
    transition: 'all .32s ease', fontWeight: 600, fontSize: '.95rem'
  });
  document.body.appendChild(t);
  requestAnimationFrame(function() {
    t.style.opacity = 1;
    t.style.transform = 'translateY(0)';
  });
  setTimeout(function() {
    t.style.opacity = 0;
    t.style.transform = 'translateY(10px)';
    setTimeout(function() { t.remove(); }, 350);
  }, duration);
}

function formatCurrency(n) {
  return Number(n).toFixed(2);
}
