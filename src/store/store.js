import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/authSlice';
import categoryReducer from './Slices/categorySlice';
import orderReducer from './slices/orderSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    order: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store; 