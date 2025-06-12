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
            const response = await api.post('/orders', orderData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getAuthToken()}`
                }
            });
            return response.data;
        } catch (error) {
            throw handleApiError(error);
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