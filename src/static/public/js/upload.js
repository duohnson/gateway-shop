/* UPLOAD PAGE - handles product upload, editing, and deletion */

/* ===========================
   CATEGORY MANAGEMENT
   =========================== */

// GET categories from localStorage or JSON file
function getCategorias() {
    let cats = localStorage.getItem('categorias');
    if (cats) return JSON.parse(cats);
    
    // IF not in localStorage, try to load from JSON file
    try {
        const req = new XMLHttpRequest();
        req.open('GET', 'categorias.json', false); // Synchronous request
        req.send(null);
        
        if (req.status === 200) {
            cats = JSON.parse(req.responseText);
            localStorage.setItem('categorias', JSON.stringify(cats));
            return cats;
        }
    } catch (err) {
        console.warn('Could not load categories from file');
    }
    
    return [];
}

// SAVE categories to localStorage and server
function setCategorias(cats) {
    localStorage.setItem('categorias', JSON.stringify(cats));
    
    // UPDATE categories.json on server
    fetch('categorias.json', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cats)
    }).catch(err => {
        console.warn('Failed to update categories on server:', err);
    });
}

// RENDER category dropdown options
function renderCategorias() {
    const cats = getCategorias();
    const sel = document.getElementById('categoria-select');
    
    if (!sel) return;
    
    // BUILD category options HTML
    sel.innerHTML = cats.map(c => 
        `<option value="${c}">${c.charAt(0).toUpperCase() + c.slice(1)}</option>`
    ).join('');
    
    // ALSO update edit form category dropdown
    const editSel = document.getElementById('edit-categoria-select');
    if (editSel) {
        editSel.innerHTML = sel.innerHTML;
    }
}

// ADD new category handler
function handleAddCategoria() {
    const input = document.getElementById('nueva-categoria');
    let val = input.value.trim();
    
    if (!val) return;
    
    let cats = getCategorias();
    
    // ONLY add if category doesnt exist
    if (!cats.includes(val)) {
        cats.push(val);
        setCategorias(cats);
        renderCategorias();
        input.value = '';
    }
}

/* ===========================
   PRODUCT MANAGEMENT
   =========================== */

// GET products from localStorage
function getProductos() {
    const guardados = localStorage.getItem('productos');
    return guardados ? JSON.parse(guardados) : [];
}

// SAVE products to localStorage and server
function setProductos(productos) {
    localStorage.setItem('productos', JSON.stringify(productos));
    
    // UPDATE productos.json on server
    fetch('productos.json', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productos)
    }).catch(err => {
        console.warn('Failed to update products on server:', err);
    });
}

// ADD new product to the list
function agregarProducto(producto) {
    let productos = getProductos();
    
    // GENERATE unique ID based on timestamp
    producto.id = Date.now();
    productos.push(producto);
    setProductos(productos);
    
    // ADD category if its new
    let cats = getCategorias();
    if (!cats.includes(producto.categoria)) {
        cats.push(producto.categoria);
        setCategorias(cats);
        renderCategorias();
    }
}

/* ===========================
   UPLOAD FORM HANDLING
   =========================== */

