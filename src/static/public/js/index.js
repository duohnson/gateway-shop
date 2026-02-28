// hompage - featurd product cards

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
    productList.innerHTML = '<div class="empty-cart-msg" style="grid-column:1/-1"><svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg><p>Aún no hay productos disponibles.</p></div>';
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

  // bind add to cart on featurd cards
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

  // animte cards
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
