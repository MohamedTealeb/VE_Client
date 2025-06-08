import { useState, useEffect } from 'react';
import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Navbar from '../../Component/Shared/Navbar';
import { getProductById } from '../../Apis/Product_Api/Product';
import toast from 'react-hot-toast';
import { orderApi } from '../../Apis/orders/orderApi';

export default function Product_Det() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) {
          toast.error('Product ID is missing');
          return;
        }
        console.log('Fetching product with ID:', id); // Debug log
        const product = await getProductById(id);
        console.log('Fetched product data:', product); // Debug log
        if (!product) {
          toast.error('Product not found');
          return;
        }
        setProduct(product);
        setSelectedImage(product.cover_Image);
        if (product.colors && product.colors.length > 0) {
          setSelectedColor(product.colors[0]);
        }
        if (product.sizes && product.sizes.length > 0) {
          setSelectedSize(product.sizes[0]);
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
  const handleOrder = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    navigate('/cart', { state: { product, quantity } });
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
          <div className="text-red-500">Product not found</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="bg-gradient-to-b from-gray-50 to-white py-12 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row gap-8">
            {/* Product Image */}
            <div className="flex-1 flex flex-col items-center">
              {product.stock === 0 && (
                <div className="w-full max-w-xs mb-4">
                  <span className="text-white text-2xl font-bold bg-red-600 px-6 py-2 rounded-lg block text-center">Sold Out</span>
                </div>
              )}
              <div className="relative">
                <img
                  className="w-full max-w-xs h-80 object-cover rounded-xl shadow"
                  src={`${import.meta.env.VITE_IMAGEURL}${selectedImage || product.cover_Image}`}
                  alt={product.name}
                />
              </div>
              {/* Thumbnails */}
              <div className="flex gap-4 mt-4 justify-center">
                {/* Main Image Thumbnail */}
                <img
                  src={`${import.meta.env.VITE_IMAGEURL}${product.cover_Image}`}
                  alt="Main product image"
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                    (!selectedImage || selectedImage === product.cover_Image) ? 'border-blue-500' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedImage(product.cover_Image)}
                />
                {/* Second Image Thumbnail */}
                {product.images && product.images.length > 0 && product.images[0] && (
                  <img
                    src={`${import.meta.env.VITE_IMAGEURL}${product.images[0].url}`}
                    alt="Second product image"
                    className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                      selectedImage === product.images[0].url ? 'border-blue-500' : 'border-gray-200'
                    }`}
                    onClick={() => setSelectedImage(product.images[0].url)}
                  />
                )}
              </div>
            </div>

            {/* Product Details */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <p className="text-lg text-gray-700 mb-4">{product.discreption}</p>
                <div className="mb-4 flex items-center gap-6">
                  <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                  <span className="text-sm text-gray-500">Stock: {product.stock}</span>
                </div>
                {/* Colors */}
                <div className="mb-4 flex items-center gap-4">
                  <span className="font-semibold text-gray-700">Color:</span>
                  <div className="flex gap-2">
                    {Array.isArray(product.colors) && product.colors.length > 0 ? (
                      product.colors.map((c, i) => {
                        // Handle nested color object
                        if (typeof c === 'object' && c !== null && typeof c.color === 'object' && c.color !== null) {
                          let colorValue = c.color.hex || c.color.color || '#ccc';
                          let colorLabel = c.color.label || c.color.name || c.color.color || '';
                          if (typeof colorValue !== 'string') colorValue = '#ccc';
                          return (
                            <span
                              key={i}
                              className="w-7 h-7 rounded-full border-2 border-gray-300"
                              style={{ background: colorValue }}
                              title={colorLabel}
                            />
                          );
                        } else if (typeof c === 'object' && c !== null) {
                          let colorValue = c.hex || c.color || '#ccc';
                          let colorLabel = c.label || c.name || c.color || '';
                          if (typeof colorValue !== 'string') colorValue = '#ccc';
                          return (
                            <span
                              key={i}
                              className="w-7 h-7 rounded-full border-2 border-gray-300"
                              style={{ background: colorValue }}
                              title={colorLabel}
                            />
                          );
                        } else if (typeof c === 'string') {
                          return (
                            <span
                              key={i}
                              className="w-7 h-7 rounded-full border-2 border-gray-300"
                              style={{ background: c }}
                              title={c}
                            />
                          );
                        }
                        return null;
                      })
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </div>
                </div>
                {/* Sizes */}
                <div className="mb-4 flex items-center gap-4">
                  <span className="font-semibold text-gray-700">Size:</span>
                  <div className="flex gap-2">
                    {Array.isArray(product.sizes) && product.sizes.length > 0 ? (
                      product.sizes.map((s, i) => {
                        // Handle nested size object
                        if (typeof s === 'object' && s !== null && typeof s.size === 'object' && s.size !== null && typeof s.size.label === 'string' && s.size.label) {
                          return (
                            <span
                              key={i}
                              className="px-3 py-1 rounded bg-gray-100 text-gray-800 border border-gray-300 text-xs font-medium"
                            >
                              {s.size.label}
                            </span>
                          );
                        } else if (typeof s === 'object' && s !== null && typeof s.label === 'string' && s.label) {
                          return (
                            <span
                              key={i}
                              className="px-3 py-1 rounded bg-gray-100 text-gray-800 border border-gray-300 text-xs font-medium"
                            >
                              {s.label}
                            </span>
                          );
                        } else if (typeof s === 'string' && s) {
                          return (
                            <span
                              key={i}
                              className="px-3 py-1 rounded bg-gray-100 text-gray-800 border border-gray-300 text-xs font-medium"
                            >
                              {s}
                            </span>
                          );
                        }
                        return null;
                      })
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-6 flex gap-4">
                <button
                  onClick={handleOrder}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-xl text-lg font-medium hover:bg-blue-700 transition-colors duration-300 cursor-pointer"
                >
                  Order Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}