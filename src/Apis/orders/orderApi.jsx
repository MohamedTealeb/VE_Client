import axios from 'axios';

// Get governments/governorates from API
export const getGovernments = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_BASEURL}/governments`
  );
  return response.data;
};

// Create an order from user's cart items
export const createOrder = async (orderData) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(
    `${import.meta.env.VITE_BASEURL}/orders`,
    orderData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Get orders for the authenticated user
export const getMyOrders = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(
    `${import.meta.env.VITE_BASEURL}/orders/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Update the status of an order
export const updateOrderStatus = async (id, status) => {
  const token = localStorage.getItem('token');
  console.log('Update order status API call:', {
    url: `${import.meta.env.VITE_BASEURL}/orders/${id}`,
    status: status,
    token: token ? 'Present' : 'Missing'
  });
  
  const response = await axios.put(
    `${import.meta.env.VITE_BASEURL}/orders/${id}`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};

// Delete an order by ID
export const deleteOrder = async (id) => {
  const token = localStorage.getItem('token');
  console.log('Delete order API call:', {
    url: `${import.meta.env.VITE_BASEURL}/orders/${id}`,
    token: token ? 'Present' : 'Missing'
  });
  
  const response = await axios.delete(
    `${import.meta.env.VITE_BASEURL}/orders/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};
