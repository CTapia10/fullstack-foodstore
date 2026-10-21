import type { ICartItem, IProduct } from "../types/product.ts";

const CART_KEY = "cart";

export const getCart = (): ICartItem[] => {
  const cart = localStorage.getItem(CART_KEY);
  if (!cart) {
    return [];
  }

  try {
    const parsed = JSON.parse(cart) as ICartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const saveCart = (cart: ICartItem[]): void => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

const getActiveItems = () => getCart().filter((item) => !item.eliminado);

export const addToCart = (product: IProduct, quantity = 1): ICartItem => {
  const cart = getCart();
  const existente = cart.find(
    (item) => item.product.id === product.id && !item.eliminado,
  );

  if (existente) {
    existente.quantity += quantity;
    existente.subtotal = existente.precio * existente.quantity;
    saveCart(cart);
    return existente;
  }

  const nextId = cart.reduce((max, item) => Math.max(max, item.id), 0) + 1;
  const nuevoItem: ICartItem = {
    id: nextId,
    product,
    quantity,
    precio: product.precio,
    subtotal: product.precio * quantity,
    eliminado: false,
    createdAt: new Date(),
  };

  cart.push(nuevoItem);
  saveCart(cart);
  return nuevoItem;
};

export const removeFromCart = (productId: number): void => {
  const cart = getCart().filter((item) => item.product.id !== productId);
  saveCart(cart);
};

export const decreaseFromCart = (productId: number): ICartItem | null => {
  const cart = getCart();
  const existente = cart.find(
    (item) => item.product.id === productId && !item.eliminado,
  );

  if (!existente) {
    return null;
  }

  if (existente.quantity <= 1) {
    saveCart(cart.filter((item) => item.product.id !== productId));
    return null;
  }

  existente.quantity -= 1;
  existente.subtotal = existente.precio * existente.quantity;
  saveCart(cart);
  return existente;
};

export const getProductQuantityInCart = (productId: number): number => {
  const item = getActiveItems().find((cartItem) => cartItem.product.id === productId);
  return item?.quantity ?? 0;
};

export const getCartCount = (): number => {
  return getActiveItems().reduce((total, item) => total + item.quantity, 0);
};

export const getCartTotal = (): number => {
  return getActiveItems().reduce((total, item) => total + item.subtotal, 0);
};
