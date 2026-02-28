// INIT hero carousel slider
function initHeroCarousel() {
  const slidesWrap = document.querySelector('.hero-slides');
  if (!slidesWrap) return;

  const slides = Array.from(slidesWrap.querySelectorAll('.slide'));
  const titleEl = document.getElementById('hero-title');
  const subEl = document.getElementById('hero-sub');
  const prevBtn = document.querySelector('.hero-prev');
  const nextBtn = document.querySelector('.hero-next');
  let idx = 0;
  let interval;

  function show(i) {
    slides.forEach((s, j) => (s.style.opacity = j === i ? '1' : '0'));
    const s = slides[i];
    if (s && titleEl && subEl) {
      titleEl.textContent = s.dataset.title || 'Gateway Shop';
      subEl.textContent = s.dataset.sub || '';
    }
  }

  slides.forEach(s => {
    s.style.transition = 'opacity 0.8s ease';
    s.style.opacity = '0';
    s.style.backgroundSize = 'cover';
    s.style.backgroundPosition = 'center';
    s.style.minHeight = '320px';
    s.style.borderRadius = '12px';
  });

  show(0);
  interval = setInterval(() => {
    idx = (idx + 1) % slides.length;
    show(idx);
  }, 5000);

  function reset() {
    clearInterval(interval);
    interval = setInterval(() => {
      idx = (idx + 1) % slides.length;
      show(idx);
    }, 5000);
  }

  if (prevBtn)
    prevBtn.addEventListener('click', () => {
      idx = (idx - 1 + slides.length) % slides.length;
      show(idx);
      reset();
    });

  if (nextBtn)
    nextBtn.addEventListener('click', () => {
      idx = (idx + 1) % slides.length;
      show(idx);
      reset();
    });
}

// APPLY search and category filters
function applyFilters() {
  const searchInput = document.getElementById('search');
  const categorySelect = document.getElementById('category');
  const q = (searchInput && searchInput.value) || '';
  const query = q.trim().toLowerCase();
  const cat = (categorySelect && categorySelect.value) || '';
  const list = document.getElementById('product-list');
  if (!list) return;

  const cards = Array.from(list.querySelectorAll('.producto'));
  cards.forEach(card => {
    const nombre = (card.getAttribute('data-nombre') || '').toLowerCase();
    const desc = (card.textContent || '').toLowerCase();
    const cardCat = (card.getAttribute('data-categoria') || '').toLowerCase();
    const matchesQ = query === '' || nombre.includes(query) || desc.includes(query);
    const matchesCat = cat === '' || cardCat === '' || cardCat === cat;
    card.style.display = matchesQ && matchesCat ? 'flex' : 'none';
  });
}

// SHOW toast notification
function showToast(text) {
  const t = document.createElement('div');
  t.className = 'ui-toast';
  t.textContent = text;
  Object.assign(t.style, {
    position: 'fixed',
    right: '20px',
    bottom: '20px',
    background: '#111',
    color: '#fff',
    padding: '12px 16px',
    borderRadius: '8px',
    boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
    zIndex: 9999,
    opacity: 0,
    transform: 'translateY(10px)',
    transition: 'all .32s ease'
  });
  document.body.appendChild(t);
  requestAnimationFrame(() => {
    t.style.opacity = 1;
    t.style.transform = 'translateY(0)';
  });
  setTimeout(() => {
    t.style.opacity = 0;
    t.style.transform = 'translateY(10px)';
    setTimeout(() => t.remove(), 350);
  }, 2500);
}

// ANIMATE product image flying to cart
function flyToCart(imgEl) {
  if (!imgEl) return;
  const rect = imgEl.getBoundingClientRect();
  const clone = imgEl.cloneNode(true);
  clone.style.position = 'fixed';
  clone.style.left = rect.left + 'px';
  clone.style.top = rect.top + 'px';
  clone.style.width = rect.width + 'px';
  clone.style.height = rect.height + 'px';
  clone.classList.add('flying-image');
  document.body.appendChild(clone);

  const cartAnchor = document.querySelector('.nav .cart a') || document.getElementById('nav-cart-count');
  const targetRect = cartAnchor
    ? cartAnchor.getBoundingClientRect()
    : { left: window.innerWidth - 36, top: 24, width: 28, height: 28 };
  const dx = targetRect.left + targetRect.width / 2 - (rect.left + rect.width / 2);
  const dy = targetRect.top + targetRect.height / 2 - (rect.top + rect.height / 2);
  clone.animate(
    [
      { transform: 'translate(0,0) scale(1)', opacity: 1 },
      { transform: `translate(${dx}px, ${dy}px) scale(0.18)`, opacity: 0.6 }
    ],
    { duration: 700, easing: 'cubic-bezier(.2,.9,.2,1)' }
  );
  setTimeout(() => clone.remove(), 760);
}

