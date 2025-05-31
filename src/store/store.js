import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import categoryReducer from './slices/categorySlice';
import OrderReducer from './slices/orderSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    order: OrderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store; 