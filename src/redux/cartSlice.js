import { createSlice } from '@reduxjs/toolkit';
const savedCart = sessionStorage.getItem("cart");
const initialState = {
    items: savedCart ? JSON.parse(savedCart) : [],
};
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const normalizedItem = {
                id: Number(action.payload.id), // normalize id
                title: action.payload.title,
                price: Number(action.payload.price), // normalize price
                quantity: Number(action.payload.quantity ?? 1),
                image: action.payload.image,
            };
            const existingItem = state.items.find(item => item.id === normalizedItem.id);
            if (existingItem) {
                existingItem.quantity += normalizedItem.quantity;
            }
            else {
                state.items.push(normalizedItem);
            }
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        updateQuantity: (state, action) => {
            const item = state.items.find(item => item.id === action.payload.id);
            if (item) {
                item.quantity = action.payload.quantity;
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});
export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
