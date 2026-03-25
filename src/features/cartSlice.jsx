import { createSlice } from '@reduxjs/toolkit';


const cartItems = {
    cartItems: []
}


const cartSlice = createSlice({
    name: 'cart',
    initialState: cartItems,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            state.cartItems.push(item);
        },
        removeFromCart: (state, action) => {
            const itemId = action.payload;
            state.cartItems = state.cartItems.filter(item => item.product.productid !== itemId);
        },
        clearCart: (state) => {
            state.cartItems = [];
        },
        updateQuantity: (state, action) => {
            const { productId, newQuantity } = action.payload;
            const item = state.cartItems.find(item => item.product.productid === productId);
            if (item) {
                item.newQuantity = newQuantity;
                item.price = item.product.price * newQuantity;
            }
        }
    }
});


export const {addToCart, removeFromCart, clearCart, updateQuantity} = cartSlice.actions;

export default cartSlice.reducer;
