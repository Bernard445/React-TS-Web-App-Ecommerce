import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


interface CartItem {
    id: number;
    title: string;
    price: number;
    quantity: number;
    image: string;
}

interface CartState {
    items: CartItem[];
}

const savedCart = sessionStorage.getItem("cart");
const initialState: CartState = {
  items: savedCart ? JSON.parse(savedCart) : [],
};


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<CartItem>) => {
            const normalizedItem: CartItem = {
                id: Number(action.payload.id),       // normalize id
                title: action.payload.title,
                price: Number(action.payload.price), // normalize price
                quantity: Number(action.payload.quantity ?? 1),
                image: action.payload.image,
            };

            const existingItem = state.items.find(item => item.id === normalizedItem.id);

            if (existingItem) {
                existingItem.quantity += normalizedItem.quantity;
            } else {
                state.items.push(normalizedItem);
            }
        },

        removeItem: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
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
