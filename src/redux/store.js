import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
export const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
});
store.subscribe(() => {
    sessionStorage.setItem("cart", JSON.stringify(store.getState().cart.items));
});
export default store;