// HANDLE product upload form submission
async function handleUploadSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const nombre = form.nombre.value.trim();
    const precio = parseFloat(form.precio.value);
    const desc = form.desc.value.trim();
    const categoria = form.categoria.value.trim() || form.categoria.options[form.categoria.selectedIndex].value;
    const imgFile = form.img.files[0];
    
    // VALIDATE all fields are filled
    if (!nombre || isNaN(precio) || !imgFile || !desc || !categoria) {
        showMessage('error-msg', 'Todos los campos son obligatorios.');
        return;
    }
    
    // UPLOAD IMAGE FIRST
    const imgForm = new FormData();
    imgForm.append('img', imgFile);
    let imgUrl = '';
    try {
        const imgRes = await fetch('/api/upload-img', { method: 'POST', body: imgForm });
        if (!imgRes.ok) {
            showMessage('error-msg', 'Error al subir la imagen.');
            return;
        }
        imgUrl = await imgRes.text();
    } catch (err) {
        showMessage('error-msg', 'Error de conexión al subir imagen.');
        return;
    }

    // PREPARE product data for API (send plain form values)
    const prodForm = new FormData();
    prodForm.append('nombre', nombre);
    prodForm.append('precio', String(precio));
    prodForm.append('desc', desc);
    prodForm.append('categoria', categoria);
    prodForm.append('img', imgUrl);

    try {
        const res = await fetch('/api/productos', { method: 'POST', body: prodForm });
        if (res.ok) {
            form.reset();
            document.getElementById('preview-img').innerHTML = '';
            showMessage('success-msg', 'Producto subido correctamente.');
            cargarEditSelect();

            // update localStorage and reload shop
            let productos = localStorage.getItem('productos');
            productos = productos ? JSON.parse(productos) : [];
            productos.push({ id: Date.now(), nombre, precio, desc, categoria, img: imgUrl });
            localStorage.setItem('productos', JSON.stringify(productos));
            window.location.href = 'shop.html';
        } else {
            showMessage('error-msg', 'Error al subir el producto.');
        }
    } catch (err) {
        showMessage('error-msg', 'Error de conexión con el servidor.');
    }
}

// SHOW success or error message
function showMessage(msgId, text) {
    const successEl = document.getElementById('success-msg');
    const errorEl = document.getElementById('error-msg');
    
    if (msgId === 'success-msg') {
        successEl.textContent = text || 'Producto subido correctamente.';
        successEl.style.display = 'block';
        errorEl.style.display = 'none';
    } else {
        errorEl.textContent = text || 'Ocurrió un error.';
        errorEl.style.display = 'block';
        successEl.style.display = 'none';
    }
}

// HANDLE image file preview for upload form
function handleImagePreview(e) {
    const file = e.target.files[0];
    
    if (file) {
        const reader = new FileReader();
        
        reader.onload = function(ev) {
            document.getElementById('preview-img').innerHTML = 
                `<img src="${ev.target.result}" style="max-width:100px;border-radius:8px;">`;
        };
        
        reader.readAsDataURL(file);
    }
}

/* ===========================
   EDIT FORM HANDLING
   =========================== */

// LOAD products into edit dropdown
function cargarEditSelect() {
    const productos = getProductos();
    const select = document.getElementById('edit-select');
    
    if (!select) return;
    
    // BUILD product options
    select.innerHTML = productos.map(p => 
        `<option value="${p.id}">${p.nombre}</option>`
    ).join('');
    
    // LOAD first product into edit form
    if (productos.length) {
        cargarEditForm(productos[0]);
    }
}

// LOAD product data into edit form
function cargarEditForm(producto) {
    const form = document.getElementById('edit-form');
    
    if (!form) return;
    
    form.nombre.value = producto.nombre;
    form.precio.value = producto.precio;
    form.img.value = producto.img;
    form.desc.value = producto.desc;
    
    const catSelect = document.getElementById('edit-categoria-select');
    if (catSelect) {
        catSelect.value = producto.categoria;
    }
    
    // SHOW image preview
    const previewEl = document.getElementById('edit-preview-img');
    if (previewEl) {
        previewEl.innerHTML = producto.img ? 
            `<img src="${producto.img}" style="max-width:100px;border-radius:8px;">` : '';
    }
}

// HANDLE edit select change
function handleEditSelectChange(e) {
    const productos = getProductos();
    const selectedId = e.target.value;
    const prod = productos.find(p => p.id == selectedId);
    
    if (prod) {
        cargarEditForm(prod);
    }
}

// HANDLE edit form image file change
function handleEditImageChange(e) {
    const file = e.target.files[0];
    
    if (file) {
        const fileName = file.name;
        const destPath = 'img/products/' + fileName;
        const reader = new FileReader();
        
        reader.onload = function(ev) {
            document.getElementById('edit-img-url').value = destPath;
            document.getElementById('edit-preview-img').innerHTML = 
                `<img src="${ev.target.result}" style="max-width:100px;border-radius:8px;">`;
        };
        
        reader.readAsDataURL(file);
    }
}

