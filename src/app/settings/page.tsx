'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SettingsPage() {
  const [isNewsletterEnabled, setIsNewsletterEnabled] = useState(false);

  return (
    <div className="min-h-screen bg-[#F6F8FA] p-6">
      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-[206px] flex flex-col gap-5">
          {/* Logo */}
          <svg width="55" height="56" viewBox="0 0 55 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.1029 0H38.2904L13.3902 28.4085C13.3902 28.4085 -1.7703 25.539 7.82101 11.1912L17.1029 0Z" fill="#76B3F8"/>
            <path d="M30.102 30.9909L18.6543 44.1908C18.6543 44.1908 -13.9098 39.3011 7.01165 12.4766C7.01165 12.4766 0.709234 25.8257 13.3945 28.4083L30.102 30.9909Z" fill="#A0EAF6"/>
            <path d="M36.9688 55.2386H15.7812L40.6815 26.8301C40.6815 26.8301 55.842 29.6996 46.2507 44.0474L36.9688 55.2386Z" fill="#965BF9"/>
            <path d="M23.9688 24.2487L35.4164 11.0488C35.4164 11.0488 67.9805 15.9385 47.0591 42.7631C47.0591 42.7631 53.3615 29.4139 40.6762 26.8313L23.9688 24.2487Z" fill="#DA7AD4"/>
          </svg>

          {/* Profile Card */}
          <div className="w-full bg-gradient-to-r from-[#814ADA] to-[#4130A7] rounded-lg p-2.5">
            <div className="flex justify-between items-center mb-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-[13.9px] bg-gray-200" />
                <div>
                  <h3 className="text-lg font-semibold text-white">Mike</h3>
                  <p className="text-xs text-white">Personal</p>
                </div>
              </div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                <path d="M6 9L12 15L18 9" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-0.5">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="white" strokeWidth="1.5">
                  <circle cx="10" cy="10" r="8" />
                  <path d="M10 6v8M6 10h8" strokeLinecap="round"/>
                </svg>
                <span className="text-xs text-white">100/45 Tokens</span>
              </div>
              <button className="px-1.5 py-1 bg-white rounded-[30px] text-xs bg-clip-text text-transparent bg-gradient-to-r from-[#854BDC] to-[#AB4FF0]">
                Upgrades
              </button>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex flex-col gap-2.5">
            <Link href="/" className="flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-white/50 text-[#202126]">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 10l7-7 7 7M5 8.5v7.5h10v-7.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-sm font-medium">Home</span>
            </Link>
            <Link href="/article" className="flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-white/50 text-[#202126]">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M16 3H4a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1z" strokeLinecap="round"/>
                <path d="M7 7h6M7 10h6M7 13h4" strokeLinecap="round"/>
              </svg>
              <span className="text-sm font-medium">Article Generation</span>
            </Link>
            <Link href="/image" className="flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-white/50 text-[#202126]">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M16 3H4a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1z" strokeLinecap="round"/>
                <path d="M3 13l4-4 3 3 2-2 5 5" strokeLinecap="round"/>
                <circle cx="14.5" cy="6.5" r="1.5" strokeLinecap="round"/>
              </svg>
              <span className="text-sm font-medium">Image Creation</span>
            </Link>
            <Link href="/video" className="flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-white/50 text-[#202126]">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M16 3H4a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1z" strokeLinecap="round"/>
                <path d="M8 7l5 3-5 3V7z" strokeLinecap="round"/>
              </svg>
              <span className="text-sm font-medium">Video Creation</span>
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 max-w-[1162px] bg-white border border-[#CDD0D5] rounded-2xl p-5">
          {/* Header */}
          <div className="flex items-center gap-2.5 mb-10">
            <Link href="/settings" className="w-6 h-6 border border-[#CDD0D5] rounded-md flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 12 12" stroke="#202126" strokeWidth="1.5">
                <path d="M7.5 9L4.5 6L7.5 3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link href="/settings" className="w-6 h-6 border border-[#CDD0D5] rounded-md flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 12 12" stroke="#CDD0D5" strokeWidth="1.5">
                <path d="M4.5 9L7.5 6L4.5 3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <div className="flex items-center gap-0.5">
              <span className="text-sm text-[#7E7F83]">Settings</span>
              <svg width="16" height="16" viewBox="0 0 16 16" stroke="#CDD0D5" strokeWidth="1.5">
                <path d="M6 12L10 8L6 4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-sm text-[#202126]">Profile</span>
            </div>
          </div>

          {/* Settings Form */}
          <div className="max-w-[768px] mx-auto">
            <h1 className="text-2xl font-semibold text-center mb-8">Settings</h1>
            
            {/* Tabs */}
            <div className="flex justify-center p-1.5 bg-[#F6F8FA] border border-[#CDD0D5] rounded-xl mb-8 w-fit mx-auto">
              <button className="flex items-center gap-1 px-3 py-2.5 bg-white border border-[#D3BBFB] rounded-lg shadow-sm">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#3E0B80]">
                  <path d="M15 15V7.5C15 6.67157 14.3284 6 13.5 6H6.5C5.67157 6 5 6.67157 5 7.5V15" />
                  <circle cx="10" cy="5" r="2.5" />
                </svg>
                <span className="text-sm font-medium bg-gradient-to-b from-[#2A0856] to-[#3E0B80] bg-clip-text text-transparent">Profile</span>
              </button>
              <button className="flex items-center gap-1 px-3 py-2.5">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#202126" strokeWidth="1.5">
                  <path d="M10 4v12M4 10h12" strokeLinecap="round"/>
                </svg>
                <span className="text-sm font-medium text-[#202126]">Teams</span>
              </button>
              <button className="flex items-center gap-1 px-3 py-2.5">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#202126" strokeWidth="1.5">
                  <path d="M4 10a6 6 0 1012 0 6 6 0 00-12 0z"/>
                  <path d="M10 7v3l2 2" strokeLinecap="round"/>
                </svg>
                <span className="text-sm font-medium text-[#202126]">Account Management</span>
              </button>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-base font-medium text-[#1A1B1E]">Email</label>
                <input 
                  type="email" 
                  value="mhnayem1988@gmail.com"
                  className="p-3 border border-[#E0DAF3] rounded-lg"
                  readOnly
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-base font-medium text-[#1A1B1E]">User Name</label>
                <input 
                  type="text" 
                  value="gphmoinul"
                  className="p-3 border border-[#E0DAF3] rounded-lg"
                  readOnly
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-base font-medium text-[#1A1B1E]">Password</label>
                <div className="relative">
                  <input 
                    type="password" 
                    value="**********"
                    className="w-full p-3 border border-[#E0DAF3] rounded-lg"
                    readOnly
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2">
                    <svg width="24" height="24" viewBox="0 0 24 24" stroke="#202126" strokeWidth="1.5">
                      <path d="M2 2l20 20M6.713 6.723C3.665 8.795 2 12 2 12s3.636 7 10 7c2.05 0 3.817-.727 5.271-1.712M11 5.058A8.595 8.595 0 0112 5c6.364 0 10 7 10 7s-.692 1.332-2 2.834" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-base font-medium text-[#1A1B1E]">Confirm Password</label>
                <div className="relative">
                  <input 
                    type="password" 
                    value="**********"
                    className="w-full p-3 border border-[#E0DAF3] rounded-lg"
                    readOnly
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2">
                    <svg width="24" height="24" viewBox="0 0 24 24" stroke="#202126" strokeWidth="1.5">
                      <path d="M2 2l20 20M6.713 6.723C3.665 8.795 2 12 2 12s3.636 7 10 7c2.05 0 3.817-.727 5.271-1.712M11 5.058A8.595 8.595 0 0112 5c6.364 0 10 7 10 7s-.692 1.332-2 2.834" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Newsletter Toggle */}
            <div className="flex items-center gap-2.5 mb-6">
              <button 
                className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${isNewsletterEnabled ? 'bg-[#3E0B80]' : 'bg-[#202126]'}`}
                onClick={() => setIsNewsletterEnabled(!isNewsletterEnabled)}
              >
                <div className={`absolute w-4 h-4 bg-white rounded-full top-0.5 left-0.5 transition-transform duration-200 ${isNewsletterEnabled ? 'translate-x-5' : ''}`} />
              </button>
              <span className="text-sm font-medium text-[#2F3033]">Weekly Newsletters</span>
            </div>

            {/* Save Button */}
            <button className="w-full py-3 text-white font-medium rounded-lg bg-gradient-to-r from-[#854BDC] to-[#AB4FF0] hover:opacity-90 transition-opacity">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 