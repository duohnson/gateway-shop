/* UI.JS - handles hero carousel, filters, modals, and UI animations */

/* ===========================
   HERO CAROUSEL
   =========================== */

// INIT hero carousel slider
function initHeroCarousel() {
    const slidesWrap = document.querySelector('.hero-slides');
    if (!slidesWrap) return;
    
    const slides = Array.from(slidesWrap.querySelectorAll('.slide'));
    const titleEl = document.getElementById('hero-title');
    const subEl = document.getElementById('hero-sub');
    const prevBtn = document.querySelector('.hero-prev');
    const nextBtn = document.querySelector('.hero-next');
    
    let idx = 0;
    let interval;
    
    // SHOW specific slide by index
    function show(i) {
        slides.forEach((s, j) => s.style.opacity = j === i ? '1' : '0');
        const s = slides[i];
        
        // UPDATE text content from slide data
        if (s && titleEl && subEl) {
            titleEl.textContent = s.dataset.title || 'Gateway Shop';
            subEl.textContent = s.dataset.sub || '';
        }
    }
    
    // SETUP slide styles
    slides.forEach(s => {
        s.style.transition = 'opacity 0.8s ease';
        s.style.opacity = '0';
        s.style.backgroundSize = 'cover';
        s.style.backgroundPosition = 'center';
        s.style.minHeight = '320px';
        s.style.borderRadius = '12px';
    });
    
    // SHOW first slide
    show(0);
    
    // AUTO-ADVANCE slides every 5 seconds
    interval = setInterval(() => {
        idx = (idx + 1) % slides.length;
        show(idx);
    }, 5000);
    
    // RESET auto-advance timer
    function reset() {
        clearInterval(interval);
        interval = setInterval(() => {
            idx = (idx + 1) % slides.length;
            show(idx);
        }, 5000);
    }
    
    // PREV button handler
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            idx = (idx - 1 + slides.length) % slides.length;
            show(idx);
            reset();
        });
    }
    
    // NEXT button handler
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            idx = (idx + 1) % slides.length;
            show(idx);
            reset();
        });
    }
}

/* ===========================
   PRODUCT FILTERING
   =========================== */

// APPLY search and category filters
function applyFilters() {
    const searchInput = document.getElementById('search');
    const categorySelect = document.getElementById('category');
    
    const q = (searchInput && searchInput.value || '').trim().toLowerCase();
    const cat = (categorySelect && categorySelect.value) || '';
    
    const list = document.getElementById('product-list');
    if (!list) return;
    
    const cards = Array.from(list.querySelectorAll('.producto'));
    
    // FILTER each product card
    cards.forEach(card => {
        const nombre = (card.getAttribute('data-nombre') || '').toLowerCase();
        const desc = (card.textContent || '').toLowerCase();
        const cardCat = (card.getAttribute('data-categoria') || '').toLowerCase();
        
        // CHECK if matches search query
        const matchesQ = q === '' || nombre.includes(q) || desc.includes(q);
        
        // CHECK if matches category
        const matchesCat = cat === '' || cardCat === '' || cardCat === cat;
        
        // SHOW or hide card based on filters
        card.style.display = (matchesQ && matchesCat) ? 'flex' : 'none';
    });
}

/* ===========================
   TOAST NOTIFICATIONS
   =========================== */

// SHOW toast notification
function showToast(text) {
    const t = document.createElement('div');
    t.className = 'ui-toast';
    t.textContent = text;
    
    // APPLY styles
    Object.assign(t.style, {
        position: 'fixed',
        right: '20px',
        bottom: '20px',
        background: '#111',
        color: '#fff',
        padding: '12px 16px',
        borderRadius: '8px',
        boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
        zIndex: 9999,
        opacity: 0,
        transform: 'translateY(10px)',
        transition: 'all .32s ease'
    });
    
    document.body.appendChild(t);
    
    // FADE in
    requestAnimationFrame(() => {
        t.style.opacity = 1;
        t.style.transform = 'translateY(0)';
    });
    
    // FADE out and remove after 2.5 seconds
    setTimeout(() => {
        t.style.opacity = 0;
        t.style.transform = 'translateY(10px)';
        setTimeout(() => t.remove(), 350);
    }, 2500);
}

/* ===========================
   FLY TO CART ANIMATION
   =========================== */

// ANIMATE product image flying to cart
function flyToCart(imgEl) {
    if (!imgEl) return;
    
    const rect = imgEl.getBoundingClientRect();
    const clone = imgEl.cloneNode(true);
    
    // POSITION clone at image location
    clone.style.position = 'fixed';
    clone.style.left = rect.left + 'px';
    clone.style.top = rect.top + 'px';
    clone.style.width = rect.width + 'px';
    clone.style.height = rect.height + 'px';
    clone.classList.add('flying-image');
    
    document.body.appendChild(clone);
    
    // FIND cart position
    const cartAnchor = document.querySelector('.nav .cart a') || document.getElementById('nav-cart-count');
    const targetRect = cartAnchor ? cartAnchor.getBoundingClientRect() : { left: window.innerWidth - 36, top: 24, width: 28, height: 28 };
    
    // CALCULATE movement distance
    const dx = (targetRect.left + targetRect.width / 2) - (rect.left + rect.width / 2);
    const dy = (targetRect.top + targetRect.height / 2) - (rect.top + rect.height / 2);
    
    // ANIMATE flying to cart
    clone.animate([
        { transform: 'translate(0,0) scale(1)', opacity: 1 },
        { transform: `translate(${dx}px, ${dy}px) scale(0.18)`, opacity: 0.6 }
    ], { duration: 700, easing: 'cubic-bezier(.2,.9,.2,1)' });
    
    // REMOVE clone after animation
    setTimeout(() => clone.remove(), 760);
}

