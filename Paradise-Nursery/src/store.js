import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice.jsx';

const STORAGE_KEY = 'paradise-nursery-cart';

function readSavedCart() {
  if (typeof window === 'undefined') return { items: [] };
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    const items = saved ? JSON.parse(saved) : [];
    return { items: Array.isArray(items) ? items : [] };
  } catch {
    return { items: [] };
  }
}

export const store = configureStore({
  reducer: { cart: cartReducer },
  preloadedState: { cart: readSavedCart() },
});

// Persist cart changes so a refresh does not clear the shopper's basket.
if (typeof window !== 'undefined') {
  store.subscribe(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store.getState().cart.items));
    } catch {
      // The app remains usable when browser storage is unavailable or full.
    }
  });
}
