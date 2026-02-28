// centarlized cart - single source of truth for all pages

var cart = {
  items: [],

  load: function() {
    try {
      var raw = localStorage.getItem('carrito');
      this.items = raw ? JSON.parse(raw) : [];
    } catch(e) {
      this.items = [];
    }
    this._badge();
    return this;
  },

  save: function() {
    try {
      localStorage.setItem('carrito', JSON.stringify(this.items));
    } catch(e) { /* stroage full or prviate broswing, ignore */ }
    this._badge();
    window.dispatchEvent(new CustomEvent('cartUpdated', {
      detail: { count: this.items.length }
    }));
  },

  _badge: function() {
    var el = document.getElementById('nav-cart-count');
    if (el) el.textContent = this.items.length;
  },

  add: function(product) {
    var id = String(product.id);
    var found = this.items.find(function(p) { return String(p.id) === id; });
    if (found) {
      found.cantidad = (found.cantidad || 1) + 1;
    } else {
      this.items.push({
        id: id,
        nombre: product.nombre,
        precio: parseFloat(product.precio),
        img: product.img || '',
        cantidad: 1
      });
    }
    this.save();
  },

  remove: function(idx) {
    this.items.splice(idx, 1);
    this.save();
  },

  updateQty: function(idx, delta) {
    if (!this.items[idx]) return;
    this.items[idx].cantidad = Math.max(0, (this.items[idx].cantidad || 1) + delta);
    if (this.items[idx].cantidad <= 0) this.items.splice(idx, 1);
    this.save();
  },

  total: function() {
    return this.items.reduce(function(s, i) {
      return s + (parseFloat(i.precio) || 0) * (i.cantidad || 1);
    }, 0);
  },

  clear: function() {
    this.items = [];
    this.save();
  }
};

// init on load
cart.load();
