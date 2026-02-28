#!/usr/bin/env python3
"""bulk updat v3:
  1. swap indigo/purpel to orange/red palete in custom.css (search-replce)
  2. apend new stlyes (pagnation, contact-containr, avatar-wrap, product-grid)
  3. rewirte shop.js with pagnation (4x4 = 16 per page)
  4. updat tailwind.config.js colurs
  5. updat tailwind.input.css colurs
"""
import os, re

BASE    = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'src', 'static', 'public')
ROOT    = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')

# ----------------------------------------------------------
# 1. color replacemnts in custom.css
# ----------------------------------------------------------
css_path = os.path.join(BASE, 'css', 'custom.css')
with open(css_path, 'r') as f:
    css = f.read()

# exact tokn replacemnts (order mattrs, longest/most-specfic first)
color_map = [
    # headr coment
    ('Indigo/purple palette', 'Orange/red palette'),
    ('indigo/purple palette', 'orange/red palette'),

    # css custom proprty values in :root (exact hex)
    ('--color-primary-dark: #4f46e5',  '--color-primary-dark: #dc2626'),
    ('--color-primary-light: #818cf8', '--color-primary-light: #f87171'),
    ('--color-primary-50: #eef2ff',    '--color-primary-50: #fef2f2'),
    ('--color-primary-100: #e0e7ff',   '--color-primary-100: #fee2e2'),
    ('--color-primary-200: #c7d2fe',   '--color-primary-200: #fecaca'),
    ('--color-primary: #6366f1',       '--color-primary: #ef4444'),
    ('--color-accent-dark: #7c3aed',   '--color-accent-dark: #ea580c'),
    ('--color-accent-light: #a78bfa',  '--color-accent-light: #fb923c'),
    ('--color-accent: #8b5cf6',        '--color-accent: #f97316'),

    # hardcoded gradent hex values (in background/linear-gradent etc.)
    ('#4f46e5', '#dc2626'),
    ('#7c3aed', '#ea580c'),
    ('#6366f1', '#ef4444'),
    ('#818cf8', '#f87171'),
    ('#8b5cf6', '#f97316'),
    ('#a78bfa', '#fb923c'),

    # rgba indgo refernces
    ('rgba(99,102,241,', 'rgba(239,68,68,'),

    # light purpel backgronds used as card img backdrp
    ('#f5f3ff', '#fff7ed'),
    ('#eef2ff', '#fef2f2'),
]

for old, new in color_map:
    css = css.replace(old, new)

# now apend new stlyes for pagnation, product-grid, contact-containr, avatar-wrap
extra_css = r'''

/* ══════════════════════════════════════════════════════════
   PRODUCT GRID (replaces old .product-list)
   ══════════════════════════════════════════════════════════ */
.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
}
@media (max-width: 1024px) {
  .product-grid { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 768px) {
  .product-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 480px) {
  .product-grid { grid-template-columns: 1fr; }
}

/* Smaller product cards for 4-col grid */
.product-grid .product-card .img-wrap {
  aspect-ratio: 3 / 2;
}
.product-grid .product-card .card-body {
  padding: .75rem 1rem 1rem;
}
.product-grid .product-card .card-body h3 {
  font-size: .875rem;
  margin-bottom: .25rem;
}
.product-grid .product-card .card-body p {
  font-size: .75rem;
  margin-bottom: .5rem;
}
.product-grid .product-card .card-actions .price {
  font-size: .9375rem;
}
.product-grid .product-card .card-actions button {
  width: 32px; height: 32px;
  min-width: 32px; min-height: 32px;
}
.product-grid .product-card .card-actions button svg {
  width: 15px; height: 15px;
}

/* ══════════════════════════════════════════════════════════
   PAGINATION
   ══════════════════════════════════════════════════════════ */
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: .375rem;
  margin-top: 2rem;
  padding: 1rem 0;
  flex-wrap: wrap;
}
.pagination button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 36px; height: 36px;
  padding: 0 .625rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  color: var(--color-text);
  font-size: .8125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all .2s;
}
.pagination button:hover:not(:disabled):not(.active) {
  border-color: var(--color-primary);
  color: var(--color-primary);
  background: var(--color-primary-50);
}
.pagination button.active {
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  color: #fff;
  border-color: transparent;
  box-shadow: 0 2px 8px rgba(239,68,68,.25);
}
.pagination button:disabled {
  opacity: .4;
  cursor: not-allowed;
}
.pagination .page-info {
  font-size: .8125rem;
  color: var(--color-muted);
  margin: 0 .5rem;
}

/* ══════════════════════════════════════════════════════════
   CONTACT PAGE – container & avatar wrap
   ══════════════════════════════════════════════════════════ */
.contact-container {
  max-width: var(--container);
  margin: 0 auto;
  padding: 2.5rem 1.25rem 4rem;
}
.contact-form-section {
  max-width: 600px;
  margin: 3rem auto 0;
}
.contact-form-section h2 {
  font-size: 1.5rem;
  font-weight: 800;
  margin: 0 0 .25rem;
  text-align: center;
}
.contact-form-section .form-subtitle {
  text-align: center;
  color: var(--color-muted);
  font-size: .9375rem;
  margin: 0 0 1.5rem;
}
.contact-form .form-actions {
  margin-top: 1.5rem;
}
.avatar-wrap {
  width: 88px; height: 88px;
  margin: 0 auto .75rem;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid var(--color-primary-100);
  background: var(--color-primary-50);
}
.avatar-wrap .avatar {
  width: 100%; height: 100%;
  object-fit: cover;
  border-radius: 50%;
  display: block;
}
.team-card .team-role {
  color: var(--color-muted);
  font-size: .8125rem;
  margin: .25rem 0 0;
}

/* ══════════════════════════════════════════════════════════
   SHOP LAYOUT
   ══════════════════════════════════════════════════════════ */
.shop-layout {
  max-width: var(--container);
  margin: 0 auto;
  padding: 2rem 1.25rem 4rem;
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 2rem;
  align-items: start;
}
.shop-layout .shop-products { min-width: 0; }
@media (max-width: 1024px) {
  .shop-layout {
    grid-template-columns: 1fr;
  }
}
'''

