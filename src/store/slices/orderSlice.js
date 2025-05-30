import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


// Async thunks
export const addToCart = createAsyncThunk(
    'order/addToCart',
    async (productData) => {
        const response = await orderApi.addToCart(productData);
        return response;
    }
);

export const fetchCartItems = createAsyncThunk(
    'order/fetchCartItems',
    async () => {
        const response = await orderApi.getCartItems();
        return response;
    }
);

export const removeFromCart = createAsyncThunk(
    'order/removeFromCart',
    async (productId) => {
        const response = await orderApi.removeFromCart(productId);
        return response;
    }
);

export const updateCartItem = createAsyncThunk(
    'order/updateCartItem',
    async ({ productId, quantity }) => {
        const response = await orderApi.updateCartItem(productId, quantity);
        return response;
    }
);

export const placeOrder = createAsyncThunk(
    'order/placeOrder',
    async (orderData) => {
        const response = await orderApi.placeOrder(orderData);
        return response;
    }
);

const initialState = {
    cartItems: [],
    loading: false,
    error: null,
    orderSuccess: false
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = [];
        },
        clearOrderSuccess: (state) => {
            state.orderSuccess = false;
        }
    },
    extraReducers: (builder) => {
        builder
            // Add to cart
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cartItems.push(action.payload);
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Fetch cart items
            .addCase(fetchCartItems.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCartItems.fulfilled, (state, action) => {
                state.loading = false;
                state.cartItems = action.payload;
            })
            .addCase(fetchCartItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Remove from cart
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.cartItems = state.cartItems.filter(
                    item => item.id !== action.payload.id
                );
            })
            // Update cart item
            .addCase(updateCartItem.fulfilled, (state, action) => {
                const index = state.cartItems.findIndex(
                    item => item.id === action.payload.id
                );
                if (index !== -1) {
                    state.cartItems[index] = action.payload;
                }
            })
            // Place order
            .addCase(placeOrder.fulfilled, (state) => {
                state.orderSuccess = true;
                state.cartItems = [];
            });
    }
});

export const { clearCart, clearOrderSuccess } = orderSlice.actions;
export default orderSlice.reducer; 