import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import filterReducer from './slices/filterSlice';
import pizzasReducer from './slices/pizzasSlice';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: cartReducer,
    pizzas: pizzasReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
