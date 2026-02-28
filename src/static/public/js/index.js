// homepage - featured products

document.addEventListener('DOMContentLoaded', function() {
  var productList = document.getElementById('product-list');
  if (!productList) return;

  // loading state
  productList.innerHTML = '<div class="loading-skeleton">Cargando productos...</div>';

  fetch('/api/productos')
    .then(function(res) {
      if (!res.ok) throw new Error('api down');
      return res.json();
    })
    .then(function(data) {
      var list = Array.isArray(data) ? data : [];
      // cache to localstorage so other pages stay in sync
      if (list.length) {
        try { localStorage.setItem('productos', JSON.stringify(list)); } catch(e) {}
      }
      return list;
    })
    .catch(function() {
      // api down, try localstorage then static json
      try {
        var stored = localStorage.getItem('productos');
        if (stored) {
          var parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length) return parsed;
        }
      } catch(e) {}
      return fetch('productos.json').then(function(r) { return r.ok ? r.json() : []; });
    })
    .then(function(data) {
      var productos = Array.isArray(data) ? data : [];
      if (!productos.length) {
        productList.innerHTML = '<p>No hay productos disponibles.</p>';
        return;
      }

      // show first 4 as featured
      productList.innerHTML = productos.slice(0, 4).map(function(p) {
        return '<div class="card producto product-card fade-up bg-white rounded-lg shadow overflow-hidden flex flex-col"' +
          ' data-id="' + escapeHtml(String(p.id)) + '"' +
          ' data-nombre="' + escapeHtml(p.nombre) + '"' +
          ' data-precio="' + p.precio + '"' +
          ' data-img="' + escapeHtml(p.img || '') + '">' +
          '<div class="img-wrap">' +
            '<img src="' + escapeHtml(p.img || '') + '" alt="' + escapeHtml(p.nombre) + '" loading="lazy"' +
            ' onerror="this.onerror=null;this.src=\'https://via.placeholder.com/480x320?text=Producto\'" />' +
          '</div>' +
          '<div class="card-body">' +
            '<h3 class="text-md font-semibold text-gray-800">' + escapeHtml(p.nombre) + '</h3>' +
            '<p class="text-sm text-gray-600 mt-2">' + escapeHtml(p.desc || '') + '</p>' +
            '<div class="card-actions">' +
              '<span class="price">$' + formatCurrency(p.precio) + '</span>' +
              '<button class="agregar-carrito bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-md" type="button" aria-label="Agregar al carrito">Agregar</button>' +
            '</div>' +
          '</div>' +
        '</div>';
      }).join('');

      // observe new cards for fade-up
      var cards = productList.querySelectorAll('.fade-up');
      if (cards.length) {
        var io = new IntersectionObserver(function(entries) {
          entries.forEach(function(e) {
            if (e.isIntersecting) e.target.classList.add('in');
          });
        }, { threshold: 0.15 });
        cards.forEach(function(c) { io.observe(c); });
      }

      // add to cart click handlers
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
    })
    .catch(function() {
      productList.innerHTML = '<p>No hay productos disponibles.</p>';
    });
});
