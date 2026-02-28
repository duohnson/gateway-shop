// admin panel - product upload and management

// get categories async (no more sync xhr)
async function getCategorias() {
  var stored = localStorage.getItem('categorias');
  if (stored) {
    try { return JSON.parse(stored); } catch(e) {}
  }
  try {
    var res = await fetch('categorias.json');
    if (res.ok) {
      var cats = await res.json();
      localStorage.setItem('categorias', JSON.stringify(cats));
      return cats;
    }
  } catch(e) {}
  return [];
}

function setCategorias(cats) {
  localStorage.setItem('categorias', JSON.stringify(cats));
}

async function renderCategorias() {
  var cats = await getCategorias();
  var sel = document.getElementById('categoria-select');
  if (!sel) return;

  sel.innerHTML = cats.map(function(c) {
    return '<option value="' + escapeHtml(c) + '">' + escapeHtml(c.charAt(0).toUpperCase() + c.slice(1)) + '</option>';
  }).join('');

  // keep edit form in sync
  var editSel = document.getElementById('edit-categoria-select');
  if (editSel) editSel.innerHTML = sel.innerHTML;
}

async function handleAddCategoria() {
  var input = document.getElementById('nueva-categoria');
  var val = input.value.trim();
  if (!val) return;

  var cats = await getCategorias();
  if (!cats.includes(val)) {
    cats.push(val);
    setCategorias(cats);
    await renderCategorias();
    input.value = '';
  }
}

function getProductos() {
  try {
    return JSON.parse(localStorage.getItem('productos')) || [];
  } catch(e) {
    return [];
  }
}

function setProductos(prods) {
  localStorage.setItem('productos', JSON.stringify(prods));
}

async function handleUploadSubmit(e) {
  e.preventDefault();
  var form = e.target;
  var nombre = form.nombre.value.trim();
  var precio = parseFloat(form.precio.value);
  var desc = form.desc.value.trim();
  var categoria = form.categoria.value;
  var imgFile = form.img.files[0];

  if (!nombre || isNaN(precio) || !imgFile || !desc || !categoria) {
    showMsg('error-msg', 'Todos los campos son obligatorios.');
    return;
  }

  // upload image first
  var imgForm = new FormData();
  imgForm.append('img', imgFile);
  var imgUrl = '';

  try {
    var imgRes = await fetch('/api/upload-img', { method: 'POST', body: imgForm });
    if (!imgRes.ok) {
      showMsg('error-msg', 'Error al subir la imagen.');
      return;
    }
    imgUrl = await imgRes.text();
  } catch(err) {
    showMsg('error-msg', 'Error de conexión al subir imagen.');
    return;
  }

  // then create the product
  var prodForm = new FormData();
  prodForm.append('nombre', nombre);
  prodForm.append('precio', String(precio));
  prodForm.append('desc', desc);
  prodForm.append('categoria', categoria);
  prodForm.append('img', imgUrl);

  try {
    var res = await fetch('/api/productos', { method: 'POST', body: prodForm });
    if (res.ok) {
      form.reset();
      document.getElementById('preview-img').innerHTML = '';
      showMsg('success-msg', 'Producto subido correctamente.');

      // sync local cache so shop page picks it up even if api is slow
      var newProd = { id: Date.now(), nombre: nombre, precio: precio, desc: desc, categoria: categoria, img: imgUrl };
      var prods = getProductos();
      prods.push(newProd);
      setProductos(prods);
      loadEditSelect();

      // also update categories if new
      var cats = [];
      try { cats = JSON.parse(localStorage.getItem('categorias')) || []; } catch(e) {}
      if (categoria && cats.indexOf(categoria) === -1) {
        cats.push(categoria);
        setCategorias(cats);
      }
    } else {
      showMsg('error-msg', 'Error al subir el producto.');
    }
  } catch(err) {
    showMsg('error-msg', 'Error de conexión con el servidor.');
  }
}

function showMsg(type, text) {
  var success = document.getElementById('success-msg');
  var error = document.getElementById('error-msg');
  if (type === 'success-msg') {
    success.textContent = text;
    success.style.display = 'block';
    error.style.display = 'none';
  } else {
    error.textContent = text;
    error.style.display = 'block';
    success.style.display = 'none';
  }
}

function showEditMsg(type, text) {
  var success = document.getElementById('edit-success-msg');
  var error = document.getElementById('edit-error-msg');
  if (type === 'edit-success-msg') {
    success.textContent = text;
    success.style.display = 'block';
    error.style.display = 'none';
  } else {
    error.textContent = text;
    error.style.display = 'block';
    success.style.display = 'none';
  }
}

