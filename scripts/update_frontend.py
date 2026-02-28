#!/usr/bin/env python3
"""bulkwirte updeted frontend fiels for the shop visual overhual"""
import os

BASE = os.path.join(os.path.dirname(__file__), '..', 'src', 'static', 'public')

files = {}

# --- index.html ---
files['index.html'] = r'''<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Gateway Shop - Tu marketplace confiable con los mejores productos, precios y envío rápido.">
  <meta property="og:title" content="Gateway Shop - Tu Marketplace">
  <meta property="og:description" content="Calidad, rapidez y los mejores precios en un solo lugar.">
  <meta property="og:type" content="website">
  <title>Gateway Shop - Tu Marketplace</title>
  <link rel="icon" href="img/favicon.ico" type="image/x-icon">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/tailwind.css">
  <link rel="stylesheet" href="css/custom.css">
  <script src="js/components.js" defer></script>
  <script src="js/utils.js" defer></script>
  <script src="js/cart.js" defer></script>
  <script src="js/ui.js" defer></script>
  <script src="js/index.js" defer></script>
</head>
<body>
  <header id="site-header" class="site-header"></header>

  <section class="hero-section">
    <div class="hero-inner">
      <div class="hero-content fade-up">
        <p style="font-size:0.875rem;font-weight:600;color:rgba(255,255,255,0.7);text-transform:uppercase;letter-spacing:0.08em;margin:0 0 0.5rem">Tu Marketplace de Confianza</p>
        <h1>Descubre los mejores<br>productos para ti</h1>
        <p>Calidad premium, envío seguro y los mejores precios en un solo lugar. Encuentra todo lo que necesitas.</p>
        <div class="hero-actions">
          <a class="cta" href="shop.html">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
            Explorar Tienda
          </a>
          <a class="cta secondary" href="contact.html">Contactar</a>
        </div>
        <div class="hero-stats fade-up">
          <div class="hero-stat">
            <div class="number">500+</div>
            <div class="label">Productos</div>
          </div>
          <div class="hero-stat">
            <div class="number">24h</div>
            <div class="label">Envío rápido</div>
          </div>
          <div class="hero-stat">
            <div class="number">100%</div>
            <div class="label">Seguro</div>
          </div>
        </div>
      </div>
      <div class="hero-media fade-up" style="background-image:url('img/market.jpg');min-height:320px;background-size:cover;background-position:center"></div>
    </div>
  </section>

  <main class="-mt-16">
    <div class="max-w-7xl mx-auto px-4">
      <section id="productos" class="featured-section">
        <div class="section-header">
          <h2>Productos Destacados</h2>
          <a href="shop.html">Ver todos
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
        <div id="product-list" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"></div>
      </section>
    </div>
  </main>

  <footer id="site-footer" class="site-footer"></footer>
</body>
</html>
'''

# --- shop.html ---
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

  <section class="hero bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
    <div class="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-6">
      <div class="flex-1 rounded-xl overflow-hidden min-h-[120px] bg-cover bg-center" style="background-image:url('img/market2.jpg')"></div>
      <div class="flex-2" style="padding-bottom:24px;">
        <h2 class="text-2xl font-bold">Encuentra lo mejor para tu hogar</h2>
        <p class="mt-2">Productos seleccionados, entregas seguras y ofertas exclusivas.</p>
        <div class="search-bar mt-3">
          <input id="search" placeholder="Buscar productos..." class="flex-1 px-3 py-2 rounded-md border border-white text-white" />
          <select id="category" class="px-3 py-2 rounded-md border border-white text-white">
            <option value="">Todas las categorías</option>
          </select>
        </div>
      </div>
    </div>
  </section>

  <main>
    <div class="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
      <section id="productos" class="lg:w-2/3">
        <div class="section-header">
          <h2>Productos</h2>
          <div class="text-sm text-gray-500">Mostrando <span id="product-count" style="font-weight:700;color:var(--color-primary)">0</span> productos</div>
        </div>
        <div id="product-list" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"></div>
      </section>

      <aside class="lg:w-1/3">
        <div class="cart-sidebar">
          <h2>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>
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

