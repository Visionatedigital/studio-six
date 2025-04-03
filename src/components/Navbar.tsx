'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="fixed w-full bg-white z-50 border-b border-[#E0DAF3]">
      <div className="max-w-[1200px] mx-auto px-6 h-[105px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/studio-six-logo.svg"
            alt="Studio Six Logo"
            width={144}
            height={48}
          />
        </Link>

        {/* Center Menu */}
        <div className="flex items-center gap-[51px]">
          <Link href="/pricing" className="font-poppins text-[18px] font-medium leading-[27px] text-[#6B6B6B] hover:text-[#1B1464]">Pricing</Link>
          <Link href="/plugins" className="font-poppins text-[18px] font-medium leading-[27px] text-[#6B6B6B] hover:text-[#1B1464]">Plugins</Link>
          <Link href="/help" className="font-poppins text-[18px] font-medium leading-[27px] text-[#6B6B6B] hover:text-[#1B1464]">Help</Link>
          <Link href="/terms" className="font-poppins text-[18px] font-medium leading-[27px] text-[#6B6B6B] hover:text-[#1B1464]">Terms and Conditions</Link>
          <Link href="/privacy" className="font-poppins text-[18px] font-medium leading-[27px] text-[#6B6B6B] hover:text-[#1B1464]">Privacy Policy</Link>
        </div>

        {/* Right Buttons */}
        <div className="flex items-center gap-4">
          <Link
            href="/sign-in"
            className="px-6 py-3 bg-[#F4F4F4] rounded-lg font-inter text-base font-medium"
          >
            Log in
          </Link>
          <Link
            href="/sign-up"
            className="px-6 py-3 border-2 border-[#7144D3] rounded-lg font-inter text-base font-medium"
          >
            Create
          </Link>
        </div>
      </div>
    </nav>
  );
} 