/* ===========================
   PRODUCT MODAL (QUICK VIEW)
   =========================== */

// OPEN product quick view modal
function openProductModal(prod) {
    const overlay = document.createElement('div');
    overlay.className = 'product-modal-overlay';
    overlay.innerHTML = `
        <div class="product-modal" role="dialog" aria-modal="true" aria-label="Vista rápida de ${prod.nombre}">
            <div class="visual"><img src="${prod.img}" alt="${prod.nombre}"></div>
            <div class="meta">
                <h3>${prod.nombre}</h3>
                <p>${prod.desc}</p>
                <div class="price">$${parseFloat(prod.precio).toFixed(2)}</div>
                <div class="actions">
                    <button class="btn" id="modal-add">Agregar al carrito</button>
                    <button class="btn ghost" id="modal-close">Cerrar</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // CLOSE modal function
    const close = () => {
        overlay.remove();
        document.removeEventListener('keydown', onKey);
    };
    
    // CLOSE on Escape key
    const onKey = (ev) => {
        if (ev.key === 'Escape') close();
    };
    
    // ATTACH event listeners
    document.getElementById('modal-close').addEventListener('click', close);
    overlay.addEventListener('click', (ev) => {
        if (ev.target === overlay) close();
    });
    document.addEventListener('keydown', onKey);
    
    // HANDLE add to cart from modal
    document.getElementById('modal-add').addEventListener('click', () => {
        const card = document.querySelector(`.producto[data-id="${prod.id}"]`);
        if (card) {
            const btn = card.querySelector('.agregar-carrito');
            if (btn) btn.click();
            
            // FLY modal image to cart
            const img = overlay.querySelector('.visual img');
            flyToCart(img);
        }
        
        showToast('Producto añadido al carrito');
        setTimeout(close, 420);
    });
}

/* ===========================
   GLOBAL CLICK HANDLERS
   =========================== */

// HANDLE add to cart and quick view clicks
function handleGlobalClicks(e) {
    // ADD to cart button
    const addBtn = e.target.closest && e.target.closest('.agregar-carrito');
    if (addBtn) {
        showToast('Producto añadido al carrito');
        
        // ANIMATE navbar cart count
        const navCount = document.getElementById('nav-cart-count');
        if (navCount) {
            navCount.animate([
                { transform: 'scale(1)', background: 'transparent' },
                { transform: 'scale(1.26)', background: '#fff' },
                { transform: 'scale(1)', background: 'transparent' }
            ], { duration: 420, easing: 'cubic-bezier(.2,.9,.2,1)' });
        }
        
        // FLY product image to cart
        const card = addBtn.closest && addBtn.closest('.producto');
        const img = card && card.querySelector('img');
        flyToCart(img);
        return;
    }
    
    // QUICK view button
    const qbtn = e.target.closest && e.target.closest('.quick-view');
    if (qbtn) {
        const card = qbtn.closest && qbtn.closest('.producto');
        if (!card) return;
        
        const prod = {
            id: card.getAttribute('data-id'),
            nombre: card.getAttribute('data-nombre'),
            precio: card.getAttribute('data-precio'),
            img: card.getAttribute('data-img'),
            desc: card.querySelector('p') ? card.querySelector('p').textContent : ''
        };
        
        openProductModal(prod);
        return;
    }
}

/* ===========================
   INTERSECTION OBSERVER ANIMATIONS
   =========================== */

// SETUP animations for cards when they enter viewport
function initIntersectionAnimations() {
    const rows = document.querySelectorAll('.row');
    
    rows.forEach(row => {
        const obs = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const cards = row.querySelectorAll('.card');
                    cards.forEach((card, i) => {
                        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                        card.style.opacity = 0;
                        card.style.transform = 'translateY(18px)';
                        
                        setTimeout(() => {
                            card.style.opacity = 1;
                            card.style.transform = 'translateY(0)';
                        }, 80 * i);
                    });
                    
                    obs.disconnect();
                }
            });
        }, { threshold: 0.12 });
        
        obs.observe(row);
    });
}

/* ===========================
   INITIALIZATION
   =========================== */

// INIT everything when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    // INIT hero carousel
    initHeroCarousel();
    
    // SETUP filter listeners
    const searchInput = document.getElementById('search');
    const categorySelect = document.getElementById('category');
    
    if (searchInput) searchInput.addEventListener('input', applyFilters);
    if (categorySelect) categorySelect.addEventListener('change', applyFilters);
    
    // GLOBAL click handler
    document.body.addEventListener('click', handleGlobalClicks);
    
    // INIT intersection animations
    initIntersectionAnimations();
});

