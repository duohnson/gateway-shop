// ui extras - fly aniamtion, quick view modal, fab button

// anmiate prdouct img flying toawrds cart icon
function flyToCart(imgEl) {
  if (!imgEl) return;
  var rect = imgEl.getBoundingClientRect();
  var clone = imgEl.cloneNode(true);
  clone.style.cssText =
    'position:fixed;z-index:9998;pointer-events:none;border-radius:8px;' +
    'box-shadow:0 10px 30px rgba(2,6,23,0.2);' +
    'left:' + rect.left + 'px;top:' + rect.top + 'px;' +
    'width:' + rect.width + 'px;height:' + rect.height + 'px';
  document.body.appendChild(clone);

  var target = document.getElementById('nav-cart-count');
  var tRect = target
    ? target.getBoundingClientRect()
    : { left: window.innerWidth - 36, top: 24, width: 28, height: 28 };
  var dx = tRect.left + tRect.width / 2 - (rect.left + rect.width / 2);
  var dy = tRect.top + tRect.height / 2 - (rect.top + rect.height / 2);

  clone.animate([
    { transform: 'translate(0,0) scale(1)', opacity: 1 },
    { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(0.18)', opacity: 0.6 }
  ], { duration: 700, easing: 'cubic-bezier(.2,.9,.2,1)' });
  setTimeout(function() { clone.remove(); }, 750);

  // bump the badge
  if (target) {
    target.animate([
      { transform: 'scale(1)' },
      { transform: 'scale(1.3)' },
      { transform: 'scale(1)' }
    ], { duration: 400, easing: 'cubic-bezier(.2,.9,.2,1)' });
  }
}

// quick view modal for a prdouct
function openProductModal(prod) {
  var overlay = document.createElement('div');
  overlay.className = 'product-modal-overlay';
  overlay.innerHTML =
    '<div class="product-modal" role="dialog" aria-modal="true" aria-label="Vista rápida">' +
      '<div class="visual"><img src="' + escapeHtml(prod.img || '') + '" alt="' + escapeHtml(prod.nombre) + '"' +
        ' onerror="this.onerror=null;this.src=\'https://via.placeholder.com/640x480?text=Producto\'" /></div>' +
      '<div class="meta">' +
        '<h3>' + escapeHtml(prod.nombre) + '</h3>' +
        '<p>' + escapeHtml(prod.desc || '') + '</p>' +
        '<div class="price">$' + formatCurrency(prod.precio) + '</div>' +
        '<div class="actions">' +
          '<button class="btn" id="modal-add" type="button">Agregar al carrito</button>' +
          '<button class="btn ghost" id="modal-close" type="button">Cerrar</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  document.body.appendChild(overlay);

  function close() {
    overlay.remove();
    document.removeEventListener('keydown', onKey);
  }
  function onKey(e) { if (e.key === 'Escape') close(); }

  document.getElementById('modal-close').addEventListener('click', close);
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) close();
  });
  document.addEventListener('keydown', onKey);

  document.getElementById('modal-add').addEventListener('click', function() {
    cart.add(prod);
    flyToCart(overlay.querySelector('.visual img'));
    showToast('Producto añadido al carrito');
    setTimeout(close, 400);
    // re-rnder cart siedbar if we're on shpo page
    if (typeof renderShopCart === 'function') renderShopCart();
  });
}

// seach and catgeory filtr for prdouct cards
function applyFilters() {
  var searchEl = document.getElementById('search');
  var catEl = document.getElementById('category');
  var q = (searchEl ? searchEl.value : '').trim().toLowerCase();
  var cat = catEl ? catEl.value : '';
  var list = document.getElementById('product-list');
  if (!list) return;

  var visible = 0;
  list.querySelectorAll('.producto').forEach(function(card) {
    var nombre = (card.dataset.nombre || '').toLowerCase();
    var text = (card.textContent || '').toLowerCase();
    var cardCat = (card.dataset.categoria || '').toLowerCase();
    var matchQ = !q || nombre.includes(q) || text.includes(q);
    var matchCat = !cat || cardCat === cat;
    var show = matchQ && matchCat;
    card.style.display = show ? 'flex' : 'none';
    if (show) visible++;
  });

  var countEl = document.getElementById('product-count');
  if (countEl) countEl.textContent = String(visible);
}

// flotaing cart fab + social links
(function() {
  var fab = document.createElement('button');
  fab.className = 'fab-cart';
  fab.setAttribute('aria-label', 'Abrir carrito');
  fab.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' +
      '<circle cx="9" cy="20" r="1.5"/><circle cx="20" cy="20" r="1.5"/>' +
      '<path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>' +
    '</svg>' +
    '<span class="count">0</span>';
  document.body.appendChild(fab);

  var social = document.createElement('div');
  social.className = 'fab-social';
  social.innerHTML =
    '<a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">' +
      '<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07C2 17.06 5.64 21.13 10.33 21.9v-6.35H7.9v-2.48h2.43V10.4c0-2.4 1.43-3.73 3.62-3.73 1.05 0 2.15.19 2.15.19v2.37h-1.21c-1.2 0-1.57.75-1.57 1.52v1.83h2.67l-.43 2.48h-2.24v6.35C18.36 21.13 22 17.06 22 12.07z"/></svg>' +
    '</a>' +
    '<a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">' +
      '<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 6.2a4.8 4.8 0 100 9.6 4.8 4.8 0 000-9.6zM18.4 6.2a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z"/></svg>' +
    '</a>';
  document.body.appendChild(social);

  var countEl = fab.querySelector('.count');
  function setCount(n) {
    if (!countEl) return;
    countEl.textContent = n;
    countEl.style.display = n > 0 ? 'inline-block' : 'none';
  }

  setCount(cart.items.length);
  window.addEventListener('cartUpdated', function(e) {
    setCount(e.detail ? e.detail.count : cart.items.length);
  });

  fab.addEventListener('click', function() {
    var section = document.getElementById('cart-items');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      window.location.href = 'shop.html';
    }
  });
})();

// bind filtr inputs if they exist
document.addEventListener('DOMContentLoaded', function() {
  var searchInput = document.getElementById('search');
  var categorySelect = document.getElementById('category');
  if (searchInput) searchInput.addEventListener('input', applyFilters);
  if (categorySelect) categorySelect.addEventListener('change', applyFilters);
});
