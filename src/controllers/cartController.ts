import { AppDispatch } from "../redux/store";
import { fetchCarrito } from "../redux/cartSlice";
import { addToCart } from '../models/cartModel'; // Ruta relativa al modelo

export const verCart =(idcarrito: number) => async (dispatch: AppDispatch) => {
  dispatch(fetchCarrito(idcarrito));
}
export const handleAddToCartwithLogin = async (idCliente: number, idProducto: number, cantidad: number) => {
try {
  const response = await addToCart(idCliente, idProducto, cantidad);
  return response; // Devuelve los datos al componente que lo llame
} catch (error) {
  console.error('Error al agregar al carrito:', error);
  throw new Error('Error al procesar la solicitud');
}
};