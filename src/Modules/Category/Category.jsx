import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../Apis/Category_Api/Category';
import Navbar from '../../Component/Shared/Navbar';

const Category = () => {
  const dispatch = useDispatch();
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

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Categories</h1>
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => {
              const imgSrc = getImageUrl(cat.image);
              console.log('Category:', cat.name, 'Image Source:', imgSrc);
              return (
                <div key={cat.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img
                    src={imgSrc || "https://placehold.co/400x300"}
                    alt={cat.name}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      console.log('Image failed to load:', imgSrc);
                      e.target.onerror = null;
                      e.target.src = "https://placehold.co/400x300";
                    }}
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">{cat.name}</h2>
                    <p className="text-gray-600">{cat.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Category; 