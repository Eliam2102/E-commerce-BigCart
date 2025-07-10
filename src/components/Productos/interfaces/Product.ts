// src/interfaces/Product.ts

export interface Product {
        idProducto: number,
        sku: string,
        nombreProducto: string,
        precio: number,
        descripcion: string,
        rating: number,
        imagenUrl: string,
        stock: number,
        idCategoria: number,
}