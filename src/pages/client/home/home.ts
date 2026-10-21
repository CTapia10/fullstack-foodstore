import "../../../main.ts";
import { getCategorias, PRODUCTS } from "../../../data/data.ts";
import type { ICategoria } from "../../../types/categoria.ts";
import type { IProduct } from "../../../types/product.ts";
import { logout } from "../../../utils/auth.ts";
import { addToCart, getCartCount, getProductQuantityInCart } from "../../../utils/cart.ts";

const categorias = getCategorias();
const productos = PRODUCTS;
const listaCategorias = document.getElementById("lista-categorias") as HTMLUListElement;
const contenedorProductos = document.getElementById("contenedor-productos") as HTMLDivElement;
const inputBuscar = document.getElementById("input-buscar") as HTMLInputElement;
const formBuscar = document.getElementById("form-buscar") as HTMLFormElement;
const tituloProductos = document.querySelector("main > h2") as HTMLHeadingElement;
const toastCarrito = document.getElementById("toast-carrito") as HTMLDivElement;
const contadorCarrito = document.getElementById("contador-carrito") as HTMLSpanElement;

let categoriaSeleccionada: ICategoria | null = null;
let toastTimeout: number | undefined;
const botonTimeouts = new WeakMap<HTMLButtonElement, number>();

const marcarCategoriaActiva = () => {
    const enlaces = listaCategorias.querySelectorAll("a");
    enlaces.forEach((enlace) => {
        const idEnlace = enlace.dataset.id;
        const esTodas = idEnlace === "todas" && categoriaSeleccionada === null;
        const esCategoria = categoriaSeleccionada !== null && idEnlace === String(categoriaSeleccionada.id);
        enlace.classList.toggle("activa", esTodas || esCategoria);
    });
};

const cargarCategorias = () => {
    listaCategorias.innerHTML = "";

    const liTodas = document.createElement("li");
    const aTodas = document.createElement("a");
    aTodas.href = "#";
    aTodas.dataset.id = "todas";
    aTodas.textContent = "Todas";
    aTodas.addEventListener("click", (event) => {
        event.preventDefault();
        categoriaSeleccionada = null;
        marcarCategoriaActiva();
        aplicarFiltros();
    });
    liTodas.appendChild(aTodas);
    listaCategorias.appendChild(liTodas);

    categorias.forEach((categoria) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = "#";
        a.dataset.id = String(categoria.id);
        a.textContent = categoria.nombre;
        a.addEventListener("click", (event) => {
            event.preventDefault();
            categoriaSeleccionada = categoria;
            marcarCategoriaActiva();
            aplicarFiltros();
        });
        li.appendChild(a);
        listaCategorias.appendChild(li);
    });

    marcarCategoriaActiva();
};

const actualizarCantidadEnTarjeta = (article: HTMLElement, productId: number) => {
    const cantidad = getProductQuantityInCart(productId);
    const indicador = article.querySelector(".cantidad-en-carrito") as HTMLParagraphElement;
    if (cantidad > 0) {
        indicador.textContent = `En carrito: ${cantidad}`;
        indicador.hidden = false;
    } else {
        indicador.textContent = "";
        indicador.hidden = true;
    }
};

const cargarProductos = (lista: IProduct[] = productos) => {
    contenedorProductos.innerHTML = "";

    if (lista.length === 0) {
        const mensaje = document.createElement("p");
        mensaje.textContent = "No se encontraron productos.";
        contenedorProductos.appendChild(mensaje);
        return;
    }

    lista.forEach((producto) => {
        const article = document.createElement("article");
        article.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p class="precio-producto">${producto.precio}$</p>
            <p class="cantidad-en-carrito" hidden></p>
            <button type="button">Agregar</button>
        `;
        actualizarCantidadEnTarjeta(article, producto.id);

        const boton = article.querySelector("button") as HTMLButtonElement;
        boton.addEventListener("click", () => {
            const item = addToCart(producto);
            mostrarFeedbackAgregado(boton, producto.nombre, item.quantity);
            actualizarCantidadEnTarjeta(article, producto.id);
        });
        contenedorProductos.appendChild(article);
    });
};

const actualizarContadorCarrito = () => {
    const cantidad = getCartCount();
    contadorCarrito.textContent = String(cantidad);
    contadorCarrito.hidden = cantidad === 0;
    contadorCarrito.classList.remove("pulse");
    void contadorCarrito.offsetWidth;
    contadorCarrito.classList.add("pulse");
};

const mostrarToast = (mensaje: string) => {
    toastCarrito.textContent = mensaje;
    toastCarrito.classList.remove("visible", "toast-bump");
    void toastCarrito.offsetWidth;
    toastCarrito.classList.add("visible", "toast-bump");
    window.clearTimeout(toastTimeout);
    toastTimeout = window.setTimeout(() => {
        toastCarrito.classList.remove("visible", "toast-bump");
    }, 1800);
};

const mostrarFeedbackAgregado = (
    boton: HTMLButtonElement,
    nombre: string,
    cantidad: number,
) => {
    const timeoutAnterior = botonTimeouts.get(boton);
    if (timeoutAnterior !== undefined) {
        window.clearTimeout(timeoutAnterior);
    }

    boton.textContent = `Agregado`;
    boton.classList.remove("agregado");
    void boton.offsetWidth;
    boton.classList.add("agregado");

    mostrarToast(`${nombre} ×${cantidad} en el carrito`);
    actualizarContadorCarrito();

    const timeout = window.setTimeout(() => {
        boton.textContent = "Agregar";
        boton.classList.remove("agregado");
        botonTimeouts.delete(boton);
    }, 300);
    botonTimeouts.set(boton, timeout);
};

const aplicarFiltros = () => {
    const texto = inputBuscar.value.trim().toLowerCase();
    let filtrados = productos;

    if (categoriaSeleccionada) {
        filtrados = filtrados.filter((producto) =>
            producto.categorias.some((categoria) => categoria.id === categoriaSeleccionada?.id)
        );
    }

    if (texto) {
        filtrados = filtrados.filter((producto) => {
            const coincideNombre = producto.nombre.toLowerCase().includes(texto);
            const coincideDescripcion = producto.descripcion.toLowerCase().includes(texto);
            const coincideCategoria = producto.categorias.some((categoria) =>
                categoria.nombre.toLowerCase().includes(texto)
            );

            return coincideNombre || coincideDescripcion || coincideCategoria;
        });
    }

    if (tituloProductos) {
        tituloProductos.textContent = categoriaSeleccionada
            ? `Productos de ${categoriaSeleccionada.nombre}`
            : "Todos los productos";
    }

    cargarProductos(filtrados);
};

document.addEventListener("DOMContentLoaded", () => {
    cargarCategorias();
    aplicarFiltros();
    actualizarContadorCarrito();

    inputBuscar.addEventListener("input", aplicarFiltros);

    formBuscar.addEventListener("submit", (event) => {
        event.preventDefault();
    });

    document.getElementById("logoutButton")?.addEventListener("click", () => {
        logout();
    });
});
