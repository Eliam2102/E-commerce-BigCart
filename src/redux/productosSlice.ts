// importamos el slice y el hookthunk
import  {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { obtenerProductos } from '../models/productModel';

export interface Producto{
    idProducto: number,
    sku: string,
    nombreProducto: string,
    precio: number,
    descripcion: string,
    rating: number,
    imagenUrl: string,
    stock: number,
    idCategoria: number
}
export const fetchProductos = createAsyncThunk<Producto[], void, {rejectValue: string}>(
    'productos/fetchProductos',
    async(_, {rejectWithValue}) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000)); 
            const productos = await obtenerProductos(); // se hace la solicitu a la api
            
            return productos;
        } catch (error){
            if(error instanceof Error){
                return rejectWithValue(error.message);
            } else {
                return rejectWithValue('')
            }
        }
    }
);

const productosSlice = createSlice({
    name: 'productos',
    initialState: {
        productos: [] as Producto[],
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProductos.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        }).addCase(fetchProductos.fulfilled, (state, action) => {
            console.log('datos obtenidos:', action.payload)
            state.productos = action.payload;
            state.isLoading = false;
        }).addCase(fetchProductos.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || 'error desconocido';
        })
    },
    

});

export default productosSlice.reducer;