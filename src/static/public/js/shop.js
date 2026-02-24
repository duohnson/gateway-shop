/* SHOP PAGE - handles product display, filtering, and cart managment */

// GLOBAL variables
let productos = [];
let carrito = [];

/* ===========================
   PRODUCT LOADING & RENDERING
   =========================== */

// LOAD products from JSON file or localStorage
function cargarProductos() {
    // TRY to load from localStorage first
    const guardados = localStorage.getItem('productos');
    if (guardados) {
        productos = JSON.parse(guardados);
        renderProductos();
        return;
    }
    
    // FALLBACK to fetch from productos.json
    fetch('productos.json')
        .then(res => res.ok ? res.json() : [])
        .then(data => {
            productos = Array.isArray(data) ? data : [];
            
            // SAVE to localStorage for future use
            if (productos.length > 0) {
                localStorage.setItem('productos', JSON.stringify(productos));
            }
            
            renderProductos();
        })
        .catch(() => {
            // IF both fail, use default products
            productos = [
                { id: 1, nombre: 'Huevos', precio: 2.50, img: 'img/huevos.jpg', desc: 'Docena de huevos frescos.', categoria: 'alimentos' },
                { id: 2, nombre: 'Leche', precio: 1.80, img: 'img/leche.jpg', desc: 'Leche entera 1L.', categoria: 'bebidas' },
                { id: 3, nombre: 'Manzanas', precio: 3.20, img: 'img/manzanas.jpg', desc: 'Bolsa de manzanas rojas (1kg).', categoria: 'alimentos' },
                { id: 4, nombre: 'Pan', precio: 1.00, img: 'img/pan.jpg', desc: 'Pan fresco artesanal.', categoria: 'panaderia' }
            ];
            localStorage.setItem('productos', JSON.stringify(productos));
            renderProductos();
        });
}

// RENDER products in the page
function renderProductos() {
    const productList = document.getElementById('product-list');
    if (!productList) return;
    
    // CHECK if no products
    if (!productos.length) {
        productList.innerHTML = '<p>No hay productos disponibles.</p>';
        return;
    }
    
    // BUILD product cards HTML
    productList.innerHTML = productos.map(prod => `
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
    `).join('');
    
    // ADD fade-in animation to cards
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
    
    // ATTACH event listeners to add to cart buttons
    productList.querySelectorAll('.agregar-carrito').forEach(btn => {
        btn.addEventListener('click', e => {
            const card = btn.closest('.producto');
            const id = card.getAttribute('data-id');
            const nombre = card.getAttribute('data-nombre');
            const precio = parseFloat(card.getAttribute('data-precio'));
            const img = card.getAttribute('data-img');
            
            // CHECK if product already in cart
            const existente = carrito.find(p => p.id === id);
            if (existente) {
                existente.cantidad++;
            } else {
                carrito.push({ id, nombre, precio, img, cantidad: 1 });
            }
            
            renderCarrito();
        });
    });
}

/* ===========================
   CATEGORY FILTERING
   =========================== */

// LOAD and render category filter options
function renderFiltroCategorias() {
    fetch('categorias.json')
        .then(res => res.ok ? res.json() : [])
        .then(cats => {
            const sel = document.getElementById('category');
            if (!sel) return;
            if (!Array.isArray(cats)) return;
            
            // BUILD category options
            sel.innerHTML = '<option value="">Todas las categorías</option>' +
                cats.map(c => `<option value="${c}">${c.charAt(0).toUpperCase() + c.slice(1)}</option>`).join('');
        })
        .catch(() => {
            // IGNORE errors silently
            console.warn('Could not load categories');
        });
}

/* ===========================
   CART MANAGEMENT
   =========================== */

// RENDER shopping cart
function renderCarrito() {
    const cartItems = document.getElementById('cart-items');
    if (!cartItems) return;
    
    // CHECK if cart is empty
    if (carrito.length === 0) {
        cartItems.innerHTML = '<p>El carrito está vacío.</p>';
        
        // UPDATE navbar cart count
        if (window.updateNavCart) window.updateNavCart(carrito.length);
        window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { length: carrito.length } }));
        return;
    }
    
    // BUILD cart items HTML
    cartItems.innerHTML = carrito.map((item, i) => `
        <div class="card" style="display:flex;align-items:center;gap:1rem;">
            <img src="${item.img}" alt="${item.nombre}" style="width:60px;height:60px;border-radius:8px;object-fit:cover;">
            <div style="flex:1;">
                <strong>${item.nombre}</strong><br>
                <span>Cantidad: ${item.cantidad}</span><br>
                <span>Precio: $${(item.precio * item.cantidad).toFixed(2)}</span>
            </div>
            <button class="btn quitar-item" data-index="${i}" style="background:#fff;color:#ff8800;border:1px solid #ff8800;">Quitar</button>
        </div>
    `).join('') + `<div style="text-align:right;margin-top:1rem;"><strong>Total: $${carrito.reduce((a, b) => a + b.precio * b.cantidad, 0).toFixed(2)}</strong></div>`;
    
    // ATTACH event listeners to remove buttons
    cartItems.querySelectorAll('.quitar-item').forEach(btn => {
        btn.addEventListener('click', e => {
            const idx = parseInt(btn.getAttribute('data-index'));
            carrito.splice(idx, 1);
            renderCarrito();
        });
    });
    
    // UPDATE navbar cart count
    if (window.updateNavCart) window.updateNavCart(carrito.length);
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { length: carrito.length } }));
}

/* ===========================
   INITIALIZATION
   =========================== */

// INIT everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // LOAD products and categories
    cargarProductos();
    renderFiltroCategorias();
    renderCarrito();
    
    // HANDLE checkout button
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (carrito.length === 0) {
                alert('El carrito está vacío.');
                return;
            }
            
            // PROCESS checkout
            alert('¡Gracias por tu compra!');
            carrito = [];
            renderCarrito();
        });
    }
});
