import "../../../main.ts";
import type { ICartItem } from "../../../types/product.ts";
import { logout } from "../../../utils/auth.ts";
import {addToCart, decreaseFromCart, getCart, getCartCount, getCartTotal, removeFromCart,
} from "../../../utils/cart.ts";

const listaCarrito = document.getElementById("lista-carrito") as HTMLElement;
const mensajeVacio = document.getElementById("mensaje-vacio") as HTMLParagraphElement;
const resumenCarrito = document.getElementById("resumen-carrito") as HTMLDivElement;
const totalCarrito = document.getElementById("total-carrito") as HTMLSpanElement;
const contadorCarrito = document.getElementById("contador-carrito") as HTMLSpanElement;

const actualizarContadorCarrito = () => {
  const cantidad = getCartCount();
  contadorCarrito.textContent = String(cantidad);
  contadorCarrito.hidden = cantidad === 0;
};

const crearItemCarrito = (item: ICartItem) => {
  const article = document.createElement("article");
  article.className = "item-carrito";
  article.innerHTML = `
    <div class="item-carrito-info">
      <h3>${item.product.nombre}</h3>
      <p>Precio: ${item.precio}$</p>
      <p>Cantidad: <span class="cantidad-item">${item.quantity}</span></p>
      <p>Subtotal: ${item.subtotal}$</p>
    </div>
    <div class="item-carrito-acciones">
      <button type="button" class="btn-disminuir" aria-label="Quitar una unidad">-</button>
      <button type="button" class="btn-aumentar" aria-label="Agregar una unidad">+</button>
      <button type="button" class="btn-quitar">Quitar</button>
    </div>
  `;

  const btnDisminuir = article.querySelector(".btn-disminuir") as HTMLButtonElement;
  const btnAumentar = article.querySelector(".btn-aumentar") as HTMLButtonElement;
  const btnQuitar = article.querySelector(".btn-quitar") as HTMLButtonElement;

  btnDisminuir.addEventListener("click", () => {
    decreaseFromCart(item.product.id);
    cargarCarrito();
  });

  btnAumentar.addEventListener("click", () => {
    addToCart(item.product);
    cargarCarrito();
  });

  btnQuitar.addEventListener("click", () => {
    removeFromCart(item.product.id);
    cargarCarrito();
  });

  return article;
};

const cargarCarrito = () => {
  const items = getCart().filter((cartItem) => !cartItem.eliminado);
  listaCarrito.innerHTML = "";

  if (items.length === 0) {
    mensajeVacio.hidden = false;
    resumenCarrito.hidden = true;
    totalCarrito.textContent = "0$";
    actualizarContadorCarrito();
    return;
  }

  mensajeVacio.hidden = true;
  resumenCarrito.hidden = false;

  items.forEach((cartItem) => {
    listaCarrito.appendChild(crearItemCarrito(cartItem));
  });

  totalCarrito.textContent = `${getCartTotal()}$`;
  actualizarContadorCarrito();
};

document.addEventListener("DOMContentLoaded", () => {
  cargarCarrito();

  document.getElementById("logoutButton")?.addEventListener("click", () => {
    logout();
  });
});
