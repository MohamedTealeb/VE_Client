import React from 'react'
import logo from '../../assets/WhatsApp Image 2025-05-06 at 08.13.39_0895e5d0.jpg'
import Navbar from '../../Component/Shared/Navbar'
import Footer from '../../Component/Shared/Footer'

export default function About() {
  return (
    <div className="min-h-screen bg-custom-background">
      <Navbar />
      
      {/* Hero Section Modern */}
      <div className="relative min-h-[340px] flex items-center justify-center overflow-hidden">
        <img src={logo} alt="RYO Logo" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-purple-900/60 to-pink-900/60" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center w-full">
          <div className="flex flex-col items-center gap-4">
            <div className="w-24 h-24 rounded-full bg-white/80 flex items-center justify-center shadow-lg border-4 border-white mb-2">
              <img src={logo} alt="RYO Logo" className="w-20 h-20 rounded-full object-cover" />
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg animate-fade-in">
              About <span className="font-black tracking-widest">RYO</span>
            </h1>
            <p className="mt-2 text-lg md:text-2xl text-white/90 font-medium animate-fade-in delay-200">
              Where Style Meets Comfort
            </p>
          </div>
        </div>
      </div>

      {/* Our Story Section Modern */}
      <section className="py-16 flex justify-center bg-custom-solid">
        <div className="max-w-4xl w-full flex flex-col md:flex-row items-center gap-10 bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-8">
          <img src={logo} alt="Our Story" className="w-40 h-40 object-cover rounded-2xl shadow-md hidden md:block" />
          <div>
            <h2 className="text-base text-purple-600 font-semibold tracking-wide uppercase mb-2">Our Story</h2>
            <p className="text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl mb-2">
              Fashion for Everyone
            </p>
            <p className="text-lg text-gray-600">
              RYO was born from a passion for quality clothing and a desire to make fashion accessible to everyone. We believe that great style shouldn't come with a hefty price tag.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Values Modern */}
      <section className="py-16 bg-custom-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mission */}
            <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-8 flex flex-col items-center text-center">
              <svg className="w-10 h-10 text-purple-500 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" /></svg>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Our Mission</h3>
              <p className="text-gray-600 text-base">
                To provide high-quality, stylish clothing that makes our customers feel confident and comfortable, while maintaining affordable prices and sustainable practices.
              </p>
            </div>
            {/* Values Modern */}
            {[
              { icon: <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>, label: 'Quality Materials' },
              { icon: <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M8 12l2 2 4-4" /></svg>, label: 'Affordable Fashion' },
              { icon: <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" /><circle cx="12" cy="12" r="10" /></svg>, label: 'Customer Satisfaction' },
              { icon: <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H3" /></svg>, label: 'Sustainable Practices' },
            ].map((val, idx) => (
              <div key={idx} className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
                {val.icon}
                <h4 className="text-lg font-semibold text-gray-900 mt-2">{val.label}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Collections Modern */}
      <section className="py-16 bg-custom-solid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              RYO Collections
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Discover our wide range of clothing options
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-1">
            {/* Category 1 */}
            <div className="group relative flex justify-center items-center rounded-2xl overflow-hidden shadow-xl bg-white/80 backdrop-blur transition-transform duration-300 hover:scale-105 w-full max-w-xs mx-auto">
              <div className="relative w-64 h-64 rounded-2xl overflow-hidden">
                <img
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                  src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="T-shirts"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-lg font-bold text-white group-hover:text-yellow-300 transition-colors">T-Shirts</h3>
                  <p className="text-sm text-gray-200">Premium Quality</p>
                </div>
              </div>
            </div>
            {/* Category 2 */}
            
            {/* Category 3 */}
          </div>
        </div>
      </section>

      {/* Stats Modern */}
      <section className="py-16 bg-custom-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Designs Available', value: '100+', icon: <svg className='w-8 h-8 text-purple-500' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' d='M20 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z' /></svg> },
              { label: 'Happy Customers', value: '5000+', icon: <svg className='w-8 h-8 text-purple-500' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'><circle cx='12' cy='12' r='10' /><path strokeLinecap='round' strokeLinejoin='round' d='M8 14s1.5 2 4 2 4-2 4-2' /><path strokeLinecap='round' strokeLinejoin='round' d='M9 9h.01M15 9h.01' /></svg> },
              { label: 'Quality Materials', value: 'Premium', icon: <svg className='w-8 h-8 text-purple-500' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' d='M12 8v4m0 4h.01' /><circle cx='12' cy='12' r='10' /></svg> },
              { label: 'Fast Shipping', value: '24/7', icon: <svg className='w-8 h-8 text-purple-500' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' d='M3 10h1l2 9a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l2-9h1' /><path strokeLinecap='round' strokeLinejoin='round' d='M16 6a4 4 0 0 0-8 0' /></svg> },
            ].map((stat, index) => (
              <div key={index} className="bg-white/80 backdrop-blur rounded-2xl p-8 text-center shadow-lg flex flex-col items-center gap-2">
                <div>{stat.icon}</div>
                <p className="text-4xl font-extrabold text-purple-600">{stat.value}</p>
                <p className="mt-2 text-base text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
