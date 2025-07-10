import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../redux/store';
import { Producto } from './productosSlice';

// Estado inicial
interface CarouselState {
  randomProducts: Producto[];
  error: string | null;
}

const initialState: CarouselState = {
  randomProducts: [],
  error: null,
};

// Thunk para cargar productos aleatorios
export const fetchRandomProducts = createAsyncThunk<void, void, { state: RootState }>(
  'carousel/fetchRandomProducts',
  async (_, { getState, dispatch }) => {
    try {
      const allProducts = getState().productos.productos; // Obtener todos los productos

      if (allProducts.length === 0) {
        throw new Error('No hay productos disponibles.');
      }

      // Seleccionar 12 productos aleatorios
      const randomProducts = [...allProducts]
        .sort(() => Math.random() - 0.5) // Mezclar productos
        .slice(0, 12); // Tomar los primeros 12

      // Guardar los productos aleatorios
      dispatch(setRandomProducts(randomProducts));
    } catch (error) {
      dispatch(setError(error instanceof Error ? error.message : 'Error desconocido'));
    }
  }
);

// Slice
const carouselSlice = createSlice({
  name: 'carousel',
  initialState,
  reducers: {
    setRandomProducts(state, action: PayloadAction<Producto[]>) {
      state.randomProducts = action.payload;
      state.error = null;
    },
    clearRandomProducts(state) {
      state.randomProducts = [];
      state.error = null;
    },
    setError(state, action: PayloadAction<string>) {
      state.randomProducts = [];
      state.error = action.payload;
    },
  },
});

// Exporta las acciones y el reducer
export const { setRandomProducts, clearRandomProducts, setError } = carouselSlice.actions;
export default carouselSlice.reducer;