css += extra_css

with open(css_path, 'w') as f:
    f.write(css)
print('  ✓ custom.css – colors swapped + new styles appended')


# ----------------------------------------------------------
# 2. shop.js - full rewirte with pagnation
# ----------------------------------------------------------
shop_js = r'''// shop page - product grid + cart sidebar + pagination

var productos = [];
var currentPage = 1;
var ITEMS_PER_PAGE = 16; // 4×4 grid

function loadProducts() {
  var productList = document.getElementById('product-list');
  if (!productList) return;

  productList.innerHTML = '<div class="loading-skeleton">Cargando productos...</div>';

  fetch('/api/productos')
    .then(function(res) {
      if (!res.ok) throw new Error('api fail');
      return res.json();
    })
    .then(function(data) {
      productos = Array.isArray(data) ? data : [];
      if (productos.length) {
        try { localStorage.setItem('productos', JSON.stringify(productos)); } catch(e) {}
      }
      currentPage = 1;
      renderProducts();
    })
    .catch(function() {
      try {
        var stored = localStorage.getItem('productos');
        if (stored) {
          var parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length) {
            productos = parsed;
            currentPage = 1;
            renderProducts();
            return;
          }
        }
      } catch(e) {}

      fetch('productos.json')
        .then(function(r) { return r.ok ? r.json() : []; })
        .then(function(data) {
          productos = Array.isArray(data) ? data : [];
          currentPage = 1;
          renderProducts();
        })
        .catch(function() {
          productos = [];
          renderProducts();
        });
    });
}

function getFilteredProducts() {
  var search = (document.getElementById('search') || {}).value || '';
  var cat = (document.getElementById('category') || {}).value || '';
  search = search.trim().toLowerCase();

  return productos.filter(function(p) {
    var matchSearch = !search || (p.nombre && p.nombre.toLowerCase().indexOf(search) !== -1);
    var matchCat = !cat || p.categoria === cat;
    return matchSearch && matchCat;
  });
}

function renderProducts() {
  var productList = document.getElementById('product-list');
  if (!productList) return;

  var filtered = getFilteredProducts();

  if (!filtered.length) {
    productList.innerHTML = '<div class="empty-cart-msg" style="grid-column:1/-1">' +
      '<svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>' +
      '<p>No hay productos disponibles.</p></div>';
    updateCount(0);
    renderPagination(0);
    return;
  }

  var totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  if (currentPage > totalPages) currentPage = totalPages;
  if (currentPage < 1) currentPage = 1;

  var start = (currentPage - 1) * ITEMS_PER_PAGE;
  var pageItems = filtered.slice(start, start + ITEMS_PER_PAGE);

  productList.innerHTML = pageItems.map(function(p) {
    var cat = p.categoria ? '<span class="card-badge">' + escapeHtml(p.categoria) + '</span>' : '';
    return '<div class="producto product-card fade-up"' +
      ' data-id="' + escapeHtml(String(p.id)) + '"' +
      ' data-nombre="' + escapeHtml(p.nombre) + '"' +
      ' data-precio="' + p.precio + '"' +
      ' data-img="' + escapeHtml(p.img || '') + '"' +
      ' data-categoria="' + escapeHtml(p.categoria || '') + '">' +
      '<div class="img-wrap">' +
        cat +
        '<img src="' + escapeHtml(p.img || '') + '" alt="' + escapeHtml(p.nombre) + '" loading="lazy"' +
        ' onerror="this.onerror=null;this.src=\'https://via.placeholder.com/480x320?text=Producto\'" />' +
      '</div>' +
      '<div class="card-body">' +
        '<h3>' + escapeHtml(p.nombre) + '</h3>' +
        '<p class="line-clamp-2">' + escapeHtml(p.desc || '') + '</p>' +
        '<div class="card-actions">' +
          '<span class="price">$' + formatCurrency(p.precio) + '</span>' +
          '<div style="display:flex;align-items:center;gap:4px">' +
            '<button class="agregar-carrito" type="button" aria-label="Agregar al carrito">' +
              '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>' +
            '</button>' +
            '<button class="quick-view" type="button" aria-label="Vista rápida">' +
              '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  }).join('');

  updateCount(filtered.length);
  renderPagination(filtered.length);
  bindProductEvents();
  animateCards(productList);
}

function renderPagination(totalItems) {
  var container = document.getElementById('pagination');
  if (!container) return;

  var totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  if (totalPages <= 1) {
    container.innerHTML = '';
    return;
  }

  var html = '';

  // Previous button
  html += '<button class="page-prev"' + (currentPage <= 1 ? ' disabled' : '') + ' aria-label="Anterior">' +
    '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>' +
  '</button>';

  // Page numbers (show max 7 buttons with ellipsis)
  var pages = getPaginationRange(currentPage, totalPages);
  for (var i = 0; i < pages.length; i++) {
    var pg = pages[i];
    if (pg === '...') {
      html += '<span class="page-info">…</span>';
    } else {
      html += '<button class="page-num' + (pg === currentPage ? ' active' : '') + '" data-page="' + pg + '">' + pg + '</button>';
    }
  }

  // Next button
  html += '<button class="page-next"' + (currentPage >= totalPages ? ' disabled' : '') + ' aria-label="Siguiente">' +
    '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>' +
  '</button>';

  container.innerHTML = html;

  // Bind events
  container.querySelectorAll('.page-num').forEach(function(btn) {
    btn.addEventListener('click', function() {
      currentPage = parseInt(btn.dataset.page);
      renderProducts();
      scrollToProducts();
    });
  });
  var prevBtn = container.querySelector('.page-prev');
  if (prevBtn) prevBtn.addEventListener('click', function() {
    if (currentPage > 1) { currentPage--; renderProducts(); scrollToProducts(); }
  });
  var nextBtn = container.querySelector('.page-next');
  if (nextBtn) nextBtn.addEventListener('click', function() {
    var tp = Math.ceil(totalItems / ITEMS_PER_PAGE);
    if (currentPage < tp) { currentPage++; renderProducts(); scrollToProducts(); }
  });
}

function getPaginationRange(current, total) {
  if (total <= 7) {
    var arr = [];
    for (var i = 1; i <= total; i++) arr.push(i);
    return arr;
  }
  if (current <= 3) return [1,2,3,4,'...',total-1,total];
  if (current >= total - 2) return [1,2,'...',total-3,total-2,total-1,total];
  return [1,'...',current-1,current,current+1,'...',total];
}

function scrollToProducts() {
  var el = document.getElementById('productos');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function updateCount(n) {
  var el = document.getElementById('product-count');
  if (el) el.textContent = String(n);
}

function bindProductEvents() {
  var productList = document.getElementById('product-list');
  if (!productList) return;

  productList.querySelectorAll('.agregar-carrito').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var card = btn.closest('.producto');
      if (!card) return;
      cart.add({
        id: card.dataset.id,
        nombre: card.dataset.nombre,
        precio: card.dataset.precio,
        img: card.dataset.img
      });
      showToast('Producto añadido al carrito');
      flyToCart(card.querySelector('img'));
      renderShopCart();
    });
  });

  productList.querySelectorAll('.quick-view').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var card = btn.closest('.producto');
      if (!card) return;
      openProductModal({
        id: card.dataset.id,
        nombre: card.dataset.nombre,
        precio: card.dataset.precio,
        img: card.dataset.img,
        desc: card.querySelector('p') ? card.querySelector('p').textContent : ''
      });
    });
  });
}

function animateCards(container) {
  var cards = container.querySelectorAll('.product-card');
  cards.forEach(function(card, i) {
    card.style.opacity = 0;
    card.style.transform = 'translateY(24px)';
    setTimeout(function() {
      card.style.transition = 'opacity 0.5s cubic-bezier(.4,0,.2,1), transform 0.5s cubic-bezier(.4,0,.2,1)';
      card.style.opacity = 1;
      card.style.transform = 'translateY(0)';
    }, 60 * i);
  });
}

// cart sidebar rendering
function renderShopCart() {
  var el = document.getElementById('cart-items');
  if (!el) return;

  if (!cart.items.length) {
    el.innerHTML = '<div class="empty-cart-msg">' +
      '<svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>' +
      '<p>El carrito está vacío</p></div>';
    return;
  }

  el.innerHTML = cart.items.map(function(item, i) {
    var lineTotal = formatCurrency(item.precio * item.cantidad);
    return '<div class="cart-item">' +
      '<img src="' + escapeHtml(item.img || '') + '" alt="' + escapeHtml(item.nombre) + '"' +
      ' onerror="this.onerror=null;this.src=\'https://via.placeholder.com/160?text=Img\'"' +
      ' loading="lazy">' +
      '<div style="flex:1">' +
        '<strong style="font-size:0.875rem;color:var(--color-text)">' + escapeHtml(item.nombre) + '</strong>' +
        '<div style="margin-top:0.5rem;display:flex;align-items:center;gap:0.5rem">' +
          '<div class="qty-controls">' +
            '<button class="qty-btn decrease" type="button" data-idx="' + i + '" aria-label="Disminuir">−</button>' +
            '<span class="qty-value">' + item.cantidad + '</span>' +
            '<button class="qty-btn increase" type="button" data-idx="' + i + '" aria-label="Aumentar">+</button>' +
          '</div>' +
          '<span style="font-size:0.8125rem;color:var(--color-muted)">$' + lineTotal + '</span>' +
        '</div>' +
      '</div>' +
      '<button class="remove-item" type="button" data-idx="' + i + '" aria-label="Quitar">' +
        '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>' +
      '</button>' +
    '</div>';
  }).join('') +
  '<div class="cart-total"><span>Total</span><span style="color:var(--color-primary)">$' + formatCurrency(cart.total()) + '</span></div>';

  el.querySelectorAll('.remove-item').forEach(function(btn) {
    btn.addEventListener('click', function() {
      cart.remove(parseInt(btn.dataset.idx));
      renderShopCart();
    });
  });
  el.querySelectorAll('.qty-btn.increase').forEach(function(btn) {
    btn.addEventListener('click', function() {
      cart.updateQty(parseInt(btn.dataset.idx), 1);
      renderShopCart();
    });
  });
  el.querySelectorAll('.qty-btn.decrease').forEach(function(btn) {
    btn.addEventListener('click', function() {
      cart.updateQty(parseInt(btn.dataset.idx), -1);
      renderShopCart();
    });
  });
}

function loadCategories() {
  fetch('categorias.json')
    .then(function(res) { return res.ok ? res.json() : []; })
    .then(function(cats) {
      var sel = document.getElementById('category');
      if (!sel || !Array.isArray(cats)) return;
      sel.innerHTML = '<option value="">Todas las categorías</option>' +
        cats.map(function(c) {
          return '<option value="' + escapeHtml(c) + '">' + escapeHtml(c.charAt(0).toUpperCase() + c.slice(1)) + '</option>';
        }).join('');
    })
    .catch(function() {});
}

document.addEventListener('DOMContentLoaded', function() {
  loadProducts();
  loadCategories();
  renderShopCart();

  // Search & filter
  var searchInput = document.getElementById('search');
  var categorySelect = document.getElementById('category');
  if (searchInput) {
    var debounce;
    searchInput.addEventListener('input', function() {
      clearTimeout(debounce);
      debounce = setTimeout(function() { currentPage = 1; renderProducts(); }, 300);
    });
  }
  if (categorySelect) {
    categorySelect.addEventListener('change', function() { currentPage = 1; renderProducts(); });
  }

  var checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
      if (!cart.items.length) {
        showToast('El carrito está vacío');
        return;
      }
      window.location.href = 'payment.html';
    });
  }
});
'''

