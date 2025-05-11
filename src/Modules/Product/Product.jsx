import React from 'react';
import Navbar from '../../Component/Shared/Navbar';

export default function Product() {
  return (
    <>
      <Navbar />
      <div className="pt-32 bg-white">
        <h1 className="text-center text-2xl font-bold text-gray-800">All Products</h1>
      </div>

     
      {/* Product Grid */}
      <section className="py-10 bg-gray-100">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </section>
    </>
  );
}

// Icons
function BookmarkIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function CompassIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}

// Product Card Component
function ProductCard({ title, location, price, image, rating }) {
  return (
    <article className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300">
      <a href="#">
        <div className="relative flex items-end overflow-hidden rounded-xl">
          <img src={image} alt={title} />
          {rating ? (
            <div className="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="ml-1 text-sm text-slate-400">{rating}</span>
            </div>
          ) : (
            <AddToCartButton />
          )}
        </div>

        <div className="mt-1 p-2">
          <h2 className="text-slate-700">{title}</h2>
          <p className="mt-1 text-sm text-slate-400">{location}</p>

          <div className="mt-3 flex items-end justify-between">
            <p className="text-lg font-bold text-blue-500">${price}</p>
            <AddToCartButton />
          </div>
        </div>
      </a>
    </article>
  );
}

// Add to Cart Button Component
function AddToCartButton() {
  return (
    <div className="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
      </svg>
      <button className="text-sm">Add to cart</button>
    </div>
  );
}

// Sample Data
const products = [
  {
    title: 'Adobe Photoshop CC 2022',
    location: 'Lisbon, Portugal',
    price: 850,
    image: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=1170&q=80'
  },
  {
    title: 'The Hilton Hotel',
    location: 'Lisbon, Portugal',
    price: 850,
    image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=1170&q=80',
    rating: '4.9'
  },
  {
    title: 'The Hilton Hotel',
    location: 'Lisbon, Portugal',
    price: 450,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1170&q=80'
  },
  {
    title: 'The Hilton Hotel',
    location: 'Lisbon, Portugal',
    price: 450,
    image: 'https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?auto=format&fit=crop&w=1170&q=80'
  },
  {
    title: 'Adobe Photoshop CC 2022',
    location: 'Lisbon, Portugal',
    price: 850,
    image: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=1170&q=80'
  },
  {
    title: 'The Hilton Hotel',
    location: 'Lisbon, Portugal',
    price: 850,
    image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=1170&q=80',
    rating: '4.9'
  },
  {
    title: 'The Hilton Hotel',
    location: 'Lisbon, Portugal',
    price: 450,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1170&q=80'
  },
  {
    title: 'The Hilton Hotel',
    location: 'Lisbon, Portugal',
    price: 450,
    image: 'https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?auto=format&fit=crop&w=1170&q=80'
  }
];
