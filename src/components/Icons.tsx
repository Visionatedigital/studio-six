import React from 'react';

interface IconProps {
  name: string;
  size?: number;
  className?: string;
  isActive?: boolean;
}

export const Icon: React.FC<IconProps> = ({ name, size = 20, className = '', isActive = false }) => {
  const iconPath = `/icons/${name}-icon.svg`;
  
  return (
    <div 
      className={`w-${size} h-${size} ${className}`}
      style={{ width: size, height: size }}
    >
      <img 
        src={iconPath} 
        alt={`${name} icon`}
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