// OPEN product quick view modal
function openProductModal(prod) {
  const overlay = document.createElement('div');
  overlay.className = 'product-modal-overlay';
  overlay.innerHTML = `
    <div class="product-modal" role="dialog" aria-modal="true" aria-label="Vista rápida de ${prod.nombre}">
      <div class="visual"><img src="${prod.img}" alt="${prod.nombre}"></div>
      <div class="meta">
        <h3>${prod.nombre}</h3>
        <p>${prod.desc}</p>
        <div class="price">$${parseFloat(prod.precio).toFixed(2)}</div>
        <div class="actions">
          <button class="btn" id="modal-add">Agregar al carrito</button>
          <button class="btn ghost" id="modal-close">Cerrar</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  const close = () => {
    overlay.remove();
    document.removeEventListener('keydown', onKey);
  };

  const onKey = ev => {
    if (ev.key === 'Escape') close();
  };

  const closeBtn = document.getElementById('modal-close');
  if (closeBtn) closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', ev => {
    if (ev.target === overlay) close();
  });
  document.addEventListener('keydown', onKey);

  const addBtn = document.getElementById('modal-add');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      const card = document.querySelector(`.producto[data-id="${prod.id}"]`);
      if (card) {
        const btn = card.querySelector('.agregar-carrito');
        if (btn) btn.click();
        const img = overlay.querySelector('.visual img');
        flyToCart(img);
      }
      showToast('Producto añadido al carrito');
      setTimeout(close, 420);
    });
  }
}

// HANDLE add to cart and quick view clicks
function handleGlobalClicks(e) {
  const addBtn = e.target.closest && e.target.closest('.agregar-carrito');
  if (addBtn) {
    showToast('Producto añadido al carrito');
    const navCount = document.getElementById('nav-cart-count');
    if (navCount)
      navCount.animate(
        [
          { transform: 'scale(1)', background: 'transparent' },
          { transform: 'scale(1.26)', background: '#fff' },
          { transform: 'scale(1)', background: 'transparent' }
        ],
        { duration: 420, easing: 'cubic-bezier(.2,.9,.2,1)' }
      );
    const card = addBtn.closest && addBtn.closest('.producto');
    const img = card && card.querySelector('img');
    flyToCart(img);
    return;
  }

  const qbtn = e.target.closest && e.target.closest('.quick-view');
  if (qbtn) {
    const card = qbtn.closest && qbtn.closest('.producto');
    if (!card) return;
    const prod = {
      id: card.getAttribute('data-id'),
      nombre: card.getAttribute('data-nombre'),
      precio: card.getAttribute('data-precio'),
      img: card.getAttribute('data-img'),
      desc: card.querySelector('p') ? card.querySelector('p').textContent : ''
    };
    openProductModal(prod);
    return;
  }
}

// SETUP animations for cards when they enter viewport
function initIntersectionAnimations() {
  const rows = document.querySelectorAll('.row');
  rows.forEach(row => {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const cards = row.querySelectorAll('.card');
            cards.forEach((card, i) => {
              card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
              card.style.opacity = 0;
              card.style.transform = 'translateY(18px)';
              setTimeout(() => {
                card.style.opacity = 1;
                card.style.transform = 'translateY(0)';
              }, 80 * i);
            });
            obs.disconnect();
          }
        });
      },
      { threshold: 0.12 }
    );
    obs.observe(row);
  });
}

// INIT everything when DOM loads
document.addEventListener('DOMContentLoaded', () => {
  initHeroCarousel();
  const searchInput = document.getElementById('search');
  const categorySelect = document.getElementById('category');
  if (searchInput) searchInput.addEventListener('input', applyFilters);
  if (categorySelect) categorySelect.addEventListener('change', applyFilters);
  document.body.addEventListener('click', handleGlobalClicks);
  initIntersectionAnimations();
});

// MOBILE FAB cart sync
function initFabCart() {
  let fab = document.querySelector('.fab-cart');
  if (!fab) {
    fab = document.createElement('button');
    fab.className = 'fab-cart';
    fab.setAttribute('aria-label', 'Abrir carrito');
    fab.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="9" cy="20" r="1.5"/>
        <circle cx="20" cy="20" r="1.5"/>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
      </svg>
      <span class="count">0</span>
    `;
    document.body.appendChild(fab);
  }

  // Create social links container above FAB
  let social = document.querySelector('.fab-social');
  if (!social) {
    social = document.createElement('div');
    social.className = 'fab-social';
    social.innerHTML = `
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
        <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07C2 17.06 5.64 21.13 10.33 21.9v-6.35H7.9v-2.48h2.43V10.4c0-2.4 1.43-3.73 3.62-3.73 1.05 0 2.15.19 2.15.19v2.37h-1.21c-1.2 0-1.57.75-1.57 1.52v1.83h2.67l-.43 2.48h-2.24v6.35C18.36 21.13 22 17.06 22 12.07z"/>
        </svg>
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
        <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 6.2a4.8 4.8 0 100 9.6 4.8 4.8 0 000-9.6zM18.4 6.2a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z"/>
        </svg>
      </a>
    `;
    document.body.appendChild(social);
  }

  const countEl = fab.querySelector('.count');
  function setCount(n) {
    if (countEl) countEl.textContent = n;
    if (countEl) countEl.style.display = n > 0 ? 'inline-block' : 'none';
    fab.style.display = 'flex';
  }

  if (window.carrito && Array.isArray(window.carrito)) setCount(window.carrito.length);
  window.addEventListener('cartUpdated', e => {
    const n = e && e.detail && typeof e.detail.length === 'number' ? e.detail.length : window.carrito ? window.carrito.length : 0;
    setCount(n);
  });

  fab.addEventListener('click', () => {
    const cartItems = document.getElementById('cart-items');
    if (cartItems) {
      cartItems.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else window.location.href = 'shop.html';
  });
}

initFabCart();

