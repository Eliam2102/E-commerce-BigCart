// Definición del tipo para un producto en el carrito
interface ItemCarrito {
    idProducto: number;
    cantidad: number;
    nombreProducto: string;
    descripcion: string;
    precio: number;
    imagen: string;
}

// Función para agregar un producto al carrito local
export function agregarProductoLocal(producto: ItemCarrito): void {
    // Obtiene el carrito actual del local storage
    const carrito: ItemCarrito[] = JSON.parse(localStorage.getItem('carrito') || '[]');

    // Verifica si el producto ya está en el carrito
    const productoIndex = carrito.findIndex(item => item.idProducto === producto.idProducto);

    if (productoIndex >= 0) {
        // Si el producto ya está en el carrito, actualiza la cantidad
        carrito[productoIndex].cantidad += producto.cantidad;
    } else {
        // Si no está, agrega el nuevo producto
        carrito.push(producto);
    }

    // Guarda el carrito actualizado en el local storage
    localStorage.setItem('carrito', JSON.stringify(carrito));
}