shop_path = os.path.join(BASE, 'js', 'shop.js')
with open(shop_path, 'w') as f:
    f.write(shop_js.lstrip('\n'))
print('  ✓ shop.js – rewritten with pagination')


# ----------------------------------------------------------
# 3. tailwind.config.js
# ----------------------------------------------------------
tw_config = r'''/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/static/public/**/*.html',
    './src/static/public/**/*.js',
    './src/**/*.{html,js,go}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ef4444',
          50:  '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d'
        },
        accent: {
          DEFAULT: '#f97316',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c'
        },
        neutral: {
          50:  '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial']
      },
      borderRadius: {
        xl:  '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem'
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0,0,0,0.07), 0 10px 20px -2px rgba(0,0,0,0.04)',
        'glow': '0 0 20px rgba(239,68,68,0.15)'
      }
    },
  },
  safelist: [
    'from-red-500',
    'to-orange-500',
    'from-red-600',
    'to-orange-600',
    'text-red-600',
    'bg-red-500',
    'bg-red-600',
    'hover:bg-red-600',
    'text-orange-600',
    'bg-white',
    'text-gray-500',
    'text-gray-600',
    'bg-gray-100',
    'bg-gray-50',
    'text-gray-800',
    'bg-transparent',
    'border-white',
    'text-white',
    'hover:underline',
    'gap-8'
  ],
  plugins: [],
}
'''

