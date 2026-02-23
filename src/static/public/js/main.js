/* MAIN.JS - provides shared cart functionality and animations */

// GLOBAL cart variable (shared across pages)
let carrito = [];

/* ===========================
   CART RENDERING
   =========================== */

// RENDER cart items on the page
function renderCarrito() {
    const cartItems = document.getElementById('cart-items');
    if (!cartItems) return;
    
    // CHECK if cart empty
    if (carrito.length === 0) {
        cartItems.innerHTML = '<p>El carrito está vacío.</p>';
        
        // UPDATE navbar cart counter
        if (window.updateNavCart) window.updateNavCart(carrito.length);
        window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { length: carrito.length } }));
        return;
    }
    
    // BUILD cart HTML with items
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
    
    // ATTACH remove button listeners
    cartItems.querySelectorAll('.quitar-item').forEach(btn => {
        btn.addEventListener('click', e => {
            const idx = parseInt(btn.getAttribute('data-index'));
            carrito.splice(idx, 1);
            renderCarrito();
        });
    });
    
    // UPDATE navbar counter
    if (window.updateNavCart) window.updateNavCart(carrito.length);
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { length: carrito.length } }));
}

/* ===========================
   PRODUCT ANIMATIONS
   =========================== */

// INIT when page loads
document.addEventListener('DOMContentLoaded', () => {
    // FADE-IN animation for product cards
    const productList = document.getElementById('product-list');
    if (productList) {
        const observer = new MutationObserver(() => {
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
        });
        
        observer.observe(productList, { childList: true });
    }
    
    // ADD click animation to all buttons
    document.querySelectorAll('button, .btn').forEach(btn => {
        btn.addEventListener('click', e => {
            btn.classList.add('btn-pressed');
            setTimeout(() => btn.classList.remove('btn-pressed'), 200);
        });
    });
    
    // ADD button click styles (if not already added)
    if (!document.getElementById('btn-animation-styles')) {
        const style = document.createElement('style');
        style.id = 'btn-animation-styles';
        style.textContent = `
            .btn-pressed {
                transform: scale(0.96) !important;
                filter: brightness(0.95);
                box-shadow: 0 1px 2px 0 rgba(255,136,0,0.10) !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // ATTACH add to cart button handlers
    document.querySelectorAll('.agregar-carrito').forEach(btn => {
        btn.addEventListener('click', e => {
            const card = btn.closest('.producto');
            if (!card) return;
            
            const id = card.getAttribute('data-id');
            const nombre = card.getAttribute('data-nombre');
            const precio = parseFloat(card.getAttribute('data-precio'));
            const img = card.getAttribute('data-img');
            
            // CHECK if product already exists in cart
            const existente = carrito.find(p => p.id === id);
            if (existente) {
                existente.cantidad++;
            } else {
                carrito.push({ id, nombre, precio, img, cantidad: 1 });
            }
            
            renderCarrito();
        });
    });
    
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

