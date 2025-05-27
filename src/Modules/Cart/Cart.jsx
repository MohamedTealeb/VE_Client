import React from 'react'
import Navbar from '../../Component/Shared/Navbar'

export default function Cart() {
  return <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Shopping Cart</h1>
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Cart Items */}
            <div className="divide-y divide-gray-200">
              {/* Item 1 */}
              <div className="p-6 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center gap-6">
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <img 
                      src="https://images.unsplash.com/photo-1523275335684-37898b6baf30" 
                      alt="Product" 
                      className="w-full h-full object-cover rounded-xl shadow-md"
                    />
                    <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                      New
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">Premium Watch</h3>
                    <p className="text-sm text-gray-500 mt-1">Color: Silver | Size: Standard</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-sm text-gray-500">In Stock</span>
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center border-2 border-gray-200 rounded-lg">
                      <button className="px-3 py-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="px-4 py-2 text-gray-700 font-medium">1</span>
                      <button className="px-3 py-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">$299.99</p>
                      <p className="text-sm text-gray-500 line-through">$399.99</p>
                    </div>

                    <button className="text-gray-400 hover:text-red-500 transition-colors p-2">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Item 2 */}
              <div className="p-6 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center gap-6">
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <img 
                      src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e" 
                      alt="Product" 
                      className="w-full h-full object-cover rounded-xl shadow-md"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">Wireless Headphones</h3>
                    <p className="text-sm text-gray-500 mt-1">Color: Black | Style: Over-ear</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-sm text-gray-500">In Stock</span>
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center border-2 border-gray-200 rounded-lg">
                      <button className="px-3 py-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="px-4 py-2 text-gray-700 font-medium">2</span>
                      <button className="px-3 py-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">$199.99</p>
                      <p className="text-sm text-gray-500 line-through">$249.99</p>
                    </div>

                    <button className="text-gray-400 hover:text-red-500 transition-colors p-2">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>$699.97</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>$69.99</span>
                </div>
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>$769.96</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200 transform hover:scale-[1.02]">
                  Proceed to Checkout
                </button>
                <button className="w-full border-2 border-gray-300 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-200">
                  Continue Shopping
                </button>
              </div>

              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
}
