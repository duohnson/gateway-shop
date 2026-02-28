#!/usr/bin/env python3
"""bulkwirte updeted js fiels for the shop visual overhual"""
import os

BASE = os.path.join(os.path.dirname(__file__), '..', 'src', 'static', 'public', 'js')

files = {}

# --- components.js ---
files['components.js'] = r'''// shared header/footer injection + nav behavior
// replaces copy-pasting the navbar in every html file

function buildNavbar() {
  var path = location.pathname.split('/').pop() || 'index.html';
  if (path === '' || path === '/') path = 'index.html';

  function cls(page) {
    return 'nav-link' + (path === page ? ' active' : '');
  }

  return '<div class="nav-container">' +
    '<div class="nav-left">' +
      '<a href="index.html" class="nav-brand">' +
        '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
          '<path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>' +
          '<line x1="3" y1="6" x2="21" y2="6"/>' +
          '<path d="M16 10a4 4 0 01-8 0"/>' +
        '</svg>' +
        'Gateway Shop' +
      '</a>' +
    '</div>' +
    '<button class="nav-toggle" aria-expanded="false" aria-label="Menú">' +
      '<span class="bar"></span><span class="bar"></span><span class="bar"></span>' +
    '</button>' +
    '<nav class="nav-links" id="nav-links">' +
      '<a class="' + cls('index.html') + '" href="index.html">' +
        '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" style="display:inline;vertical-align:-2px;margin-right:4px"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>' +
        'Inicio</a>' +
      '<a class="' + cls('shop.html') + '" href="shop.html">' +
        '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" style="display:inline;vertical-align:-2px;margin-right:4px"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>' +
        'Tienda</a>' +
      '<a class="' + cls('contact.html') + '" href="contact.html">' +
        '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" style="display:inline;vertical-align:-2px;margin-right:4px"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>' +
        'Contacto</a>' +
      '<a class="cta" href="shop.html">' +
        '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline;vertical-align:-2px;margin-right:2px">' +
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
      '<p class="text-sm text-gray-500">&copy; 2026 Gateway Shop. Todos los derechos reservados. Created by duohnson.</p>' +
      '<div class="mt-3 md:mt-0 flex gap-4">' +
        '<a href="contact.html" class="text-sm hover:underline">Contacto</a>' +
        '<a href="shop.html" class="text-sm hover:underline">Tienda</a>' +
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
'''

# --- shop.js ---
files['shop.js'] = r'''// shop page - product grid + cart sidebar

var productos = [];

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
      renderProducts();
    })
    .catch(function() {
      try {
        var stored = localStorage.getItem('productos');
        if (stored) {
          var parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length) {
            productos = parsed;
            renderProducts();
            return;
          }
        }
      } catch(e) {}

      fetch('productos.json')
        .then(function(r) { return r.ok ? r.json() : []; })
        .then(function(data) {
          productos = Array.isArray(data) ? data : [];
          renderProducts();
        })
        .catch(function() {
          productos = [];
          renderProducts();
        });
    });
}

function renderProducts() {
  var productList = document.getElementById('product-list');
  if (!productList) return;

  if (!productos.length) {
    productList.innerHTML = '<div class="empty-cart-msg" style="grid-column:1/-1"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg><p>No hay productos disponibles.</p></div>';
    updateCount(0);
    return;
  }

  productList.innerHTML = productos.map(function(p) {
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
          '<div class="flex items-center gap-2">' +
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

  updateCount(productos.length);
  bindProductEvents();
  animateCards(productList);
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
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>' +
      '<p>El carrito está vacío</p></div>';
    return;
  }

  el.innerHTML = cart.items.map(function(item, i) {
    var lineTotal = formatCurrency(item.precio * item.cantidad);
    return '<div class="cart-item">' +
      '<img src="' + escapeHtml(item.img || '') + '" alt="' + escapeHtml(item.nombre) + '"' +
      ' onerror="this.onerror=null;this.src=\'https://via.placeholder.com/160?text=Img\'"' +
      ' loading="lazy">' +
      '<div class="flex-1">' +
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
      '<button class="remove-item" type="button" data-idx="' + i + '" aria-label="Quitar" style="background:none;border:none;cursor:pointer;color:var(--color-muted);padding:4px;border-radius:6px;transition:all 0.15s">' +
        '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>' +
      '</button>' +
    '</div>';
  }).join('') +
  '<div class="cart-total"><span>Total</span><span style="color:var(--color-primary)">$' + formatCurrency(cart.total()) + '</span></div>';

  // quantity + remove handlers
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

# --- index.js ---
files['index.js'] = r'''// homepage - featured product cards

function loadFeatured() {
  var productList = document.getElementById('product-list');
  if (!productList) return;

  productList.innerHTML = '<div class="loading-skeleton" style="grid-column:1/-1">Cargando productos destacados...</div>';

  fetch('/api/productos')
    .then(function(res) {
      if (!res.ok) throw new Error('api fail');
      return res.json();
    })
    .then(function(data) {
      renderFeatured(Array.isArray(data) ? data : []);
    })
    .catch(function() {
      try {
        var stored = localStorage.getItem('productos');
        if (stored) {
          var parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length) {
            renderFeatured(parsed);
            return;
          }
        }
      } catch(e) {}

      fetch('productos.json')
        .then(function(r) { return r.ok ? r.json() : []; })
        .then(function(d) { renderFeatured(Array.isArray(d) ? d : []); })
        .catch(function() { renderFeatured([]); });
    });
}

function renderFeatured(items) {
  var productList = document.getElementById('product-list');
  if (!productList) return;
  var featured = items.slice(0, 4);

  if (!featured.length) {
    productList.innerHTML = '<div class="empty-cart-msg" style="grid-column:1/-1"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg><p>Aún no hay productos disponibles.</p></div>';
    return;
  }

  productList.innerHTML = featured.map(function(p) {
    var cat = p.categoria ? '<span class="card-badge">' + escapeHtml(p.categoria) + '</span>' : '';
    return '<div class="producto product-card fade-up"' +
      ' data-id="' + escapeHtml(String(p.id)) + '"' +
      ' data-nombre="' + escapeHtml(p.nombre) + '"' +
      ' data-precio="' + p.precio + '"' +
      ' data-img="' + escapeHtml(p.img || '') + '">' +
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
          '<button class="agregar-carrito" type="button" aria-label="Agregar al carrito">' +
            '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>' +
          '</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  }).join('');

  // bind add-to-cart on featured cards
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
    });
  });

  // animate cards
  var cards = productList.querySelectorAll('.product-card');
  cards.forEach(function(card, i) {
    card.style.opacity = 0;
    card.style.transform = 'translateY(24px)';
    setTimeout(function() {
      card.style.transition = 'opacity 0.5s cubic-bezier(.4,0,.2,1), transform 0.5s cubic-bezier(.4,0,.2,1)';
      card.style.opacity = 1;
      card.style.transform = 'translateY(0)';
    }, 80 * i);
  });
}

document.addEventListener('DOMContentLoaded', loadFeatured);
'''

# --- utils.js ---
files['utils.js'] = r'''// shared utilities

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
'''

# --- wirte all js fiels ---
for name, content in files.items():
    path = os.path.join(BASE, name)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content.lstrip('\n'))
    print(f'  ✓ js/{name}')

print('\nAll JS files updated!')
