import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_BASEURL}/`; 

// Get the token from localStorage
const getAuthToken = () => {
    return localStorage.getItem('token');
};

// Create axios instance with default config
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add request interceptor to add token to all requests
api.interceptors.request.use(
    (config) => {
        const token = getAuthToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const orderApi = {
    // Create new order
    createOrder: async (orderData) => {
        try {
            // Log the request data
            console.log('Creating order with data:', orderData);
            
            // Ensure all required fields are present
            if (!orderData.productId) throw new Error('Product ID is required');
            if (!orderData.quantity) throw new Error('Quantity is required');
            if (!orderData.address) throw new Error('Address is required');
            if (!orderData.phone) throw new Error('Phone is required');

            // Ensure quantity is a number
            orderData.quantity = Number(orderData.quantity);

            const response = await api.post('/orders', orderData);
            console.log('Order created successfully:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error creating order:', error.response?.data || error.message);
            throw error.response?.data || error.message;
        }
    },

    // Get all orders
    getOrders: async () => {
        try {
            const response = await api.get('/orders');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get order by ID
    getOrderById: async (orderId) => {
        try {
            const response = await api.get(`/orders/${orderId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Update order
    updateOrder: async (orderId, orderData) => {
        try {
            const response = await api.put(`/orders/${orderId}`, orderData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Delete order
    deleteOrder: async (orderId) => {
        try {
            const response = await api.delete(`/orders/${orderId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

  

    // Get order items
    getCartItems: async () => {
        try {
            const response = await api.get('/orders');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Remove item from order
    removeFromCart: async (productId) => {
        try {
            const response = await api.delete(`/orders/${productId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Update order item quantity
    updateCartItem: async (productId, quantity) => {
        try {
            const response = await api.put(`/orders/${productId}`, { quantity });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Place order
    placeOrder: async (orderData) => {
        try {
            const response = await api.post('/orders/place', orderData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getOrdersMe: async () => {
        try {
            const response = await api.get('/orders/me');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
}; 