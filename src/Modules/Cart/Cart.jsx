import React from 'react'
import Navbar from '../../Component/Shared/Navbar'

export default function Cart() {
  return<>
  
<Navbar />
<div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
  <div class="max-w-2xl w-full bg-white rounded-xl shadow-lg p-6">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">Shopping Cart (3)</h2>
    
    <div class="space-y-4">
 
      <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
        <img src="https://placehold.co/100x100" alt="Product" class="w-20 h-20 object-cover rounded-md"/>
        <div class="flex-1">
          <h3 class="font-semibold text-gray-900">Classic T-Shirt</h3>
          <p class="text-sm text-gray-500">Size: M, Color: Black</p>
        </div>
        <div class="flex items-center gap-3">
          <button class="text-gray-500 hover:text-gray-700">-</button>
          <span class="w-8 text-center">1</span>
          <button class="text-gray-500 hover:text-gray-700">+</button>
        </div>
        <p class="font-semibold text-gray-900 w-20 text-right">$49.99</p>
        <button class="text-gray-400 hover:text-red-500">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
        <img src="https://placehold.co/100x100" alt="Product" class="w-20 h-20 object-cover rounded-md"/>
        <div class="flex-1">
          <h3 class="font-semibold text-gray-900">Denim Jeans</h3>
          <p class="text-sm text-gray-500">Size: 32, Color: Blue</p>
        </div>
        <div class="flex items-center gap-3">
          <button class="text-gray-500 hover:text-gray-700">-</button>
          <span class="w-8 text-center">2</span>
          <button class="text-gray-500 hover:text-gray-700">+</button>
        </div>
        <p class="font-semibold text-gray-900 w-20 text-right">$89.99</p>
        <button class="text-gray-400 hover:text-red-500">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

    
      <div class="mt-6 pt-6 border-t">
        <div class="flex justify-between text-base text-gray-900 mb-2">
          <p>Subtotal</p>
          <p class="font-semibold">$229.97</p>
        </div>
        <div class="flex justify-between text-base text-gray-500 mb-4">
          <p>Shipping</p>
          <p>Free</p>
        </div>
        <div class="flex justify-between text-lg font-bold text-gray-900 mb-6">
          <p>Total</p>
          <p>$229.97</p>
        </div>
        
        <button class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition-colors">
          Checkout
        </button>
      </div>
    </div>
  </div>
</div>
  
  </>
}