tw_path = os.path.join(ROOT, 'tailwind.config.js')
with open(tw_path, 'w') as f:
    f.write(tw_config.lstrip('\n'))
print('  ✓ tailwind.config.js – orange/red palette')


# ----------------------------------------------------------
# 4. tailwind.input.css
# ----------------------------------------------------------
tw_input = r'''@tailwind base;
@tailwind components;
@tailwind utilities;

/* Project base and component layers – orange/red design system */
:root{
	/* Core palette tokens */
	--color-primary: #ef4444;
	--color-primary-dark: #dc2626;
	--color-primary-50: #fef2f2;
	--color-primary-100: #fee2e2;
	--color-primary-200: #fecaca;
	--color-accent: #f97316;
	--color-accent-dark: #ea580c;
	--color-bg: #f8fafc;
	--color-surface: #ffffff;
	--color-text: #0f172a;
	--color-muted: #64748b;
	--color-border: #e2e8f0;
	--radius-lg: 16px;
	--container: 1200px;
}

@layer base {
	html {
		font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		line-height: 1.6;
		color: var(--color-text);
		background: var(--color-bg);
		-webkit-font-feature-settings: "kern" 1;
	}
	body { margin: 0; }
	a { color: inherit; text-decoration: none }
	h1,h2,h3,h4 { color: var(--color-text); }
}

@layer components {
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.625rem 1.25rem;
		border-radius: 0.5rem;
		font-weight: 600;
		font-size: 0.875rem;
		transition: all 0.2s cubic-bezier(.4,0,.2,1);
		box-shadow: 0 1px 2px rgba(0,0,0,0.05);
		cursor: pointer;
	}
	.btn-primary {
		background: linear-gradient(135deg, #ef4444, #f97316);
		color: #fff;
		border: none;
	}
	.btn-primary:hover {
		background: linear-gradient(135deg, #dc2626, #ea580c);
		transform: translateY(-1px);
		box-shadow: 0 4px 12px rgba(239,68,68,0.3);
	}
	.btn-ghost {
		background: transparent;
		border: 1.5px solid rgba(255,255,255,0.9);
		color: #fff;
	}
	.btn-ghost:hover {
		background: rgba(255,255,255,0.1);
	}
	.card {
		background: #fff;
		border-radius: 1rem;
		padding: 1rem;
		box-shadow: 0 2px 15px -3px rgba(0,0,0,0.07), 0 10px 20px -2px rgba(0,0,0,0.04);
		border: 1px solid var(--color-border);
	}
}

/* Place for additional @apply-based helpers */
'''

tw_input_path = os.path.join(BASE, 'css', 'tailwind.input.css')
with open(tw_input_path, 'w') as f:
    f.write(tw_input.lstrip('\n'))
print('  ✓ tailwind.input.css – orange/red palette')


print('\n✅ All updates applied! Run: node scripts/build-tailwind.js')
