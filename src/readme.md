# Documentación de Controladores - API de Tienda

Esta documentación cubre los controladores implementados en el backend, sus endpoints, formatos de solicitud/respuesta y cómo integrarlos desde un frontend, con especial atención a las operaciones de actualización de productos (`methodsupdate`).

## Índice de Prioridad

1. **Autenticación** (`Login`) – Obtener token de acceso.
2. **Operaciones de Productos** – Crear, actualizar, eliminar y consultar productos.
3. **Páginas Públicas** – Vistas principales y listado de productos.
4. **Middleware de Autenticación** – Protección de rutas.

---

## 1. Autenticación

### `POST /login`

Inicia sesión con credenciales de usuario y devuelve un token de acceso de un solo uso en la cabecera `Acces-Token`.

**Cuerpo de la solicitud (JSON):**

```json
{
  "user": "nombre_usuario",
  "password": "contraseña"
}
```

**Respuesta exitosa (200 OK):**  
No hay cuerpo, pero se incluye la cabecera `Acces-Token` con el token generado.

**Respuesta de error (401 Unauthorized):**

```json
{
  "error": "Credenciales incorrectas"
}
```

**Ejemplo con `fetch`:**

```javascript
const response = await fetch("/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ user: "admin", password: "secreto" }),
});
const token = response.headers.get("Acces-Token");
// Almacenar token para usarlo en la siguiente petición (un solo uso)
```

> ⚠️ **Nota importante:** El token es de **un solo uso**. Después de ser utilizado en una petición a una ruta protegida, el servidor lo elimina y no puede reutilizarse. Para cada nueva petición protegida debe obtenerse un nuevo token mediante `/login`.

---

## 2. Operaciones sobre Productos

### 2.1. Crear Producto

#### `POST /api/productos`

Crea un nuevo producto. Esta ruta está protegida (requiere token) y debe estar bajo `/admin` (según configuración en `main.go`).

**Cabeceras requeridas:**  
`Acces-Token: <token_obtenido_en_login>`

**Cuerpo de la solicitud (JSON):**

```json
{
  "category": "Electrónica",
  "name": "Smartphone XYZ",
  "desc": "Último modelo con 128GB",
  "price": 499.99,
  "quantity": 10,
  "brand": "Marca",
  "color": "Negro",
  "image": "/uploads/smartphone.jpg"
}
```

**Respuesta exitosa:**  
`200 OK` (sin cuerpo, o un mensaje de éxito).

**Ejemplo con `fetch`:**

```javascript
const token = await obtenerToken(); // función que obtiene token nuevo
const response = await fetch('/admin/api/productos', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Acces-Token': token
  },
  body: JSON.stringify({ category: 'Electrónica', name: 'Smartphone XYZ', ... })
});
```

### 2.2. Actualizar Producto Completo

#### `PUT /admin/api/product/:id` (o `PATCH`)

Corresponde a la función `UpdateProduct` del paquete `methodsupdate`. Actualiza todos los campos de un producto existente.

**Ruta inferida:** Dado que el controlador usa `data.Id` del cuerpo, se recomienda una ruta como `/admin/api/product` con método `PUT` que incluya el ID en el cuerpo. Sin embargo, RESTful sería `/admin/api/product/:id`. Ajusta según tu definición de rutas.

**Cabeceras requeridas:** `Acces-Token`

**Cuerpo de la solicitud (JSON):**

```json
{
  "id": 1,
  "category": "Electrónica",
  "name": "Smartphone ABC",
  "desc": "Descripción actualizada",
  "price": 399.99,
  "quantity": 5,
  "brand": "Marca",
  "color": "Azul",
  "image": "/uploads/nueva_imagen.jpg"
}
```

**Respuesta exitosa:** `200 OK`

**Ejemplo:**

```javascript
const token = await obtenerToken();
await fetch('/admin/api/product', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Acces-Token': token
  },
  body: JSON.stringify({ id: 1, category: 'Electrónica', name: 'Smartphone ABC', ... })
});
```

### 2.3. Actualizar Disponibilidad

#### `PATCH /admin/api/product/:id/aviable/:aviable`

Corresponde a `UpdateDisponivilityProduct`. Actualiza únicamente el campo `aviable` (booleano) de un producto.

