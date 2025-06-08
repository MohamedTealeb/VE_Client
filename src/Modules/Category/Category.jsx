import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCategories } from '../../Apis/Category_Api/Category';
import Navbar from '../../Component/Shared/Navbar';
import Footer from '../../Component/Shared/Footer';

const Category = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories, loading, error } = useSelector((state) => state.category);
  const imageBaseUrl = import.meta.env.VITE_IMAGEURL;

  const getImageUrl = (image) => {
    if (!image) return null;
    const imagePath = image.startsWith('/') ? image : `/${image}`;
    return image.startsWith('http') ? image : `${imageBaseUrl}${imagePath}`;
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Debug log for categories and imageBaseUrl
  useEffect(() => {
    console.log('Categories:', categories);
    console.log('Image Base URL:', imageBaseUrl);
  }, [categories, imageBaseUrl]);

  const handleExploreCategory = (categoryId) => {
    navigate(`/products?category=${categoryId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      <Navbar />
      
      {/* Hero Section with Enhanced Animation */}
      <div className="relative bg-black py-20 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-900 via-emerald-900 to-green-900 animate-gradient"></div>
          
          {/* Animated particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-green-400 rounded-full animate-particle"
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
            <div className="absolute top-0 -left-4 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          </div>

          {/* Animated lines */}
          <div className="absolute inset-0">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute h-px bg-gradient-to-r from-transparent via-green-400/30 to-transparent animate-line"
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
              <span className="block animate-slide-up" style={{ animationDelay: '0.2s' }}>Explore Our</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-green-500 animate-gradient-x animate-pulse-slow">Categories</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl animate-slide-up" style={{ animationDelay: '0.4s' }}>
              Discover our wide range of products organized by category
            </p>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          )}
          
          {error && (
            <div className="text-center py-12">
              <p className="text-red-500 text-lg">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat, index) => {
              const imgSrc = getImageUrl(cat.image);
              return (
                <div 
                  key={cat.id} 
                  className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                >
                  <div className="relative aspect-w-16 aspect-h-9 overflow-hidden rounded-t-xl">
                  <img
                    src={imgSrc || "https://placehold.co/400x300"}
                    alt={cat.name}
                      className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://placehold.co/400x300";
                    }}
                  />
                    {/* Overlay with gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Category Name Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h2 className="text-2xl font-bold text-white transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        {cat.name}
                      </h2>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-300">
                      {cat.name}
                    </h2>
                    <p className="text-gray-600 line-clamp-2">{cat.description}</p>
                    
                    {/* Explore Button */}
                    <button 
                      onClick={() => handleExploreCategory(cat.id)}
                      className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                    >
                      View Products
                      <svg className="ml-2 -mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Footer />

      {/* Enhanced custom styles for animations */}
      <style>
        {`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
            33% { transform: translate(30px, -50px) scale(1.1) rotate(120deg); }
            66% { transform: translate(-20px, 20px) scale(0.9) rotate(240deg); }
            100% { transform: translate(0px, 0px) scale(1) rotate(360deg); }
          }
          @keyframes particle {
            0% { transform: translateY(0) translateX(0); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateY(-100px) translateX(100px); opacity: 0; }
          }
          @keyframes line {
            0% { transform: translateX(-100%); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateX(100%); opacity: 0; }
          }
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slide-up {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          @keyframes pulse-slow {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
          }
          .animate-gradient {
            background-size: 200% 200%;
            animation: gradient 15s ease infinite;
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animate-particle {
            animation: particle 3s infinite;
          }
          .animate-line {
            animation: line 3s infinite;
          }
          .animate-fade-in {
            animation: fade-in 1s ease-out;
          }
          .animate-slide-up {
            animation: slide-up 1s ease-out;
          }
          .animate-pulse-slow {
            animation: pulse-slow 3s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
        `}
      </style>
    </div>
  );
};

export default Category; 