function handleImagePreview(e) {
  var file = e.target.files[0];
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function(ev) {
    document.getElementById('preview-img').innerHTML =
      '<img src="' + ev.target.result + '" style="max-width:100px;border-radius:8px;" alt="preview">';
  };
  reader.readAsDataURL(file);
}

function loadEditSelect() {
  var prods = getProductos();
  var sel = document.getElementById('edit-select');
  if (!sel) return;

  sel.innerHTML = prods.map(function(p) {
    return '<option value="' + p.id + '">' + escapeHtml(p.nombre) + '</option>';
  }).join('');

  if (prods.length) loadEditForm(prods[0]);
}

function loadEditForm(prod) {
  var form = document.getElementById('edit-form');
  if (!form) return;
  form.nombre.value = prod.nombre;
  form.precio.value = prod.precio;
  form.img.value = prod.img;
  form.desc.value = prod.desc;

  var catSel = document.getElementById('edit-categoria-select');
  if (catSel) catSel.value = prod.categoria;

  var preview = document.getElementById('edit-preview-img');
  if (preview) {
    preview.innerHTML = prod.img
      ? '<img src="' + escapeHtml(prod.img) + '" style="max-width:100px;border-radius:8px;" alt="preview">'
      : '';
  }
}

function handleEditSelectChange(e) {
  var prods = getProductos();
  var prod = prods.find(function(p) { return p.id == e.target.value; });
  if (prod) loadEditForm(prod);
}

function handleEditImageChange(e) {
  var file = e.target.files[0];
  if (!file) return;
  var dest = 'img/products/' + file.name;
  var reader = new FileReader();
  reader.onload = function(ev) {
    document.getElementById('edit-img-url').value = dest;
    document.getElementById('edit-preview-img').innerHTML =
      '<img src="' + ev.target.result + '" style="max-width:100px;border-radius:8px;" alt="preview">';
  };
  reader.readAsDataURL(file);
}

function handleEditImageUrlChange(e) {
  var url = e.target.value;
  var el = document.getElementById('edit-preview-img');
  if (el) el.innerHTML = url
    ? '<img src="' + escapeHtml(url) + '" style="max-width:100px;border-radius:8px;" alt="preview">'
    : '';
}

function handleEditSubmit(e) {
  e.preventDefault();
  var form = e.target;
  var id = form.id.value;
  var prods = getProductos();
  var idx = prods.findIndex(function(p) { return p.id == id; });

  if (idx === -1) {
    showEditMsg('edit-error-msg', 'Producto no encontrado.');
    return;
  }

  prods[idx] = {
    id: id,
    nombre: form.nombre.value.trim(),
    precio: parseFloat(form.precio.value),
    img: form.img.value.trim(),
    desc: form.desc.value.trim(),
    categoria: form.categoria.value.trim()
  };

  setProductos(prods);
  showEditMsg('edit-success-msg', 'Producto modificado.');
  loadEditSelect();
}

function handleDelete() {
  var form = document.getElementById('edit-form');
  var id = form.id.value;
  var prods = getProductos().filter(function(p) { return p.id != id; });
  setProductos(prods);
  showEditMsg('edit-success-msg', 'Producto borrado.');
  loadEditSelect();

  if (prods.length) {
    loadEditForm(prods[0]);
  } else {
    form.reset();
    document.getElementById('edit-preview-img').innerHTML = '';
  }
}

document.addEventListener('DOMContentLoaded', function() {
  renderCategorias();

  var addCatBtn = document.getElementById('agregar-categoria');
  if (addCatBtn) addCatBtn.addEventListener('click', handleAddCategoria);

  var uploadForm = document.getElementById('upload-form');
  if (uploadForm) uploadForm.addEventListener('submit', handleUploadSubmit);

  var imgFile = document.getElementById('img-file');
  if (imgFile) imgFile.addEventListener('change', handleImagePreview);

  var editSelect = document.getElementById('edit-select');
  if (editSelect) editSelect.addEventListener('change', handleEditSelectChange);

  var editImgFile = document.getElementById('edit-img-file');
  if (editImgFile) editImgFile.addEventListener('change', handleEditImageChange);

  var editImgUrl = document.getElementById('edit-img-url');
  if (editImgUrl) editImgUrl.addEventListener('input', handleEditImageUrlChange);

  var editForm = document.getElementById('edit-form');
  if (editForm) editForm.addEventListener('submit', handleEditSubmit);

  var deleteBtn = document.getElementById('delete-btn');
  if (deleteBtn) deleteBtn.addEventListener('click', handleDelete);

  loadEditSelect();
});
