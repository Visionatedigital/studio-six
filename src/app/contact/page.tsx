'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-white overflow-y-auto">
      {/* Navigation */}
      <nav className="fixed top-[37px] left-[43px] right-[43px] bg-white rounded-[10px] z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-[110px]">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <svg width="65" height="75" viewBox="0 0 65 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.7978 0H45.8696L16.4044 38.102C16.4044 38.102 -1.53544 34.2533 9.81423 15.0099L20.7978 0Z" fill="#76B3F8"/>
                  <path d="M36.1791 41.5661L22.6327 59.2701C22.6327 59.2701 -15.9012 52.7119 8.85568 16.7344C8.85568 16.7344 1.39785 34.6385 16.4087 38.1023L36.1791 41.5661Z" fill="#A0EAF6"/>
                  <path d="M44.3022 74.0883H19.2305L48.6957 35.9863C48.6957 35.9863 66.6355 39.835 55.2858 59.0785L44.3022 74.0883Z" fill="#965BF9"/>
                  <path d="M28.918 32.5243L42.4643 14.8203C42.4643 14.8203 80.9983 21.3785 56.2414 57.356C56.2414 57.356 63.6992 39.4519 48.6884 35.9881L28.918 32.5243Z" fill="#DA7AD4"/>
                </svg>
                <span className="ml-3 text-2xl font-bold text-[#1B1464]">Studio Six</span>
              </Link>
            </div>
            <div className="flex items-center gap-[51px] font-['Poppins']">
              <Link href="/pricing" className="text-black hover:text-[#844BDC] transition-colors text-lg font-medium">
                Pricing
              </Link>
              <Link href="/plugins" className="text-black hover:text-[#844BDC] transition-colors text-lg font-medium">
                Plugins
              </Link>
              <Link href="/help" className="text-black hover:text-[#844BDC] transition-colors text-lg font-medium">
                Help
              </Link>
              <Link href="/about" className="text-black hover:text-[#844BDC] transition-colors text-lg font-medium">
                About Us
              </Link>
              <Link href="/teams" className="text-black hover:text-[#844BDC] transition-colors text-lg font-medium">
                For Teams
              </Link>
            </div>
            <div className="flex gap-2.5">
              <Link 
                href="/login" 
                className="flex items-center justify-center px-6 py-3 bg-[#F4F4F4] rounded text-base font-medium"
              >
                Log in
              </Link>
              <Link 
                href="/signup" 
                className="flex items-center justify-center px-6 py-3 border-2 border-[#7144D3] rounded text-base font-medium"
              >
                Create
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Contact Form Section */}
      <div className="pt-[180px] pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg p-12">
            <h1 className="text-4xl font-semibold text-[#1B1464] mb-12">
              CONTACT US
            </h1>
            
            <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
              <div className="grid grid-cols-2 gap-x-16 gap-y-8">
                <div>
                  <label htmlFor="name" className="block text-2xl font-semibold text-[#2489FB] mb-4">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full h-[42px] bg-[#ECEEF3] rounded-lg px-4 font-['Poppins']"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-2xl font-semibold text-[#2489FB] mb-4">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full h-[42px] bg-[#ECEEF3] rounded-lg px-4 font-['Poppins']"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-2xl font-semibold text-[#2489FB] mb-4">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full h-[249px] bg-[#ECEEF3] rounded-lg p-4 resize-none font-['Poppins']"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-gradient-to-r from-[#844BDC] via-[#984DE7] to-[#AC4FF1] text-white font-semibold px-[18px] py-[14px] rounded-lg text-xl shadow-[0px_1px_4px_rgba(25,33,61,0.08)] w-[206px]"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 