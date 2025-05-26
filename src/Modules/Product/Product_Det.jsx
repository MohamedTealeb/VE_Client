import { useState } from 'react';
import React from 'react';
import Navbar from '../../Component/Shared/Navbar';

export default function Product_Det() {
  const productImages = [
    'https://images.unsplash.com/photo-1578262825743-a4e402caab76?ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80',
    'https://images.unsplash.com/photo-1544441893-675973e31985?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
    'https://images.unsplash.com/photo-1590664863685-a99ef05e9f61?ixlib=rb-1.2.1&auto=format&fit=crop&w=345&q=80',
  ];

  const [selectedImage, setSelectedImage] = useState(productImages[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('blue');
  const [selectedSize, setSelectedSize] = useState('M');

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => Math.max(1, prev - 1));
  const handleOrder = () => console.log(`Ordered: Nike Air, Quantity: ${quantity}, Color: ${selectedColor}, Size: ${selectedSize}`);
  const handleAddToCart = () => console.log(`Added to cart: Nike Air, Quantity: ${quantity}, Color: ${selectedColor}, Size: ${selectedSize}`);

  return (
    <>
      <Navbar />
      <main className="bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="container mx-auto px-6">
          <div className="md:flex md:items-start md:space-x-8">
            {/* Image Gallery */}
            <div className="w-full md:w-1/2">
              <div className="bg-white rounded-2xl shadow-lg p-4">
                <img
                  className="h-[500px] w-full rounded-xl object-cover transition-transform duration-500 hover:scale-105"
                  src={selectedImage}
                  alt="Nike Air"
                />
                <div className="flex justify-center mt-6 space-x-4">
                  {productImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(img)}
                      className={`w-20 h-20 rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-110 ${
                        selectedImage === img ? 'ring-2 ring-blue-600 ring-offset-2' : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${index}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="w-full md:w-1/2 mt-8 md:mt-0">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Nike Air</h1>
                <div className="flex items-center mb-6">
                  <span className="text-3xl font-bold text-blue-600">$125</span>
                  <span className="ml-3 text-lg text-gray-500 line-through">$150</span>
                  <span className="ml-3 px-3 py-1 text-sm font-semibold text-green-600 bg-green-100 rounded-full">20% OFF</span>
                </div>

                <div className="space-y-8">
                  {/* Size Selector */}
                  <div>
                    <label className="text-gray-700 font-medium text-lg mb-3 block">Size:</label>
                    <div className="flex space-x-3">
                      {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`w-12 h-12 rounded-lg border-2 text-lg font-medium transition-all duration-300 transform hover:scale-110 ${
                            selectedSize === size
                              ? 'border-blue-600 bg-blue-50 text-blue-600'
                              : 'border-gray-300 text-gray-600 hover:border-blue-400'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color Selector */}
                  <div>
                    <label className="text-gray-700 font-medium text-lg mb-3 block">Color:</label>
                    <div className="flex space-x-4">
                      {['blue', 'teal', 'pink'].map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`w-12 h-12 rounded-full border-2 transition-all duration-300 transform hover:scale-110 ${
                            selectedColor === color
                              ? `bg-${color}-600 border-${color}-200 ring-2 ring-${color}-200 ring-offset-2`
                              : `bg-${color}-600 border-gray-300`
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Quantity Selector */}
                  <div>
                    <label className="text-gray-700 font-medium text-lg mb-3 block">Quantity:</label>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center border-2 border-gray-200 rounded-lg">
                        <button
                          onClick={handleDecrement}
                          className="px-4 py-3 text-gray-600 hover:text-gray-700 focus:outline-none"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                          </svg>
                        </button>
                        <span className="px-6 py-3 text-xl font-medium text-gray-700">{quantity}</span>
                        <button
                          onClick={handleIncrement}
                          className="px-4 py-3 text-gray-600 hover:text-gray-700 focus:outline-none"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4 pt-6">
                    <button
                      onClick={handleOrder}
                      className="flex-1 bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-medium hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
                    >
                      Order Now
                    </button>
                    <button
                      onClick={handleAddToCart}
                      className="flex items-center justify-center px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-xl text-lg font-medium hover:bg-blue-50 transition-colors duration-300"
                    >
                      <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* More Products Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">More Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: 'Chanel',
                  price: '$12',
                  image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=376&q=80',
                },
                {
                  name: 'Man Mix',
                  price: '$12',
                  image: 'https://images.unsplash.com/photo-1544441893-675973e31985?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
                },
                {
                  name: 'Classic watch',
                  price: '$12',
                  image: 'https://images.unsplash.com/photo-1532667449560-72a95c8d381b?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
                },
                {
                  name: 'Woman Mix',
                  price: '$12',
                  image: 'https://images.unsplash.com/photo-1590664863685-a99ef05e9f61?ixlib=rb-1.2.1&auto=format&fit=crop&w=345&q=80',
                },
              ].map((product, index) => (
                <div key={index} className="group bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <button
                      className="absolute bottom-4 right-4 p-3 rounded-full bg-white/90 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0"
                      onClick={() => console.log(`Added to cart: ${product.name}`)}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
                    <p className="mt-2 text-lg text-blue-600 font-medium">{product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}