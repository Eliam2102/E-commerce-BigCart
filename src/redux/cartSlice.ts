// Importamos las herramientas necesarias de Redux Toolkit
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getviewCart } from '../models/cartModel'; // Función que llama a la API y devuelve la información del carrito

// Definir interfaces para el carrito y sus items
interface DetallesCarrito {
  idCarrito: number;
  idCliente: number;
  totalCarrito: string;
  estadoCarrito: string;
}

interface ItemCarrito {
  idProducto: number;
  cantidad: number;
  nombreProducto: string;
  descripcion: string;
  precio: number;
  imagen: string ;
}

// Estado inicial
interface CarritoState {
  detallesCarrito: DetallesCarrito | null;
  itemsCarrito: ItemCarrito[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CarritoState = {
  detallesCarrito: null,
  itemsCarrito: [],
  isLoading: false,
  error: null,
};

// Thunk para obtener los datos del carrito desde la API
export const fetchCarrito = createAsyncThunk<
  { detallesCarrito: DetallesCarrito; itemsCarrito: ItemCarrito[] }, // Tipo de datos que devuelve
  any, // Parámetros que recibe
  { rejectValue: string, idcarrito: number} // Tipo de error
>('carrito/fetchCarrito', async (idCarrito, { rejectWithValue }) => {
  try {
    const carritoData = await getviewCart(idCarrito); // Función que obtiene los datos de la API
    return carritoData;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue('Error desconocido');
    }
  }
});

// Crear el slice
const carritoSlice = createSlice({
  name: 'carrito',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarrito.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCarrito.fulfilled, (state, action) => {
        state.detallesCarrito = action.payload.detallesCarrito;
        state.itemsCarrito = action.payload.itemsCarrito;
        state.isLoading = false;
      })
      .addCase(fetchCarrito.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Error desconocido';
      });
  },
});

// Exportar el reducer
export default carritoSlice.reducer;