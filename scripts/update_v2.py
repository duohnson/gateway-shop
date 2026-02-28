#!/usr/bin/env python3
"""bulk updat: orange/red palete, 4x4 cards with pagnation, fix contact.html"""
import os

BASE = os.path.join(os.path.dirname(__file__), '..', 'src', 'static', 'public')

files = {}

# --- contact.html (completly rewrtten, centerd, proper avatar circels) ---
files['contact.html'] = r'''<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Contacta al equipo de Gateway Shop.">
  <title>Contacto - Gateway Shop</title>
  <link rel="icon" href="img/favicon.ico" type="image/x-icon">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/tailwind.css">
  <link rel="stylesheet" href="css/custom.css">
  <script src="js/components.js" defer></script>
  <script src="js/utils.js" defer></script>
  <script src="js/cart.js" defer></script>
  <script src="js/ui.js" defer></script>
  <script src="js/contact.js" defer></script>
</head>
<body>
  <header id="site-header" class="site-header"></header>

  <section class="contact-hero">
    <h1>Nuestro Equipo</h1>
    <p>Conoce a los creadores detrás de Gateway Shop y ponte en contacto con nosotros.</p>
  </section>

  <main>
    <div class="contact-container">
      <!-- Team cards -->
      <section class="team-grid fade-up">
        <div class="team-card designer card" data-username="duohnson">
          <div class="avatar-wrap">
            <img class="avatar" alt="duohnson avatar" loading="lazy">
          </div>
          <h3 class="gh-name">duohnson</h3>
          <p class="team-role">Desarrollador</p>
          <a class="github-link gh-link" href="https://github.com/duohnson" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            github.com/duohnson
          </a>
        </div>
        <div class="team-card designer card" data-username="P3terPl4y">
          <div class="avatar-wrap">
            <img class="avatar" alt="P3terPl4y avatar" loading="lazy">
          </div>
          <h3 class="gh-name">P3terPl4y</h3>
          <p class="team-role">Desarrollador</p>
          <a class="github-link gh-link" href="https://github.com/P3terPl4y" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            github.com/P3terPl4y
          </a>
        </div>
      </section>

      <!-- Contact form -->
      <section class="contact-form-section fade-up">
        <h2>Envíanos un mensaje</h2>
        <p class="form-subtitle">Responderemos lo antes posible.</p>
        <form id="contact-form" class="contact-form">
          <div class="form-group">
            <label for="cf-nombre">Nombre</label>
            <input id="cf-nombre" type="text" name="nombre" placeholder="Tu nombre" required>
          </div>
          <div class="form-group">
            <label for="cf-email">Email</label>
            <input id="cf-email" type="email" name="email" placeholder="tu@ejemplo.com" required>
          </div>
          <div class="form-group">
            <label for="cf-telefono">Teléfono (incluye código de país)</label>
            <input id="cf-telefono" type="tel" name="telefono" placeholder="+34 600 000 000" required>
          </div>
          <div class="form-group">
            <label for="cf-comentario">Comentario</label>
            <textarea id="cf-comentario" name="comentario" rows="4" placeholder="Tu mensaje..."></textarea>
          </div>
          <div class="form-actions">
            <button class="checkout-btn" type="submit">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              Enviar mensaje
            </button>
          </div>
        </form>
      </section>
    </div>
  </main>

  <footer id="site-footer" class="site-footer"></footer>
</body>
</html>
'''

# --- shop.html (grid 4 cols, pagnation placeholdr) ---
files['shop.html'] = r'''<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Tienda Gateway Shop - Encuentra los mejores productos para tu hogar.">
  <title>Gateway Shop - Tienda</title>
  <link rel="icon" href="img/favicon.ico" type="image/x-icon">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/tailwind.css">
  <link rel="stylesheet" href="css/custom.css">
  <script src="js/components.js" defer></script>
  <script src="js/utils.js" defer></script>
  <script src="js/cart.js" defer></script>
  <script src="js/ui.js" defer></script>
  <script src="js/shop.js" defer></script>
</head>
<body>
  <header id="site-header" class="site-header"></header>

  <section class="shop-hero">
    <div class="shop-hero-inner">
      <div class="shop-hero-img" style="background-image:url('img/market2.jpg')"></div>
      <div class="shop-hero-text">
        <h2>Encuentra lo mejor para tu hogar</h2>
        <p>Productos seleccionados, entregas seguras y ofertas exclusivas.</p>
        <div class="search-bar">
          <input id="search" placeholder="Buscar productos..." />
          <select id="category">
            <option value="">Todas las categorías</option>
          </select>
        </div>
      </div>
    </div>
  </section>

  <main>
    <div class="shop-layout">
      <section id="productos" class="shop-products">
        <div class="section-header">
          <h2>Productos</h2>
          <div class="product-count-label">Mostrando <span id="product-count" style="font-weight:700;color:var(--color-primary)">0</span> productos</div>
        </div>
        <div id="product-list" class="product-grid"></div>
        <div id="pagination" class="pagination"></div>
      </section>

      <aside class="shop-sidebar">
        <div class="cart-sidebar">
          <h2>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>
            Carrito
          </h2>
          <div id="cart-items"></div>
          <button id="checkout-btn" type="button" class="checkout-btn">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
            Finalizar compra
          </button>
        </div>
      </aside>
    </div>
  </main>

  <footer id="site-footer" class="site-footer"></footer>
</body>
</html>
'''

# wirte html fiels
for name, content in files.items():
    path = os.path.join(BASE, name)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content.lstrip('\n'))
    print(f'  ✓ {name}')

print('\nHTML files updated!')
