import React from 'react'
import Navbar from '../../Component/Shared/Navbar'
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { orderApi } from '../../Apis/orders/orderApi';
import toast from 'react-hot-toast';

export default function Cart() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;
  const initialQuantity = location.state?.quantity || 1;
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [quantity, setQuantity] = useState(initialQuantity);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);

  useEffect(() => {
    if (!product) {
      setLoading(true);
      orderApi.getOrdersMe()
        .then((data) => setOrders(data))
        .catch(() => toast.error('فشل في تحميل الأوردرات'))
        .finally(() => setLoading(false));
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    if (!product?._id && !product?.id) {
      toast.error('Product information is missing');
      return;
    }
    if (!address?.trim()) {
      toast.error('Please enter your address');
      return;
    }
    if (!phone?.trim()) {
      toast.error('Please enter your phone number');
      return;
    }
    if (!quantity || quantity < 1) {
      toast.error('Please enter a valid quantity');
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        productId: product._id || product.id,
        quantity: Number(quantity),
        address: address.trim(),
        phone: phone.trim(),
      };

      console.log('Submitting order with data:', orderData);
      await orderApi.createOrder(orderData);
      toast.success('Order created successfully!');
      navigate('/');
    } catch (error) {
      console.error('Order creation error:', error);
      toast.error(error.message || 'Failed to create order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (order) => {
    setEditingOrder(order);
    setAddress(order.address);
    setPhone(order.phone);
    setQuantity(order.quantity);
  };

  const handleUpdateOrder = async (e) => {
    e.preventDefault();
    
    if (!address?.trim()) {
      toast.error('Please enter your address');
      return;
    }
    if (!phone?.trim()) {
      toast.error('Please enter your phone number');
      return;
    }
    if (!quantity || quantity < 1) {
      toast.error('Please enter a valid quantity');
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        quantity: Number(quantity),
        address: address.trim(),
        phone: phone.trim(),
      };

      await orderApi.updateOrder(editingOrder.id || editingOrder._id, orderData);
      
      // Update the orders list with the new data
      const updatedOrders = await orderApi.getOrdersMe();
      setOrders(updatedOrders);
      
      // Reset the form and editing state
      setEditingOrder(null);
      setAddress('');
      setPhone('');
      setQuantity(1);
      
      toast.success('تم تحديث الأوردر بنجاح');
    } catch (error) {
      console.error('Order update error:', error);
      toast.error(error.message || 'فشل في تحديث الأوردر. حاول مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  return <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">{product ? 'Checkout' : 'Your Shopping Cart'}</h1>
          {product ? (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-8">
              <div className="flex flex-col md:flex-row gap-8 mb-8">
                <img src={`${import.meta.env.VITE_IMAGEURL}${product.cover_Image}`} alt={product.name} className="w-40 h-40 object-cover rounded-xl shadow" />
                <div>
                  <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
                  <p className="text-gray-700 mb-2">{product.discreption}</p>
                  <p className="text-lg font-semibold text-blue-600 mb-2">${product.price}</p>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Address</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2" value={address} onChange={e => setAddress(e.target.value)} required />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Phone</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2" value={phone} onChange={e => setPhone(e.target.value)} required />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Quantity</label>
                  <input type="number" min="1" className="w-full border border-gray-300 rounded-lg px-4 py-2" value={quantity} onChange={e => setQuantity(Number(e.target.value))} required />
                </div>
                <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200 cursor-pointer">
                  {loading ? 'Placing Order...' : 'Place Order'}
                </button>
              </form>
            </div>
          ) : (
            loading ? (
              <div>جاري التحميل...</div>
            ) : orders.length === 0 ? (
              <div>لا يوجد أوردرات.</div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {orders.map((order) => (
                    <div
                      key={order.id || order._id}
                      className="bg-white rounded-xl shadow-lg p-6 flex flex-col gap-4 border border-gray-100 hover:shadow-2xl transition-shadow duration-300"
                    >
                      {editingOrder && (editingOrder.id === order.id || editingOrder._id === order._id) ? (
                        <form onSubmit={handleUpdateOrder} className="space-y-4">
                          <div>
                            <label className="block text-gray-700 font-medium mb-1">Address</label>
                            <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2" value={address} onChange={e => setAddress(e.target.value)} required />
                          </div>
                          <div>
                            <label className="block text-gray-700 font-medium mb-1">Phone</label>
                            <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2" value={phone} onChange={e => setPhone(e.target.value)} required />
                          </div>
                          <div>
                            <label className="block text-gray-700 font-medium mb-1">Quantity</label>
                            <input type="number" min="1" className="w-full border border-gray-300 rounded-lg px-4 py-2" value={quantity} onChange={e => setQuantity(Number(e.target.value))} required />
                          </div>
                          <div className="flex gap-2">
                            <button type="submit" disabled={loading} className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                              {loading ? 'Updating...' : 'Update'}
                            </button>
                            <button type="button" onClick={() => setEditingOrder(null)} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                              Cancel
                            </button>
                          </div>
                        </form>
                      ) : (
                        <>
                          {/* صورة المنتج */}
                          {order.product?.cover_Image && (
                            <img
                              src={`${import.meta.env.VITE_IMAGEURL}${order.product.cover_Image}`}
                              alt={order.product?.name || 'Product'}
                              className="w-full h-40 object-cover rounded-lg mb-2"
                            />
                          )}

                          {/* اسم المنتج */}
                          <h2 className="text-xl font-bold text-gray-800 mb-1">
                            {order.product?.name || '---'}
                          </h2>

                          {/* بيانات الأوردر */}
                          <div className="flex flex-col gap-1 text-gray-600 text-sm">
                            <span>
                              <span className="font-semibold">رقم الأوردر:</span> {order.id}
                            </span>
                            <span>
                              <span className="font-semibold">الكمية:</span> {order.quantity}
                            </span>
                            <span>
                              <span className="font-semibold">العنوان:</span> {order.address}
                            </span>
                            <span>
                              <span className="font-semibold">الموبايل:</span> {order.phone}
                            </span>
                            <span>
                              <span className="font-semibold">السعر:</span> {order.product?.price ? `${order.product.price} ج.م` : '--'}
                            </span>
                            <span>
                              <span className="font-semibold">الإجمالي:</span> {order.total ? `${order.total} ج.م` : '--'}
                            </span>
                            <span>
                              <span className="font-semibold">تاريخ الإنشاء:</span> {order.createdAt ? new Date(order.createdAt).toLocaleString('ar-EG') : '--'}
                            </span>
                          </div>

                          {/* حالة الأوردر */}
                          <div className="mt-2">
                            <span
                              className={`
                                inline-block px-3 py-1 rounded-full text-xs font-bold
                                ${order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' : ''}
                                ${order.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : ''}
                                ${order.status === 'CANCELLED' ? 'bg-red-100 text-red-700' : ''}
                                ${!['PENDING','COMPLETED','CANCELLED'].includes(order.status) ? 'bg-gray-100 text-gray-700' : ''}
                              `}
                            >
                              {order.status || '---'}
                            </span>
                          </div>

                          {/* أزرار التعديل والحذف */}
                          <div className="flex gap-2 mt-4 justify-end">
                            <button
                              className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-colors duration-200"
                              onClick={() => handleEdit(order)}
                            >
                              Edit
                            </button>
                            <button
                              className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition-colors duration-200"
                              onClick={() => { setOrderToDelete(order); setShowDeleteDialog(true); }}
                            >
                              Delete
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
                {/* Delete Confirmation Dialog */}
                {showDeleteDialog && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-xl shadow-lg p-8 max-w-sm w-full text-center">
                      <h2 className="text-lg font-bold mb-4 text-gray-800">تأكيد حذف الأوردر</h2>
                      <p className="mb-6 text-gray-600">هل أنت متأكد أنك تريد حذف هذا الأوردر؟ لا يمكن التراجع عن هذه العملية.</p>
                      <div className="flex gap-4 justify-center">
                        <button
                          className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition-colors"
                          onClick={() => { setShowDeleteDialog(false); setOrderToDelete(null); }}
                        >
                          إلغاء
                        </button>
                        <button
                          className="px-6 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors"
                          onClick={async () => {
                            try {
                              await orderApi.deleteOrder(orderToDelete.id || orderToDelete._id);
                              setOrders((prev) => prev.filter((o) => (o.id || o._id) !== (orderToDelete.id || orderToDelete._id)));
                              setShowDeleteDialog(false);
                              setOrderToDelete(null);
                              toast.success('تم حذف الأوردر بنجاح');
                            } catch (err) {
                              toast.error('حدث خطأ أثناء الحذف');
                            }
                          }}
                        >
                          حذف
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )
          )}
        </div>
      </div>
    </div>
  </>
}
