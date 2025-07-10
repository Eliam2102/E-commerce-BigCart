
import axiosInstance from "../Api/axiosConfig";


// Obtener el carrito
export const getviewCart = async (idCarrito: number) => {
  const response = await axiosInstance.get(`carrito/viewCart/${idCarrito}`);
  return response.data;
};

// Agregar producto al carrito
export const addToCart = async (idCliente: number, idProducto: number, cantidad: number): Promise<void> => {
  await axiosInstance.post('/carrito/addCart', {
    idCliente,
    idProducto,
    cantidad,
  });
};

// Actualizar cantidad en el carrito
export const updateCartQuantity = async ({
  cantidad,
  idCarrito,
  idProducto,
}: {
  cantidad: number;
  idCarrito: number;
  idProducto: number;
}): Promise<void> => {
  console.log("datos en el modelo:" + cantidad,idCarrito,idProducto);
  await axiosInstance.put('/carrito/updatequantity', {
    cantidad,
    idCarrito,
    idProducto,
  });
};

// eliminar producto del carrito 

export const eliminardelCarrito = async ({
  idCarrito,
  idProducto,
}: 
{
  idCarrito: number;
  idProducto: number;
}): Promise<void> =>{
  await axiosInstance.delete('/carrito/eliminarProducto', {
    data:{
      idCarrito,
    idProducto,
    }
  });
}

export const vaciarcarrito = async ({
  idCarrito,
}:{
  idCarrito: number;
}): Promise<void> => {
  await axiosInstance.put('/carrito/vaciarCarrito', {
      idCarrito,
  });
}

export const CompraCarrito = async ({
  idCarrito,
}:{
  idCarrito: number;
}) : Promise<void> => {
  await axiosInstance.post('/carrito/compraCarrito', {
    idCarrito
  });
}

// Obtener el carrito
export const getviewShop = async (idCliente: number) => {
  const response = await axiosInstance.get(`shopping/${idCliente}`);
  return response.data;
};