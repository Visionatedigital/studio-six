'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Icon, DropdownArrow } from '@/components/Icons';

// Helper function to get a random profile icon
const getRandomProfileIcon = () => {
  // We'll use a fixed icon number for now to maintain consistency during the session
  // In a real app, this would be stored in the user's profile
  const iconNumber = '01'; // This would normally be randomly assigned at signup
  return `/profile-icons/profile-icon-${iconNumber}.png`;
};

const MenuItem = ({ icon, label, isActive = false }: { icon: string, label: string, isActive?: boolean }) => (
  <div className={`flex flex-row items-center px-3 py-2.5 gap-1 w-[206px] h-10 rounded-[10px] ${isActive ? 'bg-white border border-[#D3BBFB]' : ''}`}>
    <div className="w-5 h-5">
      {/* Icon will be added later */}
    </div>
    <span className={`font-roboto font-medium text-sm ${isActive ? 'bg-gradient-to-b from-[#2A0856] to-[#3E0B80] bg-clip-text text-transparent' : 'text-[#202126]'}`}>
      {label}
    </span>
  </div>
);

const MostUsedItem = ({ icon, title, subtitle, isActive = false }: { icon: string, title: string, subtitle: string, isActive?: boolean }) => (
  <div className={`flex flex-row justify-between items-center p-3.5 gap-2.5 w-[330px] h-[61px] rounded-[10px] ${isActive ? 'bg-gradient-to-r from-[#844BDC] to-[#362B9E]' : 'bg-[#433D84]'}`}>
    <div className="flex flex-row items-center gap-2.5">
      <div className="flex items-center justify-center w-10 h-10 bg-[#905ADF] rounded-lg">
        <div className="w-6 h-6 border-[1.25px] border-white" />
      </div>
      <div className="flex flex-col">
        <span className="font-roboto font-medium text-base text-white">{title}</span>
        <span className="font-roboto text-xs text-white">{subtitle}</span>
      </div>
    </div>
    <button className="w-5 h-5">
      <div className="border-[1.25px] border-white w-1.5 h-1.5" />
    </button>
  </div>
);

const QuickAccessButton = ({ icon, label, isActive = false }: { icon: string, label: string, isActive?: boolean }) => (
  <button className={`flex flex-col items-center ${isActive ? 'p-4 w-[177px] h-[88px] bg-gradient-to-r from-[#844BDC] to-[#362B9E] border border-[#F6F8FA] shadow-[0px_2px_3px_rgba(0,0,0,0.01),0px_2px_2px_rgba(135,80,255,0.06)]' : 'p-[10px_12px] w-[114px] h-[62px] bg-white'} rounded-[140px]`}>
    <div className={`w-${isActive ? '[30px]' : '5'} h-${isActive ? '[30px]' : '5'}`} />
    <span className={`font-roboto font-medium ${isActive ? 'text-sm text-white' : 'text-xs text-[#202126]'}`}>
      {label}
    </span>
  </button>
);

