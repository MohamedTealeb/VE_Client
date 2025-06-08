import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../../Component/Shared/Navbar';
import Footer from '../../Component/Shared/Footer';
import { getAllProducts } from '../../Apis/Product_Api/Product';

import { fetchCategories, getAllCategories } from '../../Apis/Category_Api/Category';
import './Product.css';
import { addToCart } from '../../store/slices/orderSlice';
import toast from 'react-hot-toast';
import Product_Det from './Product_Det';

export default function Product() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const imageBaseUrl = import.meta.env.VITE_IMAGEURL;
  const [searchParams] = useSearchParams();
  const selectedProductId = searchParams.get('id');

  // Get categories from Redux store
  const { categories, loading: categoriesLoading } = useSelector((state) => state.category);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products
        let productsResponse;
        if (selectedCategory) {
          productsResponse = await getAllProducts({ category: selectedCategory });
        } else {
          productsResponse = await getAllProducts();
        }
        const productsData = Array.isArray(productsResponse) ? productsResponse : productsResponse.data || [];
        setProducts(productsData);

        // Fetch categories using Redux
        dispatch(fetchCategories());

        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message || 'Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, selectedCategory]);

  const handleCategoryChange = (e) => {
    const categoryName = e.target.value;
    setSelectedCategory(categoryName);
  };

  // Remove client-side filtering since we get filtered products from API
  const displayProducts = products;

  const handleLogout = () => {
    localStorage.removeItem('token');
  };

  if (loading || categoriesLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
        <Navbar onLogout={handleLogout} />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
        <Navbar onLogout={handleLogout} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-red-500">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      <Navbar onLogout={handleLogout} />
      
      {/* Hero Section with Enhanced Animation */}
      <div className="relative bg-black py-20 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black animate-gradient"></div>
          
          {/* Animated particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full animate-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  opacity: Math.random() * 0.5 + 0.2
                }}
              />
            ))}
          </div>

          {/* Enhanced blob animations */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          </div>

          {/* Animated lines */}
          <div className="absolute inset-0">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute h-px bg-gradient-to-r from-transparent via-white/30 to-transparent animate-line"
                style={{
                  top: `${20 + i * 15}%`,
                  width: '100%',
                  animationDelay: `${i * 0.5}s`
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl animate-fade-in">
              <span className="block animate-slide-up" style={{ animationDelay: '0.2s' }}>Discover Our</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-gradient-x animate-pulse-slow">Premium Products</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl animate-slide-up" style={{ animationDelay: '0.4s' }}>
              Explore our collection of premium products
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {[
              { label: 'Total Products', value: '1,234' },
              { label: 'Happy Customers', value: '98%' },
              { label: 'Global Shipping', value: '24/7' },
              { label: 'Support', value: '24/7' }
            ].map((stat, index) => (
              <div key={index} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="mt-2 text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Filter Section */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <select 
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="rounded-lg border-gray-300 py-2 pl-3 pr-10 text-base focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white shadow-sm"
              >
                <option key="all" value="">All Categories</option>
                {categories && categories.filter(category => category && category.name).map((category, index) => (
                  <option key={`category-${category.name || index}`} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details or Product Grid */}
      {selectedProductId ? (
        <Product_Det id={selectedProductId} />
      ) : (
        <section className="py-12 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {displayProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {displayProducts.map((product) => {
                  return (
                    <ProductCard 
                      key={product.id || product._id}
                      id={product.id || product._id}
                      title={product.title}
                      price={product.price}
                      cover_Image={product.cover_Image}
                      discreption={product.discreption}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found in this category</p>
              </div>
            )}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}

// Icons
function BookmarkIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function CompassIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}

// Product Card Component
function ProductCard({ id, title, price, cover_Image, discreption }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const imageBaseUrl = import.meta.env.VITE_IMAGEURL;
  const getImageUrl = (image) => {
    if (!image) return null;
    const imagePath = image.startsWith('/') ? image : `/${image}`;
    return image.startsWith('http') ? image : `${imageBaseUrl}${imagePath}`;
  };
  const handleAddToCart = () => {
    dispatch(addToCart(id))
      .unwrap()
      .then(() => {
        toast.success('Product added to cart successfully!', {
          duration: 2000,
          position: 'top-right',
          style: {
            background: '#10B981',
            color: '#fff',
          },
        });
      })
      .catch((error) => {
        toast.error('Failed to add product to cart', {
          duration: 2000,
          position: 'top-right',
          style: {
            background: '#EF4444',
            color: '#fff',
          },
        });
      });
  };
  const handleQuickView = () => {
    if (!id) {
      toast.error('Product ID is missing');
      return;
    }
    navigate(`/product_det?id=${id}`);
  };
  const imgSrc = getImageUrl(cover_Image);
  return (
    <div 
      className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={handleQuickView}
    >
      <div className="relative aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-xl bg-gray-200">
        <div className="relative h-64 w-full overflow-hidden">
          <img
            src={imgSrc}
            alt={title}
            className="h-full w-full object-cover object-center transition-all duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleQuickView();
              }}
              className="transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-300 bg-white/90 hover:bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-medium shadow-lg cursor-pointer"
            >
              Quick View
            </button>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
              {title}
            </h3>
            <p className="mt-1 text-sm text-gray-500 line-clamp-2">{discreption}</p>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-lg font-bold text-gray-900">${price}</p>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300 transform hover:scale-105 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
