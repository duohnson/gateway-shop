/* SHOP PAGE - handles product display, filtering, and cart managment */

// GLOBAL variables
let productos
let carrito = []

/* ===========================
   PRODUCT LOADING & RENDERING
   =========================== */

// LOAD products from JSON file or localStorage
async function cargarProductos() {
    // TRY to load from localStorage first
    const guardados = localStorage.getItem('productos')
    if (guardados) {
        productos = guardados
        renderProductos()
        return
    }
    var category = document.getElementById("category").value
    // FALLBACK to fetch from productos.json
    const response = await fetch(`https://localhost:3500/` + category)
    const data = await response.json()
    // IF both fail, use default products
    productos = data
    console.log(productos)
    localStorage.setItem('productos', data)
    renderProductos()
}

// RENDER products in the page
function renderProductos() {
    var list = []
    const productList = document.getElementById('product-list')
    if (!productList) return

    // CHECK if no products
    if (!productos.length) {
        productList.innerHTML = '<p>No hay productos disponibles.</p>'
        return
    }

    // BUILD product cards HTML
    productos.forEach(prod => {
        console.log(prod.price)
        var product = `
        <div class="card producto" data-id="${prod.id}" data-name="${prod.name}" data-price="${prod.price}" data-img="${prod.image}" data-categoria="${prod.category}">
            <img src="${prod.image}" alt="${prod.name}">
            <h3>${prod.name}</h3>
            <p>${prod.brand}</p>
            <div class="card-actions">
                <span class="price">$${prod.price.toFixed(2)}</span>
                <div style="display:flexgap:.5remalign-items:center">
                    <button class="btn small quick-view" aria-label="Vista rápida">
                        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zM10 14a4 4 0 110-8 4 4 0 010 8z" fill="#fff"/></svg>
                    </button>
                    <button onclick='addItem(${prod})' class="btn agregar-carrito" aria-label="Agregar al carrito">
                        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M7 4h-2l-3 9v2h2a3 3 0 006 0h6a3 3 0 006 0h2v-2L20 4H7zm0 2h13.2l1.1 4H8.2L7 6zm0 12a1 1 0 110 2 1 1 0 010-2zm10 0a1 1 0 110 2 1 1 0 010-2z"/></svg>
                    </button>
                </div>
            </div>
        </div>
    `
        list.push(product)
    })
    productList.innerHTML = list.join('')

    // ADD fade-in animation to cards
    const cards = productList.querySelectorAll('.card')
    cards.forEach((card, i) => {
        card.style.opacity = 0
        card.style.transform = 'translateY(30px)'
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s cubic-bezier(.4,0,.2,1), transform 0.6s cubic-bezier(.4,0,.2,1)'
            card.style.opacity = 1
            card.style.transform = 'translateY(0)'
        }, 100 * i)
    })

    // ATTACH event listeners to add to cart buttons
    productList.querySelectorAll('.agregar-carrito').forEach(btn => {
        btn.addEventListener('click', e => {
            const card = btn.closest('.producto')
            const id = card.getAttribute('data-id')
            const name = card.getAttribute('data-name')
            const price = parseFloat(card.getAttribute('data-price'))
            const img = card.getAttribute('data-img')

            // CHECK if product already in cart
            const existente = carrito.find(p => p.id === id)
            if (existente) {
                existente.cantidad++
            } else {
                carrito.push({ id, name, price, img, cantidad: 1 })
            }

            renderCarrito()
        })
    })
}
/* ===========================
   ADD ITEM
   =========================== */
function addItem(product) {

    console.log(product)
}
/* ===========================
   CATEGORY FILTERING
   =========================== */

// LOAD and render category filter options
async function renderFiltroCategorias() {
    await fetch('public/categorias.json')
        .then(res => res.ok ? res.json() : [])
        .then(cats => {
            const sel = document.getElementById('category')
            if (!sel) return
            if (!Array.isArray(cats)) return

            // BUILD category options
            sel.innerHTML = '<option value="">Todas las categorías</option>' +
                cats.map(c => `<option value="${c}">${c.charAt(0).toUpperCase() + c.slice(1)}</option>`).join('')
        })
        .catch(() => {
            // IGNORE errors silently
            console.warn('Could not load categories')
        })
}

/* ===========================
   CART MANAGEMENT
   =========================== */

// RENDER shopping cart
async function renderCarrito() {
    const cartItems = document.getElementById('cart-items')
    if (!cartItems) return

    // CHECK if cart is empty
    if (carrito.length === 0) {
        cartItems.innerHTML = '<p>El carrito está vacío.</p>'

        // UPDATE navbar cart count
        if (window.updateNavCart) window.updateNavCart(carrito.length)
        window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { length: carrito.length } }))
        return
    }

    // BUILD cart items HTML
    cartItems.innerHTML = carrito.map((item, i) => `
        <div class="card" style="display:flexalign-items:centergap:1rem">
            <img src="${item.img}" alt="${item.name}" style="width:60pxheight:60pxborder-radius:8pxobject-fit:cover">
            <div style="flex:1">
                <strong>${item.name}</strong><br>
                <span>Cantidad: ${item.cantidad}</span><br>
                <span>price: $${(item.price * item.cantidad).toFixed(2)}</span>
            </div>
            <button class="btn quitar-item" data-index="${i}" style="background:#fffcolor:#ff8800border:1px solid #ff8800">Quitar</button>
        </div>
    `).join('') + `<div style="text-align:rightmargin-top:1rem"><strong>Total: $${carrito.reduce((a, b) => a + b.price * b.cantidad, 0).toFixed(2)}</strong></div>`

    // ATTACH event listeners to remove buttons
    cartItems.querySelectorAll('.quitar-item').forEach(btn => {
        btn.addEventListener('click', e => {
            const idx = parseInt(btn.getAttribute('data-index'))
            carrito.splice(idx, 1)
            items = []
            renderCarrito()
        })
    })

    // UPDATE navbar cart count
    if (window.updateNavCart) window.updateNavCart(carrito.length)
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { length: carrito.length } }))
}
/* ===========================
   BUY
   =========================== */
async function buy() {
    for (let i = 0; i <= items.length; i++) {
        alert(items[i])

    }
    const response = await fetch("https://localhost:3500/buy", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            Items: items
        })
    })
    if (response.ok) {
        alert("Exito al comparar")
        window.location.href = "/shop"
    }
}

/* ===========================
   INITIALIZATION
   =========================== */

// INIT everything when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    // LOAD products and categories
    await renderFiltroCategorias()
    renderCarrito()

    // HANDLE checkout button
    const checkoutBtn = document.getElementById('checkout-btn')
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (carrito.length === 0) {
                alert('El carrito está vacío.')
                return
            }

            // PROCESS checkout
            alert('¡Gracias por tu compra!')
            carrito = []
            renderCarrito()
        })
    }
})
document.getElementById("category").addEventListener("change", async () => {
    localStorage.removeItem("productos")
    console.log(2)
    await cargarProductos()
})
document.getElementById("checkout-btn").addEventListener("click", async () => {
    await buy()
})