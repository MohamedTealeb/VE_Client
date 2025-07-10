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
    navigate(`/product`);
  }; 
  

  return (
    <div className="min-h-screen bg-custom-background flex flex-col">
      <Navbar />
      
      {/* Hero Section Image Only */}
      

      {/* Categories Section */}
      <div className="py-20 bg-custom-solid">
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
                  className="group relative bg-custom-solid rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                >
                  {/* Modern Category Image */}
                  <div className="flex justify-center mt-4">
                    <div className="relative w-56 h-56 rounded-2xl overflow-hidden shadow-lg border-4 border-white group-hover:scale-105 transition-transform duration-300 bg-gray-100">
                  <img
                        src={imgSrc || "https://placehold.co/400x400"}
                    alt={cat.name}
                        className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                          e.target.src = "https://placehold.co/400x400";
                    }}
                  />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                        <h2 className="text-lg font-bold text-white text-center">{cat.name}</h2>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-600 line-clamp-2">{cat.description}</p>
                    
                    {/* Enhanced Explore Button */}
                    <button 
                      onClick={() => handleExploreCategory(cat.id)}
                      className="mt-4 group relative inline-flex items-center px-6 py-3 text-sm font-medium rounded-full text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 transform hover:scale-105 cursor-pointer overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center">
                        <span className="mr-2">View Products</span>
                        <svg 
                          className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M9 5l7 7-7 7" 
                          />
                      </svg>
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Footer />

      
    </div>
  );
};

export default Category;      