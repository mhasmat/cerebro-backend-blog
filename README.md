# Frontend Blog – Curso Cerebro Backend 🧠

Este es un proyecto React simple que acompaña al curso **Cerebro Backend**. Fue diseñado para probar todos los endpoints creados en clase usando Django + DRF.

---

## 📦 Instalación

```bash
cd frontend-blog
npm install
npm run dev
```

El frontend espera que el backend esté corriendo en `http://localhost:8000` y que los endpoints estén montados bajo `/api/`.

---

## 🔐 Funcionalidades incluidas

### Autenticación (JWT)

* `POST /api/register/`
* `POST /api/login/`

### Posts (CRUD)

* `GET /api/posts/`
* `POST /api/posts/` *(requiere token)*
* `PUT /api/posts/:id/` *(requiere token)*
* `DELETE /api/posts/:id/` *(requiere token)*
* `GET /api/posts/:id/` *(detalle)*

### Comentarios

* `GET /api/posts/:id/comments/`
* `POST /api/posts/:id/comments/` *(no requiere login)*

---

## 🧪 Cómo testear

1. Registrate con un usuario nuevo.
2. Iniciá sesión para acceder al Dashboard.
3. Creá, editá y borrá posts.
4. Cerrá sesión y navegá a Home.
5. Probá enviar comentarios sin estar logueado.

---

## 📁 Estructura del proyecto

```
src/
├── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   └── PostDetail.jsx
├── components/
│   ├── Navbar.jsx
│   └── ProtectedRoute.jsx
├── services/
│   └── api.js
├── App.jsx
└── main.jsx
```

---

## 🎓 Recomendaciones

Este frontend no está pensado para producción, sino como herramienta de acompañamiento para los alumnos del curso. Podés personalizarlo, agregar imágenes, validaciones más complejas o estilos adicionales.

¡Felices pruebas! 🚀
