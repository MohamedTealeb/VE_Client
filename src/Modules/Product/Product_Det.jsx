import { useState, useEffect } from 'react';
import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Navbar from '../../Component/Shared/Navbar';
import { getProductById } from '../../Apis/Product_Api/Product';
import toast from 'react-hot-toast';

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
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => Math.max(1, prev - 1));

  const handleOrder = () => {
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

    // Find the complete color and size objects
    const selectedColorObj = product.colors.find(c => {
      let colorId = '';
      if (typeof c === 'object' && c !== null && typeof c.color === 'object' && c.color !== null) {
        colorId = c.id || c._id || c.color.id || c.color._id || '';
      } else if (typeof c === 'object' && c !== null) {
        colorId = c.id || c._id || '';
      } else {
        colorId = c;
      }
      return `${colorId}` === selectedColor;
    });

    const selectedSizeObj = product.sizes.find(s => {
      let sizeId = '';
      if (typeof s === 'object' && s !== null && typeof s.size === 'object' && s.size !== null && typeof s.size.label === 'string') {
        sizeId = s.id || s._id || s.size.id || s.size._id || '';
      } else if (typeof s === 'object' && s !== null && typeof s.label === 'string') {
        sizeId = s.id || s._id || '';
      } else {
        sizeId = s;
      }
      return `${sizeId}` === selectedSize;
    });

    navigate('/cart', { 
      state: { 
        product, 
        quantity, 
        colorId: selectedColor,
        sizeId: selectedSize,
        selectedColor: selectedColorObj,
        selectedSize: selectedSizeObj
      } 
    });
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
              <div className="relative w-80 mb-4">
                {product.stock === 0 && (
                  <div className="absolute top-2 left-2 z-10">
                    <span className="text-white text-sm font-bold bg-red-600 px-3 py-1 rounded-md">Sold Out</span>
                  </div>
                )}
                <img
                  className="w-full h-80 object-cover rounded-xl shadow"
                  src={`${import.meta.env.VITE_IMAGEURL}${selectedImage || product.cover_Image}`}
                  alt={product.name}
                />
              </div>
              {/* Thumbnails */}
              <div className="flex gap-4 mt-4 justify-center">
                <img
                  src={`${import.meta.env.VITE_IMAGEURL}${product.cover_Image}`}
                  alt="Main product image"
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${(!selectedImage || selectedImage === product.cover_Image) ? 'border-blue-500' : 'border-gray-200'}`}
                  onClick={() => setSelectedImage(product.cover_Image)}
                />
                {product.images && product.images.length > 0 && product.images[0] && (
                  <img
                    src={`${import.meta.env.VITE_IMAGEURL}${product.images[0].url}`}
                    alt="Second product image"
                    className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${selectedImage === product.images[0].url ? 'border-blue-500' : 'border-gray-200'}`}
                    onClick={() => setSelectedImage(product.images[0].url)}
                  />
                )}
              </div>
            </div>
            {/* Product Details */}
            <div className="flex-1 flex flex-col justify-between max-w-md p-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <p className="text-lg text-gray-700 mb-4 break-words whitespace-pre-line w-full min-h-[96px]">{product.discreption}</p>
                <div className="mb-4 flex items-center gap-6">
                  <span className="text-2xl font-bold text-blue-600">LE {product.price} EGP</span>
                  <span className="text-sm text-gray-500">Stock: {product.stock}</span>
                </div>
                {error && (
                  <p className="text-red-500 font-semibold mb-2">{error}</p>
                )}
                {/* Colors */}
                <div className="mb-4 flex items-center gap-4">
                  <span className="font-semibold text-gray-700">Color:</span>
                  <div className="flex gap-2">
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
                            className={`relative w-12 h-12 rounded-full border-2 cursor-pointer flex items-center justify-center ${isSelected ? 'border-blue-600 ring-2 ring-blue-300' : 'border-gray-300'}`}
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
                              <span className="absolute inset-0 flex items-center justify-center">
                                <span className="text-white text-xl font-bold">✓</span>
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
                {/* Sizes */}
                <div className="mb-4 flex items-center gap-4">
                  <span className="font-semibold text-gray-700">Size:</span>
                  <div className="flex gap-2">
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
                            className={`relative px-5 py-2 rounded cursor-pointer border text-base font-medium flex items-center justify-center ${isSelected ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-100 text-gray-800 border-gray-300'}`}
                            style={{ minWidth: 56, minHeight: 40 }}
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
                              <span className="absolute -top-1 -right-1 bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm">
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
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-xl text-lg font-medium hover:bg-blue-700 transition-colors duration-300 cursor-pointer mt-4"
              >
                Order Now
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
