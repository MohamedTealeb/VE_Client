import React, { useEffect, useState } from 'react';
import logo from '../../assets/WhatsApp Image 2025-05-10 at 23.43.31_0f57f908.jpg';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { getAllProducts } from '../../Apis/Product_Api/Product';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
    // Listen for login/logout events from other tabs
    const onStorage = () => setIsLoggedIn(!!localStorage.getItem('token'));
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  useEffect(() => {
    if (showSearch && allProducts.length === 0) {
      loadProducts();
    }
  }, [showSearch]);

  const loadProducts = async () => {
    try {
      const products = await getAllProducts();
      setAllProducts(products);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setProfileMenu(false);
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    setIsSearching(true);
    try {
      // Get all products
      const apiResults = await getAllProducts();
      let results = Array.isArray(apiResults) ? apiResults : apiResults.data || [];
      if (!query || query.length < 1) {
        setSearchResults(results);
        setIsSearching(false);
        return;
      }
      // Filter by name or description
      const filtered = results.filter(
        (product) =>
          (product.name && product.name.toLowerCase().includes(query.toLowerCase())) ||
          (product.discreption && product.discreption.toLowerCase().includes(query.toLowerCase()))
      );
      setSearchResults(filtered);
    } catch (error) {
      console.error('Error searching products:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchButtonClick = () => {
    setShowSearch(!showSearch);
    if (!showSearch) {
      loadProducts();
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product_det?id=${productId}`);
  };

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
            className="h-25 w-[100px]"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li><a href="/product" className="text-gray-700 hover:text-gray-900">Product</a></li>
            {/* <li><a href="/sale" className="text-gray-700 hover:text-gray-900">Sale</a></li> */}
            <li><a href="/about" className="text-gray-700 hover:text-gray-900">About</a></li>
            <li><a href="/category" className="text-gray-700 hover:text-gray-900">Category</a></li>
          </ul>
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          {/* Search Icon */}
          <button
            className="cursor-pointer focus:outline-none"
            onClick={handleSearchButtonClick}
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

          {/* Login Button or Profile Icon - Hidden on mobile */}
          <div className="hidden md:block">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  className="relative inline-block focus:outline-none group cursor-pointer"
                  onClick={() => setProfileMenu((prev) => !prev)}
                  onBlur={() => setTimeout(() => setProfileMenu(false), 150)}
                >
                  {/* Profile SVG */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 group-hover:text-gray-900 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    My Profile
                  </span>
                </button>
                {/* Dropdown menu */}
                {profileMenu && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-20">
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                      onClick={() => setProfileMenu(false)}
                    >
                      Profile
                    </a>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={() => navigate('/login')}
                className="text-sm font-medium text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Search Input */}
      {showSearch && (
        <div className="bg-white shadow px-4 py-2 flex justify-center relative">
          <div className="w-full max-w-md relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
            {isSearching && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
              </div>
            )}
            {searchQuery.length > 0 && (
              <div className="absolute left-0 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                {searchResults.length > 0 ? (
                  searchResults.map((product) => {
                    // Determine image src
                    let imgSrc = product.cover_Image;
                    if (!imgSrc && Array.isArray(product.images) && product.images.length > 0) {
                      const firstImg = product.images[0];
                      if (typeof firstImg === 'object' && firstImg !== null && firstImg.url) {
                        imgSrc = firstImg.url;
                      } else if (typeof firstImg === 'string') {
                        imgSrc = firstImg;
                      }
                    }
                    // Ensure full URL if needed
                    if (imgSrc && !imgSrc.startsWith('http')) {
                      imgSrc = `${import.meta.env.VITE_IMAGEURL}${imgSrc}`;
                    }
                    return (
                      <div
                        key={product._id || product.id}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                        onClick={() => handleProductClick(product._id || product.id)}
                      >
                        {imgSrc && (
                          <img
                            src={imgSrc}
                            alt={product.name}
                            className="w-10 h-10 object-cover rounded mr-3"
                          />
                        )}
                        <div>
                          <div className="font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">${product.price}</div>
                          {product.discreption && (
                            <div className="text-xs text-gray-400 mt-1 line-clamp-2">
                              {product.discreption}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="px-4 py-3 text-center text-gray-500">
                    No products found matching "{searchQuery}"
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow px-4 py-3 flex flex-col items-center">
          <ul className="space-y-3 text-center">
            <li><a href="/product" className="block text-gray-700 hover:text-gray-900">Product</a></li>
            <li><a href="/about" className="block text-gray-700 hover:text-gray-900">About</a></li>
            <li><a href="/category" className="block text-gray-700 hover:text-gray-900">Category</a></li>
            {isLoggedIn ? (
              <>
                <li><a href="/profile" className="block text-gray-700 hover:text-gray-900">My Profile</a></li>
                <li>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-gray-700 hover:text-gray-900 cursor-pointer"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <button 
                  onClick={() => {
                    navigate('/login');
                    setMenuOpen(false);
                  }}
                  className="block w-full text-gray-700 hover:text-gray-900 cursor-pointer"
                >
                  Login
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  </>
}

export default Navbar;
