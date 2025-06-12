import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import img1 from '../../assets/WhatsApp Image 2025-06-09 at 02.45.36_fdc7fbc2.jpg';
import img2 from '../../assets/WhatsApp Image 2025-06-09 at 02.45.36_c0691460.jpg';
import img3 from '../../assets/WhatsApp Image 2025-06-09 at 02.45.36_3b55d0e2.jpg';
import img4 from '../../assets/WhatsApp Image 2025-06-09 at 02.45.35_2aaa3c3a.jpg';
import img5 from '../../assets/WhatsApp Image 2025-06-09 at 02.45.35_2aaa3c3a.jpg';

import Navbar from './../../Component/Shared/Navbar';
import '../Home/Home.css'
import Footer from '../../Component/Shared/Footer';

export default function Home() {
  const navigate = useNavigate();

  const sliderImages = [
    {
      id: 1,
      image: img1,
      title: "New Collection",
      description: "Discover our latest arrivals",
      buttonText: "Shop Now"
    },
    {
      id: 2,
      image: img2,
      title: "Summer Essentials",
      description: "Get ready for the season",
      buttonText: "Explore"
    },
    {
      id: 3,
      image: img3,
      title: "Special Offers",
      description: "Limited time deals",
      buttonText: "View Deals"
    },
    {
      id: 4,
      image: img4,
      title: "Special Offers",
      description: "Limited time deals",
      buttonText: "View Deals"
    }
  ];

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
        {sliderImages.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex flex-col justify-center items-start px-[10%] text-white">
                <h2 className="text-5xl font-bold mb-4 transform translate-y-5 opacity-0 animate-[slideUp_0.5s_forwards]">
                  {slide.title}
                </h2>
                <p className="text-2xl mb-8 transform translate-y-5 opacity-0 animate-[slideUp_0.5s_0.2s_forwards]">
                  {slide.description}
                </p>
                <button 
                  onClick={() => navigate('/product')}
                  className="bg-white text-black px-8 py-4 text-lg font-bold rounded hover:bg-black hover:text-white transition-all duration-300 transform translate-y-5 opacity-0 animate-[slideUp_0.5s_0.4s_forwards] hover:scale-105"
                >
                  {slide.buttonText}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="custom-pagination absolute bottom-8 left-1/2 -translate-x-1/2 z-10"></div>
    </div>

    <div className="mt-16 relative">
      {/* Decorative elements */}
      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full opacity-20 blur-2xl"></div>
      <div className="absolute -bottom-10 right-1/4 w-32 h-32 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-20 blur-2xl"></div>
      
      {/* Main heading with creative styling */}
      <div className="relative z-10">
        <h2
          className="text-4xl md:text-5xl font-bold text-center mb-6 text-gray-900 relative"
        >
          <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
            New and distinctive
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
            collection
          </span>
        </h2>
      </div>

    </div>

    <Footer />
  </>
}