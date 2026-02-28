function renderDestacados() {
    fetch('productos.json')
        .then(res => (res.ok ? res.json() : []))
        .then(data => {
            const productos = Array.isArray(data) ? data : [];
            const productList = document.getElementById('product-list');
            if (!productList) return;
            if (!productos.length) {
                productList.innerHTML = '<p>No hay productos disponibles.</p>';
                return;
            }

            productList.innerHTML = productos
                .slice(0, 4)
                .map(
                    prod => `
                        <div class="card producto" data-id="${prod.id}" data-nombre="${prod.nombre}" data-precio="${prod.precio}" data-img="${prod.img}">
                            <img src="${prod.img}" alt="${prod.nombre}" style="width:100%;border-radius:12px 12px 0 0;">
                            <h3>${prod.nombre}</h3>
                            <p>${prod.desc}</p>
                            <div class="card-actions"><span class="precio">$${prod.precio.toFixed(2)}</span></div>
                        </div>
                    `
                )
                .join('');
        })
        .catch(() => {
            const productList = document.getElementById('product-list');
            if (productList) productList.innerHTML = '<p>No hay productos disponibles.</p>';
        });
}

function updateNavCart(n) {
    const el = document.getElementById('nav-cart-count');
    if (el) el.textContent = n;
}

document.addEventListener('DOMContentLoaded', () => {
    renderDestacados();
    if (window.carrito && Array.isArray(window.carrito)) updateNavCart(window.carrito.length);
    window.updateNavCart = updateNavCart;
});
