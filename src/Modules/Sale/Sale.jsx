import React, { useState } from "react";
 import banner from '../../assets/WhatsApp Image 2025-05-10 at 23.43.31_0f57f908.jpg'
import Navbar from "../../Component/Shared/Navbar";

const allProducts = [
  {
    id: 1,
    title: "CASUAL BLUE T-SHIRT",
    image: banner,
    price: 1022,
    originalPrice: 2047,
    status: "On Sale",
  },
  {
    id: 2,
    title: "BLACK HOODIE",
    image: banner, 
    price: 1022,
    originalPrice: 2047,
    status: "Sold out",
  },
  {
    id: 3,
    title: "WHITE SNEAKERS",
    image: "https://example.com/images/white-sneakers.png", 
    price: 1022,
    originalPrice: 2047,
    status: "On Sale",
  },
  {
    id: 4,
    title: "DENIM JACKET",
    image: "https://example.com/images/denim-jacket.png", 
    price: 1022,
    originalPrice: 2047,
    status: "On Sale",
  },
  {
    id: 5,
    title: "RED CAP",
    image: "https://example.com/images/red-cap.png", 
    price: 254,
    originalPrice: null,
    status: null,
  },
  {
    id: 6,
    title: "GREEN JOGGERS",
    image: "https://example.com/images/green-joggers.png",
    price: 1022,
    originalPrice: 2047,
    status: "On Sale",
  },
  {
    id: 7,
    title: "FLORAL DRESS",
    image: "https://example.com/images/floral-dress.png", 
    price: 1022,
    originalPrice: 2047,
    status: "On Sale",
  },
  {
    id: 8,
    title: "STRIPED SHIRT",
    image: "https://example.com/images/striped-shirt.png",
    price: 1022,
    originalPrice: 1842,
    status: "Sold out",
  },
  {
    id: 7,
    title: "FLORAL DRESS",
    image: "https://example.com/images/floral-dress.png", 
    price: 1022,
    originalPrice: 2047,
    status: "On Sale",
  },
  {
    id: 8,
    title: "STRIPED SHIRT",
    image: "https://example.com/images/striped-shirt.png", 
    price: 1022,
    originalPrice: 1842,
    status: "Sold out",
  },
];

export default function SalePage() {
    const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProducts = allProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(allProducts.length / itemsPerPage);
  return <>
   
<Navbar />
   <div className="relative">
        <img
          src={banner}
          alt="Chomp Sale"
          className="w-full h-64 object-cover"
        />
        <h1 className="absolute inset-0 flex items-center justify-center text-white text-5xl font-bold">
          SALE
        </h1>
      </div>
{/* Filters and Sort */}
      <div className="max-w-screen-lg mx-auto flex flex-wrap justify-between items-center px-4 py-4 border-b">
        <div className="flex gap-4">
          <div className="font-bold">FILTER:</div>
          <select className="font-bold uppercase text-sm">
            <option>Availability</option>
          </select>
          <select className="font-bold uppercase text-sm">
            <option>Size</option>
          </select>
          <select className="font-bold uppercase text-sm">
            <option>Category</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="uppercase font-bold text-sm">Sort By:</span>
          <select className="font-bold text-sm">
            <option>Featured</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-screen-lg mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-white">
        {currentProducts.map((product) => (
          <div key={product.id} className="bg-pink-200 p-4 relative">
            {product.status === "Sold out" && (
              <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
                Sold out
              </span>
            )}
            {product.status === "On Sale" && (
              <span className="absolute top-2 left-2 bg-pink-500 text-white text-xs px-2 py-1 rounded">
                On Sale
              </span>
            )}
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-60 object-contain"
            />
            <h2 className="font-bold text-white text-lg mt-2 leading-tight">
              {product.title}
            </h2>
            {product.originalPrice && (
              <p className="text-white line-through text-sm">
                LE {product.originalPrice.toLocaleString()}
              </p>
            )}
            <p className="text-white font-bold">
              LE {product.price.toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 py-6">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === i + 1
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

   
      </>
  
}