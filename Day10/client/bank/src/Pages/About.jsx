import React from 'react'

const About = () => {
  return (
    <div className="p-10 md:p-16 bg-gradient-to-br from-blue-50 to-white h-full">
      <h2 className="text-4xl md:text-5xl font-bold text-blue-700 mb-6">About Us</h2>
      <p className="text-gray-700 text-lg md:text-xl leading-8 max-w-4xl">
        Welcome to <span className="font-semibold text-blue-600">Cash Guardian</span> — your trusted companion for modern digital banking. 
        We believe banking should be smart, secure, and simple. Our platform empowers users with lightning-fast transactions, 
        real-time account tracking, and a seamless user experience.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-10">
        <div className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-blue-600 hover:shadow-xl transition-all duration-300">
          <h3 className="text-xl font-semibold text-blue-700 mb-2">Fast & Reliable</h3>
          <p className="text-gray-600">Built for speed with minimal downtime. Experience banking that never slows you down.</p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-green-600 hover:shadow-xl transition-all duration-300">
          <h3 className="text-xl font-semibold text-green-700 mb-2">Secure by Default</h3>
          <p className="text-gray-600">End-to-end encryption, token-based login, and secure transactions at every step.</p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-purple-600 hover:shadow-xl transition-all duration-300">
          <h3 className="text-xl font-semibold text-purple-700 mb-2">User-Friendly</h3>
          <p className="text-gray-600">Designed for all users — clean UI, smooth UX, and mobile-friendly performance.</p>
        </div>
      </div>
    </div>
  )
}

export default About
