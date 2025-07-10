export interface DetallesCarrito {
    idCarrito: number;
    idCliente: number;
    totalCarrito: string;
    estadoCarrito: string;
  }
  
  export interface ItemCarrito {
    idProducto: number;
    cantidad: number;
    nombreProducto: string;
    descripcion: string;
    rating: number;
    precio: number;
    imagen: string;
  }
  