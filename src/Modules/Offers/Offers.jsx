import React, { useEffect, useState } from 'react';
import Navbar from '../../Component/Shared/Navbar';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { getGovernments, createOrder } from '../../Apis/orders/orderApi';
import { addToCart } from '../../Apis/cart/cart';

export default function Offers() {
  const navigate = useNavigate();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [orderForm, setOrderForm] = useState({
    address: '',
    phone: '',
    governmentId: ''
  });
  const [previousOrderData, setPreviousOrderData] = useState(null);
  const [governments, setGovernments] = useState([]);
  const [loadingGovernments, setLoadingGovernments] = useState(false);
  // إضافة state للاختيارات
  const [selectedColors, setSelectedColors] = useState({});
  const [selectedSizes, setSelectedSizes] = useState({});
  // إضافة state للألوان والمقاسات
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  // إضافة state للكميات
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    fetchOffers();
    fetchPreviousOrderData();
    fetchGovernments();
    fetchColors();
    fetchSizes();
  }, []);

  const fetchOffers = async () => {
    try {
      console.log('Fetching offers from:', `${import.meta.env.VITE_BASEURL}/offers`);
      const response = await fetch(`${import.meta.env.VITE_BASEURL}/offers`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        throw new Error('Failed to fetch offers');
      }

      const data = await response.json();
      console.log('Offers API response:', data);
      const offersArray = data.offers || [];
      console.log('Processed offers array:', offersArray);
      
      // عرض تفاصيل كل عرض
      offersArray.forEach((offer, index) => {
        console.log(`Offer ${index + 1}:`, {
          id: offer.id,
          discount: offer.discount,
          expiresAt: offer.expiresAt,
          description: offer.description,
          product: {
            id: offer.product?.id,
            name: offer.product?.name,
            price: offer.product?.price,
            cover_Image: offer.product?.cover_Image,
            colors: offer.product?.colors,
            sizes: offer.product?.sizes,
            stock: offer.product?.stock,
            discreption: offer.product?.discreption
          }
        });
      });
      
      setOffers(offersArray);
    } catch (error) {
      console.error('Error fetching offers:', error);
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      toast.error('Failed to load offers');
    } finally {
      setLoading(false);
    }
  };

  const fetchGovernments = async () => {
    setLoadingGovernments(true);
    try {
      const response = await getGovernments();
      console.log('Governments API response:', response);
      
      // Handle different response formats
      let governmentsData = [];
      if (Array.isArray(response)) {
        governmentsData = response;
      } else if (response.data && Array.isArray(response.data)) {
        governmentsData = response.data;
      } else if (response.governments && Array.isArray(response.governments)) {
        governmentsData = response.governments;
      }
      
      setGovernments(governmentsData);
      console.log('Processed governments data:', governmentsData);
    } catch (error) {
      console.error('Error fetching governments:', error);
      toast.error('Failed to load governments');
      setGovernments([]);
    } finally {
      setLoadingGovernments(false);
    }
  };

  const fetchPreviousOrderData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASEURL}/orders`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        // Get the last order from the array
        if (Array.isArray(data) && data.length > 0) {
          const lastOrder = data[data.length - 1];
          setPreviousOrderData(lastOrder);
          console.log('Previous order data:', lastOrder);
        }
      }
    } catch (error) {
      console.error('Error fetching previous order data:', error);
      // لا نعرض رسالة خطأ هنا لأن المستخدم قد لا يكون قد طلب من قبل
    }
  };

  // دالة لجلب الألوان
  const fetchColors = async () => {
    try {
      console.log('Fetching colors from:', `${import.meta.env.VITE_BASEURL}/colors`);
      const response = await fetch(`${import.meta.env.VITE_BASEURL}/colors`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch colors');
      }

      const data = await response.json();
      console.log('Colors API response:', data);
      console.log('Colors data type:', typeof data);
      console.log('Is colors array?', Array.isArray(data));
      console.log('Colors length:', data?.length);
      
      // التحقق من شكل البيانات
      if (Array.isArray(data)) {
        setColors(data);
      } else if (data.colors && Array.isArray(data.colors)) {
        setColors(data.colors);
      } else if (data.data && Array.isArray(data.data)) {
        setColors(data.data);
      } else {
        console.log('Colors data structure:', data);
        setColors([]);
      }
    } catch (error) {
      console.error('Error fetching colors:', error);
      setColors([]);
    }
  };

  // دالة لجلب المقاسات
  const fetchSizes = async () => {
    try {
      console.log('Fetching sizes from:', `${import.meta.env.VITE_BASEURL}/sizes`);
      const response = await fetch(`${import.meta.env.VITE_BASEURL}/sizes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch sizes');
      }

      const data = await response.json();
      console.log('Sizes API response:', data);
      console.log('Sizes data type:', typeof data);
      console.log('Is sizes array?', Array.isArray(data));
      console.log('Sizes length:', data?.length);
      
      // التحقق من شكل البيانات
      if (Array.isArray(data)) {
        setSizes(data);
      } else if (data.sizes && Array.isArray(data.sizes)) {
        setSizes(data.sizes);
      } else if (data.data && Array.isArray(data.data)) {
        setSizes(data.data);
      } else {
        console.log('Sizes data structure:', data);
        setSizes([]);
      }
    } catch (error) {
      console.error('Error fetching sizes:', error);
      setSizes([]);
    }
  };

  // دالة للحصول على معلومات اللون من الـ API
  const getColorInfo = (colorId) => {
    console.log('getColorInfo called with colorId:', colorId);
    console.log('Current colors state:', colors);
    console.log('Colors is array?', Array.isArray(colors));
    
    if (!Array.isArray(colors) || colors.length === 0) {
      console.log('Colors not loaded yet, using default');
      return { name: `Color ${colorId}`, hex: `#${(colorId % 16777215).toString(16).padStart(6, '0')}` };
    }
    
    const color = colors.find(c => c.id === colorId || c._id === colorId);
    console.log('Found color:', color);
    
    if (color) {
      return { name: color.name || color.label || `Color ${colorId}`, hex: color.hex || color.color || '#ccc' };
    }
    return { name: `Color ${colorId}`, hex: `#${(colorId % 16777215).toString(16).padStart(6, '0')}` };
  };

  // دالة للحصول على معلومات المقاس من الـ API
  const getSizeInfo = (sizeId) => {
    console.log('getSizeInfo called with sizeId:', sizeId);
    console.log('Current sizes state:', sizes);
    
    if (!Array.isArray(sizes) || sizes.length === 0) {
      console.log('Sizes not loaded yet, using default');
      return `Size ${sizeId}`;
    }
    
    const size = sizes.find(s => s.id === sizeId || s._id === sizeId);
    console.log('Found size:', size);
    
    if (size) {
      return size.name || size.label || `Size ${sizeId}`;
    }
    return `Size ${sizeId}`;
  };

  const handleGetOffer = (offer) => {
    setSelectedOffer(offer);
    
    // إذا كان هناك بيانات طلب سابق، استخدمها
    if (previousOrderData) {
      setOrderForm({
        address: previousOrderData.address || '',
        phone: previousOrderData.phone || '',
        governmentId: previousOrderData.governmentId?.toString() || ''
      });
    } else {
      // إعادة تعيين النموذج إذا لم تكن هناك بيانات سابقة
      setOrderForm({
        address: '',
        phone: '',
        governmentId: ''
      });
    }
    
    setShowOrderModal(true);
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedOffer) {
      toast.error('No offer selected');
      return;
    }

    if (!orderForm.address || !orderForm.phone || !orderForm.governmentId) {
      toast.error('Please fill all required fields');
      return;
    }
    
    try {
      console.log('Creating order for offer:', selectedOffer.id);
      console.log('Order data:', {
        address: orderForm.address,
        phone: orderForm.phone,
        governmentId: parseInt(orderForm.governmentId),
        offerId: selectedOffer.id
      });

      // Try the regular orders endpoint with offerId
      const response = await fetch(`${import.meta.env.VITE_BASEURL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          address: orderForm.address,
          phone: orderForm.phone,
          governmentId: parseInt(orderForm.governmentId),
          offerId: selectedOffer.id
        })
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.log('Error response data:', errorData);
        throw new Error(errorData.message || errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Order created successfully:', result);
      
      toast.success('Order created successfully!');
      setShowOrderModal(false);
      setOrderForm({ address: '', phone: '', governmentId: '' });
      setSelectedOffer(null);
      // يمكن الانتقال لصفحة الطلبات أو البقاء في نفس الصفحة
      // navigate('/orders');
    } catch (error) {
      console.error('Error creating order:', error);
      // Show more detailed error message
      const errorMessage = error.message || 'Failed to create order';
      toast.error(errorMessage);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // دالة لإضافة العرض للكارت
  const handleAddOfferToCart = async (offer) => {
    try {
      // التحقق من اختيار اللون والمقاس
      const selectedColor = selectedColors[offer.id];
      const selectedSize = selectedSizes[offer.id];
      const quantity = quantities[offer.id] || 1;
      
      if (!selectedColor) {
        toast.error('Please select a color');
        return;
      }
      
      if (!selectedSize) {
        toast.error('Please select a size');
        return;
      }
      
      // نضيف المنتج المرتبط بالعرض للكارت، مع الكمية المحددة
      await addToCart({ 
        productId: offer.product?.id || offer.product?._id, 
        quantity: quantity,
        offerId: offer.id || 0,
        colorId: parseInt(selectedColor),
        sizeId: parseInt(selectedSize)
      });
      
      toast.success('Offer added to cart successfully!');
      
      // الانتقال لصفحة الكارت بعد إضافة العرض
      navigate('/cart');
      
    } catch (error) {
      toast.error('Failed to add offer to cart');
    }
  };

  // دالة لتغيير الكمية
  const handleQuantityChange = (offerId, delta) => {
    const currentQuantity = quantities[offerId] || 1;
    const newQuantity = Math.max(1, currentQuantity + delta);
    setQuantities(prev => ({
      ...prev,
      [offerId]: newQuantity
    }));
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-purple-500 border-t-transparent mx-auto mb-4"></div>
            <p className="text-purple-600 text-lg font-semibold">Loading Amazing Offers...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-8">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6 shadow-lg">
              <span className="text-3xl">🔥</span>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Special Offers
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Discover amazing deals and save big on your favorite products
            </p>
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
              <span className="text-purple-600 font-semibold">{offers.length}</span>
              <span className="text-gray-600">offers available</span>
            </div>
          </div>

          {/* Offers Grid */}
          {!Array.isArray(offers) || offers.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-32 h-32 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">😔</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Offers Available</h3>
              <p className="text-gray-500">Check back later for amazing deals!</p>
            </div>
          ) : (
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {offers.map((offer) => {
                  const originalPrice = offer.product?.price || 0;
                  const discountPercent = offer.discount || 0;
                  const discountedPrice = Math.round(originalPrice * (1 - discountPercent / 100));
                  const savedAmount = originalPrice - discountedPrice;

                  return (
                    <div
                      key={offer.id}
                      className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
                    >
                      {/* Discount Badge */}
                      <div className="absolute top-4 right-4 z-10">
                        <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                          {discountPercent}% OFF
                        </div>
                      </div>

                      {/* Product Image */}
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={`${import.meta.env.VITE_IMAGEURL}${offer.product?.cover_Image}`}
                          alt={offer.product?.name || 'Product'}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-2xl font-bold text-gray-800 mb-3">
                          {offer.product?.name || 'Unknown Product'}
                        </h3>
                        
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {offer.description || 'Special offer available!'}
                        </p>

                        {/* Pricing */}
                        <div className="space-y-2 mb-6">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl text-gray-400 line-through">
                              LE {originalPrice.toLocaleString()}
                            </span>
                            <span className="text-3xl font-bold text-green-600">
                              LE {discountedPrice.toLocaleString()}
                            </span>
                          </div>
                          <div className="text-sm text-red-600 font-semibold">
                            Save LE {savedAmount.toLocaleString()} ({discountPercent}% off)
                          </div>
                        </div>

                        {/* Quantity Selector */}
                        <div className="mb-4 flex items-center gap-3">
                          <span className="font-semibold text-gray-700 text-sm">Quantity:</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleQuantityChange(offer.id, -1)}
                              className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-700 font-bold transition-colors"
                            >
                              -
                            </button>
                            <span className="w-12 text-center font-semibold text-gray-800">
                              {quantities[offer.id] || 1}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(offer.id, 1)}
                              className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-700 font-bold transition-colors"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Available Colors */}
                        {offer.product?.colors && offer.product.colors.length > 0 && (
                          <div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                            <span className="font-semibold text-gray-700 text-sm">Color:</span>
                            <div className="flex gap-4 sm:gap-2 flex-wrap">
                              {offer.product.colors.map((c, i) => {
                                // عرض البيانات كما تأتي من API
                                let colorId, colorLabel, colorValue;
                                if (typeof c === 'object' && c !== null && c.colorId) {
                                  colorId = c.colorId;
                                  const colorInfo = getColorInfo(colorId);
                                  colorLabel = colorInfo.name;
                                  colorValue = colorInfo.hex;
                                } else if (typeof c === 'object' && c !== null && typeof c.color === 'object' && c.color !== null) {
                                  colorId = c.color.id || c.color._id;
                                  colorLabel = c.color.label || c.color.name || c.color.color || '';
                                  colorValue = c.color.hex || c.color.color || '#ccc';
                                } else if (typeof c === 'object' && c !== null) {
                                  colorId = c.id || c._id;
                                  colorLabel = c.label || c.name || c.color || '';
                                  colorValue = c.hex || c.color || '#ccc';
                                } else {
                                  colorId = c;
                                  colorLabel = c;
                                  colorValue = c;
                                }
                                
                                const isSelected = selectedColors[offer.id] === `${colorId}`;
                                
                                return (
                                  <span
                                    key={i}
                                    className={`relative w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 cursor-pointer flex items-center justify-center transition-all duration-200 shadow-md ${isSelected ? 'border-blue-600 ring-2 ring-blue-200 scale-110' : 'border-gray-300'}`}
                                    style={{ background: colorValue }}
                                    title={colorLabel}
                                    onClick={() => {
                                      if (selectedColors[offer.id] === `${colorId}`) {
                                        setSelectedColors(prev => ({ ...prev, [offer.id]: '' }));
                                      } else {
                                        setSelectedColors(prev => ({ ...prev, [offer.id]: `${colorId}` }));
                                      }
                                    }}
                                  >
                                    {isSelected && (
                                      <span className="absolute inset-0 flex items-center justify-center animate-bounce">
                                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                      </span>
                                    )}
                                    <span className="absolute -bottom-4 sm:-bottom-3 left-1/2 -translate-x-1/2 text-xs text-gray-700 font-semibold">{colorLabel}</span>
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Available Sizes */}
                        {offer.product?.sizes && offer.product.sizes.length > 0 && (
                          <div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                            <span className="font-semibold text-gray-700 text-sm">Size:</span>
                            <div className="flex gap-1 sm:gap-2 flex-wrap">
                              {offer.product.sizes.map((s, i) => {
                                // عرض البيانات كما تأتي من API
                                let sizeId, sizeLabel;
                                if (typeof s === 'object' && s !== null && s.sizeId) {
                                  sizeId = s.sizeId;
                                  sizeLabel = getSizeInfo(sizeId);
                                } else if (typeof s === 'object' && s !== null && typeof s.size === 'object' && s.size !== null && typeof s.size.label === 'string') {
                                  sizeId = s.size.id || s.size._id;
                                  sizeLabel = s.size.label;
                                } else if (typeof s === 'object' && s !== null && typeof s.label === 'string') {
                                  sizeId = s.id || s._id;
                                  sizeLabel = s.label;
                                } else if (typeof s === 'string') {
                                  sizeId = s;
                                  sizeLabel = s;
                                } else {
                                  sizeId = 'Unknown';
                                  sizeLabel = 'Unknown';
                                }
                                
                                const isSelected = selectedSizes[offer.id] === `${sizeId}`;
                                
                                return (
                                  <span
                                    key={i}
                                    className={`relative px-3 sm:px-4 py-1 sm:py-2 rounded-md sm:rounded-lg cursor-pointer border text-xs sm:text-sm font-semibold flex items-center justify-center transition-all duration-200 shadow-md ${isSelected ? 'bg-blue-600 text-white border-blue-600 scale-105' : 'bg-gray-100 text-gray-800 border-gray-300'}`}
                                    style={{ minWidth: 40, minHeight: 28 }}
                                    onClick={() => {
                                      if (selectedSizes[offer.id] === `${sizeId}`) {
                                        setSelectedSizes(prev => ({ ...prev, [offer.id]: '' }));
                                      } else {
                                        setSelectedSizes(prev => ({ ...prev, [offer.id]: `${sizeId}` }));
                                      }
                                    }}
                                  >
                                    {sizeLabel}
                                    {isSelected && (
                                      <span className="absolute -top-1 -right-1 bg-blue-600 text-white rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-xs animate-bounce">
                                        ✓
                                      </span>
                                    )}
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                        )}

                    
                        {/* Expiry Date */}
                        <div className="flex items-center gap-2 mb-6 p-3 bg-orange-50 rounded-xl">
                          <span className="text-orange-600">⏰</span>
                          <span className="text-sm text-orange-700 font-medium">
                            Expires: {offer.expiresAt ? new Date(offer.expiresAt).toLocaleDateString() : 'No expiry'}
                          </span>
                        </div>

                                                 {/* Action Button */}
                         <button 
                           onClick={() => handleAddOfferToCart(offer)}
                           className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                         >
                           Get This Offer Now
                         </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

             {showOrderModal && selectedOffer && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
           <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full">
             <h2 className="text-3xl font-bold text-center mb-4">Order Offer</h2>
             <p className="text-lg text-gray-700 mb-6">
               You are about to order the offer: "{selectedOffer.product?.name || 'Unknown Product'}"
             </p>
             
             {previousOrderData && (
               <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                 <div className="flex items-center gap-2 mb-2">
                   <span className="text-green-600">✅</span>
                   <span className="text-sm font-medium text-green-700">Previous order data loaded</span>
                 </div>
                 <p className="text-xs text-green-600">Your previous order details have been pre-filled</p>
               </div>
             )}
             
             <form onSubmit={handleOrderSubmit} className="space-y-4">
               <div>
                 <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                   Address
                 </label>
                 <input
                   type="text"
                   id="address"
                   name="address"
                   value={orderForm.address}
                   onChange={handleInputChange}
                   required
                   placeholder="Enter your delivery address"
                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                 />
               </div>
               <div>
                 <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                   Phone Number
                 </label>
                 <input
                   type="tel"
                   id="phone"
                   name="phone"
                   value={orderForm.phone}
                   onChange={handleInputChange}
                   required
                   placeholder="Enter your phone number"
                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                 />
               </div>
               <div>
                 <label htmlFor="governmentId" className="block text-sm font-medium text-gray-700 mb-1">
                   Government
                 </label>
                 <select
                   id="governmentId"
                   name="governmentId"
                   value={orderForm.governmentId}
                   onChange={handleInputChange}
                   required
                   disabled={loadingGovernments}
                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                 >
                   <option value="">
                     {loadingGovernments ? 'Loading governments...' : 'Select your government'}
                   </option>
                   {governments.map((gov) => (
                     <option key={gov.id || gov._id} value={gov.id || gov._id}>
                       {gov.name || gov.title || gov.governmentName}
                     </option>
                   ))}
                 </select>
               </div>
               <button
                 type="submit"
                 className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
               >
                 Confirm Order
               </button>
               <button
                 type="button"
                 onClick={() => setShowOrderModal(false)}
                 className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
               >
                 Cancel
               </button>
             </form>
           </div>
         </div>
       )}
    </>
  );
} 