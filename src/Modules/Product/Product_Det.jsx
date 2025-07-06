import { useState, useEffect } from 'react';
import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Navbar from '../../Component/Shared/Navbar';
import { getProductById } from '../../Apis/Product_Api/Product';
import toast from 'react-hot-toast';
import { addToCart } from '../../Apis/cart/cart';

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
      <main className="bg-custom-background  py-12 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto rounded-2xl shadow-2xl p-8 flex flex-col md:flex-row gap-8 bg-white/70 backdrop-blur-md border border-gray-200">
            {/* Product Image */}
            <div className="flex-1 flex flex-col items-center">
              <div className="relative w-96 mb-4 transition-transform duration-300 hover:scale-105 drop-shadow-xl">
                {product.stock === 0 && (
                  <div className="absolute top-2 left-2 z-10">
                    <span className="text-white text-sm font-bold bg-red-600 px-3 py-1 rounded-md">Sold Out</span>
                  </div>
                )}
                <img
                  className="w-full h-96 object-cover rounded-2xl shadow-lg"
                  src={`${import.meta.env.VITE_IMAGEURL}${selectedImage || product.cover_Image}`}
                  alt={product.name}
                />
              </div>
              {/* Thumbnails */}
              <div className="flex gap-4 mt-4 justify-center">
                <img
                  src={`${import.meta.env.VITE_IMAGEURL}${product.cover_Image}`}
                  alt="Main product image"
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${(!selectedImage || selectedImage === product.cover_Image) ? 'border-blue-500' : 'border-gray-200'} transition-transform duration-200 hover:scale-105`}
                  onClick={() => setSelectedImage(product.cover_Image)}
                />
                {product.images && product.images.length > 0 && product.images[0] && (
                  <img
                    src={`${import.meta.env.VITE_IMAGEURL}${product.images[0].url}`}
                    alt="Second product image"
                    className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${selectedImage === product.images[0].url ? 'border-blue-500' : 'border-gray-200'} transition-transform duration-200 hover:scale-105`}
                    onClick={() => setSelectedImage(product.images[0].url)}
                  />
                )}
              </div>
            </div>
            {/* Product Details */}
            <div className="flex-1 flex flex-col justify-between max-w-md p-4">
              <div>
                <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight leading-tight">{product.name}</h1>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">⚧️</span>
                  <h3 className="text-lg font-bold text-pink-600">
                    Unisex <span className="text-gray-600 font-normal text-base ml-2">(For Men & Women)</span>
                  </h3>
                </div>
                <p className="text-lg text-gray-700 mb-4 break-words whitespace-pre-line w-full min-h-[96px]">{product.discreption}</p>
                <div className="mb-4 flex items-center gap-6">
                  <span className="text-3xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">LE {product.price} EGP</span>
                </div>
                {/* اختيار الكمية */}
                <div className="mb-6 flex items-center gap-4">
                  <span className="font-semibold text-gray-700">Quantity:</span>
                  <button
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-2xl font-bold hover:bg-blue-100 transition-colors shadow"
                    onClick={handleDecrement}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
                  </button>
                  <span className="px-4 text-lg font-bold">{quantity}</span>
                  <button
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-2xl font-bold hover:bg-blue-100 transition-colors shadow"
                    onClick={handleIncrement}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  </button>
                </div>
                {error && (
                  <p className="text-red-500 font-semibold mb-2">{error}</p>
                )}
                {/* Colors */}
                <div className="mb-10 flex items-center gap-4">
                  <span className="font-semibold text-gray-700">Color:</span>
                  <div className="flex gap-3">
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
                            className={`relative w-14 h-14 rounded-full border-4 cursor-pointer flex items-center justify-center transition-all duration-200 shadow-lg ${isSelected ? 'border-blue-600 ring-4 ring-blue-200 scale-110' : 'border-gray-300'}`}
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
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                              </span>
                            )}
                            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-700 font-semibold">{colorLabel}</span>
                          </span>
                        );
                      })
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </div>
                </div>
                {/* Sizes */}
                <div className="mb-6 flex items-center gap-4">
                  <span className="font-semibold text-gray-700">Size:</span>
                  <div className="flex gap-3">
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
                            className={`relative px-7 py-3 rounded-xl cursor-pointer border text-lg font-semibold flex items-center justify-center transition-all duration-200 shadow-lg ${isSelected ? 'bg-blue-600 text-white border-blue-600 scale-105' : 'bg-gray-100 text-gray-800 border-gray-300'}`}
                            style={{ minWidth: 64, minHeight: 48 }}
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
                              <span className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-base animate-bounce">
                                ✓
                              </span>
                            )}
                          </span>
                        );
                      })
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={handleOrder}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-white px-6 py-4 rounded-2xl text-xl font-bold shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer mt-4"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                Order Now
              </button>
              {/* رسالة تحذيرية محسنة */}
              <div
                className="mt-6 flex items-start gap-3 bg-yellow-50 border-l-8 border-yellow-400 text-yellow-900 p-4 rounded-xl text-base shadow"
                style={{ direction: 'rtl', textAlign: 'right' }}
              >
                <span className="mt-1">
                  <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" strokeWidth="2" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01" />
                  </svg>
                </span>
                <div>
                  <span className="font-bold">ملحوظة:</span>
                  <span className="ml-1">
                    في حالة الاستبدال أو الاسترجاع يتم دفع مصاريف الشحن
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
