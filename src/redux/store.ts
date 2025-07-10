import { configureStore } from "@reduxjs/toolkit";
import  productosReducer  from "./productosSlice";
import userReducer from "./userSlices";
import cartReducer from "./cartSlice";
import paymentReducer from "./paymentSlice";
import productDetailsReducer from './productDetailsSlice';
import randomProductsReducer from './carouselSlice';


const store = configureStore({
    reducer: {
        productos: productosReducer,
        user: userReducer,
        carrito: cartReducer,
        payment: paymentReducer,
        productDetails: productDetailsReducer,
        randomProducts: randomProductsReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
