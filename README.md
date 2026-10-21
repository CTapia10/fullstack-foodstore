# Food Store

## Descripción

Proyecto de **Programación 3** (UTN TUP) hecho con **HTML5**, **CSS**, **Vite** y **TypeScript**.

Permite a los usuarios navegar por un catálogo de productos, filtrar por categorías, buscar productos por nombre y gestionar un carrito de compras interactivo con persistencia de datos en `localStorage`.

## Enlace Video

[Explicación del Código](https://youtu.be/nV5_wYWRI2Y)

## Requisitos

- [Node.js](https://nodejs.org/) 18 o superior (incluye `npm`)
- Un navegador actual (Chrome, Edge o Firefox)

## Cómo ejecutarlo en otra máquina

1. Copiar o clonar esta carpeta del proyecto.
2. Abrir una terminal **en la raíz** (donde está `package.json`).
3. Instalar dependencias:

```bash
pnpm install
```

4. Levantar el servidor de desarrollo:

```bash
pnpm dev
```

5. Abrir en el navegador la URL que muestra Vite, en general:

```text
http://localhost:5173
```

La app redirige al login.

## Al empezar

Si `localStorage` todavía no tiene usuarios, se puede crear un cliente nuevo desde **Registrarse**.

Si en esa máquina ya se usó el proyecto y el login falla, borrar el `localStorage` del sitio (o probar en una ventana de incógnito).

## Qué probar

1. **Registro cliente:** registrarse indicando email y contraseña, por ejemplo: `email@test.com` / `test123`. Debe redirigir el login.
2. **Login cliente:** indicando el email y contraseña previamente creados. Debe redirigir al catálogo
3. **Catálogo:** se listan productos disponibles. La búsqueda filtra al escribir. El menú lateral filtra por categoría; **Todas** vuelve al listado completo.
4. **Carrito:** **Agregar** guarda en `localStorage` (clave `cart`). Si el producto ya estaba, sube la cantidad. Hay feedback en el botón, toast y contador del nav.
5. **Ver carrito:** el enlace **Carrito** muestra nombre, precio, cantidad y subtotal. Vacío muestra un mensaje. El total es la suma de subtotales. Se puede sumar, restar o quitar ítems.
6. **Logout:** **Cerrar sesión** vuelve al login.
7. **Rutas protegidas:** sin sesión, entrar a una URL de catálogo o carrito redirige al login.

## Estructura

```text
/
├── index.html                 # Redirige al login
├── styles.css
├── public/placeholder.svg     # Imagen de productos
├── src/
│   ├── main.ts                # Chequeo de sesión y rol
│   ├── data/data.ts           # Categorías y productos
│   ├── pages/
│   │   ├── auth/              # Login y registro
│   │   ├── admin/home/        # Vista de administrador (por el momento no disponible)
│   │   └── client/
│   │       ├── home/          # Catálogo
│   │       └── cart/          # Carrito
│   ├── types/
│   └── utils/
│       ├── auth.ts
│       ├── cart.ts
│       ├── localStorage.ts
│       └── navigate.ts
└── README.md
```
