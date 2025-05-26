import React from 'react'
import logo from '../../assets/WhatsApp Image 2025-05-06 at 08.13.39_0895e5d0.jpg'
import Navbar from '../../Component/Shared/Navbar'
import Footer from '../../Component/Shared/Footer'
import './About.css'

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      <Navbar />
      
      {/* Hero Section with Enhanced Animation */}
      <div className="relative bg-black py-20 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 animate-gradient"></div>
          
          {/* Animated particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-blue-400 rounded-full animate-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  opacity: Math.random() * 0.5 + 0.2
                }}
              />
            ))}
          </div>

          {/* Enhanced blob animations */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          </div>

          {/* Animated lines */}
          <div className="absolute inset-0">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent animate-line"
                style={{
                  top: `${20 + i * 15}%`,
                  width: '100%',
                  animationDelay: `${i * 0.5}s`
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl animate-fade-in">
              <span className="block animate-slide-up" style={{ animationDelay: '0.2s' }}>Our Story</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-blue-500 animate-gradient-x animate-pulse-slow">Innovation & Excellence</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl animate-slide-up" style={{ animationDelay: '0.4s' }}>
              Crafting digital experiences that inspire and transform
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Text Section */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-900 animate-fade-in">Who We Are</h2>
                <p className="text-lg text-gray-600 leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
                  We are a passionate team of designers and developers dedicated to creating outstanding digital experiences.
                  Our mission is to deliver innovative, reliable, and user-friendly solutions that make a real impact.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-900 animate-fade-in">Our Mission</h2>
                <p className="text-lg text-gray-600 leading-relaxed animate-slide-up" style={{ animationDelay: '0.4s' }}>
                  With a focus on quality and customer satisfaction, we strive to be a trusted partner for businesses and individuals around the world.
                </p>
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-2 gap-8 pt-8">
                {[
                  { value: '10+', label: 'Years Experience' },
                  { value: '500+', label: 'Projects Completed' },
                  { value: '98%', label: 'Client Satisfaction' },
                  { value: '24/7', label: 'Support' }
                ].map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 animate-fade-in" style={{ animationDelay: `${0.6 + index * 0.1}s` }}>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className="mt-2 text-sm text-gray-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Section */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <img
                  src={logo}
                  alt="Team working together"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12 animate-fade-in">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Innovation',
                description: 'Pushing boundaries and exploring new possibilities in everything we do.',
                icon: (
                  <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )
              },
              {
                title: 'Excellence',
                description: 'Committed to delivering the highest quality in every project we undertake.',
                icon: (
                  <svg className="w-12 h-12 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                )
              },
              {
                title: 'Integrity',
                description: 'Building trust through honest and transparent relationships with our clients.',
                icon: (
                  <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                )
              }
            ].map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 animate-fade-in" style={{ animationDelay: `${0.8 + index * 0.1}s` }}>
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
