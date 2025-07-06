import React, { useEffect, useState } from 'react';
import Navbar from '../../Component/Shared/Navbar';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getCartItems, removeFromCart } from '../../Apis/cart/cart';
import { createOrder, getGovernments, getMyOrders, deleteOrder, updateOrderStatus } from '../../Apis/orders/orderApi';

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutData, setCheckoutData] = useState({ phone: '', address: '', governorate: '' });
  const [governments, setGovernments] = useState([]);
  const [loadingGovernments, setLoadingGovernments] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [showDeleteOrderDialog, setShowDeleteOrderDialog] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);

  useEffect(() => {
    fetchCart();
    fetchGovernments();
  }, []);

  // تحديث الطلبات تلقائياً كل 30 ثانية عندما تكون النافذة مفتوحة
  useEffect(() => {
    if (showOrders) {
      const interval = setInterval(() => {
        fetchOrders();
      }, 30000);
      
      return () => clearInterval(interval);
    }
  }, [showOrders]);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const response = await getCartItems();
      // لو الـ API رجع { message, cart: [...] }
      const items = Array.isArray(response.cart) ? response.cart : [];
      setCartItems(items);
    } catch (err) {
      toast.error('Failed to load cart items');
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchGovernments = async () => {
    setLoadingGovernments(true);
    try {
      const response = await getGovernments();
      const governmentsData = Array.isArray(response) ? response : response.data || [];
      setGovernments(governmentsData);
    } catch (err) {
      toast.error('Failed to load governments');
      setGovernments([]);
    } finally {
      setLoadingGovernments(false);
    }
  };

  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      const response = await getMyOrders();
      const ordersData = Array.isArray(response) ? response : response.data || [];
      setOrders(ordersData);
    } catch (err) {
      toast.error('Failed to load orders');
      setOrders([]);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await removeFromCart(id);
      setCartItems((prev) => prev.filter((item) => (item.id || item._id) !== id));
      toast.success('Item removed from cart!');
      setShowDeleteDialog(false);
      setItemToDelete(null);
    } catch (err) {
      toast.error('Failed to remove item from cart');
    }
  };

  const handleDeleteOrder = async (id) => {
    try {
      console.log('Attempting to delete order with ID:', id);
      const response = await deleteOrder(id);
      console.log('Delete response:', response);
      
      setOrders((prev) => prev.filter((order) => (order.id || order._id) !== id));
      toast.success('Order deleted successfully!');
      setShowDeleteOrderDialog(false);
      setOrderToDelete(null);
    } catch (err) {
      console.error('Delete order error:', err);
      console.error('Error response:', err.response);
      console.error('Error data:', err.response?.data);
      
      if (err.response?.status === 400) {
        // تحقق من نوع الخطأ المحدد
        const errorData = err.response?.data?.error || '';
        if (errorData.includes('OrderItem_orderId_fkey')) {
          toast.error('Cannot delete order because it contains items. Please contact support.');
        } else {
          const errorMessage = err.response?.data?.message || 'Cannot delete this order. It may be in progress or completed.';
          toast.error(errorMessage);
        }
      } else if (err.response?.status === 403) {
        toast.error('You are not authorized to delete this order.');
      } else if (err.response?.status === 404) {
        toast.error('Order not found.');
      } else if (err.response?.status === 405) {
        toast.error('Delete operation is not allowed for orders.');
      } else {
        toast.error(`Failed to delete order: ${err.message}`);
      }
      setShowDeleteOrderDialog(false);
      setOrderToDelete(null);
    }
  };

  const handleCancelOrder = async (id) => {
    try {
      console.log('Attempting to cancel order with ID:', id);
      const response = await updateOrderStatus(id, 'cancelled');
      console.log('Cancel response:', response);
      
      // تحديث حالة الطلب في القائمة المحلية
      setOrders((prev) => prev.map((order) => 
        (order.id || order._id) === id 
          ? { ...order, status: 'cancelled' }
          : order
      ));
      
      toast.success('Order cancelled successfully!');
    } catch (err) {
      console.error('Cancel order error:', err);
      console.error('Error response:', err.response);
      console.error('Error data:', err.response?.data);
      
      if (err.response?.status === 400) {
        const errorData = err.response?.data?.error || err.response?.data?.message || '';
        if (errorData.includes('status') || errorData.includes('invalid')) {
          toast.error('Cannot cancel this order. It may be in progress or already completed.');
        } else {
          toast.error('Cannot cancel order at this time. Please contact support.');
        }
      } else if (err.response?.status === 403) {
        toast.error('You are not authorized to cancel this order.');
      } else if (err.response?.status === 404) {
        toast.error('Order not found.');
      } else {
        toast.error('Failed to cancel order. Please try again later.');
      }
    }
  };

  // تعديل الكمية محليًا فقط
  const handleQuantityChange = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if ((item.id || item._id) === id) {
          const newQuantity = Math.max(1, (item.quantity || 1) + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const handleCheckoutChange = (e) => {
    setCheckoutData({ ...checkoutData, [e.target.name]: e.target.value });
  };

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // تحضير بيانات الطلب
      const orderData = {
        address: checkoutData.address,
        phone: checkoutData.phone,
        governmentId: parseInt(checkoutData.governorate)
      };

      // إرسال الطلب إلى API
      const response = await createOrder(orderData);
      
      toast.success('Order submitted successfully!');
      setShowCheckout(false);
      setCheckoutData({ phone: '', address: '', governorate: '' });
      
      // تفريغ الكارت بعد إنشاء الطلب
      setCartItems([]);
      
      // تحميل الطلبات وعرضها
      await fetchOrders();
      setShowOrders(true);
      
      console.log('Order created:', response);
      
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Failed to submit order. Please try again.');
    }
  };

  return (
    <>
    <Navbar />
      <div className="min-h-screen bg-custom-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-extrabold text-center mb-12 bg-gradient-to-r from-purple-600 via-blue-500 to-green-400 bg-clip-text text-transparent drop-shadow-lg flex items-center justify-center gap-3">
              <span className="text-5xl">🛒</span>
              Your Shopping Cart
            </h1>
            {loading ? (
              <div>Loading...</div>
            ) : cartItems.length === 0 ? (
              <div className="text-center text-gray-500 mb-8">Your cart is empty.</div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-8 mb-8">
                  {cartItems.map((item) => {
                    const shipping = 70;
                    const price = item.product?.price || 0;
                    const total = price * item.quantity + shipping;
                    return (
                      <div
                        key={item.id || item._id}
                        className="bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-3xl shadow-2xl hover:shadow-blue-300 transition-shadow duration-300 p-8 flex flex-col md:flex-row gap-8 border border-gray-100 mb-8 relative overflow-hidden"
                      >
                        {/* صورة المنتج */}
                        <div className="flex-shrink-0 flex flex-col items-center justify-center w-full md:w-56">
                          <div className="rounded-2xl shadow-lg bg-white p-2 mb-2">
                            <img
                              src={`${import.meta.env.VITE_IMAGEURL}${item.product?.cover_Image}`}
                              alt={item.product?.name || 'Product'}
                              className="w-44 h-44 object-cover rounded-xl"
                            />
                          </div>
                          </div>
                        {/* بيانات المنتج */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h2 className="text-3xl font-extrabold text-purple-800 mb-3 tracking-tight flex items-center gap-2">
                              <svg className="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                              {item.product?.name || '---'}
                            </h2>
                            <div className="flex items-center gap-4 mb-3">
                              {/* اللون */}
                              <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 border border-gray-300 text-sm font-semibold">
                                <span className="w-6 h-6 rounded-full border border-gray-300 inline-block" style={{ background: item.color?.hex || '#ccc' }}></span>
                                {item.color?.name || item.colorId}
                              </span>
                              {/* المقاس */}
                              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-bold border border-blue-200">
                                Size: {item.size?.label || item.sizeId}
                              </span>
                          </div>
                            <div className="flex items-center gap-4 mb-3">
                              {/* الكمية */}
                              <span className="font-semibold text-gray-700">Quantity:</span>
                              <button
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-gray-200 to-gray-100 text-2xl font-bold hover:from-gray-300 hover:to-gray-200 transition shadow-lg border-2 border-gray-300"
                                onClick={() => handleQuantityChange(item.id || item._id, -1)}
                              >
                                -
                            </button>
                              <span className="px-4 text-xl font-bold text-purple-700 bg-white rounded-lg border border-gray-200 shadow-sm">{item.quantity}</span>
                              <button
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-gray-200 to-gray-100 text-2xl font-bold hover:from-gray-300 hover:to-gray-200 transition shadow-lg border-2 border-gray-300"
                                onClick={() => handleQuantityChange(item.id || item._id, 1)}
                              >
                                +
                            </button>
                          </div>
                            <div className="flex items-center gap-4 mb-2">
                              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V4m0 4v4m0 0h4m-4 0H8" /></svg>
                              <span className="font-semibold text-gray-700">Price:</span>
                              <span className="text-xl text-blue-700 font-bold">{item.product?.price ? `LE ${item.product?.price} EGP` : '--'}</span>
                            </div>
                            <div className="flex items-center gap-4 mb-2">
                              <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 9V7a5 5 0 0110 0v2" /></svg>
                              <span className="font-semibold text-gray-700">Shipping Cost:</span>
                              <span className="text-lg text-yellow-700 font-bold">LE 70 EGP</span>
                            </div>
                            <div className="flex items-center gap-4 mb-2">
                              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V4m0 4v4m0 0h4m-4 0H8" /></svg>
                              <span className="font-semibold text-gray-700">Total (Including Shipping):</span>
                              <span className="text-xl text-green-700 font-bold">{item.product?.price ? `LE ${item.product?.price * item.quantity + 70} EGP` : '--'}</span>
                            </div>
                            <div className="flex items-center gap-4 mb-2 text-xs text-gray-500">
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                              Added: {item.createdAt ? new Date(item.createdAt).toLocaleString() : '--'}
                              <svg className="w-4 h-4 text-gray-400 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                              Updated: {item.updatedAt ? new Date(item.updatedAt).toLocaleString() : '--'}
                          </div>
                          </div>
                          <div className="flex gap-2 mt-8 justify-end">
                            <button
                              className="px-6 py-3 rounded-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold shadow-xl text-lg transition-all duration-200 flex items-center gap-2 border-2 border-red-700"
                              onClick={() => { setItemToDelete(item.id || item._id); setShowDeleteDialog(true); }}
                            >
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {/* أزرار Checkout و Orders */}
                <div className="flex justify-center gap-4 mt-8">
                  <button
                    className="w-full max-w-md py-4 bg-gradient-to-r from-green-600 to-green-400 text-white rounded-full font-extrabold text-2xl shadow-xl hover:from-green-700 hover:to-green-500 transition-all duration-200 tracking-wide border-2 border-green-700"
                    onClick={() => setShowCheckout(true)}
                  >
                    <svg className="w-7 h-7 inline-block mr-2 -mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    Checkout
                  </button>
                  <button
                    className="w-full max-w-md py-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-full font-extrabold text-2xl shadow-xl hover:from-blue-700 hover:to-blue-500 transition-all duration-200 tracking-wide border-2 border-blue-700"
                    onClick={async () => {
                      if (!showOrders) {
                        await fetchOrders();
                      }
                      setShowOrders(!showOrders);
                    }}
                  >
                    <svg className="w-7 h-7 inline-block mr-2 -mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405M19 13V7a2 2 0 00-2-2h-4a2 2 0 00-2 2v6m0 0l-1.405 1.405M9 17h6" /></svg>
                    Show Orders
                  </button>
                </div>
                {/* فورم الشيك أوت */}
                {showCheckout && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-2xl w-full text-center">
                      <h2 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-purple-600 via-blue-500 to-green-400 bg-clip-text text-transparent drop-shadow-lg flex items-center justify-center gap-3">
                        <span className="text-5xl">🧾</span>
                        Checkout
                      </h2>
                      <form onSubmit={handleCheckoutSubmit} className="space-y-8 text-left animate-fade-in">
                        <div>
                          <label className="block mb-2 font-semibold text-lg text-purple-900 flex items-center gap-2">
                            <span className="text-xl">📞</span> Phone Number
                          </label>
                          <input
                            type="text"
                            name="phone"
                            value={checkoutData.phone}
                            onChange={handleCheckoutChange}
                            className="w-full border border-gray-200 rounded-xl px-6 py-4 text-lg bg-gray-50 focus:ring-2 focus:ring-purple-200 focus:border-purple-400 transition shadow-sm"
                            required
                            placeholder="Enter your phone number"
                          />
                        </div>
                        <div>
                          <label className="block mb-2 font-semibold text-lg text-purple-900 flex items-center gap-2">
                            <span className="text-xl">🏠</span> Address
                          </label>
                          <input
                            type="text"
                            name="address"
                            value={checkoutData.address}
                            onChange={handleCheckoutChange}
                            className="w-full border border-gray-200 rounded-xl px-6 py-4 text-lg bg-gray-50 focus:ring-2 focus:ring-purple-200 focus:border-purple-400 transition shadow-sm"
                            required
                            placeholder="Enter your address"
                          />
                        </div>
                        <div>
                          <label className="block mb-2 font-semibold text-lg text-purple-900 flex items-center gap-2">
                            <span className="text-xl">📍</span> Governorate
                          </label>
                          <select
                            name="governorate"
                            value={checkoutData.governorate}
                            onChange={handleCheckoutChange}
                            className="w-full border border-gray-200 rounded-xl px-6 py-4 text-lg bg-gray-50 focus:ring-2 focus:ring-purple-200 focus:border-purple-400 transition shadow-sm"
                            required
                            disabled={loadingGovernments}
                          >
                            <option value="">
                              {loadingGovernments ? 'Loading governments...' : 'اختر المحافظة'}
                            </option>
                            {governments.map((gov) => (
                              <option key={gov.id || gov._id} value={gov.id || gov._id}>
                                {gov.name || gov.title || gov.governmentName}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex gap-8 mt-10 justify-center">
                          <button
                            type="button"
                            className="px-10 py-4 rounded-full bg-gradient-to-r from-gray-200 to-gray-400 text-gray-700 font-bold text-xl hover:from-gray-300 hover:to-gray-500 transition-all flex items-center gap-2 shadow-lg border-2 border-gray-300"
                            onClick={() => setShowCheckout(false)}
                          >
                            <span className="text-2xl">❌</span> Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-10 py-4 rounded-full bg-gradient-to-r from-green-500 to-green-400 text-white font-bold text-xl hover:from-green-600 hover:to-green-500 transition-all flex items-center gap-2 shadow-lg border-2 border-green-700"
                          >
                            <span className="text-2xl">✅</span> Confirm Order
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </>
            )}
            
            {/* زر Show Orders عندما يكون الكارت فارغ */}
            {!loading && cartItems.length === 0 && (
              <div className="flex justify-center mt-8">
                <button
                  className="w-full max-w-md py-4 bg-blue-600 text-white rounded-xl font-bold text-xl hover:bg-blue-700 transition-colors shadow"
                  onClick={async () => {
                    if (!showOrders) {
                      await fetchOrders();
                    }
                    setShowOrders(!showOrders);
                  }}
                >
                  Show Orders
                </button>
                </div>
            )}
            
                {/* Delete Confirmation Dialog */}
                {showDeleteDialog && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-xl shadow-lg p-8 max-w-sm w-full text-center">
                  <h2 className="text-lg font-bold mb-4 text-gray-800">Delete Item Confirmation</h2>
                  <p className="mb-6 text-gray-600">Are you sure you want to remove this item from your cart?</p>
                      <div className="flex gap-4 justify-center">
                        <button
                          className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition-colors"
                      onClick={() => { setShowDeleteDialog(false); setItemToDelete(null); }}
                        >
                          Cancel
                        </button>
                        <button
                          className="px-6 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors"
                      onClick={() => handleDelete(itemToDelete)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
          </div>
        </div>
      </div>

      {/* عرض الطلبات */}
      {showOrders && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">My Orders</h2>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">Click X to close or Show Orders to refresh</span>
                <button
                  onClick={() => setShowOrders(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>
            
            {/* رسالة توضيحية */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="text-sm font-semibold text-blue-800 mb-1">Order Management</h3>
                  <p className="text-sm text-blue-700">
                    Use "View Details" to see order information. "Cancel Order" may not work for all orders due to system constraints. "Delete Order" is limited to cancelled/completed orders.
                  </p>
                </div>
              </div>
            </div>
            
            {loadingOrders ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading orders...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No orders found.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {orders.map((order) => (
                  <div key={order.id || order._id} className="bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-3xl p-8 border border-gray-200 shadow-2xl hover:shadow-blue-300 transition-shadow duration-300 mb-4 relative overflow-hidden">
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-400 text-white text-xl font-bold shadow-lg">
                          #{order.id || order._id}
                        </span>
                        <span className="text-lg font-bold text-gray-800">Order</span>
                      </div>
                      <span className={`inline-flex items-center gap-2 px-4 py-1 rounded-full text-sm font-semibold shadow-sm transition-colors duration-200
                        ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'completed' ? 'bg-green-100 text-green-800' :
                          order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'}
                      `}>
                        <span className={`w-2 h-2 rounded-full inline-block
                          ${order.status === 'pending' ? 'bg-yellow-500' :
                            order.status === 'completed' ? 'bg-green-500' :
                            order.status === 'cancelled' ? 'bg-red-500' :
                            'bg-gray-400'}
                        `}></span>
                        {order.status || 'Unknown'}
                      </span>
                    </div>
                    <div className="space-y-3 text-gray-700">
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4V7a4 4 0 00-8 0v3m8 0a4 4 0 01-8 0m8 0v3a4 4 0 01-8 0V7" /></svg>
                        <span className="font-semibold">Address:</span>
                        <span className="ml-1">{order.address || 'N/A'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                        <span className="font-semibold">Phone:</span>
                        <span className="ml-1">{order.phone || 'N/A'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 22s8-4 8-10V5a2 2 0 00-2-2H6a2 2 0 00-2 2v7c0 6 8 10 8 10z" /></svg>
                        <span className="font-semibold">Governorate ID:</span>
                        <span className="ml-1">{order.governmentId || 'N/A'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 9V7a5 5 0 0110 0v2" /></svg>
                        <span className="font-semibold">Shipping:</span>
                        <span className="ml-1 font-bold text-yellow-700">70 EGP</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V4m0 4v4m0 0h4m-4 0H8" /></svg>
                        <span className="font-semibold">Total:</span>
                        <span className="ml-1 font-bold text-green-600">LE {(order.total || order.totalPrice || 0) + 70} EGP</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        <span className="font-semibold">Created:</span>
                        <span className="ml-1">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}</span>
                      </div>
                    </div>
                    {/* زر حذف الطلب */}
                    <div className="flex justify-end mt-8">
                      <button
                        onClick={() => {
                          setOrderToDelete(order.id || order._id);
                          setShowDeleteOrderDialog(true);
                        }}
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold shadow-lg text-base transition-all duration-200"
                      >
                        <svg className="w-5 h-5 inline-block mr-2 -mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        Delete Order
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* نافذة تأكيد حذف الطلب */}
      {showDeleteOrderDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-sm w-full text-center">
            <h2 className="text-lg font-bold mb-4 text-gray-800">Delete Order Confirmation</h2>
            <p className="mb-6 text-gray-600">
              Are you sure you want to delete this order? 
              <br />
              <span className="text-sm text-red-600 font-semibold">
                Note: Orders with items may not be deletable due to system constraints.
              </span>
            </p>
            <div className="flex gap-4 justify-center">
              <button
                className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition-colors"
                onClick={() => { setShowDeleteOrderDialog(false); setOrderToDelete(null); }}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors"
                onClick={() => handleDeleteOrder(orderToDelete)}
              >
                Try Delete
              </button>
        </div>
      </div>
    </div>
      )}
  </>
  );
}
