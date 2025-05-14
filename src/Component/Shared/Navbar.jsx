
import React, { useState } from 'react';
import logo from '../../assets/WhatsApp Image 2025-05-10 at 23.43.31_0f57f908.jpg';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return <>
    <div class="bg-black text-white text-center py-2 text-sm font-semibold">
  PURCHASE 2 ITEMS FOR 20% OFF
</div>
    <div className=" top-0 z-10 bg-white shadow">
      <header className="relative flex items-center justify-between px-4 py-3 max-w-screen-xl mx-auto">
        {/* Mobile Menu Button */}
        <div className="block md:hidden">
          <button
            className="focus:outline-none cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
                />
            </svg>
          </button>
        </div>

        {/* Logo (unchanged) */}
        <a href="home" className="flex-shrink-0">
          <img
            src={logo}
            alt="logo"
            className="h-25 w-full"
            />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li><a href="/product" className="text-gray-700 hover:text-gray-900">Product</a></li>
            <li><a href="/sale" className="text-gray-700 hover:text-gray-900">Sale</a></li>
            <li><a href="/about" className="text-gray-700 hover:text-gray-900">About</a></li>
            <li><a href="/category" className="text-gray-700 hover:text-gray-900">Category</a></li>
          </ul>
        </nav>
 
        {/* Icons */}
        <div className="flex items-center space-x-4">
          {/* Search Icon */}
          <button
            className="cursor-pointer focus:outline-none"
            onClick={() => setShowSearch(!showSearch)}
            >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-6a7 7 0 10-14 0 7 7 0 0014 0z" />
            </svg>
          </button>

          {/* Cart Icon */}
          <a href="/cart" className="relative inline-block focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </a>
        </div>
      </header>

      {/* Search Input */}
      {showSearch && (
        <div className="bg-white shadow px-4 py-2 flex justify-center">
          <input
            type="text"
            placeholder="Search..."
            className="w-full max-w-md border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
        </div>
      )}

      {/* Mobile Dropdown Menu (Centered) */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow px-4 py-3 flex flex-col items-center">
          <ul className="space-y-3 text-center">
            <li><a href="/product" className="block text-gray-700 hover:text-gray-900">Product</a></li>
            <li><a href="/sale" className="block text-gray-700 hover:text-gray-900">Sale</a></li>
            <li><a href="/about" className="block text-gray-700 hover:text-gray-900">About</a></li>
            <li><a href="/reviews" className="block text-gray-700 hover:text-gray-900">Reviews</a></li>
          </ul>
        </div>
      )}
    </div>
      </>
  
}

export default Navbar;
