import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/AuthSlice';
import categoryReducer from './slices/CategorySlice';
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