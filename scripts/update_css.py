#!/usr/bin/env python3
"""wirte the new custom.css with indigo/purple desing system"""
import os

CSS_PATH = os.path.join(os.path.dirname(__file__), '..', 'src', 'static', 'public', 'css', 'custom.css')

css = r'''/* ==========================================================================
   custom.css – Gateway Shop modern design system
   Indigo/purple palette · glassmorphism · smooth transitions
   ========================================================================== */

/* ── design tokens ── */
:root {
  --color-primary: #6366f1;
  --color-primary-dark: #4f46e5;
  --color-primary-light: #818cf8;
  --color-primary-50: #eef2ff;
  --color-primary-100: #e0e7ff;
  --color-primary-200: #c7d2fe;
  --color-accent: #8b5cf6;
  --color-accent-dark: #7c3aed;
  --color-accent-light: #a78bfa;
  --color-bg: #f8fafc;
  --color-surface: #ffffff;
  --color-text: #0f172a;
  --color-muted: #64748b;
  --color-border: #e2e8f0;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --container: 1200px;
  --header-h: 64px;
  --shadow-sm: 0 1px 3px rgba(0,0,0,.06);
  --shadow-md: 0 4px 16px rgba(0,0,0,.08);
  --shadow-lg: 0 8px 32px rgba(0,0,0,.1);
  --shadow-glow: 0 0 20px rgba(99,102,241,.15);
}

/* ── base resets ── */
*, *::before, *::after { box-sizing: border-box; }
html { overflow-x: hidden; scroll-behavior: smooth; }
html, body { height: 100%; }
body {
  margin: 0;
  font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif;
  color: var(--color-text);
  background: var(--color-bg);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.6;
}
img { max-width: 100%; height: auto; display: block; }
a { color: inherit; text-decoration: none; }
button { cursor: pointer; font-family: inherit; }

/* page enter animation */
main, .main-content { animation: fadeIn .45s ease-out; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }

/* ── scrollbar ── */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--color-primary-200); border-radius: 999px; }
::-webkit-scrollbar-thumb:hover { background: var(--color-primary); }

/* ══════════════════════════════════════════════════════════
   NAVIGATION
   ══════════════════════════════════════════════════════════ */
.site-header {
  position: sticky; top: 0; z-index: 200;
  background: rgba(255,255,255,.72);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid rgba(226,232,240,.6);
  transition: box-shadow .3s, background .3s;
}
.site-header.scrolled {
  box-shadow: 0 4px 24px rgba(0,0,0,.06);
  background: rgba(255,255,255,.88);
}

.nav-container {
  max-width: var(--container);
  margin: 0 auto;
  padding: 0 1.25rem;
  height: var(--header-h);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav-left { display: flex; align-items: center; }
.nav-brand {
  display: flex; align-items: center; gap: .5rem;
  font-size: 1.25rem; font-weight: 800;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -.02em;
}
.nav-brand svg { stroke: var(--color-primary); flex-shrink: 0; }

.nav-links {
  display: flex; align-items: center; gap: .25rem;
}
.nav-link {
  padding: .5rem .875rem;
  border-radius: var(--radius-sm);
  font-size: .875rem; font-weight: 500;
  color: var(--color-muted);
  transition: all .2s;
}
.nav-link:hover {
  color: var(--color-primary);
  background: var(--color-primary-50);
}
.nav-link.active {
  color: var(--color-primary);
  background: var(--color-primary-50);
  font-weight: 600;
}
.nav-links .cta {
  display: inline-flex; align-items: center; gap: .375rem;
  margin-left: .5rem;
  padding: .5rem 1rem;
  font-size: .875rem; font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  border-radius: var(--radius-sm);
  transition: all .25s;
}
.nav-links .cta:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(99,102,241,.3);
}
.cart-badge {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 20px; height: 20px;
  padding: 0 5px;
  font-size: .7rem; font-weight: 700;
  background: rgba(255,255,255,.25);
  border-radius: 999px;
  line-height: 1;
}

/* hamburger */
.nav-toggle {
  display: none; flex-direction: column; gap: 5px;
  background: none; border: none; padding: 8px; cursor: pointer;
}
.nav-toggle .bar {
  width: 22px; height: 2px;
  background: var(--color-text);
  border-radius: 2px;
  transition: all .3s;
}
.nav-toggle.open .bar:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.nav-toggle.open .bar:nth-child(2) { opacity: 0; }
.nav-toggle.open .bar:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

/* mobile nav */
@media (max-width: 768px) {
  .nav-toggle { display: flex; }
  .nav-links {
    position: fixed; top: var(--header-h); left: 0; right: 0;
    flex-direction: column; gap: .25rem;
    background: rgba(255,255,255,.96);
    backdrop-filter: blur(20px);
    padding: 1rem 1.25rem 1.5rem;
    border-bottom: 1px solid var(--color-border);
    box-shadow: var(--shadow-lg);
    transform: translateY(-110%);
    opacity: 0;
    transition: transform .35s cubic-bezier(.4,0,.2,1), opacity .35s;
  }
  .nav-links.show {
    transform: translateY(0);
    opacity: 1;
  }
  .nav-link { width: 100%; text-align: left; padding: .75rem 1rem; font-size: 1rem; }
  .nav-links .cta { width: 100%; justify-content: center; margin-left: 0; margin-top: .5rem; }
}

/* ══════════════════════════════════════════════════════════
   HERO SECTION
   ══════════════════════════════════════════════════════════ */
.hero {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #6366f1 100%);
  color: #fff;
  padding: 5rem 1.25rem 4rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}
.hero::before {
  content: '';
  position: absolute; inset: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  pointer-events: none;
}
.hero h1 {
  font-size: clamp(2.25rem, 5vw, 3.5rem);
  font-weight: 800;
  letter-spacing: -.03em;
  line-height: 1.15;
  margin: 0 0 1rem;
  color: #fff;
}
.hero p {
  font-size: clamp(1rem, 2vw, 1.2rem);
  max-width: 540px;
  margin: 0 auto 2rem;
  opacity: .9;
}
.hero-actions {
  display: flex; gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}
.hero-actions a,
.hero-actions button {
  display: inline-flex; align-items: center; gap: .5rem;
  padding: .75rem 1.75rem;
  border-radius: var(--radius-sm);
  font-weight: 600; font-size: .9375rem;
  transition: all .25s;
}
.hero-actions .btn-primary {
  background: #fff; color: var(--color-primary-dark);
  border: none;
}
.hero-actions .btn-primary:hover {
  background: var(--color-primary-50);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,.15);
}
.hero-actions .btn-ghost {
  background: transparent;
  border: 1.5px solid rgba(255,255,255,.5);
  color: #fff;
}
.hero-actions .btn-ghost:hover {
  background: rgba(255,255,255,.1);
  border-color: rgba(255,255,255,.8);
}

.hero-stats {
  display: flex; justify-content: center; gap: 3rem;
  margin-top: 3rem;
  flex-wrap: wrap;
}
.hero-stats .stat { text-align: center; }
.hero-stats .stat strong {
  display: block;
  font-size: 1.5rem; font-weight: 800;
}
.hero-stats .stat span {
  font-size: .8125rem;
  opacity: .75;
}

/* ══════════════════════════════════════════════════════════
   PRODUCT CARDS
   ══════════════════════════════════════════════════════════ */
.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
}
.product-card {
  display: flex; flex-direction: column;
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  overflow: hidden;
  transition: transform .3s cubic-bezier(.4,0,.2,1), box-shadow .3s;
}
.product-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
}

.product-card .img-wrap {
  position: relative;
  aspect-ratio: 4/3;
  overflow: hidden;
  background: linear-gradient(135deg, var(--color-primary-50), #f5f3ff);
}
.product-card .img-wrap img {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform .4s cubic-bezier(.4,0,.2,1);
}
.product-card:hover .img-wrap img {
  transform: scale(1.06);
}
.card-badge {
  position: absolute; top: .75rem; left: .75rem;
  padding: .25rem .75rem;
  font-size: .7rem; font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .05em;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  color: #fff;
  z-index: 2;
}
.card-body {
  padding: 1rem 1.25rem 1.25rem;
  display: flex; flex-direction: column;
  flex: 1;
}
.card-body h3 {
  font-size: 1rem; font-weight: 700;
  margin: 0 0 .375rem;
  line-height: 1.3;
  color: var(--color-text);
}
.card-body p {
  font-size: .8125rem;
  color: var(--color-muted);
  margin: 0 0 .75rem;
  flex: 1;
}
.card-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
}
.card-actions .price {
  font-size: 1.125rem; font-weight: 800;
  color: var(--color-primary);
}
.card-actions button {
  display: inline-flex; align-items: center; justify-content: center;
  width: 38px; height: 38px;
  border-radius: var(--radius-sm);
  border: none;
  background: var(--color-primary-50);
  color: var(--color-primary);
  transition: all .2s;
}
.card-actions button:hover {
  background: var(--color-primary);
  color: #fff;
  transform: scale(1.08);
}

/* line clamp */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* loading skeleton */
.loading-skeleton {
  text-align: center; padding: 3rem;
  color: var(--color-muted); font-size: .9rem;
}

/* ══════════════════════════════════════════════════════════
   FEATURED SECTION (homepage)
   ══════════════════════════════════════════════════════════ */
.featured-section {
  max-width: var(--container);
  margin: -3rem auto 0;
  padding: 0 1.25rem 4rem;
  position: relative;
  z-index: 2;
}
.section-header {
  text-align: center;
  margin-bottom: 2.5rem;
}
.section-header h2 {
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 800;
  display: inline-block;
  position: relative;
}
.section-header h2::after {
  content: '';
  display: block;
  width: 50%;
  height: 3px;
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
  border-radius: 2px;
  margin: .5rem auto 0;
}
.section-header p {
  color: var(--color-muted);
  font-size: .9375rem;
  margin-top: .5rem;
}

/* ══════════════════════════════════════════════════════════
   CART SIDEBAR (shop page)
   ══════════════════════════════════════════════════════════ */
.cart-sidebar {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  padding: 1.5rem;
  position: sticky; top: calc(var(--header-h) + 1rem);
}
.cart-sidebar h2 {
  display: flex; align-items: center; gap: .5rem;
  font-size: 1.125rem; font-weight: 700;
  margin: 0 0 1rem;
  padding-bottom: .75rem;
  border-bottom: 1px solid var(--color-border);
}
.cart-sidebar h2 svg { stroke: var(--color-primary); }

.cart-item {
  display: flex; align-items: flex-start; gap: .75rem;
  padding: .75rem 0;
  border-bottom: 1px solid var(--color-border);
  animation: fadeIn .3s ease-out;
}
.cart-item img {
  width: 56px; height: 56px;
  border-radius: var(--radius-sm);
  object-fit: cover;
  flex-shrink: 0;
}
.qty-controls {
  display: inline-flex; align-items: center;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  overflow: hidden;
}
.qty-btn {
  width: 28px; height: 28px;
  display: flex; align-items: center; justify-content: center;
  background: none; border: none;
  font-size: .875rem; font-weight: 600;
  color: var(--color-muted);
  transition: all .15s;
}
.qty-btn:hover { background: var(--color-primary-50); color: var(--color-primary); }
.qty-value {
  width: 28px; text-align: center;
  font-size: .8125rem; font-weight: 600;
}

.cart-total {
  display: flex; justify-content: space-between; align-items: center;
  padding-top: 1rem; margin-top: .75rem;
  border-top: 2px solid var(--color-border);
  font-size: 1.125rem; font-weight: 800;
}

.empty-cart-msg {
  text-align: center;
  padding: 2.5rem 1rem;
  color: var(--color-muted);
}
.empty-cart-msg svg {
  width: 48px; height: 48px;
  margin: 0 auto .75rem;
  stroke: var(--color-primary-200);
}
.empty-cart-msg p { margin: 0; font-size: .875rem; }

.checkout-btn {
  display: flex; align-items: center; justify-content: center; gap: .5rem;
  width: 100%;
  margin-top: 1rem;
  padding: .75rem 1.5rem;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  color: #fff;
  border: none;
  border-radius: var(--radius-sm);
  font-size: .9375rem; font-weight: 700;
  transition: all .25s;
  cursor: pointer;
}
.checkout-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(99,102,241,.3);
}

/* ══════════════════════════════════════════════════════════
   SEARCH BAR
   ══════════════════════════════════════════════════════════ */
.search-bar {
  display: flex;
  gap: .75rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}
.search-bar input,
.search-bar select {
  padding: .625rem 1rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  font-size: .875rem;
  color: var(--color-text);
  transition: border-color .2s, box-shadow .2s;
  outline: none;
}
.search-bar input:focus,
.search-bar select:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-100);
}
.search-bar input { flex: 1; min-width: 200px; }
.search-bar select { min-width: 180px; }

/* ══════════════════════════════════════════════════════════
   PRODUCT MODAL (quick view)
   ══════════════════════════════════════════════════════════ */
.product-modal-overlay {
  position: fixed; inset: 0; z-index: 500;
  display: flex; align-items: center; justify-content: center;
  background: rgba(15,23,42,.55);
  backdrop-filter: blur(6px);
  animation: fadeIn .25s;
  padding: 1rem;
}
.product-modal {
  display: flex;
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  max-width: 720px; width: 100%;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0,0,0,.2);
  animation: modalIn .35s cubic-bezier(.4,0,.2,1);
}
@keyframes modalIn { from { opacity: 0; transform: scale(.92) translateY(16px); } }

.product-modal .visual {
  width: 45%; min-height: 280px;
  background: linear-gradient(135deg, var(--color-primary-50), #f5f3ff);
}
.product-modal .visual img {
  width: 100%; height: 100%;
  object-fit: cover;
}
.product-modal .meta {
  flex: 1; padding: 2rem;
  display: flex; flex-direction: column;
}
.product-modal .meta h3 {
  font-size: 1.375rem; font-weight: 800;
  margin: 0 0 .75rem;
}
.product-modal .meta p {
  font-size: .875rem; color: var(--color-muted);
  margin: 0 0 1.25rem;
  flex: 1;
}
.product-modal .price {
  font-size: 1.5rem; font-weight: 800;
  color: var(--color-primary);
  margin-bottom: 1.5rem;
}
.product-modal .actions {
  display: flex; gap: .75rem;
}
.product-modal .btn {
  flex: 1; padding: .75rem 1.25rem;
  border: none; border-radius: var(--radius-sm);
  font-weight: 600; font-size: .9375rem;
  text-align: center;
  transition: all .2s;
}
.product-modal .btn:first-child {
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  color: #fff;
}
.product-modal .btn:first-child:hover {
  box-shadow: 0 4px 14px rgba(99,102,241,.3);
  transform: translateY(-1px);
}
.product-modal .btn.ghost {
  background: var(--color-primary-50);
  color: var(--color-primary);
}
.product-modal .btn.ghost:hover {
  background: var(--color-primary-100);
}

@media (max-width: 640px) {
  .product-modal { flex-direction: column; }
  .product-modal .visual { width: 100%; min-height: 200px; max-height: 240px; }
  .product-modal .meta { padding: 1.25rem; }
}

/* ══════════════════════════════════════════════════════════
   TOAST NOTIFICATION
   ══════════════════════════════════════════════════════════ */
.ui-toast {
  position: fixed; bottom: 1.5rem; left: 50%; transform: translateX(-50%);
  z-index: 600;
  background: var(--color-text);
  color: #fff;
  padding: .75rem 1.5rem;
  border-radius: var(--radius-sm);
  font-size: .875rem; font-weight: 500;
  box-shadow: var(--shadow-lg);
  animation: toastIn .35s ease-out, toastOut .35s 2.8s ease-in forwards;
}
@keyframes toastIn { from { opacity: 0; transform: translateX(-50%) translateY(16px); } }
@keyframes toastOut { to { opacity: 0; transform: translateX(-50%) translateY(16px); } }

/* ══════════════════════════════════════════════════════════
   FAB (floating action button)
   ══════════════════════════════════════════════════════════ */
.fab-cart {
  position: fixed; bottom: 1.5rem; right: 1.5rem;
  z-index: 300;
  width: 56px; height: 56px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  color: #fff;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 20px rgba(99,102,241,.35);
  transition: transform .25s, box-shadow .25s;
}
.fab-cart:hover {
  transform: scale(1.08);
  box-shadow: 0 6px 28px rgba(99,102,241,.45);
}
.fab-cart .count {
  position: absolute; top: -4px; right: -4px;
  min-width: 20px; height: 20px;
  padding: 0 5px;
  background: #ef4444; color: #fff;
  font-size: .65rem; font-weight: 700;
  border-radius: 999px;
  display: flex; align-items: center; justify-content: center;
}

.fab-social {
  position: fixed; bottom: 6rem; right: 1.5rem;
  z-index: 300;
  display: flex; flex-direction: column; gap: .5rem;
}
.fab-social a {
  display: flex; align-items: center; justify-content: center;
  width: 40px; height: 40px;
  border-radius: 50%;
  background: var(--color-surface);
  color: var(--color-muted);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  transition: all .2s;
}
.fab-social a:hover {
  color: var(--color-primary);
  border-color: var(--color-primary-200);
  box-shadow: var(--shadow-glow);
  transform: translateY(-2px);
}

/* ══════════════════════════════════════════════════════════
   CONTACT PAGE
   ══════════════════════════════════════════════════════════ */
.contact-hero {
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: #fff;
  text-align: center;
  padding: 4rem 1.25rem 3rem;
  position: relative;
  overflow: hidden;
}
.contact-hero::before {
  content: '';
  position: absolute; inset: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
  pointer-events: none;
}
.contact-hero h1 { color: #fff; font-size: clamp(1.75rem, 4vw, 2.5rem); font-weight: 800; margin: 0 0 .5rem; }
.contact-hero p { opacity: .9; margin: 0; }

/* team cards */
.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}
.team-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  text-align: center;
  transition: transform .3s, box-shadow .3s;
}
.team-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }
.team-card img {
  width: 80px; height: 80px;
  border-radius: 50%;
  margin: 0 auto .75rem;
  object-fit: cover;
  border: 3px solid var(--color-primary-100);
}
.team-card h3 { margin: 0 0 .25rem; font-size: 1rem; font-weight: 700; }
.team-card p { margin: 0; font-size: .8125rem; color: var(--color-muted); }
.team-card a.github-link {
  display: inline-flex; align-items: center; gap: .375rem;
  margin-top: .75rem;
  font-size: .8125rem; font-weight: 600;
  color: var(--color-primary);
  transition: color .2s;
}
.team-card a.github-link:hover { color: var(--color-accent); }

/* contact form */
.contact-form {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 2rem;
}
.contact-form input,
.contact-form textarea {
  width: 100%;
  padding: .625rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-bg);
  font-size: .875rem;
  color: var(--color-text);
  outline: none;
  transition: border-color .2s, box-shadow .2s;
  font-family: inherit;
}
.contact-form input:focus,
.contact-form textarea:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-100);
}
.contact-form textarea { min-height: 120px; resize: vertical; }
.contact-form label {
  display: block;
  margin-bottom: .375rem;
  font-size: .8125rem; font-weight: 600;
  color: var(--color-text);
}
.contact-form .form-group { margin-bottom: 1.25rem; }

/* ══════════════════════════════════════════════════════════
   PAYMENT PAGE
   ══════════════════════════════════════════════════════════ */
.payment-page {
  max-width: 640px;
  margin: 0 auto;
  padding: 3rem 1.25rem 4rem;
  text-align: center;
}
.payment-page .icon-header {
  display: flex; flex-direction: column; align-items: center;
  margin-bottom: 2rem;
}
.payment-page .icon-header svg {
  width: 48px; height: 48px;
  stroke: var(--color-primary);
  margin-bottom: .75rem;
}
.payment-page .icon-header h1 {
  font-size: 1.5rem; font-weight: 800;
  margin: 0;
}
.order-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  text-align: left;
  margin-bottom: 1.5rem;
}

/* ══════════════════════════════════════════════════════════
   STATUS PAGES (success / cancel / 404)
   ══════════════════════════════════════════════════════════ */
.status-page {
  min-height: calc(100vh - var(--header-h) - 100px);
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  padding: 3rem 1.25rem;
  text-align: center;
}
.status-icon {
  width: 96px; height: 96px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 1.5rem;
}
.status-icon svg { width: 48px; height: 48px; }
.status-icon.success {
  background: #ecfdf5;
  color: #10b981;
}
.status-icon.success svg { stroke: #10b981; }
.status-icon.warning {
  background: #fffbeb;
  color: #f59e0b;
}
.status-icon.warning svg { stroke: #f59e0b; }
.status-icon.error {
  background: #fef2f2;
  color: #ef4444;
}
.status-icon.error svg { stroke: #ef4444; }

/* ══════════════════════════════════════════════════════════
   UPLOAD / ADMIN PANEL
   ══════════════════════════════════════════════════════════ */
.admin-header {
  background: linear-gradient(135deg, var(--color-text), #1e293b);
  color: #fff;
  text-align: center;
  padding: 2.5rem 1.25rem;
}
.admin-header h1 { color: #fff; font-size: 1.5rem; font-weight: 800; margin: 0 0 .25rem; }
.admin-header p { opacity: .7; margin: 0; font-size: .875rem; }

.upload-panel {
  max-width: 700px;
  margin: -2rem auto 3rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 2rem;
  box-shadow: var(--shadow-lg);
  position: relative; z-index: 2;
}
.upload-panel label {
  display: block;
  margin-bottom: .375rem;
  font-size: .8125rem; font-weight: 600;
}
.upload-panel input,
.upload-panel textarea,
.upload-panel select {
  width: 100%;
  padding: .625rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-bg);
  font-size: .875rem;
  color: var(--color-text);
  outline: none;
  transition: border-color .2s, box-shadow .2s;
  font-family: inherit;
}
.upload-panel input:focus,
.upload-panel textarea:focus,
.upload-panel select:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-100);
}
.upload-panel textarea { min-height: 80px; resize: vertical; }

.preview-area {
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: var(--radius-md);
  border: 2px dashed var(--color-border);
  display: flex; align-items: center; justify-content: center;
  overflow: hidden;
  background: var(--color-bg);
  margin-top: .5rem;
}
.preview-area img {
  width: 100%; height: 100%;
  object-fit: contain;
}

/* ══════════════════════════════════════════════════════════
   LEGAL PAGES
   ══════════════════════════════════════════════════════════ */
.legal-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem 1.25rem 4rem;
}
.legal-page h1 {
  font-size: 2rem; font-weight: 800;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
}
.legal-page h2 { font-size: 1.25rem; font-weight: 700; margin: 2rem 0 .75rem; }
.legal-page p, .legal-page li { color: var(--color-muted); line-height: 1.7; }
.legal-page ul { padding-left: 1.5rem; }

/* ══════════════════════════════════════════════════════════
   FOOTER
   ══════════════════════════════════════════════════════════ */
.site-footer {
  border-top: 1px solid var(--color-border);
  background: var(--color-surface);
  margin-top: auto;
}
.footer-legal {
  margin-top: 1rem;
  padding-top: .75rem;
  border-top: 1px solid var(--color-border);
  display: flex; flex-wrap: wrap; gap: .5rem;
  justify-content: center;
  font-size: .75rem;
  color: var(--color-muted);
}
.footer-legal a { transition: color .2s; }
.footer-legal a:hover { color: var(--color-primary); }
.footer-legal .sep { opacity: .4; }

/* ══════════════════════════════════════════════════════════
   FADE-UP ANIMATION (intersection observer)
   ══════════════════════════════════════════════════════════ */
.fade-up {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity .6s cubic-bezier(.4,0,.2,1), transform .6s cubic-bezier(.4,0,.2,1);
}
.fade-up.in { opacity: 1; transform: translateY(0); }

/* ══════════════════════════════════════════════════════════
   UTILITY HELPERS
   ══════════════════════════════════════════════════════════ */
.text-center { text-align: center; }
.max-w-7xl { max-width: var(--container); }
.mx-auto { margin-left: auto; margin-right: auto; }
.px-4 { padding-left: 1rem; padding-right: 1rem; }
.py-6 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
.mt-3 { margin-top: .75rem; }

/* ══════════════════════════════════════════════════════════
   RESPONSIVE TWEAKS
   ══════════════════════════════════════════════════════════ */
@media (max-width: 1024px) {
  .featured-section { margin-top: -2rem; }
}
@media (max-width: 768px) {
  :root { --header-h: 56px; }
  .hero { padding: 3.5rem 1rem 3rem; }
  .hero h1 { font-size: 1.875rem; }
  .hero-stats { gap: 1.5rem; }
  .hero-stats .stat strong { font-size: 1.25rem; }
  .product-list { grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1rem; }
  .cart-sidebar { position: static; margin-top: 2rem; }
  .featured-section { margin-top: 0; padding-top: 2rem; }
  .fab-cart { width: 48px; height: 48px; bottom: 1rem; right: 1rem; }
  .fab-social { bottom: 4.5rem; right: 1rem; }
  .fab-social a { width: 36px; height: 36px; }

  .product-modal .visual { width: 100%; min-height: 200px; max-height: 240px; }
  .product-modal { flex-direction: column; }
}
@media (max-width: 480px) {
  .hero-actions { flex-direction: column; align-items: center; }
  .hero-actions a, .hero-actions button { width: 100%; justify-content: center; }
  .hero-stats { gap: 1rem; }
  .product-list { grid-template-columns: 1fr; }
  .search-bar { flex-direction: column; }
  .search-bar input, .search-bar select { min-width: 0; width: 100%; }
  .team-grid { grid-template-columns: 1fr; }
}
'''

with open(CSS_PATH, 'w', encoding='utf-8') as f:
    f.write(css.lstrip('\n'))

print('✓ custom.css rewritten successfully!')
print(f'  Lines: {len(css.strip().splitlines())}')
