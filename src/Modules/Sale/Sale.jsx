// import React, { useState } from "react";
// import banner from '../../assets/WhatsApp Image 2025-05-10 at 23.43.31_0f57f908.jpg'
// import Navbar from "../../Component/Shared/Navbar";
// import Footer from '../../Component/Shared/Footer';
// import './Sale.css';

// const allProducts = [
//   {
//     id: 1,
//     title: "CASUAL BLUE T-SHIRT",
//     image: banner,
//     price: 1022,
//     originalPrice: 2047,
//     status: "On Sale",
//   },
//   {
//     id: 2,
//     title: "BLACK HOODIE",
//     image: banner, 
//     price: 1022,
//     originalPrice: 2047,
//     status: "Sold out",
//   },
//   {
//     id: 3,
//     title: "WHITE SNEAKERS",
//     image: "https://example.com/images/white-sneakers.png", 
//     price: 1022,
//     originalPrice: 2047,
//     status: "On Sale",
//   },
//   {
//     id: 4,
//     title: "DENIM JACKET",
//     image: "https://example.com/images/denim-jacket.png", 
//     price: 1022,
//     originalPrice: 2047,
//     status: "On Sale",
//   },
//   {
//     id: 5,
//     title: "RED CAP",
//     image: "https://example.com/images/red-cap.png", 
//     price: 254,
//     originalPrice: null,
//     status: null,
//   },
//   {
//     id: 6,
//     title: "GREEN JOGGERS",
//     image: "https://example.com/images/green-joggers.png",
//     price: 1022,
//     originalPrice: 2047,
//     status: "On Sale",
//   },
//   {
//     id: 7,
//     title: "FLORAL DRESS",
//     image: "https://example.com/images/floral-dress.png", 
//     price: 1022,
//     originalPrice: 2047,
//     status: "On Sale",
//   },
//   {
//     id: 8,
//     title: "STRIPED SHIRT",
//     image: "https://example.com/images/striped-shirt.png",
//     price: 1022,
//     originalPrice: 1842,
//     status: "Sold out",
//   },
//   {
//     id: 7,
//     title: "FLORAL DRESS",
//     image: "https://example.com/images/floral-dress.png", 
//     price: 1022,
//     originalPrice: 2047,
//     status: "On Sale",
//   },
//   {
//     id: 8,
//     title: "STRIPED SHIRT",
//     image: "https://example.com/images/striped-shirt.png", 
//     price: 1022,
//     originalPrice: 1842,
//     status: "Sold out",
//   },
// ];

// export default function Sale() {
//     const itemsPerPage = 8;
//     const [currentPage, setCurrentPage] = useState(1);

//     const indexOfLast = currentPage * itemsPerPage;
//     const indexOfFirst = indexOfLast - itemsPerPage;
//     const currentProducts = allProducts.slice(indexOfFirst, indexOfLast);
//     const totalPages = Math.ceil(allProducts.length / itemsPerPage);
    
//     return (
//         <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
//             <Navbar />
            
//             {/* Hero Section with Enhanced Animation */}
//             <div className="relative bg-black py-20 overflow-hidden">
//                 {/* Animated background elements */}
//                 <div className="absolute inset-0">
//                     {/* Animated gradient background */}
//                     <div className="absolute inset-0 bg-gradient-to-r from-red-900 via-yellow-900 to-red-900 animate-gradient"></div>
                    
//                     {/* Animated particles */}
//                     <div className="absolute inset-0">
//                         {[...Array(20)].map((_, i) => (
//                             <div
//                                 key={i}
//                                 className="absolute w-2 h-2 bg-red-400 rounded-full animate-particle"
//                                 style={{
//                                     left: `${Math.random() * 100}%`,
//                                     top: `${Math.random() * 100}%`,
//                                     animationDelay: `${Math.random() * 5}s`,
//                                     opacity: Math.random() * 0.5 + 0.2
//                                 }}
//                             />
//                         ))}
//                     </div>

//                     {/* Enhanced blob animations */}
//                     <div className="absolute inset-0 opacity-20">
//                         <div className="absolute top-0 -left-4 w-72 h-72 bg-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
//                         <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
//                         <div className="absolute -bottom-8 left-20 w-72 h-72 bg-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
//                     </div>