**Parámetros en la URL:**

- `id`: ID del producto.
- `aviable`: Valor booleano (true/false) como string.

**Cabeceras requeridas:** `Acces-Token`

**Respuesta exitosa:** `200 OK`

**Ejemplo:**

```javascript
const token = await obtenerToken();
const id = 1;
const disponible = true;
await fetch(`/admin/api/product/${id}/aviable/${disponible}`, {
  method: "PATCH",
  headers: { "Acces-Token": token },
});
```

> **Nota:** La función actualmente recibe `aviable` como string mediante `c.Params("aviable")`. Asegúrate de enviar `"true"` o `"false"`.

### 2.4. Subir Imagen

#### `POST /api/upload-img`

Permite subir una imagen para un producto. Posiblemente devuelve la ruta de la imagen guardada. La implementación no se muestra, pero se menciona en rutas.

**Recomendación:** Usar `multipart/form-data` con un campo `image`.

---

## 3. Consultas Públicas

### `GET /`

Página de inicio (IndexPage).

### `GET /shop`

Página de tienda (ShopPage).

### `GET /:category`

Lista productos de una categoría.

### `GET /:category/:name`

Filtra productos por categoría y nombre (probablemente búsqueda).

Estos endpoints no requieren autenticación.

---

## 4. Middleware de Autenticación

El middleware `AuthMiddleware` se aplica a todas las rutas bajo `/admin` (ver `main.go`). Su comportamiento:

- Lee la cabecera `Acces-Token`.
- Verifica si el token existe en el mapa global `RegistredToken`.
- Si existe, lo elimina y permite el acceso a la ruta.
- Si no existe, redirige a `/login`.

**Esto implica que cada petición a rutas protegidas debe incluir un token nuevo, obtenido justo antes de la petición.**

---

## Integración con el Frontend: Enfoque en `methodsupdate`

Para actualizar productos desde el frontend, sigue estos pasos:

1. **Obtener un token** llamando a `POST /login` justo antes de cada operación de actualización.
2. **Construir la petición** al endpoint correspondiente (`PUT /admin/api/product` o `PATCH /admin/api/product/:id/aviable/:aviable`), incluyendo el token en la cabecera `Acces-Token`.
3. **Manejar la respuesta**: si es exitosa (200), la operación se realizó correctamente; si es 401, el token no era válido y debes reiniciar el proceso.

**Ejemplo completo de actualización de producto:**

```javascript
async function actualizarProducto(producto) {
  // 1. Login para obtener token
  const loginRes = await fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user: "admin", password: "secreto" }),
  });
  const token = loginRes.headers.get("Acces-Token");
  if (!token) throw new Error("No se pudo obtener token");

  // 2. Actualizar producto
  const updateRes = await fetch("/admin/api/product", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Acces-Token": token,
    },
    body: JSON.stringify(producto),
  });

  if (updateRes.ok) {
    console.log("Producto actualizado");
  } else {
    console.error("Error en actualización");
  }
}
```

**Ejemplo de actualización de disponibilidad:**

```javascript
async function cambiarDisponibilidad(id, disponible) {
  const loginRes = await fetch('/login', { method: 'POST', ... });
  const token = loginRes.headers.get('Acces-Token');

  await fetch(`/admin/api/product/${id}/aviable/${disponible}`, {
    method: 'PATCH',
    headers: { 'Acces-Token': token }
  });
}
```

---

## Consideraciones Adicionales

- Todas las rutas protegidas deben prefijarse con `/admin` (según `main.go`). Ajusta las rutas en tu definición de `routes.go` para que los endpoints de actualización estén bajo `/admin`.
- La base de datos espera los campos exactos definidos en los modelos (`category`, `name`, `desc`, `price`, `quantity`, `brand`, `color`, `image`, `aviable`). Asegúrate de enviarlos con los nombres correctos.
- El manejo de errores en los controladores devuelve código 500 con el mensaje de error. Puedes capturarlo en el frontend.
- Para desarrollo local con HTTPS, el servidor usa certificados en `./certs/`. Ajusta la URL base en el frontend.

---

Esta documentación cubre los controladores proporcionados y su integración básica. Si se añaden más endpoints (como eliminación), se deben documentar siguiendo el mismo formato.
