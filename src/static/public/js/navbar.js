document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.nav .links a');

  links.forEach(a => {
    a.addEventListener('click', () => {
      links.forEach(x => x.classList.remove('active'));
      a.classList.add('active');
    });
  });

  const path = location.pathname.split('/').pop();
  links.forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (href === 'index.html' && path === '')) a.classList.add('active');
  });

  const toggle = document.createElement('button');
  toggle.className = 'nav-toggle';
  toggle.setAttribute('aria-expanded', 'false');
  toggle.innerHTML = '<span class="bar"></span><span class="bar"></span><span class="bar"></span>';

  const container = document.querySelector('.nav .container');
  if (container) container.insertBefore(toggle, container.firstChild);

  const collapse = document.createElement('div');
  collapse.className = 'nav-collapse';

  const linksEl = document.querySelector('.nav .links');
  const cartEl = document.querySelector('.nav .cart');
  if (linksEl) collapse.appendChild(linksEl);
  if (cartEl) collapse.appendChild(cartEl);
  if (container) container.appendChild(collapse);

  toggle.addEventListener('click', () => {
    const showing = collapse.classList.toggle('show');
    toggle.classList.toggle('open', showing);
    toggle.setAttribute('aria-expanded', showing ? 'true' : 'false');
  });

  document.addEventListener('click', ev => {
    if (!collapse.classList.contains('show')) return;
    const target = ev.target;
    if (!collapse.contains(target) && !toggle.contains(target)) {
      collapse.classList.remove('show');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  let touchStartX = 0;
  document.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  document.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) < 40) return;
    if (dx > 0 && touchStartX < 60) {
      collapse.classList.add('show');
      toggle.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
    } else if (dx < 0) {
      collapse.classList.remove('show');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  }, { passive: true });

  function setCartCount(n) {
    const el = document.getElementById('nav-cart-count');
    if (el) el.textContent = n;
  }

  if (window.carrito && Array.isArray(window.carrito)) setCartCount(window.carrito.length);
  window.addEventListener('cartUpdated', e => {
    const n = (e && e.detail && typeof e.detail.length === 'number') ? e.detail.length : (window.carrito ? window.carrito.length : 0);
    setCartCount(n);
  });
});

