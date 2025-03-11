'use client';

import { useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';

interface LocomotiveScrollProviderProps {
  children: React.ReactNode;
}

export default function LocomotiveScrollProvider({ children }: LocomotiveScrollProviderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const locomotiveScrollRef = useRef<LocomotiveScroll | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    locomotiveScrollRef.current = new LocomotiveScroll({
      el: containerRef.current,
      smooth: true,
      smoothMobile: true,
      multiplier: 1,
      class: 'is-revealed',
      lerp: 0.1,
    });

    return () => {
      locomotiveScrollRef.current?.destroy();
    };
  }, []);

  return (
    <div data-scroll-container ref={containerRef} className="relative">
      {children}
    </div>
  );
} 