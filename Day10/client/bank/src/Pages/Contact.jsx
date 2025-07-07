import React from 'react'
import contactimg from "../Assets/contact.jpg"

const Contact = () => {
  return (
    <div className="h-full w-full flex bg-gray-50 p-10 md:p-16">
      <div className='md:w-3/5 w-full'>
      <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Contact Us</h2>
      <p className="text-lg text-gray-600 mb-10 max-w-2xl">
        Got a question, feedback, or need help? Reach out to us anytime. We're here 24/7 to assist you with all your banking needs.
      </p>

      <form className="bg-white p-8 rounded-xl shadow-md max-w-3xl">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" placeholder="Your full name" className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" placeholder="you@example.com" className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400" />
          </div>
        </div>
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">Message</label>
          <textarea rows="4" placeholder="Write your message..." className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"></textarea>
        </div>
        <button type="submit" className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-sm transition-all duration-300">
          Send Message
        </button>
      </form>
      </div>
      <div className='w-2/5 md:flex hidden'>
        <img src={contactimg} alt="" />
      </div>
    </div>
  )
}

export default Contact
