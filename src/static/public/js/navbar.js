/* NAVBAR.JS - handles navigation bar interactions and cart counter */

/* ===========================
   NAVIGATION ACTIVE STATE
   =========================== */

// INIT navbar when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.nav .links a');
    
    // HIGHLIGHT active link on click
    links.forEach(a => {
        a.addEventListener('click', () => {
            links.forEach(x => x.classList.remove('active'));
            a.classList.add('active');
        });
    });
    
    // SET active link based on current URL
    const path = location.pathname.split('/').pop();
    links.forEach(a => {
        const href = a.getAttribute('href');
        if (href === path || (href === 'index.html' && path === '')) {
            a.classList.add('active');
        }
    });
    
    /* ===========================
       MOBILE HAMBURGER MENU
       =========================== */
    
    // CREATE hamburger toggle button
    const toggle = document.createElement('button');
    toggle.className = 'nav-toggle btn';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.innerHTML = '\u2630'; // Hamburger icon
    
    const container = document.querySelector('.nav .container');
    if (container) {
        container.insertBefore(toggle, container.firstChild);
    }
    
    // CREATE collapse wrapper for mobile menu
    const collapse = document.createElement('div');
    collapse.className = 'nav-collapse';
    
    // MOVE links and cart into collapse wrapper
    const linksEl = document.querySelector('.nav .links');
    const cartEl = document.querySelector('.nav .cart');
    if (linksEl) collapse.appendChild(linksEl);
    if (cartEl) collapse.appendChild(cartEl);
    if (container) container.appendChild(collapse);
    
    // TOGGLE mobile menu visibility
    toggle.addEventListener('click', () => {
        const showing = collapse.classList.toggle('show');
        toggle.setAttribute('aria-expanded', showing ? 'true' : 'false');
    });
    
    /* ===========================
       CART COUNTER
       =========================== */
    
    // UPDATE cart count display
    function setCartCount(n) {
        const el = document.getElementById('nav-cart-count');
        if (el) el.textContent = n;
    }
    
    // TRY to set initial cart count from global cart variable
    if (window.carrito && Array.isArray(window.carrito)) {
        setCartCount(window.carrito.length);
    }
    
    // LISTEN for cart updates from other scripts
    window.addEventListener('cartUpdated', e => {
        const n = (e && e.detail && typeof e.detail.length === 'number') ? 
            e.detail.length : 
            (window.carrito ? window.carrito.length : 0);
        setCartCount(n);
    });
});

