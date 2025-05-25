import React, { useState } from 'react';
import logo from '../../assets/WhatsApp Image 2025-05-10 at 23.43.31_0f57f908.jpg';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext'; // Import your auth context

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth(); // Get the user from your auth context

  return <>
    <div className="bg-black text-white text-center py-2 text-sm font-semibold">
      PURCHASE 2 ITEMS FOR 20% OFF
    </div>
    <div className="top-0 z-10 bg-white shadow">
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

        {/* Logo */}
        <a href="/home" className="flex-shrink-0">
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

          {/* Login Button or Profile Icon */}
          {user ? (
            <a href="/profile" className="relative inline-block focus:outline-none group">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 group-hover:text-gray-900 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                My Profile
              </span>
            </a>
          ) : (
            <button 
              onClick={() => navigate('/login')}
              className="text-sm font-medium text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              Login
            </button>
          )}
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

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow px-4 py-3 flex flex-col items-center">
          <ul className="space-y-3 text-center">
            <li><a href="/product" className="block text-gray-700 hover:text-gray-900">Product</a></li>
            <li><a href="/sale" className="block text-gray-700 hover:text-gray-900">Sale</a></li>
            <li><a href="/about" className="block text-gray-700 hover:text-gray-900">About</a></li>
            <li><a href="/reviews" className="block text-gray-700 hover:text-gray-900">Reviews</a></li>
            {user ? (
              <li><a href="/profile" className="block text-gray-700 hover:text-gray-900">My Profile</a></li>
            ) : (
              <li><a href="/login" className="block text-gray-700 hover:text-gray-900">Login</a></li>
            )}
          </ul>
        </div>
      )}
    </div>
  </>
}

export default Navbar;
