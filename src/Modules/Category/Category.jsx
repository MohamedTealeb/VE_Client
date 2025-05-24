import React from 'react';
import Navbar from '../../Component/Shared/Navbar';

const Category = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Categories</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Category Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://placehold.co/400x300" 
                alt="Category" 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Electronics</h2>
                <p className="text-gray-600">Latest gadgets and electronic devices</p>
              </div>
            </div>

            {/* Category Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://placehold.co/400x300" 
                alt="Category" 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Fashion</h2>
                <p className="text-gray-600">Trendy clothing and accessories</p>
              </div>
            </div>

            {/* Category Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://placehold.co/400x300" 
                alt="Category" 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Home & Living</h2>
                <p className="text-gray-600">Furniture and home decor items</p>
              </div>
            </div>

            {/* Category Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://placehold.co/400x300" 
                alt="Category" 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Books</h2>
                <p className="text-gray-600">Best-selling books and literature</p>
              </div>
            </div>

            {/* Category Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://placehold.co/400x300" 
                alt="Category" 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Sports</h2>
                <p className="text-gray-600">Sports equipment and accessories</p>
              </div>
            </div>

            {/* Category Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://placehold.co/400x300" 
                alt="Category" 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Beauty</h2>
                <p className="text-gray-600">Beauty and personal care products</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Category; 