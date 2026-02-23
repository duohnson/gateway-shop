/* INDEX PAGE - MAIN functionality for homepage */

// RENDER featured products on index page
function renderDestacados() {
    fetch('productos.json')
        .then(res => res.ok ? res.json() : [])
        .then(data => {
            const productos = Array.isArray(data) ? data : [];
            const productList = document.getElementById('product-list');
            
            // CHECK if no products available
            if (!productos.length) {
                productList.innerHTML = '<p>No hay productos disponibles.</p>';
                return;
            }
            
            // DISPLAY only first 4 products on homepage
            productList.innerHTML = productos.slice(0, 4).map(prod => `
                <div class="card producto" data-id="${prod.id}" data-nombre="${prod.nombre}" data-precio="${prod.precio}" data-img="${prod.img}">
                    <img src="${prod.img}" alt="${prod.nombre}" style="width:100%;border-radius:12px 12px 0 0;">
                    <h3>${prod.nombre}</h3>
                    <p>${prod.desc}</p>
                    <div class="card-actions">
                        <span class="precio">$${prod.precio.toFixed(2)}</span>
                    </div>
                </div>
            `).join('');
        })
        .catch(() => {
            // ERROR handeling - show message when fetch fail
            document.getElementById('product-list').innerHTML = '<p>No hay productos disponibles.</p>';
        });
}

// UPDATE cart count in navbar
function updateNavCart(n) {
    const el = document.getElementById('nav-cart-count');
    if (el) el.textContent = n;
}

// INIT on page load
document.addEventListener('DOMContentLoaded', () => {
    renderDestacados();
    
    // TRY to update cart count if cart exists
    if (window.carrito && Array.isArray(window.carrito)) {
        updateNavCart(window.carrito.length);
    }
    
    // MAKE function available globally
    window.updateNavCart = updateNavCart;
});
