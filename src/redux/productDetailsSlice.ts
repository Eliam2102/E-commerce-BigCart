import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Producto } from './productosSlice';

// Uitliza el estado local de productosSlice.ts
interface ProductDetailsState {
  product: Producto | null;
  error: string | null;
}

// Valores iniciales de detalles producto
const initialState: ProductDetailsState = {
  product: null, // Detalles del producto seleccionado
  error: null,
};

const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState,
  reducers: {
    setProductDetails(state, action: PayloadAction<Producto>) {
      state.product = action.payload;
      state.error = null;
    },
    clearProductDetails(state) {
      state.product = null; // Limpia los detalles
      state.error = null;
    },
    setError(state, action: PayloadAction<string>) {
      state.product = null;
      state.error = action.payload;
    },
  },
});

// Exportar las acciones y el reducer
export const { setProductDetails, clearProductDetails, setError } = productDetailsSlice.actions;
export default productDetailsSlice.reducer;
