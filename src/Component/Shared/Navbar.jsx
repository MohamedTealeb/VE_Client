import React from 'react'
import logo from '../../assets/WhatsApp Image 2025-05-06 at 08.13.39_0895e5d0.jpg'
import { useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
export default function Navbar() {
        const [menuOpen, setMenuOpen] = useState(false);
    const [cartCount, setCartCount] = useState(2);
    
  return <>
  
 




   <header className="sticky top-0 z-50 backdrop-blur bg-white/30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800"><img className='w-[100px]' src={logo} alt="" /></div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6">
          <div className="group relative">
            <button className="text-gray-700 hover:text-black">Men</button>
            <div className="absolute left-0 mt-2 w-40 bg-white rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">T-Shirts</a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">Shoes</a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">Watches</a>
            </div>
          </div>
          <div className="group relative">
            <button className="text-gray-700 hover:text-black">Women</button>
            <div className="absolute left-0 mt-2 w-40 bg-white rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">Dresses</a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">Heels</a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">Bags</a>
            </div>
          </div>
          <a href="#" className="text-gray-700 hover:text-black">Deals</a>
          <a href="#" className="text-gray-700 hover:text-black">Contact</a>
        </nav>

        {/* Cart and Menu Icons */}
        <div className="flex items-center space-x-4">
          {/* Cart Icon */}
          <div className="relative">
            <ShoppingCartIcon className="text-gray-700" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-gray-700">
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-2 shadow-md">
          <a href="#" className="block text-gray-700">Men</a>
          <a href="#" className="block text-gray-700">Women</a>
          <a href="#" className="block text-gray-700">Deals</a>
          <a href="#" className="block text-gray-700">Contact</a>
        </div>
      )}
    </header>
  

  </>
}
