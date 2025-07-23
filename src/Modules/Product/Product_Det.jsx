import { useState, useEffect } from 'react';
import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Navbar from '../../Component/Shared/Navbar';
import { getProductById } from '../../Apis/Product_Api/Product';
import toast from 'react-hot-toast';
import { addToCart } from '../../Apis/cart/cart';
import { getAllProducts } from '../../Apis/Product_Api/Product';
import sizeGuideImg from '../../assets/WhatsApp Image 2025-05-10 at 23.43.31_0f57f908.jpg';

export default function Product_Det() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [showNote, setShowNote] = useState(true);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [userWidth, setUserWidth] = useState('');
  const [userHeight, setUserHeight] = useState('');
  const [suggestedSize, setSuggestedSize] = useState('');

  useEffect(() => {
    if (showNote) {
      const timer = setTimeout(() => setShowNote(false), 6000); // 6 ثواني
      return () => clearTimeout(timer);
    }
  }, [showNote]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) {
          toast.error('Product ID is missing');
          return;
        }
        const product = await getProductById(id);
        if (!product) {
          toast.error('Product not found');
          return;
        }
        setProduct(product);
        setSelectedImage(product.cover_Image);
        if (product.colors && product.colors.length > 0) {
          // خزن ال ID فقط
          let firstColor = product.colors[0];
          let colorId = '';
          if (typeof firstColor === 'object' && firstColor !== null && typeof firstColor.color === 'object' && firstColor.color !== null) {
            colorId = firstColor.id || firstColor._id || firstColor.color.id || firstColor.color._id || '';
          } else if (typeof firstColor === 'object' && firstColor !== null) {
            colorId = firstColor.id || firstColor._id || '';
          } else {
            colorId = firstColor;
          }
          setSelectedColor(`${colorId}`);
        }
        if (product.sizes && product.sizes.length > 0) {
          let firstSize = product.sizes[0];
          let sizeId = '';
          if (typeof firstSize === 'object' && firstSize !== null && typeof firstSize.size === 'object' && firstSize.size !== null && typeof firstSize.size.label === 'string') {
            sizeId = firstSize.id || firstSize._id || firstSize.size.id || firstSize.size._id || '';
          } else if (typeof firstSize === 'object' && firstSize !== null && typeof firstSize.label === 'string') {
            sizeId = firstSize.id || firstSize._id || '';
          } else {
            sizeId = firstSize;
          }
          setSelectedSize(`${sizeId}`);
        }
      } catch (error) {
        toast.error('Failed to load product details');
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    // جلب المنتجات ذات الصلة
    const fetchRelated = async () => {
      try {
        const all = await getAllProducts();
        let productsArr = Array.isArray(all) ? all : all.data || [];
        // استبعاد المنتج الحالي بمقارنة String
        productsArr = productsArr.filter(
          p => String(p._id || p.id) !== String(product?._id || product?.id)
        );
        console.log('Related products:', productsArr.slice(0, 4));
        setRelatedProducts(productsArr.slice(0, 4));
      } catch (e) {
        setRelatedProducts([]);
      }
    };
    if (product) fetchRelated();
  }, [product]);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => Math.max(1, prev - 1));

  const handleOrder = async () => {
    if (!selectedColor) {
      setError("Please select a color.");
      return;
    }
    if (!selectedSize) {
      setError("Please select a size.");
      return;
    }
    setError("");
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      await addToCart({
        productId: Number(product._id || product.id),
        quantity: Number(quantity),
        colorId: Number(selectedColor),
        sizeId: Number(selectedSize),
      });
      toast.success('Added to cart!');
      navigate('/cart');
    } catch (err) {
      toast.error('Failed to add to cart');
    }
  };

  const handleSuggestSize = () => {
    // جدول المقاسات
    const sizeTable = [
      { size: 'S', width: 56, height: 70 },
      { size: 'M', width: 58, height: 72 },
      { size: 'L', width: 60, height: 74 },
      { size: 'XL', width: 62, height: 76 },
    ];
    const w = parseInt(userWidth);
    const h = parseInt(userHeight);
    if (isNaN(w) || isNaN(h)) {
      setSuggestedSize('برجاء إدخال أرقام صحيحة للطول والعرض');
      return;
    }
    // ابحث عن أول مقاس أكبر أو يساوي القيم المدخلة
    const found = sizeTable.find(row => w <= row.width && h <= row.height);
    if (found) {
      setSuggestedSize(`مقاسك المناسب هو: ${found.size}`);
    } else {
      setSuggestedSize('لا يوجد مقاس مناسب بناءً على القيم المدخلة');
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-custom-background flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-custom-background flex items-center justify-center">
          <div className="text-red-500">Product not found</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="bg-custom-background py-4 sm:py-8 lg:py-12 min-h-screen">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6">
      
          <div className="max-w-4xl mx-auto rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 bg-white/70 backdrop-blur-md border border-gray-200">
            {/* Product Image */}
            <div className="flex-1 flex flex-col items-center">
              <div className="relative w-full max-w-sm sm:max-w-md lg:w-96 mb-4 transition-transform duration-300 hover:scale-105 drop-shadow-xl">
                {product.stock === 0 && (
                  <div className="absolute top-2 left-2 z-10">
                    <span className="text-white text-xs sm:text-sm font-bold bg-red-600 px-2 sm:px-3 py-1 rounded-md">Sold Out</span>
                  </div>
                )}
                <img
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-xl sm:rounded-2xl shadow-lg"
                  src={`${import.meta.env.VITE_IMAGEURL}${selectedImage || product.cover_Image}`}
                  alt={product.name}
                />
              </div>
              {/* Thumbnails */}
              <div className="flex gap-2 sm:gap-4 mt-4 justify-center">
                <img
                  src={`${import.meta.env.VITE_IMAGEURL}${product.cover_Image}`}
                  alt="Main product image"
                  className={`w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg cursor-pointer border-2 ${(!selectedImage || selectedImage === product.cover_Image) ? 'border-blue-500' : 'border-gray-200'} transition-transform duration-200 hover:scale-105`}
                  onClick={() => setSelectedImage(product.cover_Image)}
                />
                {product.images && product.images.length > 0 && product.images[0] && (
                  <img
                    src={`${import.meta.env.VITE_IMAGEURL}${product.images[0].url}`}
                    alt="Second product image"
                    className={`w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg cursor-pointer border-2 ${selectedImage === product.images[0].url ? 'border-blue-500' : 'border-gray-200'} transition-transform duration-200 hover:scale-105`}
                    onClick={() => setSelectedImage(product.images[0].url)}
                  />
                )}
              </div>
            </div>
            {/* Product Details */}
            <div className="flex-1 flex flex-col justify-between max-w-full lg:max-w-md p-2 sm:p-4">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-2 tracking-tight leading-tight">{product.name}</h1>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl sm:text-2xl">⚧️</span>
                  <h3 className="text-base sm:text-lg font-bold text-pink-600">
                    Unisex <span className="text-gray-600 font-normal text-sm sm:text-base ml-1 sm:ml-2">(For Men & Women)</span>
                  </h3>
                </div>
                <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-4 break-words whitespace-pre-line w-full min-h-[60px] sm:min-h-[80px] lg:min-h-[96px]">{product.discreption}</p>
                <div className="mb-4 flex items-center gap-4 sm:gap-6">
                  <span className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">LE {product.price} EGP</span>
                </div>
                {/* اختيار الكمية */}
                <div className="mb-4 sm:mb-6 flex items-center gap-3 sm:gap-4">
                  <span className="font-semibold text-gray-700 text-sm sm:text-base">Quantity:</span>
                  <button
                    className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-200 text-lg sm:text-2xl font-bold hover:bg-blue-100 transition-colors shadow"
                    onClick={handleDecrement}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
                  </button>
                  <span className="px-3 sm:px-4 text-base sm:text-lg font-bold">{quantity}</span>
                  <button
                    className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-200 text-lg sm:text-2xl font-bold hover:bg-blue-100 transition-colors shadow"
                    onClick={handleIncrement}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  </button>
                </div>
                {error && (
                  <p className="text-red-500 font-semibold mb-2 text-sm sm:text-base">{error}</p>
                )}
                {/* Colors */}
                <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  <span className="font-semibold text-gray-700 text-sm">Color:</span>
                  <div className="flex gap-4 sm:gap-2 flex-wrap">
                    {Array.isArray(product.colors) && product.colors.length > 0 ? (
                      product.colors.map((c, i) => {
                        let colorValue, colorLabel, colorId;
                        if (typeof c === 'object' && c !== null && typeof c.color === 'object' && c.color !== null) {
                          colorValue = c.color.hex || c.color.color || '#ccc';
                          colorLabel = c.color.label || c.color.name || c.color.color || '';
                          colorId = c.id || c._id || c.color.id || c.color._id;
                        } else if (typeof c === 'object' && c !== null) {
                          colorValue = c.hex || c.color || '#ccc';
                          colorLabel = c.label || c.name || c.color || '';
                          colorId = c.id || c._id;
                        } else {
                          colorValue = c;
                          colorLabel = c;
                          colorId = c;
                        }
                        const isSelected = selectedColor === `${colorId}`;
                        return (
                          <span
                            key={i}
                            className={`relative w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 cursor-pointer flex items-center justify-center transition-all duration-200 shadow-md ${isSelected ? 'border-blue-600 ring-2 ring-blue-200 scale-110' : 'border-gray-300'}`}
                            style={{ background: colorValue }}
                            title={colorLabel}
                            onClick={() => {
                              if (selectedColor === `${colorId}`) {
                                setSelectedColor('');
                              } else {
                                setSelectedColor(`${colorId}`);
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
                      })
                    ) : (
                      <span className="text-gray-400 text-sm">N/A</span>
                    )}
                  </div>
                </div>
                {/* Sizes */}
                <div className="mb-4 sm:mb-6 mt-9 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  <span className="font-semibold text-gray-700 text-sm">Size:</span>
                  <div className="flex gap-1 sm:gap-2 flex-wrap">
                    {Array.isArray(product.sizes) && product.sizes.length > 0 ? (
                      product.sizes.map((s, i) => {
                        let sizeLabel, sizeId;
                        if (typeof s === 'object' && s !== null && typeof s.size === 'object' && s.size !== null && typeof s.size.label === 'string') {
                          sizeLabel = s.size.label;
                          sizeId = s.id || s._id || s.size.id || s.size._id;
                        } else if (typeof s === 'object' && s !== null && typeof s.label === 'string') {
                          sizeLabel = s.label;
                          sizeId = s.id || s._id;
                        } else if (typeof s === 'string') {
                          sizeLabel = s;
                          sizeId = s;
                        }
                        const isSelected = selectedSize === `${sizeId}`;
                        return (
                          <span
                            key={i}
                            className={`relative px-3 sm:px-4 py-1 sm:py-2 rounded-md sm:rounded-lg cursor-pointer border text-xs sm:text-sm font-semibold flex items-center justify-center transition-all duration-200 shadow-md ${isSelected ? 'bg-blue-600 text-white border-blue-600 scale-105' : 'bg-gray-100 text-gray-800 border-gray-300'}`}
                            style={{ minWidth: 40, minHeight: 28 }}
                            onClick={() => {
                              if (selectedSize === `${sizeId}`) {
                                setSelectedSize('');
                              } else {
                                setSelectedSize(`${sizeId}`);
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
                      })
                    ) : (
                      <span className="text-gray-400 text-sm">N/A</span>
                    )}
                  </div>
                  {/* زر دليل المقاسات */}
                  <button
                    type="button"
                    className="ml-4 mt-2 sm:mt-0 px-3 py-1 bg-gray-200 hover:bg-blue-100 text-gray-700 rounded-md text-xs sm:text-sm font-semibold flex items-center gap-1 border border-gray-300 shadow-sm transition"
                    onClick={() => setShowSizeGuide(true)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 20h16M4 4h16M4 8h16M4 12h16M4 16h16" /></svg>
                    دليل المقاسات
                  </button>
                </div>
                {/* نافذة دليل المقاسات */}
                {showSizeGuide && (
                  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-2xl shadow-2xl p-7 max-w-md w-full relative animate-fade-in-up">
                      <button
                        className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl font-bold transition"
                        onClick={() => setShowSizeGuide(false)}
                        aria-label="إغلاق"
                      >
                        &times;
                      </button>
                      {/* أيقونة علوية */}
                      <div className="flex justify-center mb-2">
                        <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 7l8-4 8 4M4 7v10a2 2 0 002 2h12a2 2 0 002-2V7M4 7l8 5 8-5" /></svg>
                      </div>
                      <h2 className="text-2xl font-extrabold mb-1 text-center text-gray-800 tracking-tight">اعرف مقاسك المناسب</h2>
                      <div className="text-gray-500 text-center text-sm mb-5">أدخل قياسات جسمك بالسنتيمتر وسنقترح عليك المقاس الأنسب لك</div>
                      <div className="flex flex-col gap-3 mb-2">
                        <label className="text-sm font-semibold text-gray-700">عرض جسمك (سم)</label>
                        <input type="number" min="1" className="border rounded-full px-4 py-2 shadow focus:ring-2 focus:ring-blue-300 transition w-full text-center text-lg" value={userWidth} onChange={e => setUserWidth(e.target.value)} placeholder="مثال: 55" />
                        <label className="text-sm font-semibold text-gray-700 mt-1">طول جسمك (سم)</label>
                        <input type="number" min="1" className="border rounded-full px-4 py-2 shadow focus:ring-2 focus:ring-blue-300 transition w-full text-center text-lg" value={userHeight} onChange={e => setUserHeight(e.target.value)} placeholder="مثال: 71" />
                        <button className="mt-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transition text-lg" onClick={handleSuggestSize}>اعرف مقاسك</button>
                        {suggestedSize && (
                          <div className="mt-4 flex justify-center">
                            <div className={`rounded-xl px-4 py-3 text-center font-bold text-lg shadow-md transition-all ${suggestedSize.includes('مقاسك المناسب هو') ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>{suggestedSize}</div>
                          </div>
                        )}
                      </div>
                      <div className="mt-6 text-center">
                        <span className="text-xs text-gray-400 mr-1">للمزيد من التفاصيل والصور عن المقاسات:</span>
                        <a href="/size-guide" className="text-blue-600 hover:underline text-sm font-bold">صفحة دليل المقاسات الكاملة</a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <button
                onClick={handleOrder}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-lg sm:text-xl font-bold shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer mt-4"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                Order Now
              </button>
                  {/* ملاحظة موحدة بالعرض */}
          <div className="max-w-4xl mx-auto mt-8 flex justify-center">
            {showNote ? (
              <div className="w-full bg-yellow-100 border-2 border-yellow-400 text-yellow-900 p-4 rounded-2xl text-base md:text-lg shadow-lg animate-fade-in" style={{ direction: 'rtl', textAlign: 'right' }}>
                <div className="w-full text-center mb-4">
                  <span className="font-bold text-lg md:text-xl">ملحوظة:</span>
                </div>
                <div className="flex flex-row items-stretch">
                  <div className="flex-1 flex flex-col justify-center">
                    <span className="font-bold text-base md:text-lg mb-2 block">سياسة الغسيل</span>
                    <ul className="list-disc pr-4 mt-2 space-y-1 text-sm md:text-base">
                      <li>يغسل في ماء بارد</li>
                      <li>لا يكوي إلا على ظهره</li>
                      <li>عدم تعرضه للشمس للتجفيف</li>
                      <li>غسل الألوان مع الألوان المشابهة فقط</li>
                      <li>يفضل غسل الأسود بمسحوق خاص</li>
                    </ul>
                  </div>
                  <div className="w-px bg-yellow-400 mx-6" style={{ minHeight: '60px' }}></div>
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <span className="font-bold text-base md:text-lg mb-2 block">سياسة الاستبدال والاسترجاع</span>
                    <span className="text-sm md:text-base">في حالة الاستبدال أو الاسترجاع يتم دفع مصاريف الشحن</span>
                  </div>
                </div>
              </div>
            ) : (
              <button
                className="bg-yellow-100 border-2 border-yellow-400 text-yellow-900 px-6 py-3 rounded-2xl text-base md:text-lg shadow-lg hover:bg-yellow-200 transition font-bold"
                onClick={() => setShowNote(true)}
              >
                عرض الملاحظات
              </button>
            )}
          </div>
          {/* نهاية الملاحظة الموحدة */}
            </div>
          </div>
          {/* Related Products inside the same card */}
          {relatedProducts.length > 0 && (
            <div className="max-w-4xl mx-auto rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl p-4 sm:p-6 lg:p-8 mt-4 bg-white/70 backdrop-blur-md border border-gray-200">
              <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800">Related Products</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {relatedProducts.map((prod) => (
                  <div key={prod._id || prod.id} className="bg-white rounded-lg shadow p-3 flex flex-col items-center cursor-pointer hover:shadow-lg transition" onClick={() => navigate(`/product_det?id=${prod._id || prod.id}`)}>
                    <img
                      src={`${import.meta.env.VITE_IMAGEURL}${prod.cover_Image}`}
                      alt={prod.name || prod.title}
                      className="w-32 h-32 object-cover rounded mb-2"
                    />
                    <div className="text-sm font-semibold text-gray-700 text-center line-clamp-2 mb-1">{prod.name || prod.title}</div>
                    <div className="text-xs text-gray-500">LE {prod.price} EGP</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
