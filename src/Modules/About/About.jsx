import React from 'react'
import logo from '../../assets/WhatsApp Image 2025-05-06 at 08.13.39_0895e5d0.jpg'

export default function About() {
  return <>
  
   <div className="min-h-screen bg-white text-gray-800 px-6 py-12">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Text Section */}
        <div>
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-lg leading-relaxed mb-4">
            We are a passionate team of designers and developers dedicated to creating outstanding digital experiences.
            Our mission is to deliver innovative, reliable, and user-friendly solutions that make a real impact.
          </p>
          <p className="text-md text-gray-600">
            With a focus on quality and customer satisfaction, we strive to be a trusted partner for businesses and individuals around the world.
          </p>
        </div>

        {/* Image Section */}
        <div>
          <img
            src={logo}
            alt="Team working together"
            className="rounded-2xl shadow-lg"
          />
        </div>
      </div>
    </div>
 
  </>
}
