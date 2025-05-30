import React from 'react'
import logo from '../../assets/WhatsApp Image 2025-05-06 at 08.13.39_0895e5d0.jpg'
import Navbar from '../../Component/Shared/Navbar'
import Footer from '../../Component/Shared/Footer'
import './About.css'

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative bg-black py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-pink-900 to-red-900 opacity-90"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              About RYO
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Where Style Meets Comfort
            </p>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-purple-600 font-semibold tracking-wide uppercase">Our Story</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Fashion for Everyone
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              RYO was born from a passion for quality clothing and a desire to make fashion accessible to everyone. We believe that great style shouldn't come with a hefty price tag.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Mission */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To provide high-quality, stylish clothing that makes our customers feel confident and comfortable, while maintaining affordable prices and sustainable practices.
              </p>
            </div>
            
            {/* Values */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 text-purple-600">✓</span>
                  <span className="ml-3">Quality Materials</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 text-purple-600">✓</span>
                  <span className="ml-3">Affordable Fashion</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 text-purple-600">✓</span>
                  <span className="ml-3">Customer Satisfaction</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 text-purple-600">✓</span>
                  <span className="ml-3">Sustainable Practices</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              RYO Collections
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Discover our wide range of clothing options
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Category 1 */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="aspect-w-3 aspect-h-2">
                <img
                  className="object-cover"
                  src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="T-shirts"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">T-Shirts</h3>
                <p className="text-sm text-gray-500">Premium Quality</p>
                <p className="mt-2 text-sm text-gray-600">
                  From basic essentials to trendy designs, our t-shirts are made with the finest materials.
                </p>
              </div>
            </div>

            {/* Category 2 */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="aspect-w-3 aspect-h-2">
                <img
                  className="object-cover"
                  src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Hoodies"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">Hoodies</h3>
                <p className="text-sm text-gray-500">Comfort & Style</p>
                <p className="mt-2 text-sm text-gray-600">
                  Cozy and stylish hoodies perfect for any season.
                </p>
              </div>
            </div>

            {/* Category 3 */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="aspect-w-3 aspect-h-2">
                <img
                  className="object-cover"
                  src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Accessories"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">Accessories</h3>
                <p className="text-sm text-gray-500">Complete Your Look</p>
                <p className="mt-2 text-sm text-gray-600">
                  Hats, bags, and more to complement your style.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Designs Available', value: '100+' },
              { label: 'Happy Customers', value: '5000+' },
              { label: 'Quality Materials', value: 'Premium' },
              { label: 'Fast Shipping', value: '24/7' }
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-sm">
                <p className="text-3xl font-bold text-purple-600">{stat.value}</p>
                <p className="mt-2 text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
