
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import img1 from '../../assets/WhatsApp Image 2025-05-06 at 08.13.39_0895e5d0.jpg';
import img2 from '../../assets/WhatsApp Image 2025-05-10 at 23.43.31_0f57f908.jpg';
import Navbar from './../../Component/Shared/Navbar';
import '../Home/Home.css'
import Footer from '../../Component/Shared/Footer';
export default function Home() {
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
  return <>
<Navbar />
  <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 2500 }}
        pagination={{
          clickable: true,
          el: ".custom-pagination"
        }}
      >
      <SwiperSlide>
        <img src={img1} alt="Slide" style={{ width: '100%', height: '600px', objectFit: 'cover' }} />
      </SwiperSlide>
      <SwiperSlide>
        <img src={img1} alt="Slide" style={{ width: '100%', height: '600px', objectFit: 'cover' }} />
      </SwiperSlide>
      <SwiperSlide>
        <img src={img1} alt="Slide" style={{ width: '100%', height: '600px', objectFit: 'cover' }} />
      </SwiperSlide>
    </Swiper>
    <div className="custom-pagination flex justify-center mt-4"></div>
 <div className="mt-8 px-4 sm:px-6 md:px-10">
  <span className="text-black font-bold text-2xl block mb-4">LASTEST DROPS</span>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
    {displayedItems.map((item) => (
      <div key={item.id} className="text-center">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-auto object-cover rounded"
        />
        <h3 className="text-lg mt-2.5 mb-1.25">{item.name}</h3>
        <p className="text-base text-gray-700">{item.price}</p>
      </div>
    ))}
  </div>

  <div className="flex justify-center items-center gap-2.5 mt-5">
    <button
      onClick={handlePrevPage}
      disabled={currentPage === 1}
      className="text-xl disabled:opacity-50 disabled:cursor-not-allowed"
    >
      &lt;
    </button>
    <span className="text-base">{currentPage}/{totalPages}</span>
    <button
      onClick={handleNextPage}
      disabled={currentPage === totalPages}
      className="text-xl disabled:opacity-50 disabled:cursor-not-allowed"
    >
      &gt;
    </button>
  </div>

  <div className="flex justify-center mt-4 mb-6">
    <button className="bg-black text-white px-5 py-2.5 text-base cursor-pointer">
      VIEW ALL
    </button>
  </div>
</div>

  <Footer />
      </>

}