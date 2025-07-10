import { AppDispatch } from "../redux/store";
import { fetchProductos } from "../redux/productosSlice";

 export const cargarProductos =() => async (dispatch: AppDispatch) => {
    dispatch(fetchProductos());
 }