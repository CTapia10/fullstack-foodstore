import type { ICategoria } from "./categoria.ts";

export interface IProduct {
    id: number;
    eliminado: boolean;
    createdAt: Date;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    imagen: string;
    disponible: boolean;
    categorias: ICategoria[];
}

export interface ICartItem {
    id: number;
    product: IProduct;
    quantity: number;
    precio: number;
    subtotal: number;
    eliminado: boolean;
    createdAt: Date;
}