# --- contact.html ---
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

  <main class="container" style="padding:2rem 1rem;">
    <div class="contact-hero fade-up">
      <h1>Nuestro Equipo</h1>
      <p>Conoce a los creadores detrás de Gateway Shop y ponte en contacto con nosotros.</p>
    </div>

    <section class="team fade-up">
      <div class="designer card" data-username="duohnson">
        <img class="avatar" alt="duohnson avatar" loading="lazy">
        <h3 class="gh-name">duohnson</h3>
        <p><a class="gh-link" href="https://github.com/duohnson" target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" width="14" height="14" style="display:inline;vertical-align:-2px;margin-right:4px"><path fill="currentColor" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          github.com/duohnson
        </a></p>
      </div>
      <div class="designer card" data-username="P3terPl4y">
        <img class="avatar" alt="P3terPl4y avatar" loading="lazy">
        <h3 class="gh-name">P3terPl4y</h3>
        <p><a class="gh-link" href="https://github.com/P3terPl4y" target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" width="14" height="14" style="display:inline;vertical-align:-2px;margin-right:4px"><path fill="currentColor" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          github.com/P3terPl4y
        </a></p>
      </div>
    </section>

    <section class="fade-up">
      <div class="contact-hero" style="padding-top:0">
        <h1 style="font-size:1.5rem">Envíanos un mensaje</h1>
        <p style="font-size:0.9375rem">Responderemos lo antes posible.</p>
      </div>
      <form id="contact-form" class="contact-form">
        <label>Nombre
          <input type="text" name="nombre" placeholder="Tu nombre" required>
        </label>
        <label>Email
          <input type="email" name="email" placeholder="tu@ejemplo.com" required>
        </label>
        <label>Teléfono (incluye código de país)
          <input type="tel" name="telefono" placeholder="+34 600 000 000" required>
        </label>
        <label>Comentario
          <textarea name="comentario" rows="4" placeholder="Tu mensaje..."></textarea>
        </label>
        <div style="text-align:right;">
          <button class="btn" type="submit">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            Enviar mensaje
          </button>
        </div>
      </form>
    </section>
  </main>

  <footer id="site-footer" class="site-footer"></footer>
</body>
</html>
'''

# --- payment.html ---
files['payment.html'] = r'''<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Checkout - Pago seguro con PayPal en Gateway Shop.">
  <title>Checkout - Gateway Shop</title>
  <link rel="icon" href="img/favicon.ico" type="image/x-icon">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/tailwind.css">
  <link rel="stylesheet" href="css/custom.css">
  <script src="js/components.js" defer></script>
  <script src="js/utils.js" defer></script>
  <script src="js/cart.js" defer></script>
  <script src="js/paypal.js" defer></script>
</head>
<body>
  <header id="site-header" class="site-header"></header>

  <main>
    <div class="payment-page">
      <div style="text-align:center;margin-bottom:2rem">
        <div style="width:64px;height:64px;background:var(--color-primary-50);border-radius:50%;display:inline-flex;align-items:center;justify-content:center;margin-bottom:1rem">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="var(--color-primary)" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
        </div>
        <h2 style="margin:0">Pago Seguro</h2>
        <p style="color:var(--color-muted);margin:0.5rem 0 0">Revisa tu pedido y completa el pago con PayPal</p>
      </div>
      <div id="order-summary" class="order-card"></div>
      <div id="paypal-buttons"></div>
    </div>
  </main>

  <footer id="site-footer" class="site-footer"></footer>

  <!-- paypal sdk - replace client-id with your actual key -->
  <script src="https://www.paypal.com/sdk/js?client-id=YOUR_PAYPAL_CLIENT_ID&currency=USD" async></script>
</body>
</html>
'''

# --- success.html ---
files['success.html'] = r'''<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pago exitoso - Gateway Shop</title>
  <link rel="icon" href="img/favicon.ico" type="image/x-icon">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/tailwind.css">
  <link rel="stylesheet" href="css/custom.css">
  <script src="js/components.js" defer></script>
  <script src="js/utils.js" defer></script>
  <script src="js/cart.js" defer></script>
</head>
<body>
  <header id="site-header" class="site-header"></header>

  <main>
    <div class="container">
      <div class="card status-card">
        <div class="status-icon success">
          <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="#10b981" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>
        </div>
        <h2>¡Pago exitoso!</h2>
        <p>Gracias por tu compra. Tu pago fue procesado correctamente con PayPal.</p>
        <div class="flex gap-3 justify-center">
          <a class="btn" href="shop.html">Volver a la tienda</a>
          <a class="btn ghost" href="index.html">Inicio</a>
        </div>
      </div>
    </div>
  </main>

  <footer id="site-footer" class="site-footer"></footer>
</body>
</html>
'''

# --- cancel.html ---
files['cancel.html'] = r'''<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pago cancelado - Gateway Shop</title>
  <link rel="icon" href="img/favicon.ico" type="image/x-icon">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/tailwind.css">
  <link rel="stylesheet" href="css/custom.css">
  <script src="js/components.js" defer></script>
  <script src="js/utils.js" defer></script>
  <script src="js/cart.js" defer></script>
</head>
<body>
  <header id="site-header" class="site-header"></header>

  <main>
    <div class="container">
      <div class="card status-card">
        <div class="status-icon warning">
          <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="#f59e0b" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/></svg>
        </div>
        <h2>Pago cancelado</h2>
        <p>El pago fue cancelado. Puedes intentar nuevamente o revisar tu carrito.</p>
        <div class="flex gap-3 justify-center">
          <a class="btn" href="shop.html">Volver al carrito</a>
          <a class="btn ghost" href="index.html">Inicio</a>
        </div>
      </div>
    </div>
  </main>

  <footer id="site-footer" class="site-footer"></footer>
