import axios from 'axios';

// Add item to cart or increase quantity if it already exists
export const addToCart = async ({ productId, quantity, colorId, sizeId, offerId }) => {
  const token = localStorage.getItem('token');
  const body = { productId, quantity };
  if (colorId) body.colorId = colorId;
  if (sizeId) body.sizeId = sizeId;
  if (typeof offerId !== 'undefined') body.offerId = offerId;
  const response = await axios.post(
    `${import.meta.env.VITE_BASEURL}/cart`,
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Get all cart items
export const getCartItems = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${import.meta.env.VITE_BASEURL}/cart`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Remove item from cart by id
export const removeFromCart = async (id) => {
  const token = localStorage.getItem('token');
  const response = await axios.delete(`${import.meta.env.VITE_BASEURL}/cart/clear`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}; 