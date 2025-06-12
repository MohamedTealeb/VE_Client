import axios from 'axios';


// Get the token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Create axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
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
    // Log the complete request configuration
    console.log('API Request:', {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data
    });
    return config;
  },
  (error) => {
    console.error('Request Interceptor Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor to log responses
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.data);
    return response;
  },
  (error) => {
    console.error('API Response Error:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message
    });
    return Promise.reject(error);
  }
);

// Get all products with optional filters
export const getAllProducts = async (params = {}) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BASEURL}/products`, {
      params,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Get product by ID
export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BASEURL}/products/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Create new product
export const createProduct = async (productData) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BASEURL}/products`, productData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Update product
export const updateProduct = async (id, productData) => {
  try {
    const response = await axios.put(`${import.meta.env.VITE_BASEURL}/products/${id}`, productData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