</body>
</html>
'''

# --- 404.html ---
files['404.html'] = r'''<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Página no encontrada - Gateway Shop</title>
  <link rel="icon" href="img/favicon.ico" type="image/x-icon">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/tailwind.css">
  <link rel="stylesheet" href="css/custom.css">
  <script src="js/components.js" defer></script>
  <script src="js/utils.js" defer></script>
  <script src="js/cart.js" defer></script>
</head>
<body>
  <header id="site-header" class="site-header"></header>

  <main>
    <div class="container">
      <div class="card status-card">
        <div class="status-icon error">
          <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="#ef4444" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
        </div>
        <h1 style="font-size:3.5rem;margin:0;color:var(--color-primary);font-weight:800;letter-spacing:-0.04em">404</h1>
        <h2>Página no encontrada</h2>
        <p>Lo sentimos, la página que buscas no existe o fue movida.</p>
        <div class="flex gap-3 justify-center">
          <a class="btn" href="index.html">Ir al inicio</a>
          <a class="btn ghost" href="shop.html">Ver tienda</a>
        </div>
      </div>
    </div>
  </main>

  <footer id="site-footer" class="site-footer"></footer>
</body>
</html>
'''

# --- upload.html ---
files['upload.html'] = r'''<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Panel de administración - Gateway Shop</title>
  <link rel="icon" href="img/favicon.ico" type="image/x-icon">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/tailwind.css">
  <link rel="stylesheet" href="css/custom.css">
  <meta name="robots" content="noindex, nofollow">
  <script src="js/components.js" defer></script>
  <script src="js/utils.js" defer></script>
  <script src="js/cart.js" defer></script>
  <script src="js/upload.js" defer></script>
</head>
<body>
  <header id="site-header" class="site-header"></header>

  <div style="text-align:center;padding:2rem 1rem 0">
    <h1 style="font-size:1.75rem;font-weight:800;color:var(--color-text);letter-spacing:-0.03em;margin:0">Panel de Administración</h1>
    <p style="color:var(--color-muted);margin:0.5rem 0 0">Gestiona los productos de tu tienda</p>
  </div>

  <div class="admin-panels">
    <div class="panel">
      <h2>Subir nuevo producto</h2>
      <form id="upload-form">
        <label>Nombre
          <input type="text" name="nombre" required>
        </label>
        <label>Precio
          <input type="number" name="precio" step="0.01" required>
        </label>
        <label>Imagen
          <input type="file" name="img" id="img-file" accept="image/*" required>
        </label>
        <div id="preview-img" style="margin-top:.5rem;border-radius:var(--radius-sm);overflow:hidden"></div>
        <label>Descripción
          <textarea name="desc" rows="2" required></textarea>
        </label>
        <label>Categoría
          <select name="categoria" id="categoria-select" required></select>
        </label>
        <div class="cat-add-row">
          <input type="text" id="nueva-categoria" placeholder="Nueva categoría...">
          <button type="button" id="agregar-categoria" class="cat-add-btn">Agregar</button>
        </div>
        <button type="submit">Subir producto</button>
        <div class="success" id="success-msg" style="display:none;">Producto subido correctamente.</div>
        <div class="error" id="error-msg" style="display:none;"></div>
      </form>
    </div>
    <div class="panel">
      <h2>Modificar / Borrar producto</h2>
      <form id="edit-form">
        <label>Selecciona producto
          <select id="edit-select" name="id" required></select>
        </label>
        <label>Nombre
          <input type="text" name="nombre" required>
        </label>
        <label>Precio
          <input type="number" name="precio" step="0.01" required>
        </label>
        <label>Imagen (URL o ruta)
          <input type="text" name="img" id="edit-img-url" required>
          <input type="file" id="edit-img-file" accept="image/*">
        </label>
        <div id="edit-preview-img" style="margin-top:.5rem;border-radius:var(--radius-sm);overflow:hidden"></div>
        <label>Descripción
          <textarea name="desc" rows="2" required></textarea>
        </label>
        <label>Categoría
          <select name="categoria" id="edit-categoria-select" required></select>
        </label>
        <button type="submit">Modificar producto</button>
        <button type="button" id="delete-btn" class="delete-btn">Borrar producto</button>
        <div class="success" id="edit-success-msg" style="display:none;">Producto modificado correctamente.</div>
        <div class="error" id="edit-error-msg" style="display:none;"></div>
      </form>
    </div>
  </div>

  <footer id="site-footer" class="site-footer"></footer>
</body>
</html>
'''

# --- wirte all html fiels ---
for name, content in files.items():
    path = os.path.join(BASE, name)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content.lstrip('\n'))
    print(f'  ✓ {name}')

print('\nAll HTML files updated!')
