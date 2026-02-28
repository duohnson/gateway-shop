let productos = [];
let carrito = [];

function persistCart() {
  try {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  } catch (e) {
    // ignore storage errors
  }

  window.carrito = carrito;
  if (window.updateNavCart) window.updateNavCart(carrito.length);
  window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { length: carrito.length } }));
}

function cargarProductos() {
  const guardados = localStorage.getItem('productos');
  if (guardados) {
    productos = JSON.parse(guardados);
    renderProductos();
    return;
  }

  fetch('productos.json')
    .then(res => (res.ok ? res.json() : []))
    .then(data => {
      productos = Array.isArray(data) ? data : [];
      if (productos.length > 0) localStorage.setItem('productos', JSON.stringify(productos));
      renderProductos();
    })
    .catch(() => {
      productos = [
        { id: 1, nombre: 'Huevos', precio: 2.5, img: 'img/huevos.jpg', desc: 'Docena de huevos frescos.', categoria: 'alimentos' },
        { id: 2, nombre: 'Leche', precio: 1.8, img: 'img/leche.jpg', desc: 'Leche entera 1L.', categoria: 'bebidas' },
        { id: 3, nombre: 'Manzanas', precio: 3.2, img: 'img/manzanas.jpg', desc: 'Bolsa de manzanas rojas (1kg).', categoria: 'alimentos' },
        { id: 4, nombre: 'Pan', precio: 1.0, img: 'img/pan.jpg', desc: 'Pan fresco artesanal.', categoria: 'panaderia' }
      ];
      localStorage.setItem('productos', JSON.stringify(productos));
      renderProductos();
    });
}

function renderProductos() {
  const productList = document.getElementById('product-list');
  if (!productList) return;
  if (!productos.length) {
    productList.innerHTML = '<p>No hay productos disponibles.</p>';
    return;
  }

  productList.innerHTML = productos
    .map(
      prod => `
      <div class="card producto" data-id="${prod.id}" data-nombre="${prod.nombre}" data-precio="${prod.precio}" data-img="${prod.img}" data-categoria="${prod.categoria}">
        <img src="${prod.img}" alt="${prod.nombre}">
        <h3>${prod.nombre}</h3>
        <p>${prod.desc}</p>
        <div class="card-actions">
          <span class="precio">$${prod.precio.toFixed(2)}</span>
          <div style="display:flex;gap:.5rem;align-items:center">
            <button class="btn small quick-view" aria-label="Vista rápida">
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zM10 14a4 4 0 110-8 4 4 0 010 8z" fill="#fff"/></svg>
            </button>
            <button class="btn agregar-carrito" aria-label="Agregar al carrito">
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M7 4h-2l-3 9v2h2a3 3 0 006 0h6a3 3 0 006 0h2v-2L20 4H7zm0 2h13.2l1.1 4H8.2L7 6zm0 12a1 1 0 110 2 1 1 0 010-2zm10 0a1 1 0 110 2 1 1 0 010-2z"/></svg>
            </button>
          </div>
        </div>
      </div>
    `
    )
    .join('');

  const cards = productList.querySelectorAll('.card');
  cards.forEach((card, i) => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(30px)';
    setTimeout(() => {
      card.style.transition = 'opacity 0.6s cubic-bezier(.4,0,.2,1), transform 0.6s cubic-bezier(.4,0,.2,1)';
      card.style.opacity = 1;
      card.style.transform = 'translateY(0)';
    }, 100 * i);
  });

  productList.querySelectorAll('.agregar-carrito').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.producto');
      const id = String(card.getAttribute('data-id'));
      const nombre = card.getAttribute('data-nombre');
      const precio = parseFloat(card.getAttribute('data-precio'));
      const img = card.getAttribute('data-img');

      let existente = carrito.find(p => String(p.id) === id);
      if (existente) {
        existente.cantidad = Number(existente.cantidad || 0) + 1;
      } else {
        carrito.push({ id, nombre, precio, img, cantidad: 1 });
      }

      persistCart();
      renderCarrito();
    });
  });
}

function renderFiltroCategorias() {
  fetch('categorias.json')
    .then(res => (res.ok ? res.json() : []))
    .then(cats => {
      const sel = document.getElementById('category');
      if (!sel || !Array.isArray(cats)) return;
      sel.innerHTML = '<option value="">Todas las categorías</option>' + cats.map(c => `<option value="${c}">${c.charAt(0).toUpperCase() + c.slice(1)}</option>`).join('');
    })
    .catch(() => {});
}

function renderCarrito() {
  const cartItems = document.getElementById('cart-items');
  if (!cartItems) return;
  if (carrito.length === 0) {
    cartItems.innerHTML = '<p>El carrito está vacío.</p>';
    persistCart();
    return;
  }

  cartItems.innerHTML =
    carrito
      .map((item, i) => {
        const lineTotal = (item.precio * item.cantidad).toFixed(2);
        return `
    <div class="card" style="display:flex;align-items:center;gap:1rem;">
      <img src="${item.img}" alt="${item.nombre}" style="width:60px;height:60px;border-radius:8px;object-fit:cover;">
      <div style="flex:1">
        <strong>${item.nombre}</strong>
        <div style="margin-top:.5rem;display:flex;align-items:center;gap:.5rem">
          <button class="btn small qty-decrease" data-index="${i}" aria-label="Disminuir">−</button>
          <span class="qty" data-index="${i}">${item.cantidad}</span>
          <button class="btn small qty-increase" data-index="${i}" aria-label="Aumentar">+</button>
        </div>
        <div style="margin-top:.4rem"><span>Precio: $${lineTotal}</span></div>
      </div>
      <div style="display:flex;flex-direction:column;gap:.4rem;align-items:flex-end">
        <button class="btn quitar-item" data-index="${i}" style="background:#fff;color:#ff8800;border:1px solid #ff8800;">Quitar</button>
      </div>
    </div>`;
      })
      .join('') +
    `<div style="text-align:right;margin-top:1rem;"><strong>Total: $${carrito
      .reduce((a, b) => a + b.precio * b.cantidad, 0)
      .toFixed(2)}</strong></div>`;

  cartItems.querySelectorAll('.quitar-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-index'));
      carrito.splice(idx, 1);
      persistCart();
      renderCarrito();
    });
  });

  // quantity handlers
  cartItems.querySelectorAll('.qty-increase').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-index'));
      if (typeof carrito[idx] !== 'undefined') {
        carrito[idx].cantidad = Number(carrito[idx].cantidad || 0) + 1;
        persistCart();
        renderCarrito();
      }
    });
  });

  cartItems.querySelectorAll('.qty-decrease').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-index'));
      if (typeof carrito[idx] !== 'undefined') {
        carrito[idx].cantidad = Number(carrito[idx].cantidad || 0) - 1;
        if (carrito[idx].cantidad <= 0) {
          carrito.splice(idx, 1);
        }
        persistCart();
        renderCarrito();
      }
    });
  });

  persistCart();
}

document.addEventListener('DOMContentLoaded', () => {
  cargarProductos();
  renderFiltroCategorias();
  const stored = localStorage.getItem('carrito');
  carrito = stored ? JSON.parse(stored) : [];
  persistCart();
  renderCarrito();
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (carrito.length === 0) {
        alert('El carrito está vacío.');
        return;
      }
      window.location.href = 'payment.html';
    });
  }
});

