import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/authSlice';
import categoryReducer from './Slices/categorySlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store; 