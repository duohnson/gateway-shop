// shared header/footer injection + nav behavior
// replaces copy-pasting the navbar in every html file

function buildNavbar() {
  var path = location.pathname.split('/').pop() || 'index.html';
  if (path === '' || path === '/') path = 'index.html';

  function cls(page) {
    return 'nav-link' + (path === page ? ' active' : '');
  }

  return '<div class="nav-container">' +
    '<div class="nav-left">' +
      '<a href="index.html" class="nav-brand">Gateway Shop</a>' +
    '</div>' +
    '<button class="nav-toggle" aria-expanded="false" aria-label="Menú">' +
      '<span class="bar"></span><span class="bar"></span><span class="bar"></span>' +
    '</button>' +
    '<nav class="nav-links" id="nav-links">' +
      '<a class="' + cls('index.html') + '" href="index.html">Inicio</a>' +
      '<a class="' + cls('shop.html') + '" href="shop.html">Tienda</a>' +
      '<a class="' + cls('contact.html') + '" href="contact.html">Contacto</a>' +
      '<a class="cta" href="shop.html">' +
        '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" style="display:inline;vertical-align:middle;margin-right:4px">' +
          '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>' +
          '<path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>' +
        '</svg>' +
        'Carrito <span id="nav-cart-count" class="cart-badge">0</span>' +
      '</a>' +
    '</nav>' +
  '</div>';
}

function buildFooter() {
  return '<div class="max-w-7xl mx-auto px-4 py-6">' +
    '<div class="flex flex-col md:flex-row items-center justify-between">' +
      '<p class="text-sm text-gray-600">&copy; 2026 Gateway Shop. Todos los derechos reservados. Created by duohnson.</p>' +
      '<div class="mt-3 md:mt-0 flex gap-4">' +
        '<a href="contact.html" class="text-sm text-gray-700 hover:underline">Contacto</a>' +
        '<a href="shop.html" class="text-sm text-gray-700 hover:underline">Tienda</a>' +
      '</div>' +
    '</div>' +
    '<div class="footer-legal">' +
      '<a href="terminos.html">Términos y Condiciones</a>' +
      '<span class="sep">·</span>' +
      '<a href="privacidad.html">Aviso de Privacidad</a>' +
      '<span class="sep">·</span>' +
      '<a href="cancelaciones.html">Cancelaciones y Devoluciones</a>' +
      '<span class="sep">·</span>' +
      '<a href="promociones.html">Reglamento de Promociones</a>' +
    '</div>' +
  '</div>';
}

// inject right away - defer guarantees dom is parsed
(function() {
  var header = document.getElementById('site-header');
  if (header && !header.children.length) header.innerHTML = buildNavbar();

  var footer = document.getElementById('site-footer');
  if (footer && !footer.children.length) footer.innerHTML = buildFooter();
})();

// mobile nav toggle
(function() {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav-links');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', function() {
    var open = nav.classList.toggle('show');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  });

  // close when tapping outside
  document.addEventListener('click', function(e) {
    if (!nav.classList.contains('show')) return;
    if (!nav.contains(e.target) && !toggle.contains(e.target)) {
      nav.classList.remove('show');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // swipe to open/close on mobile
  var startX = 0;
  document.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
  }, { passive: true });

  document.addEventListener('touchend', function(e) {
    var dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) < 40) return;
    if (dx > 0 && startX < 60) {
      nav.classList.add('show');
      toggle.classList.add('open');
    } else if (dx < 0) {
      nav.classList.remove('show');
      toggle.classList.remove('open');
    }
    toggle.setAttribute('aria-expanded', nav.classList.contains('show') ? 'true' : 'false');
  }, { passive: true });
})();

// header shadow on scroll
(function() {
  var header = document.querySelector('.site-header');
  if (!header) return;
  function check() {
    header.classList.toggle('scrolled', window.scrollY > 12);
  }
  check();
  window.addEventListener('scroll', check, { passive: true });
})();

// fade-in for .fade-up elements via intersection observer
(function() {
  var els = document.querySelectorAll('.fade-up');
  if (!els.length) return;
  var io = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) e.target.classList.add('in');
    });
  }, { threshold: 0.15 });
  els.forEach(function(el) { io.observe(el); });
})();

// keep badge in sync if cart updates after load
window.addEventListener('cartUpdated', function(e) {
  var el = document.getElementById('nav-cart-count');
  if (el) el.textContent = e.detail ? e.detail.count : 0;
});
