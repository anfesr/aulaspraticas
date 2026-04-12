import { configureStore } from '@reduxjs/toolkit';
import atmReducer from './atmSlice';
import uiReducer from './ui-slice';
import cartReducer from './cart-slice';

export const store = configureStore({
  reducer: {
    atm: atmReducer,
    ui: uiReducer,
    cart: cartReducer,
  },
});