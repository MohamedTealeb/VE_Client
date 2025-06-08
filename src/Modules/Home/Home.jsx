import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import img1 from '../../assets/WhatsApp Image 2025-05-06 at 08.13.39_0895e5d0.jpg';
import img2 from '../../assets/WhatsApp Image 2025-05-10 at 23.43.31_0f57f908.jpg';
import Navbar from './../../Component/Shared/Navbar';
import '../Home/Home.css'
import Footer from '../../Component/Shared/Footer';
import axios from 'axios';

export default function Home() {
  const [latestProducts, setLatestProducts] = useState([]);
  const navigate = useNavigate();
  const items = [
    { id: 1, name: 'POPPY BIRDS HAT', price: 'LE 1,949.00', image: img2 },
    { id: 2, name: 'GATOR LOUNGE', price: 'LE 2,052.00', image: img2 },
    { id: 3, name: 'RIDE SHARKS HAT', price: 'LE 1,949.00', image:img2},
    { id: 4, name: 'DIGGING GRAVES', price: 'LE 2,052.00', image: img2 },
    { id: 5, name: 'GATOR BELLY HAT', price: 'LE 1,949.00', image: img2 },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedItems = items.slice(startIndex, startIndex + itemsPerPage);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASEURL}/products?limit=5`);
        console.log('Latest products API response:', response.data);
        // Handle different possible response structures
        if (Array.isArray(response.data)) {
          setLatestProducts(response.data);
        } else if (Array.isArray(response.data.data)) {
          setLatestProducts(response.data.data);
        } else if (Array.isArray(response.data.products)) {
          setLatestProducts(response.data.products);
        } else {
          setLatestProducts([]); // fallback
        }
      } catch (error) {
        console.error('Error fetching latest products:', error);
      }
    };
    fetchLatestProducts();
  }, []);

  const handleProductClick = (productId) => {
    setSearchQuery('');
    setSearchResults([]);
    setShowSearch(false);
    navigate(`/product_det?id=${productId}`);
  };

  return <>
<Navbar />
    <div className="relative w-full h-[600px] overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        effect="fade"
        fadeEffect={{
          crossFade: true
        }}
        autoplay={{ 
          delay: 3000,
          disableOnInteraction: false 
        }}
        pagination={{
          clickable: true,
          el: ".custom-pagination"
        }}
        className="w-full h-full"
      >
        <SwiperSlide key="slide-1">
          <div className="relative w-full h-full">
            <img src={img1} alt="Slide" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex flex-col justify-center items-start px-[10%] text-white">
              <h2 className="text-5xl font-bold mb-4 transform translate-y-5 opacity-0 animate-[slideUp_0.5s_forwards]">New Collection</h2>
              <p className="text-2xl mb-8 transform translate-y-5 opacity-0 animate-[slideUp_0.5s_0.2s_forwards]">Discover our latest arrivals</p>
              <button className="bg-white text-black px-8 py-4 text-lg font-bold rounded hover:bg-black hover:text-white transition-all duration-300 transform translate-y-5 opacity-0 animate-[slideUp_0.5s_0.4s_forwards] hover:scale-105">
                Shop Now
              </button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide key="slide-2">
          <div className="relative w-full h-full">
            <img src={img1} alt="Slide" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex flex-col justify-center items-start px-[10%] text-white">
              <h2 className="text-5xl font-bold mb-4 transform translate-y-5 opacity-0 animate-[slideUp_0.5s_forwards]">Summer Essentials</h2>
              <p className="text-2xl mb-8 transform translate-y-5 opacity-0 animate-[slideUp_0.5s_0.2s_forwards]">Get ready for the season</p>
              <button className="bg-white text-black px-8 py-4 text-lg font-bold rounded hover:bg-black hover:text-white transition-all duration-300 transform translate-y-5 opacity-0 animate-[slideUp_0.5s_0.4s_forwards] hover:scale-105">
                Explore
              </button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide key="slide-3">
          <div className="relative w-full h-full">
            <img src={img2} alt="Slide" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex flex-col justify-center items-start px-[10%] text-white">
              <h2 className="text-5xl font-bold mb-4 transform translate-y-5 opacity-0 animate-[slideUp_0.5s_forwards]">Special Offers</h2>
              <p className="text-2xl mb-8 transform translate-y-5 opacity-0 animate-[slideUp_0.5s_0.2s_forwards]">Limited time deals</p>
              <button className="bg-white text-black px-8 py-4 text-lg font-bold rounded hover:bg-black hover:text-white transition-all duration-300 transform translate-y-5 opacity-0 animate-[slideUp_0.5s_0.4s_forwards] hover:scale-105">
                View Deals
              </button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <div className="custom-pagination absolute bottom-8 left-1/2 -translate-x-1/2 z-10"></div>
    </div>
 <div className="mt-16 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto">
  <div className="flex justify-between items-center mb-8">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Latest Drops</h2>
    <button 
      onClick={() => navigate('/product')}
      className="text-sm font-medium text-gray-600 hover:text-black transition-colors duration-300"
    >
      View All →
    </button>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
    {latestProducts && latestProducts.map((product, index) => (
      <div key={product?._id || `product-${index}`} className="group">
        <div className="relative overflow-hidden rounded-lg bg-gray-100">
          <img
            src={`${import.meta.env.VITE_IMAGEURL}${product.cover_Image}`}
            alt={product.title}
            className="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-500 cursor-pointer"
            onClick={() => handleProductClick(product._id)}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          <button className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-black px-6 py-2 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            Quick View
          </button>
        </div>
        <div className="mt-4 space-y-1">
          <h3 className="text-lg font-medium text-gray-900 group-hover:text-black transition-colors duration-300">{product.title}</h3>
          <p className="text-base font-semibold text-gray-700">${product.price}</p>
        </div>
      </div>
    ))}
  </div>

  <div className="flex justify-center items-center gap-4 mt-12">
    <button
      onClick={handlePrevPage}
      disabled={currentPage === 1}
      className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors duration-300"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    </button>
    <div className="flex items-center gap-2">
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={`page-${index + 1}`}
          onClick={() => setCurrentPage(index + 1)}
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-300 ${
            currentPage === index + 1
              ? 'bg-black text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {index + 1}
        </button>
      ))}
    </div>
    <button
      onClick={handleNextPage}
      disabled={currentPage === totalPages}
      className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors duration-300"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
      </svg>
    </button>
  </div>
</div>

  <Footer />
      </>

}