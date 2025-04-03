'use client';

import { useState } from 'react';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Lead Designer",
    quote: "StudioSix has revolutionized our design workflow. The AI-powered renders are incredibly realistic and save us countless hours."
  },
  {
    name: "Michael Chen",
    role: "Senior Architect",
    quote: "The quality and speed of renders are unmatched. It's become an essential tool in our design process."
  },
  {
    name: "Emma Thompson",
    role: "Interior Designer",
    quote: "The attention to detail in the renders is amazing. It helps us communicate our vision clearly to clients."
  },
  {
    name: "David Rodriguez",
    role: "3D Artist",
    quote: "The AI capabilities have transformed how we approach visualization. It's incredibly intuitive and powerful."
  },
  {
    name: "Lisa Wang",
    role: "Creative Director",
    quote: "Studio Six has become indispensable for our team. The speed and quality are simply outstanding."
  }
];

type CardPosition = 'prev' | 'current' | 'next';
type StylePosition = {
  left: string;
  transform: string;
  opacity: string;
  zIndex: string;
};

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right, 0 for initial
  const [isAnimating, setIsAnimating] = useState(false);

  const getPrevIndex = (index: number) => (index - 1 + testimonials.length) % testimonials.length;
  const getNextIndex = (index: number) => (index + 1) % testimonials.length;

  const handlePrevClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(-1);
    setTimeout(() => {
      setCurrentIndex(getPrevIndex(currentIndex));
      setDirection(0);
      setIsAnimating(false);
    }, 400);
  };

  const handleNextClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(1);
    setTimeout(() => {
      setCurrentIndex(getNextIndex(currentIndex));
      setDirection(0);
      setIsAnimating(false);
    }, 400);
  };

  const getCardStyles = (position: CardPosition): { className: string; style: StylePosition } => {
    const baseStyles = "absolute transition-all duration-400 ease-in-out";
    
    const positions: Record<CardPosition, StylePosition> = {
      prev: {
        left: direction === -1 ? '20%' : '30%',
        transform: `translateX(-50%) scale(${direction === -1 ? '0.85' : '0.85'})`,
        opacity: direction === 1 ? '0' : '1',
        zIndex: '0'
      },
      current: {
        left: '50%',
        transform: 'translateX(-50%) scale(1)',
        opacity: '1',
        zIndex: '10'
      },
      next: {
        left: direction === 1 ? '80%' : '70%',
        transform: `translateX(-50%) scale(${direction === 1 ? '0.85' : '0.85'})`,
        opacity: direction === -1 ? '0' : '1',
        zIndex: '0'
      }
    };

    const widthStyles = {
      prev: "w-[400px]",
      current: "w-[500px]",
      next: "w-[400px]"
    };

    const bgStyles = {
      prev: "bg-white",
      current: "bg-gradient-to-r from-[#844BDC] to-[#AC4FF1]",
      next: "bg-white"
    };

    const pos = positions[position];
    const styles = [
      baseStyles,
      widthStyles[position],
      bgStyles[position],
    ].join(' ');

    return {
      className: styles,
      style: pos
    };
  };

  return (
    <section className="relative py-[100px] overflow-hidden">
      <h2 className="font-lato font-bold text-[36px] leading-[43px] text-center text-black mb-[50px]">
        What Our Designers Say About It
      </h2>

      <div className="flex justify-center items-center h-[500px] max-w-[1656px] mx-auto relative">
        {/* Left Arrow */}
        <button 
          onClick={handlePrevClick}
          disabled={isAnimating}
          className="absolute left-[100px] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-20 disabled:opacity-50"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#1B1464]">
            <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
          </svg>
        </button>

        <div className="relative w-full h-full">
          {/* Previous Testimonial */}
          <div {...getCardStyles('prev')}>
            <div className="flex flex-col items-center p-8 rounded-[24px] shadow-lg h-full">
              <div className="w-[90px] h-[90px] rounded-full border-2 border-[#1B1464] bg-[#F6F8FA] mb-4" />
              <h3 className="font-poppins font-bold text-[18px] leading-[27px] text-[#1B1464] mb-2">
                {testimonials[getPrevIndex(currentIndex)].name}
              </h3>
              <p className="font-lato text-[15px] leading-[18px] text-[#6B6B6B] mb-6">
                {testimonials[getPrevIndex(currentIndex)].role}
              </p>
              <div className="w-[31.54px] h-[31.54px] mb-4">
                {/* Quote icon placeholder */}
              </div>
              <p className="font-poppins text-[15px] leading-[22px] text-[#1B1464] text-center">
                "{testimonials[getPrevIndex(currentIndex)].quote}"
              </p>
            </div>
          </div>

          {/* Current Testimonial */}
          <div {...getCardStyles('current')}>
            <div className="flex flex-col items-center p-8 rounded-[32px] shadow-xl h-full">
              <div className="w-[120px] h-[120px] rounded-full border-2 border-white bg-[#F6F8FA] mb-4" />
              <h3 className="font-poppins font-bold text-[24px] leading-[36px] text-white mb-2">
                {testimonials[currentIndex].name}
              </h3>
              <p className="font-lato text-[18px] leading-[22px] text-white mb-6">
                {testimonials[currentIndex].role}
              </p>
              <div className="w-[51.6px] h-[51.6px] mb-4">
                {/* Quote icon placeholder */}
              </div>
              <p className="font-poppins text-[18px] leading-[27px] text-white text-center">
                "{testimonials[currentIndex].quote}"
              </p>
            </div>
          </div>

          {/* Next Testimonial */}
          <div {...getCardStyles('next')}>
            <div className="flex flex-col items-center p-8 rounded-[24px] shadow-lg h-full">
              <div className="w-[90px] h-[90px] rounded-full border-2 border-[#1B1464] bg-[#F6F8FA] mb-4" />
              <h3 className="font-poppins font-bold text-[18px] leading-[27px] text-[#1B1464] mb-2">
                {testimonials[getNextIndex(currentIndex)].name}
              </h3>
              <p className="font-lato text-[15px] leading-[18px] text-[#6B6B6B] mb-6">
                {testimonials[getNextIndex(currentIndex)].role}
              </p>
              <div className="w-[31.54px] h-[31.54px] mb-4">
                {/* Quote icon placeholder */}
              </div>
              <p className="font-poppins text-[15px] leading-[22px] text-[#1B1464] text-center">
                "{testimonials[getNextIndex(currentIndex)].quote}"
              </p>
            </div>
          </div>
        </div>

        {/* Right Arrow */}
        <button 
          onClick={handleNextClick}
          disabled={isAnimating}
          className="absolute right-[100px] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-20 disabled:opacity-50"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#1B1464]">
            <path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
          </svg>
        </button>
      </div>
    </section>
  );
} 