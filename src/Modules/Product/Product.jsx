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
import { createOrder } from '../../Apis/orders/orderApi';

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
      <div className="min-h-screen bg-custom-background flex flex-col">
        <Navbar onLogout={handleLogout} />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-custom-background flex flex-col">
        <Navbar onLogout={handleLogout} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-red-500">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-custom-background flex flex-col">
      <Navbar onLogout={handleLogout} />
      
      {/* Animated Hero Section with Catchy Slogan */}
      <div className="relative bg-black py-20 flex items-center justify-center min-h-[320px]">
        <div className="relative z-10 flex flex-col items-center text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-2 text-center">
            <span className="block tracking-widest">Wear</span>
            <span className="block text-5xl md:text-7xl font-bold font-[cursive] text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-lg animate-bounce">
              Confidence
            </span>
            <span className="block tracking-widest mt-2">Own Your Look.</span>
          </h1>
          <p className="mt-2 text-base md:text-lg text-gray-300 mb-6 animate-fade-in-up delay-200">Fresh styles for the bold generation.</p>
          <button
            className="px-8 py-2 rounded-full bg-white text-black font-semibold text-lg shadow hover:bg-gray-200 transition-colors duration-200 animate-fade-in-up delay-300"
            onClick={() => window.scrollTo({top: 500, behavior: 'smooth'})}
          >
            Shop Now
          </button>
        </div>
      </div>

      {/* Category Filter Section */}
      <div className="bg-custom-solid border-b border-gray-200  top-0 z-10">
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
        <section className="py-12 bg-custom-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {displayProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {displayProducts.map((product) => {
                  return (
                    <ProductCard 
                      key={product.id || product._id}
                      id={product.id || product._id}
                      title={product.title}
                      price={product.price}
                      cover_Image={product.cover_Image}
                      discreption={product.discreption}
                      stock={product.stock}
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


function ProductCard({ id, title, price, cover_Image, discreption, stock }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const imageBaseUrl = import.meta.env.VITE_IMAGEURL;
  const getImageUrl = (image) => {
    if (!image) return null;
    const imagePath = image.startsWith('/') ? image : `/${image}`;
    return image.startsWith('http') ? image : `${imageBaseUrl}${imagePath}`;
  };
  const handleOrder = () => {
    navigate(`/product_det?id=${id}`);
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
      className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer w-full max-w-xs mx-auto p-4"
      onClick={handleQuickView}
    >
      <div className="relative aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-xl bg-gray-200">
        <div className="relative h-64 w-full overflow-hidden">
          {stock === 0 && (
            <div className="absolute top-2 left-2 z-10">
              <span className="text-white text-sm font-bold bg-red-600 px-3 py-1 rounded-md">Sold Out</span>
            </div>
          )}
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
        <div className="flex flex-col items-start">
          <h3 className="text-lg font-medium text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
            {title}
          </h3>
          <p className="mt-1 text-sm text-gray-500 break-words whitespace-pre-line w-full">
            {discreption}
          </p>
        </div>
        <div className="mt-4 flex flex-col items-start gap-2">
          <p className="text-lg font-bold text-gray-900">LE {price} EGP</p>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleOrder();
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300 transform hover:scale-105 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
}
