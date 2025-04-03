'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from './Icons';
import HeaderActions from './HeaderActions';
import { useSession, signOut } from 'next-auth/react';
import MessageInbox from './MessageInbox';

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentPage: string;
}

export default function DashboardLayout({ children, currentPage }: DashboardLayoutProps) {
  const { data: session } = useSession();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const [credits, setCredits] = useState<number | null>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const [showMessageInbox, setShowMessageInbox] = useState(false);

  // Mock messages data
  const messages = [
    {
      id: 1,
      user: {
        name: 'Sarah Chen',
        avatar: '/profile-icons/panda.png',
      },
      message: 'Your latest design looks amazing! Could y...',
      time: '5m ago',
    },
    {
      id: 2,
      user: {
        name: 'Alex Thompson',
        avatar: '/profile-icons/lion.png',
      },
      message: "I'd love to collaborate on the new project y...",
      time: '2h ago',
    },
    {
      id: 3,
      user: {
        name: 'Maria Garcia',
        avatar: '/profile-icons/bear.png',
      },
      message: 'Thanks for the feedback on my design!',
      time: '1d ago',
    },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (messagesRef.current && !messagesRef.current.contains(event.target as Node)) {
        setIsMessagesOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch user's credits
  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const response = await fetch('/api/credits/balance');
        const data = await response.json();
        if (response.ok) {
          setCredits(data.credits);
        }
      } catch (error) {
        console.error('Error fetching credits:', error);
      }
    };

    if (session?.user) {
      fetchCredits();
    }
  }, [session]);

  // Default avatar URL
  const defaultAvatar = '/images/default-avatar.png';

  return (
    <>
      <div className="flex h-screen overflow-hidden bg-[#F6F8FA]">
        {/* Sidebar */}
        <div className="fixed left-0 top-0 bottom-0 w-[302px] bg-white border-r border-[#E0DAF3] z-40">
          <div className="ml-8 mt-6 w-[270px] h-[724px] bg-white rounded-lg p-8">
            {/* Profile Section */}
            <div className="flex flex-col p-2.5 gap-2.5 w-[206px] bg-gradient-to-r from-[#814ADA] to-[#4130A7] rounded-lg">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-[13.93px] bg-white overflow-hidden">
                    <Image
                      src={session?.user?.image || defaultAvatar}
                      alt="Profile"
                      width={36}
                      height={36}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-inter font-semibold text-lg">
                      {session?.user?.name?.split(' ')[0] || 'Designer'}
                    </span>
                    <span className="text-white font-inter text-xs">Level 1 Designer</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-0.5">
                  <Icon name="coins" size={20} className="text-white" />
                  <span className="text-white font-inter text-xs">
                    {credits !== null ? `${credits} Credits` : 'Loading...'}
                  </span>
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
              <Link href="/dashboard" className={`flex flex-row items-center px-3 py-2.5 gap-1 w-full h-10 rounded-[10px] ${currentPage === 'Dashboard' ? 'bg-white border border-[#D3BBFB] shadow-[0px_2px_3px_rgba(0,0,0,0.01),0px_2px_2px_rgba(135,80,255,0.06)]' : ''}`}>
                <Icon name="home" size={20} isActive={currentPage === 'Dashboard'} />
                <span className={`font-roboto font-medium text-sm ${currentPage === 'Dashboard' ? 'bg-gradient-to-b from-[#2A0856] to-[#3E0B80] bg-clip-text text-transparent' : 'text-[#202126]'}`}>
                  Home
                </span>
              </Link>
              <Link href="/prompt" className={`flex flex-row items-center px-3 py-2.5 gap-1 w-full h-10 rounded-[10px] ${currentPage === 'Prompt' ? 'bg-white border border-[#D3BBFB] shadow-[0px_2px_3px_rgba(0,0,0,0.01),0px_2px_2px_rgba(135,80,255,0.06)]' : ''}`}>
                <Icon name="prompt" size={20} isActive={currentPage === 'Prompt'} />
                <span className={`font-roboto font-medium text-sm ${currentPage === 'Prompt' ? 'bg-gradient-to-b from-[#2A0856] to-[#3E0B80] bg-clip-text text-transparent' : 'text-[#202126]'}`}>
                  AI Design Assistant
                </span>
              </Link>
              <Link href="/generate" className={`flex flex-row items-center px-3 py-2.5 gap-1 w-full h-10 rounded-[10px] ${currentPage === 'Generate' ? 'bg-white border border-[#D3BBFB] shadow-[0px_2px_3px_rgba(0,0,0,0.01),0px_2px_2px_rgba(135,80,255,0.06)]' : ''}`}>
                <Icon name="image" size={20} isActive={currentPage === 'Generate'} />
                <span className={`font-roboto font-medium text-sm ${currentPage === 'Generate' ? 'bg-gradient-to-b from-[#2A0856] to-[#3E0B80] bg-clip-text text-transparent' : 'text-[#202126]'}`}>
                  Image Generation
                </span>
              </Link>
              <Link href="/video" className={`flex flex-row items-center px-3 py-2.5 gap-1 w-full h-10 rounded-[10px] ${currentPage === 'Video' ? 'bg-white border border-[#D3BBFB] shadow-[0px_2px_3px_rgba(0,0,0,0.01),0px_2px_2px_rgba(135,80,255,0.06)]' : ''}`}>
                <Icon name="video" size={20} isActive={currentPage === 'Video'} />
                <span className={`font-roboto font-medium text-sm ${currentPage === 'Video' ? 'bg-gradient-to-b from-[#2A0856] to-[#3E0B80] bg-clip-text text-transparent' : 'text-[#202126]'}`}>
                  Video Generation
                </span>
              </Link>
              <div className="w-full border-t border-dashed border-[#CDD0D5] my-2.5" />
              <Link href="/library" className={`flex flex-row items-center px-3 py-2.5 gap-1 w-full h-10 rounded-[10px] ${currentPage === 'Library' ? 'bg-white border border-[#D3BBFB] shadow-[0px_2px_3px_rgba(0,0,0,0.01),0px_2px_2px_rgba(135,80,255,0.06)]' : ''}`}>
                <Icon name="library" size={20} isActive={currentPage === 'Library'} />
                <span className={`font-roboto font-medium text-sm ${currentPage === 'Library' ? 'bg-gradient-to-b from-[#2A0856] to-[#3E0B80] bg-clip-text text-transparent' : 'text-[#202126]'}`}>
                  Library
                </span>
              </Link>
              <Link href="/wallet" className={`flex flex-row items-center px-3 py-2.5 gap-1 w-full h-10 rounded-[10px] ${currentPage === 'Wallet' ? 'bg-white border border-[#D3BBFB] shadow-[0px_2px_3px_rgba(0,0,0,0.01),0px_2px_2px_rgba(135,80,255,0.06)]' : ''}`}>
                <Icon name="wallet" size={20} isActive={currentPage === 'Wallet'} />
                <span className={`font-roboto font-medium text-sm ${currentPage === 'Wallet' ? 'bg-gradient-to-b from-[#2A0856] to-[#3E0B80] bg-clip-text text-transparent' : 'text-[#202126]'}`}>
                  My Wallet
                </span>
              </Link>
              <Link href="/subscription" className={`flex flex-row items-center px-3 py-2.5 gap-1 w-full h-10 rounded-[10px] ${currentPage === 'Subscription' ? 'bg-white border border-[#D3BBFB] shadow-[0px_2px_3px_rgba(0,0,0,0.01),0px_2px_2px_rgba(135,80,255,0.06)]' : ''}`}>
                <Icon name="subscription" size={20} isActive={currentPage === 'Subscription'} />
                <span className={`font-roboto font-medium text-sm ${currentPage === 'Subscription' ? 'bg-gradient-to-b from-[#2A0856] to-[#3E0B80] bg-clip-text text-transparent' : 'text-[#202126]'}`}>
                  Subscription
                </span>
              </Link>
              <div className="w-full border-t border-dashed border-[#C7CCD8] my-2.5" />
              <Link href="/whatsnew" className={`flex flex-row items-center px-3 py-2.5 gap-1 w-full h-10 rounded-[10px] ${currentPage === 'WhatsNew' ? 'bg-white border border-[#D3BBFB] shadow-[0px_2px_3px_rgba(0,0,0,0.01),0px_2px_2px_rgba(135,80,255,0.06)]' : ''}`}>
                <Icon name="whatsnew" size={20} isActive={currentPage === 'WhatsNew'} />
                <span className={`font-roboto font-medium text-sm ${currentPage === 'WhatsNew' ? 'bg-gradient-to-b from-[#2A0856] to-[#3E0B80] bg-clip-text text-transparent' : 'text-[#202126]'}`}>
                  What's New
                </span>
              </Link>
              <Link href="/pricing" className={`flex flex-row items-center px-3 py-2.5 gap-1 w-full h-10 rounded-[10px] ${currentPage === 'Pricing' ? 'bg-white border border-[#D3BBFB] shadow-[0px_2px_3px_rgba(0,0,0,0.01),0px_2px_2px_rgba(135,80,255,0.06)]' : ''}`}>
                <Icon name="premium" size={20} isActive={currentPage === 'Pricing'} />
                <span className={`font-roboto font-medium text-sm ${currentPage === 'Pricing' ? 'bg-gradient-to-b from-[#2A0856] to-[#3E0B80] bg-clip-text text-transparent' : 'text-[#202126]'}`}>
                  Premium Plans
                </span>
              </Link>
              <Link href="/settings" className={`flex flex-row items-center px-3 py-2.5 gap-1 w-full h-10 rounded-[10px] ${currentPage === 'Settings' ? 'bg-white border border-[#D3BBFB] shadow-[0px_2px_3px_rgba(0,0,0,0.01),0px_2px_2px_rgba(135,80,255,0.06)]' : ''}`}>
                <Icon name="settings" size={20} isActive={currentPage === 'Settings'} />
                <span className={`font-roboto font-medium text-sm ${currentPage === 'Settings' ? 'bg-gradient-to-b from-[#2A0856] to-[#3E0B80] bg-clip-text text-transparent' : 'text-[#202126]'}`}>
                  Settings
                </span>
              </Link>
              <Link href="/help" className={`flex flex-row items-center px-3 py-2.5 gap-1 w-full h-10 rounded-[10px] ${currentPage === 'Help' ? 'bg-white border border-[#D3BBFB] shadow-[0px_2px_3px_rgba(0,0,0,0.01),0px_2px_2px_rgba(135,80,255,0.06)]' : ''}`}>
                <Icon name="help" size={20} isActive={currentPage === 'Help'} />
                <span className={`font-roboto font-medium text-sm ${currentPage === 'Help' ? 'bg-gradient-to-b from-[#2A0856] to-[#3E0B80] bg-clip-text text-transparent' : 'text-[#202126]'}`}>
                  FAQ & Help
                </span>
              </Link>
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

        {/* Main Content Area */}
        <div className="flex-1 ml-[302px] flex flex-col h-screen overflow-hidden">
          {/* Fixed Header */}
          <div className="fixed top-0 right-0 left-[302px] bg-[#F6F8FA] z-40">
            <div className="flex items-center justify-between px-5 py-6">
              <div className="flex items-center gap-2.5">
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
                <span className="font-roboto font-medium text-sm text-[#202126]">{currentPage}</span>
              </div>

              {/* Header Actions and Profile */}
              <div className="flex items-center gap-4">
                <HeaderActions />
                <div className="relative" ref={profileRef}>
                  <button 
                    className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#D3BBFB] hover:border-[#844BDC] transition-colors"
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                  >
                    <Image
                      src={session?.user?.image || defaultAvatar}
                      alt="Profile"
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </button>

                  {/* Profile Dropdown */}
                  <div className={`absolute right-0 mt-2 w-[240px] bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-200 ease-in-out z-[50] ${
                    isProfileOpen 
                      ? 'opacity-100 translate-y-0 visible pointer-events-auto' 
                      : 'opacity-0 -translate-y-2 invisible pointer-events-none'
                  }`}>
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <Image
                            src={session?.user?.image || defaultAvatar}
                            alt="Profile"
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-[#202126]">
                            {session?.user?.name?.split(' ')[0] || 'Designer'}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {session?.user?.email || 'No email'}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="py-2">
                      <Link href="/profile" className="block w-full px-4 py-2 text-left text-sm text-[#202126] hover:bg-gray-50">
                        View Profile
                      </Link>
                      <Link href="/settings" className="block w-full px-4 py-2 text-left text-sm text-[#202126] hover:bg-gray-50">
                        Account Settings
                      </Link>
                      <Link href="/pricing" className="block w-full px-4 py-2 text-left text-sm text-[#202126] hover:bg-gray-50">
                        Billing & Plans
                      </Link>
                    </div>
                    <div className="p-2 border-t border-gray-100">
                      <button 
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 mt-[88px] overflow-y-auto">
            <div className="h-full">
              {children}
            </div>
          </div>
        </div>
      </div>

      {/* Message Inbox Modal - Moved outside main layout */}
      {showMessageInbox && (
        <MessageInbox onClose={() => setShowMessageInbox(false)} />
      )}
    </>
  );
} 