// HANDLE edit form image URL input
function handleEditImageUrlChange(e) {
    const url = e.target.value;
    document.getElementById('edit-preview-img').innerHTML = url ? 
        `<img src="${url}" style="max-width:100px;border-radius:8px;">` : '';
}

// HANDLE edit form submission
function handleEditSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const id = form.id.value;
    let productos = getProductos();
    
    // FIND product index
    const idx = productos.findIndex(p => p.id == id);
    
    if (idx === -1) {
        showEditMessage('edit-error-msg', 'Producto no encontrado.');
        return;
    }
    
    // UPDATE product data
    productos[idx] = {
        id: id,
        nombre: form.nombre.value.trim(),
        precio: parseFloat(form.precio.value),
        img: form.img.value.trim(),
        desc: form.desc.value.trim(),
        categoria: form.categoria.value.trim()
    };
    
    setProductos(productos);
    showEditMessage('edit-success-msg', 'Producto modificado correctamente.');
    cargarEditSelect();
}

// SHOW edit form success or error message
function showEditMessage(msgId, text) {
    const successEl = document.getElementById('edit-success-msg');
    const errorEl = document.getElementById('edit-error-msg');
    
    if (msgId === 'edit-success-msg') {
        successEl.textContent = text || 'Producto modificado correctamente.';
        successEl.style.display = 'block';
        errorEl.style.display = 'none';
    } else {
        errorEl.textContent = text || 'Ocurrió un error.';
        errorEl.style.display = 'block';
        successEl.style.display = 'none';
    }
}

// HANDLE product deletion
function handleDeleteProduct() {
    const form = document.getElementById('edit-form');
    const id = form.id.value;
    let productos = getProductos();
    
    // FILTER out the product to delete
    productos = productos.filter(p => p.id != id);
    setProductos(productos);
    
    showEditMessage('edit-success-msg', 'Producto borrado correctamente.');
    cargarEditSelect();
    
    // IF products remain, load first one
    if (productos.length) {
        cargarEditForm(productos[0]);
    } else {
        // RESET form if no products left
        form.reset();
        document.getElementById('edit-preview-img').innerHTML = '';
    }
}

/* ===========================
   INITIALIZATION
   =========================== */

// INIT all event listeners when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // RENDER categories on load
    renderCategorias();
    
    // ADD category button
    const addCatBtn = document.getElementById('agregar-categoria');
    if (addCatBtn) {
        addCatBtn.addEventListener('click', handleAddCategoria);
    }
    
    // UPLOAD form
    const uploadForm = document.getElementById('upload-form');
    if (uploadForm) {
        uploadForm.addEventListener('submit', handleUploadSubmit);
    }
    
    // IMAGE preview for upload
    const imgFile = document.getElementById('img-file');
    if (imgFile) {
        imgFile.addEventListener('change', handleImagePreview);
    }
    
    // EDIT select dropdown
    const editSelect = document.getElementById('edit-select');
    if (editSelect) {
        editSelect.addEventListener('change', handleEditSelectChange);
    }
    
    // EDIT form image file
    const editImgFile = document.getElementById('edit-img-file');
    if (editImgFile) {
        editImgFile.addEventListener('change', handleEditImageChange);
    }
    
    // EDIT form image URL
    const editImgUrl = document.getElementById('edit-img-url');
    if (editImgUrl) {
        editImgUrl.addEventListener('input', handleEditImageUrlChange);
    }
    
    // EDIT form submission
    const editForm = document.getElementById('edit-form');
    if (editForm) {
        editForm.addEventListener('submit', handleEditSubmit);
    }
    
    // DELETE button
    const deleteBtn = document.getElementById('delete-btn');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', handleDeleteProduct);
    }
    
    // LOAD products into edit select on init
    cargarEditSelect();
});
