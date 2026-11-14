import { createSlice } from '@reduxjs/toolkit';

const initialState = { items: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add a product to the cart. If it is already present, increase its quantity.
    addItem: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },

    // Remove the complete product line from the cart.
    removeItem: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.id !== productId);
    },

    // Set a product's quantity. A zero or negative quantity removes the line.
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((product) => product.id === id);
      if (!item) return;
      if (quantity <= 0) {
        state.items = state.items.filter((product) => product.id !== id);
      } else {
        item.quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
