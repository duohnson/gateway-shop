// shop page - product grid + cart sidebar

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
      // sync api data to localstorage so upload page stays in sync
      if (productos.length) {
        try { localStorage.setItem('productos', JSON.stringify(productos)); } catch(e) {}
      }
      renderProducts();
    })
    .catch(function() {
      // api down, check localstorage first (has uploaded products), then static file
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
    productList.innerHTML = '<p>No hay productos disponibles.</p>';
    updateCount(0);
    return;
  }

  productList.innerHTML = productos.map(function(p) {
    return '<div class="card producto product-card fade-up bg-white rounded-lg shadow hover:shadow-md overflow-hidden flex flex-col"' +
      ' data-id="' + escapeHtml(String(p.id)) + '"' +
      ' data-nombre="' + escapeHtml(p.nombre) + '"' +
      ' data-precio="' + p.precio + '"' +
      ' data-img="' + escapeHtml(p.img || '') + '"' +
      ' data-categoria="' + escapeHtml(p.categoria || '') + '">' +
      '<div class="img-wrap">' +
        '<img src="' + escapeHtml(p.img || '') + '" alt="' + escapeHtml(p.nombre) + '" loading="lazy"' +
        ' onerror="this.onerror=null;this.src=\'https://via.placeholder.com/480x320?text=Producto\'" />' +
      '</div>' +
      '<div class="card-body">' +
        '<h3 class="text-lg font-semibold text-gray-800">' + escapeHtml(p.nombre) + '</h3>' +
        '<p class="text-sm text-gray-600 mt-2">' + escapeHtml(p.desc || '') + '</p>' +
        '<div class="card-actions">' +
          '<span class="price">$' + formatCurrency(p.precio) + '</span>' +
          '<div class="flex items-center gap-2">' +
            '<button class="agregar-carrito bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-md" type="button" aria-label="Agregar al carrito">' +
              '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M7 4h-2l-3 9v2h2a3 3 0 006 0h6a3 3 0 006 0h2v-2L20 4H7zm0 2h13.2l1.1 4H8.2L7 6zm0 12a1 1 0 110 2 1 1 0 010-2zm10 0a1 1 0 110 2 1 1 0 010-2z" fill="currentColor"/></svg>' +
            '</button>' +
            '<button class="quick-view bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-2 rounded-md" type="button" aria-label="Vista rápida">' +
              '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zM10 14a4 4 0 110-8 4 4 0 010 8z" fill="currentColor"/></svg>' +
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
  var cards = container.querySelectorAll('.card');
  cards.forEach(function(card, i) {
    card.style.opacity = 0;
    card.style.transform = 'translateY(30px)';
    setTimeout(function() {
      card.style.transition = 'opacity 0.6s cubic-bezier(.4,0,.2,1), transform 0.6s cubic-bezier(.4,0,.2,1)';
      card.style.opacity = 1;
      card.style.transform = 'translateY(0)';
    }, 80 * i);
  });
}

// cart sidebar rendering
function renderShopCart() {
  var el = document.getElementById('cart-items');
  if (!el) return;

  if (!cart.items.length) {
    el.innerHTML = '<p class="text-gray-500">El carrito está vacío.</p>';
    return;
  }

  el.innerHTML = cart.items.map(function(item, i) {
    var lineTotal = formatCurrency(item.precio * item.cantidad);
    return '<div class="bg-white rounded-lg shadow p-3 flex items-center gap-4">' +
      '<img src="' + escapeHtml(item.img || '') + '" alt="' + escapeHtml(item.nombre) + '"' +
      ' onerror="this.onerror=null;this.src=\'https://via.placeholder.com/160?text=Img\'"' +
      ' class="w-16 h-16 rounded-md object-cover" loading="lazy">' +
      '<div class="flex-1">' +
        '<strong class="block text-gray-800">' + escapeHtml(item.nombre) + '</strong>' +
        '<div class="mt-2 flex items-center gap-2">' +
          '<button class="qty-btn decrease bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded" type="button" data-idx="' + i + '" aria-label="Disminuir">−</button>' +
          '<span class="qty px-2">' + item.cantidad + '</span>' +
          '<button class="qty-btn increase bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded" type="button" data-idx="' + i + '" aria-label="Aumentar">+</button>' +
        '</div>' +
        '<div class="mt-2 text-sm text-gray-600">$' + lineTotal + '</div>' +
      '</div>' +
      '<button class="remove-item bg-white text-orange-500 border border-orange-500 px-3 py-1 rounded" type="button" data-idx="' + i + '">Quitar</button>' +
    '</div>';
  }).join('') +
  '<div class="mt-4 text-right font-bold">Total: $' + formatCurrency(cart.total()) + '</div>';

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