const CommunityGallery = () => {
  // Define a pattern that will repeat
  const createGalleryPattern = (startIndex: number) => [
    { size: 'large', index: startIndex }, // 2x2
    { size: 'normal', index: startIndex + 1 }, // 1x1
    { size: 'tall', index: startIndex + 2 }, // 1x2
    { size: 'normal', index: startIndex + 3 }, // 1x1
    { size: 'wide', index: startIndex + 4 }, // 2x1
    { size: 'normal', index: startIndex + 5 }, // 1x1
  ];

  const baseGalleryItems = [
    {
      image: "/gallery/image1.jpg",
      user: "Sarah Chen",
      avatar: "/profile-icons/profile-icon-02.png",
      likes: 1234,
      title: "Modern Minimalist Living Room"
    },
    {
      image: "/gallery/image2.jpg",
      user: "Alex Thompson",
      avatar: "/profile-icons/profile-icon-03.png",
      likes: 856,
      title: "Contemporary Kitchen Design"
    },
    {
      image: "/gallery/image3.jpg",
      user: "Maria Garcia",
      avatar: "/profile-icons/profile-icon-04.png",
      likes: 2341,
      title: "Zen Garden Landscape"
    },
    {
      image: "/gallery/image4.jpg",
      user: "John Smith",
      avatar: "/profile-icons/profile-icon-05.png",
      likes: 967,
      title: "Urban Loft Interior"
    },
    {
      image: "/gallery/image5.jpg",
      user: "Emma Wilson",
      avatar: "/profile-icons/profile-icon-06.png",
      likes: 1567,
      title: "Scandinavian Bedroom"
    },
    {
      image: "/gallery/image6.jpg",
      user: "David Lee",
      avatar: "/profile-icons/profile-icon-07.png",
      likes: 789,
      title: "Industrial Style Office"
    },
    {
      image: "/gallery/image7.jpg",
      user: "Sophie Brown",
      avatar: "/profile-icons/profile-icon-08.png",
      likes: 1890,
      title: "Coastal Villa Exterior"
    },
    {
      image: "/gallery/image8.jpg",
      user: "Michael Chang",
      avatar: "/profile-icons/profile-icon-09.png",
      likes: 2156,
      title: "Japanese Garden Design"
    },
    {
      image: "/gallery/image9.jpg",
      user: "Lisa Anderson",
      avatar: "/profile-icons/profile-icon-10.png",
      likes: 945,
      title: "Modern Home Office"
    },
    {
      image: "/gallery/image10.jpg",
      user: "Tom Wilson",
      avatar: "/profile-icons/profile-icon-11.png",
      likes: 1678,
      title: "Luxury Bathroom Design"
    },
    {
      image: "/gallery/image11.jpg",
      user: "Emily Parker",
      avatar: "/profile-icons/profile-icon-12.png",
      likes: 1432,
      title: "Minimalist Kitchen Design"
    },
    {
      image: "/gallery/image12.jpg",
      user: "James Wilson",
      avatar: "/profile-icons/profile-icon-13.png",
      likes: 2189,
      title: "Modern Office Space"
    }
  ];

  // Create two complete patterns
  const pattern1 = createGalleryPattern(0);
  const pattern2 = createGalleryPattern(6);

  // Combine patterns with their corresponding items
  const galleryItems = [...pattern1, ...pattern2].map(pattern => ({
    ...baseGalleryItems[pattern.index],
    size: pattern.size
  }));

  return (
    <div className="h-[600px] overflow-y-auto">
      <div className="grid grid-cols-4 auto-rows-[200px] gap-3">
        {galleryItems.map((item, index) => (
          <div 
            key={index} 
            className={`relative group rounded-lg overflow-hidden ${
              item.size === 'large' ? 'col-span-2 row-span-2' :
              item.size === 'wide' ? 'col-span-2' :
              item.size === 'tall' ? 'row-span-2' :
              ''
            }`}
          >
            <Image
              src={item.image}
              alt={item.title}
              width={400}
              height={400}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            
            {/* Hover overlay with user details */}
            <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-200 ease-in-out">
              <div className="bg-black/30 backdrop-blur-[2px] p-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={item.avatar}
                      alt={item.user}
                      width={24}
                      height={24}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="text-white text-sm font-medium truncate">{item.title}</h4>
                    <div className="flex items-center gap-2">
                      <p className="text-white/90 text-xs truncate">{item.user}</p>
                      <div className="flex items-center gap-1">
                        <Icon name="heart" size={12} className="text-white/90" />
                        <span className="text-white/90 text-xs">{item.likes.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SidebarMenuItem = ({ icon, label, isActive = false }: { icon: string, label: string, isActive?: boolean }) => (
  <div className={`flex flex-row items-center px-3 py-2.5 gap-1 w-full h-10 rounded-[10px] ${isActive ? 'bg-white border border-[#D3BBFB] shadow-[0px_2px_3px_rgba(0,0,0,0.01),0px_2px_2px_rgba(135,80,255,0.06)]' : ''}`}>
    <Icon name={icon} size={20} isActive={isActive} />
    <span className={`font-roboto font-medium text-sm ${isActive ? 'bg-gradient-to-b from-[#2A0856] to-[#3E0B80] bg-clip-text text-transparent' : 'text-[#202126]'}`}>
      {label}
    </span>
  </div>
);

interface NotificationItemProps {
  title: string;
  description: string;
  time: string;
  isRead?: boolean;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ title, description, time, isRead = false }) => (
  <div className={`p-4 hover:bg-gray-50 cursor-pointer ${!isRead ? 'bg-purple-50/50' : ''}`}>
    <div className="flex justify-between items-start mb-1">
      <h3 className="text-sm font-medium text-[#202126]">{title}</h3>
      <span className="text-xs text-gray-500">{time}</span>
    </div>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

// Sample notifications data
const notifications = [
  {
    title: "Credits Running Low",
    description: "You have 10 credits remaining. Top up now to continue creating!",
    time: "2m ago",
    isRead: false
  },
  {
    title: "New Feature Available",
    description: "Try our new AI-powered sketch enhancement tool!",
    time: "1h ago",
    isRead: false
  },
  {
    title: "Weekly Summary",
    description: "You've created 15 designs this week. Great work!",
    time: "3h ago",
    isRead: true
  },
  {
    title: "Premium Discount",
    description: "Limited time offer: Get 20% off on annual subscriptions",
    time: "5h ago",
    isRead: true
  },
  {
    title: "Community Highlight",
    description: "Your recent design was featured in our weekly showcase!",
    time: "1d ago",
    isRead: true
  },
  {
    title: "Collaboration Invite",
    description: "John Smith wants to collaborate on 'Modern House Design'",
    time: "1d ago",
    isRead: true
  },
  {
    title: "Achievement Unlocked",
    description: "You've completed 100 designs! Check your new badge",
    time: "2d ago",
    isRead: true
  }
];

// Add these new interfaces at the top with other interfaces
interface Achievement {
  title: string;
  emoji: string;
  description: string;
  earnedAt: string;
}

interface UserLevel {
  current: number;
  progress: number;
  total: number;
  badge: string;
}

// Add this new component
const LevelProgressBadge = ({ level, progress }: { level: UserLevel, progress: number }) => (
  <div className="relative flex items-center justify-center">
    {/* Level Badge with Progress Ring */}
    <div className="relative w-24 h-24 bg-white rounded-full">
      {/* Base ring (100%) */}
      <svg className="absolute w-full h-full -rotate-90">
        <circle
          className="text-gray-200"
          strokeWidth="3"
          stroke="currentColor"
          fill="white"
          r="44"
          cx="48"
          cy="48"
        />
        
        {/* Progress ring with gradient and shimmer */}
        <circle
          className="progress-ring"
          strokeWidth="4"
          strokeDasharray={276.46}
          strokeDashoffset={276.46 * (1 - progress)}
          strokeLinecap="round"
          stroke="url(#progressGradient)"
          fill="transparent"
          r="44"
          cx="48"
          cy="48"
        >
          {/* Animated shimmer effect */}
          <animate
            attributeName="stroke-dashoffset"
            dur="0.5s"
            fill="freeze"
            values={`${276.46};${276.46 * (1 - progress)}`}
          />
        </circle>

        {/* Shimmer overlay */}
        <circle
          className="animate-shimmer"
          strokeWidth="4"
          strokeDasharray={276.46}
          strokeDashoffset={276.46 * (1 - progress)}
          strokeLinecap="round"
          stroke="url(#shimmerGradient)"
          fill="transparent"
          r="44"
          cx="48"
          cy="48"
          style={{ mixBlendMode: 'overlay' }}
        />

        {/* Define the gradients */}
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#844BDC" />
            <stop offset="100%" stopColor="#362B9E" />
          </linearGradient>
          <linearGradient id="shimmerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.7)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Level Badge Image */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-16 h-16">
          <Image
            src={`/level-icons/level-icon-0${level.current}.svg`}
            alt={`Level ${level.current} Badge`}
            width={64}
            height={64}
            className="w-full h-full"
            priority
          />
        </div>
      </div>
    </div>
  </div>
);

const RecentAchievement = ({ achievement }: { achievement: Achievement }) => (
  <div className="flex items-center gap-2 bg-white/50 rounded-lg p-2 backdrop-blur-sm">
    <span className="text-2xl">{achievement.emoji}</span>
    <div className="flex flex-col">
      <span className="text-sm font-medium text-[#202126]">{achievement.title}</span>
      <span className="text-xs text-gray-500">{achievement.earnedAt}</span>
    </div>
  </div>
);

// Replace the existing hero section with this new section
const DashboardHero = () => {
  const userLevel: UserLevel = {
    current: 2, // 1-4 representing bronze to elite
    progress: 0.75, // 75% progress to next level
    total: 100,
    badge: '/level-icons/level-icon-02.svg'
  };

  const recentAchievements: Achievement[] = [
    {
      title: "Classical Master",
      emoji: "🏛️",
      description: "Created a classical architectural masterpiece",
      earnedAt: "Today"
    },
    {
      title: "Sustainable Sage",
      emoji: "🌍",
      description: "Implemented eco-friendly design solutions",
      earnedAt: "Yesterday"
    },
    {
      title: "Light & Shadow Sage",
      emoji: "🌓",
      description: "Mastered lighting design",
      earnedAt: "2 days ago"
    }
  ];

  return (
    <div className="absolute left-5 top-24 w-[1400px] rounded-2xl bg-white p-8">
      <div className="flex items-start gap-8">
        {/* Left: Level and Progress */}
        <div className="flex-shrink-0">
          <LevelProgressBadge level={userLevel} progress={userLevel.progress} />
        </div>

        {/* Middle: Welcome and Progress Info */}
        <div className="flex-grow">
          <h1 className="text-3xl font-bold text-[#1B1464] mb-2">
            Hello Mike <span className="text-gray-500 font-normal">(User)</span>
          </h1>
          <p className="text-lg text-purple-600 font-medium mb-4">Ready to start creating?</p>
          
          {/* Progress Stats */}
          <div className="flex gap-6">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Current Level</span>
              <span className="text-xl font-medium text-[#202126]">Silver</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Progress to Next Level</span>
              <span className="text-xl font-medium text-[#202126]">{Math.round(userLevel.progress * 100)}%</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Total Achievements</span>
              <span className="text-xl font-medium text-[#202126]">24/100</span>
            </div>
          </div>
        </div>

        {/* Right: Recent Achievements */}
        <div className="flex-shrink-0 w-[300px]">
          <h3 className="text-sm font-medium text-gray-500 mb-3">Recent Achievements</h3>
          <div className="flex flex-col gap-2">
            {recentAchievements.map((achievement, index) => (
              <RecentAchievement key={index} achievement={achievement} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Add this new component before DashboardHero
const RenderingTool = ({ title, image, href, onError }: { title: string, image: string, href: string, onError?: (e: any) => void }) => {
  const [imageError, setImageError] = useState(false);

  // Split the title to separate "AI" from the rest
  const titleParts = title.split('AI');
  const mainText = titleParts[0].trim();
  const hasAI = title.includes('AI');

  return (
    <a
      href={href}
      className="relative group rounded-2xl overflow-hidden bg-gray-100"
      style={{ aspectRatio: '16/9' }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80 transition-opacity group-hover:opacity-60 z-10" />
      <div className="relative w-full h-full">
        {!imageError ? (
          <Image
            src={image}
            alt={title}
            width={277}
            height={156}
            quality={100}
            priority
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            onError={() => {
              console.error(`Failed to load image: ${image}`);
              setImageError(true);
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <div className="text-gray-400 text-center">
              <div className="text-4xl mb-2">🎨</div>
              <div className="text-sm">{title}</div>
            </div>
          </div>
        )}
      </div>
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="text-center">
          <h3 className="text-white text-2xl">
            {mainText}
            {hasAI && (
              <>
                <span className="inline-flex items-center ml-2">
                  <span className="px-2 py-0.5 rounded-md bg-white/10 border-2 border-white/60 shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                    <span className="font-bold">AI</span>
                  </span>
                </span>
              </>
            )}
          </h3>
        </div>
      </div>
    </a>
  );
};

const RenderingTools = () => {
  const tools = [
    { 
      title: 'Exterior AI',
      image: '/thumbnails/exterior-ai.png',
      href: '/exterior-ai'
    },
    { 
      title: 'Interior AI',
      image: '/thumbnails/interior-ai.png',
      href: '/interior-ai'
    },
    { 
      title: 'Render Enhancer ✨',
      image: '/thumbnails/render-enhancer-ai.png',
      href: '/render-enhancer'
    },
    { 
      title: 'Landscape AI',
      image: '/thumbnails/landscape-ai.png',
      href: '/landscape-ai'
    },
    { 
      title: 'Video AI',
      image: '/thumbnails/video-ai.png',
      href: '/video-ai'
    }
  ];

  return (
    <div className="absolute left-5 top-[352px] w-[1385px]">
      <div className="grid grid-cols-5 gap-6">
        {tools.map((tool, index) => (
          <RenderingTool 
            key={index} 
            {...tool}
          />
        ))}
      </div>
    </div>
  );
};

// Add these styles at the top of the file after the imports
const styles = `
  @keyframes shimmer {
    0% {
      background-position: 200% 50%;
    }
    100% {
      background-position: -200% 50%;
    }
  }

  .progress-ring {
    filter: drop-shadow(0 0 4px rgba(132, 75, 220, 0.4));
  }
`;

// Add the styles to the document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

// Add this after the notifications data
const messages = [
  {
    sender: "Studio Six Team",
    avatar: "/icons/studiosix icon .svg",
    message: "Welcome to Studio Six! We're excited to have you join our creative community. Let us know if you need any help getting started! 🎨",
    time: "Just now",
    isUnread: true,
    isVerified: true
  },
  {
    sender: "Sarah Chen",
    avatar: "/profile-icons/profile-icon-02.png",
    message: "Hey Mike! Love your recent exterior design. Would you be interested in collaborating on a project?",
    time: "10m ago",
    isUnread: true,
    isVerified: false
  },
  {
    sender: "Alex Thompson",
    avatar: "/profile-icons/profile-icon-03.png",
    message: "Thanks for the feedback on my render. The lighting adjustments really helped!",
    time: "1h ago",
    isUnread: false,
    isVerified: false
  },
  {
    sender: "Maria Garcia",
    avatar: "/profile-icons/profile-icon-04.png",
    message: "Just shared a new design concept with you. Check it out when you have a moment.",
    time: "2h ago",
    isUnread: false,
    isVerified: false
  }
];

// Update MessageItem component to include verified badge with correct path
const MessageItem = ({ sender, avatar, message, time, isUnread, isVerified }: { 
  sender: string, 
  avatar: string, 
  message: string, 
  time: string, 
  isUnread: boolean,
  isVerified: boolean
}) => (
  <div className={`p-4 hover:bg-gray-50 cursor-pointer ${isUnread ? 'bg-purple-50/50' : ''}`}>
    <div className="flex gap-3">
      <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
        <Image
          src={avatar}
          alt={sender}
          width={40}
          height={40}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-grow min-w-0">
        <div className="flex justify-between items-start mb-1">
          <div className="flex items-center gap-1">
            <h3 className="text-sm font-medium text-[#202126] truncate">{sender}</h3>
            {isVerified && (
              <Image
                src="/icons/verified vector.svg"
                alt="Verified"
                width={16}
                height={16}
                className="w-4 h-4"
              />
            )}
          </div>
          <span className="text-xs text-gray-500 flex-shrink-0 ml-2">{time}</span>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2">{message}</p>
      </div>
    </div>
  </div>
);

export default function DashboardPage() {
  const profileIcon = getRandomProfileIcon();
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);

  // Handle click outside for notifications, search, messages, and profile
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchExpanded(false);
      }
      if (messagesRef.current && !messagesRef.current.contains(event.target as Node)) {
        setIsMessagesOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }

    if (isNotificationsOpen || isSearchExpanded || isMessagesOpen || isProfileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isNotificationsOpen, isSearchExpanded, isMessagesOpen, isProfileOpen]);

  return (
    <div className="relative w-[1728px] h-[1080px] bg-[#F6F8FA]">
      {/* Left Sidebar */}
      <div className="fixed left-0 top-0 h-screen bg-[#F6F8FA] z-50">
        <div className="ml-8 mt-6 w-[270px] h-[724px] bg-white rounded-lg p-8">
        {/* Profile Section */}
        <div className="flex flex-col p-2.5 gap-2.5 w-[206px] bg-gradient-to-r from-[#814ADA] to-[#4130A7] rounded-lg">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-[13.93px] bg-white overflow-hidden">
                  <Image
                    src={profileIcon}
                    alt="Profile icon"
                    width={36}
                    height={36}
                    className="w-full h-full object-contain p-1"
                  />
                </div>
              <div className="flex flex-col">
                  <span className="text-white font-inter font-semibold text-lg">Mike</span>
                  <span className="text-white font-inter text-xs">Personal</span>
                </div>
              </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-0.5">
                <Icon name="coins" size={20} className="text-white" />
                <span className="text-white font-inter text-xs">Tokens 100/45</span>
            </div>
            <button className="px-1.5 py-1 bg-white rounded-[30px]">
              <span className="text-xs font-roboto bg-gradient-to-r from-[#854BDC] to-[#AB4FF0] bg-clip-text text-transparent">
                  Upgrades
              </span>
            </button>
          </div>
        </div>

        {/* Menu Items */}
          <div className="mt-6 flex flex-col gap-2.5">
            <SidebarMenuItem icon="home" label="Home" isActive={true} />
            <SidebarMenuItem icon="prompt" label="Prompt Generation" />
            <SidebarMenuItem icon="image" label="Image Generation" />
            <SidebarMenuItem icon="video" label="Video Generation" />
          <div className="w-full border-t border-dashed border-[#CDD0D5] my-2.5" />
            <SidebarMenuItem icon="library" label="Library" />
            <SidebarMenuItem icon="wallet" label="My Wallet" />
            <SidebarMenuItem icon="subscription" label="Subscription" />
          <div className="w-full border-t border-dashed border-[#C7CCD8] my-2.5" />
            <SidebarMenuItem icon="whatsnew" label="What's New" />
            <SidebarMenuItem icon="premium" label="Premium Plans" />
            <SidebarMenuItem icon="settings" label="Settings" />
            <SidebarMenuItem icon="help" label="FAQ & Help" />
        </div>

        {/* Footer */}
          <div className="mt-6 flex flex-col gap-3.5">
          <div className="flex justify-between items-center">
            <span className="text-[#202126] font-inter font-medium text-sm">Terms</span>
            <span className="text-[#202126] font-inter font-medium text-sm">|</span>
            <span className="text-[#202126] font-inter font-medium text-sm">DMCA</span>
            <span className="text-[#202126] font-inter font-medium text-sm">|</span>
            <span className="text-[#202126] font-inter font-medium text-sm">Affiliates</span>
          </div>
          <div className="flex justify-between items-center">
            {['facebook', 'blogger', 'messenger', 'youtube', 'whatsapp'].map((icon) => (
                <button key={icon} className="w-5 h-5 opacity-60">
                  <Icon name={icon} size={20} />
              </button>
            ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="absolute left-[302px] top-6 w-[1400px] h-[1002px] bg-[radial-gradient(18.31%_18.31%_at_50%_50%,#F0C6FF_0%,#F6F8FA_100%)] rounded-2xl">
        {/* Header Container */}
        <div className="flex flex-row items-center justify-between w-full px-5 py-5">
          <div className="flex flex-row items-center gap-2.5">
            {/* Navigation Arrows */}
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 border border-[#CDD0D5] rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.5 15L7.5 10L12.5 5" stroke="#202126" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className="w-8 h-8 border border-[#CDD0D5] rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="#CDD0D5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <span className="font-roboto font-medium text-sm text-[#202126]">Home</span>
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-4">
            {/* Expandable Search Bar */}
            <div className="relative" ref={searchRef}>
              <div className={`flex items-center transition-all duration-300 ease-in-out ${
                isSearchExpanded 
                  ? 'w-[300px] bg-white/95 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-[#CDD0D5]' 
                  : 'w-12'
              }`}>
                <button 
                  onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                  className="w-12 h-12 flex items-center justify-center hover:bg-white/10 rounded-full"
                >
                  <Icon name="searchbar" size={24} className={isSearchExpanded ? 'text-[#202126]' : ''} />
                </button>
                <input
                  type="text"
                  placeholder="Search..."
                  className={`outline-none bg-transparent text-[#202126] text-sm placeholder:text-[#6C7275] w-full pr-4 ${
                    isSearchExpanded ? 'opacity-100 ml-1' : 'opacity-0 w-0 p-0'
                  } transition-all duration-300`}
                />
              </div>
            </div>

            {/* Notifications */}
            <div className="relative" ref={notificationsRef}>
              <button 
                className="w-12 h-12 flex items-center justify-center hover:bg-white/10 rounded-full relative"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsNotificationsOpen(!isNotificationsOpen);
                }}
              >
                <Icon name="notifications" size={24} />
                <div className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full"></div>
          </button>
          
              {/* Notifications Dropdown */}
              <div 
                className={`absolute right-0 mt-2 w-[380px] bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-200 ease-in-out ${
                  isNotificationsOpen 
                    ? 'opacity-100 translate-y-0 visible pointer-events-auto' 
                    : 'opacity-0 -translate-y-2 invisible pointer-events-none'
                }`}
                style={{ zIndex: 9999 }}
              >
                <div className="sticky top-0 p-4 border-b border-gray-100 bg-white">
                  <div className="flex justify-between items-center">
                    <h2 className="font-medium text-[#202126]">Notifications</h2>
                    <button 
                      className="text-sm text-purple-600 hover:text-purple-700"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Mark all as read
                    </button>
                  </div>
                </div>

                {/* Scrollable Notifications List */}
                <div className="max-h-[400px] overflow-y-auto overscroll-contain">
                  <div className="divide-y divide-gray-100">
                    {notifications.map((notification, index) => (
                      <NotificationItem key={index} {...notification} />
                    ))}
                  </div>
                </div>

                {/* See More Footer */}
                <div className="sticky bottom-0 p-4 border-t border-gray-100 bg-gray-50">
                  <a 
                    href="#" 
                    className="block text-center text-sm text-purple-600 hover:text-purple-700 font-medium"
                    onClick={(e) => e.stopPropagation()}
                  >
                    See all notifications
                  </a>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="relative" ref={messagesRef}>
              <button 
                className="w-12 h-12 flex items-center justify-center hover:bg-white/10 rounded-full relative"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMessagesOpen(!isMessagesOpen);
                }}
              >
                <Icon name="message" size={24} />
                <div className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full"></div>
          </button>
          
              {/* Messages Dropdown */}
              <div 
                className={`absolute right-0 mt-2 w-[380px] bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-200 ease-in-out ${
                  isMessagesOpen 
                    ? 'opacity-100 translate-y-0 visible pointer-events-auto' 
                    : 'opacity-0 -translate-y-2 invisible pointer-events-none'
                }`}
                style={{ zIndex: 9999 }}
              >
                <div className="sticky top-0 p-4 border-b border-gray-100 bg-white">
                  <div className="flex justify-between items-center">
                    <h2 className="font-medium text-[#202126]">Messages</h2>
                    <button 
                      className="text-sm text-purple-600 hover:text-purple-700"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Mark all as read
                    </button>
                  </div>
                </div>

                {/* Scrollable Messages List */}
                <div className="max-h-[400px] overflow-y-auto overscroll-contain">
                  <div className="divide-y divide-gray-100">
                    {messages.map((message, index) => (
                      <MessageItem key={index} {...message} />
                    ))}
                  </div>
        </div>

                {/* See More Footer */}
                <div className="sticky bottom-0 p-4 border-t border-gray-100 bg-gray-50">
                  <a 
                    href="#" 
                    className="block text-center text-sm text-purple-600 hover:text-purple-700 font-medium"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Open Messages
                  </a>
                </div>
              </div>
          </div>

            {/* Profile Menu */}
            <div className="relative" ref={profileRef}>
              <button 
                className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-white/10"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsProfileOpen(!isProfileOpen);
                }}
              >
                <div className="w-10 h-10 rounded-full bg-white overflow-hidden">
                  <Image
                    src={profileIcon}
                    alt="Profile icon"
                    width={40}
                    height={40}
                    className="w-full h-full object-contain p-1"
                  />
                </div>
                <DropdownArrow className={`transform ${isProfileOpen ? 'rotate-0' : 'rotate-180'} border-[#202126] transition-transform duration-200`} />
            </button>
              
              {/* Enhanced Dropdown Menu */}
              <div 
                className={`absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg py-2 transition-all duration-200 ease-in-out ${
                  isProfileOpen 
                    ? 'opacity-100 translate-y-0 visible pointer-events-auto' 
                    : 'opacity-0 -translate-y-2 invisible pointer-events-none'
                }`}
                style={{ zIndex: 9999 }}
              >
                {/* User Info Section */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white overflow-hidden">
                      <Image
                        src={profileIcon}
                        alt="Profile"
                        width={40}
                        height={40}
                        className="w-full h-full object-contain p-1"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-[#202126]">Mike Kennedy</p>
                      <p className="text-xs text-gray-500">mike@example.com</p>
                    </div>
                  </div>
                </div>

                {/* Account Settings Section */}
                <div className="py-1">
                  <a href="#" className="flex items-center px-4 py-2 text-sm text-[#202126] hover:bg-gray-50">
                    <Icon name="settings" size={16} className="mr-2" />
                    Account Settings
                  </a>
                  <a href="#" className="flex items-center px-4 py-2 text-sm text-[#202126] hover:bg-gray-50">
                    <Icon name="wallet" size={16} className="mr-2" />
                    Billing
                  </a>
                </div>

                {/* Appearance Section */}
                <div className="py-1 border-t border-gray-100">
                  <div className="px-4 py-2">
                    <p className="text-xs font-medium text-gray-500 mb-2">APPEARANCE</p>
                    <div className="flex items-center gap-2">
                      <button 
                        className="flex-1 px-3 py-1.5 text-sm rounded-md bg-purple-50 text-purple-600 font-medium"
                        onClick={() => {/* Theme logic will be added later */}}
                      >
                        Light
            </button>
                      <button 
                        className="flex-1 px-3 py-1.5 text-sm rounded-md hover:bg-gray-100"
                        onClick={() => {/* Theme logic will be added later */}}
                      >
                        Dark
            </button>
                    </div>
                  </div>
                </div>

                {/* Logout Section */}
                <div className="py-1 border-t border-gray-100">
                  <Link href="/" className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-50">
                    <Image
                      src="/icons/logout icon.svg"
                      alt="Logout"
                      width={16}
                      height={16}
                      className="mr-2 text-red-600"
                    />
                    Log Out
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* New Dashboard Hero Section */}
        <DashboardHero />

        {/* Rendering Tools Section */}
        <RenderingTools />

        {/* Most Used Section - update top position to accommodate new section */}
        <div className="absolute left-5 top-[520px] w-[1385px] flex flex-wrap items-start content-start gap-4">
          <h2 className="w-[1122px] h-6 font-roboto font-medium text-xl text-[#1B1464]">
            Most Used
          </h2>
          <div className="flex flex-wrap gap-4">
            <MostUsedItem
              icon="edit"
              title="Edit"
              subtitle="Last edited 2h ago"
            />
            <MostUsedItem
              icon="edit"
              title="Generate Images"
              subtitle="Last edited 2h ago"
            />
            <MostUsedItem
              icon="video"
              title="Video Library"
              subtitle="Last edited 2h ago"
            />
            <MostUsedItem
              icon="video"
              title="Video Library"
              subtitle="Last edited 2h ago"
            />
          </div>
        </div>

        {/* Community Section - update top position and spacing */}
        <div className="absolute left-5 top-[640px] w-[1385px] flex flex-col gap-4">
          <h2 className="font-poppins font-bold text-xl text-[#1B1464]">
            Get inspired from Community
          </h2>
          <CommunityGallery />
        </div>
      </div>
    </div>
  );
} 