//                     {/* Animated lines */}
//                     <div className="absolute inset-0">
//                         {[...Array(5)].map((_, i) => (
//                             <div
//                                 key={i}
//                                 className="absolute h-px bg-gradient-to-r from-transparent via-red-400/30 to-transparent animate-line"
//                                 style={{
//                                     top: `${20 + i * 15}%`,
//                                     width: '100%',
//                                     animationDelay: `${i * 0.5}s`
//                                 }}
//                             />
//                         ))}
//                     </div>
//                 </div>

//                 <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <div className="text-center">
//                         <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl animate-fade-in">
//                             <span className="block animate-slide-up" style={{ animationDelay: '0.2s' }}>Special Offers</span>
//                             <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-yellow-500 to-red-500 animate-gradient-x animate-pulse-slow">Up to 70% Off</span>
//                         </h1>
//                         <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl animate-slide-up" style={{ animationDelay: '0.4s' }}>
//                             Limited time deals on our most popular products
//                         </p>
//                     </div>
//                 </div>
//             </div>

//             {/* Stats Section */}
//             <div className="bg-white py-12">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
//                         {[
//                             { label: 'Active Deals', value: '50+' },
//                             { label: 'Happy Customers', value: '98%' },
//                             { label: 'Time Left', value: '24h' },
//                             { label: 'Support', value: '24/7' }
//                         ].map((stat, index) => (
//                             <div key={index} className="bg-gradient-to-br from-red-50 to-yellow-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
//                                 <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
//                                 <p className="mt-2 text-sm text-gray-600">{stat.label}</p>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>

//             {/* Filters Section */}
//             <div className="bg-white border-b border-gray-200">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//                     <div className="flex flex-wrap items-center justify-between gap-4">
//                         <div className="flex items-center space-x-4">
//                             <select className="rounded-lg border-gray-300 py-2 pl-3 pr-10 text-base focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white shadow-sm">
//                                 <option>All Categories</option>
//                                 <option>Electronics</option>
//                                 <option>Clothing</option>
//                                 <option>Accessories</option>
//                             </select>
//                             <select className="rounded-lg border-gray-300 py-2 pl-3 pr-10 text-base focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white shadow-sm">
//                                 <option>Discount Range</option>
//                                 <option>10% - 30%</option>
//                                 <option>30% - 50%</option>
//                                 <option>50%+</option>
//                             </select>
//                         </div>
//                         <div className="flex items-center space-x-4">
//                             <span className="text-gray-500">Sort by:</span>
//                             <select className="rounded-lg border-gray-300 py-2 pl-3 pr-10 text-base focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white shadow-sm">
//                                 <option>Highest Discount</option>
//                                 <option>Price: Low to High</option>
//                                 <option>Price: High to Low</option>
//                                 <option>Newest</option>
//                     </select>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Sale Products Grid */}
//             <section className="py-12 bg-gradient-to-b from-white to-gray-50">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
//                         {currentProducts.map((product, index) => (
//                             <SaleProductCard key={index} {...product} />
//                         ))}
//                             </div>
//                         </div>
//             </section>

//             <Footer />
//                             </div>
//     );
// }

// // Sale Product Card Component
// function SaleProductCard({ title, image, price, originalPrice, status }) {
//     return (
//         <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300">
//             <div className="relative aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-xl bg-gray-200">
//                 {/* Image Container with Hover Effects */}
//                 <div className="relative h-64 w-full overflow-hidden">
//                     <img
//                         src={image}
//                         alt={title}
//                         className="h-full w-full object-cover object-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-2"
//                     />
//                     {/* Discount Badge */}
//                     {status === "On Sale" && (
//                         <div className="absolute top-4 left-4 bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold">
//                             On Sale
//                         </div>
//                     )}
//                     {/* Overlay with gradient */}
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
//                     {/* Quick View Button */}
//                     <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                         <button className="transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-300 bg-white/90 hover:bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-medium shadow-lg">
//                             Quick View
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             <div className="p-4">
//                 <div className="flex justify-between items-start">
//                     <div>
//                         <h3 className="text-lg font-medium text-gray-900 group-hover:text-red-600 transition-colors duration-300">
//                             {title}
//                         </h3>
//                     </div>
//                 </div>

//                 <div className="mt-4 flex items-center justify-between">
//                     <div>
//                         <p className="text-lg font-bold text-red-600">${price.toLocaleString()}</p>
//                         {originalPrice && (
//                             <p className="text-sm text-gray-500 line-through">${originalPrice.toLocaleString()}</p>
//                         )}
//                     </div>
//                     <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300 transform hover:scale-105">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//                         </svg>
//                         Add to Cart
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }