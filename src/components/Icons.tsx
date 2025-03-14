import React from 'react';
import Image from 'next/image';

interface IconProps {
  name: string;
  size?: number;
  className?: string;
  isActive?: boolean;
}

export const Icon: React.FC<IconProps> = ({ name, size = 24, className = '', isActive = false }) => {
  const iconColor = isActive ? 'text-[#2A0856]' : 'text-[#202126]';
  
  // Handle special cases for file names with spaces
  const getIconPath = (iconName: string) => {
    switch (iconName) {
      case 'logout':
        return '/icons/logout icon.svg';
      case 'studiosix':
        return '/icons/StudioSix Icon .svg';
      case 'verified':
        return '/icons/verified vector.svg';
      default:
        return `/icons/${iconName}-icon.svg`;
    }
  };

  return (
    <div className={`${iconColor} ${className}`} style={{ width: size, height: size }}>
      <Image
        src={getIconPath(name)}
        alt={`${name} icon`}
        width={size}
        height={size}
        className="w-full h-full"
      />
    </div>
  );
};

// Custom dropdown arrow component
export const DropdownArrow: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg 
      width="10" 
      height="6" 
      viewBox="0 0 10 6" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M1 1L5 5L9 1" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}; 