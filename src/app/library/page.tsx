'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Icon } from '@/components/Icons';
import Image from 'next/image';
import { getRandomProfileIcon } from '@/utils/profileIcons';

// Custom scrollbar styles
const scrollbarStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #F6F8FA;
    border-radius: 3px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #E0DAF3;
    border-radius: 3px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #814ADA;
  }
`;

// Level badge mapping
const levelBadges: Record<number, string> = {
  1: '/level-icons/Level-icon-01.svg',
  2: '/level-icons/Level-icon-02.svg',
  3: '/level-icons/Level-icon-03.svg',
  4: '/level-icons/Level-icon-04.svg',
  5: '/level-icons/Level-icon-04.svg'
};

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState('Your Feed');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [followingStates, setFollowingStates] = useState<{ [key: string]: boolean }>({});

  // Close modal when clicking outside or pressing escape
  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  // Handle escape key press
  React.useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleCloseModal();
      }
    };

    if (selectedImage) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [selectedImage]);

  const tabs = [
    { 
      name: 'Community', 
      icon: 'edit', 
      iconWhite: 'edit-white', 
      regularIconSize: 16,
      activeIconSize: 20
    },
    { name: 'Your Images', icon: 'gallery', iconWhite: 'gallery-white', iconSize: 18 },
    { 
      name: 'Your Videos', 
      icon: 'video', 
      iconWhite: 'video-white', 
      regularIconSize: 16,
      activeIconSize: 20
    },
    { 
      name: 'Your Feed', 
      icon: 'heart', 
      iconWhite: 'heart-white',
      regularIconSize: 20,
      activeIconSize: 16
    },
    { name: 'Liked Feed', icon: 'like', iconWhite: 'like-white', iconSize: 18 },
    { name: 'Collections', icon: 'frame', iconWhite: 'frame-white', iconSize: 18 }
  ];

  // Sample feed data
  const feedPosts = [
    {
      id: 1,
      author: {
        name: 'James Smith',
        avatar: getRandomProfileIcon(),
        level: 2,
        levelTitle: 'Designer',
        isOnline: true
      },
      content: 'Just finished this modern villa render using the new lighting presets. The morning sun really brings out the texture of the wooden panels. What do you think about the shadow play?',
      image: '/gallery/image1.jpg',
      timeAgo: '12h ago',
      likes: 234,
      comments: 45
    },
    {
      id: 2,
      author: {
        name: 'Sarah Chen',
        avatar: getRandomProfileIcon(),
        level: 4,
        levelTitle: 'Designer',
        isOnline: false
      },
      content: 'Experimenting with Studio Six\'s new water reflection engine. The way it handles the pool area and glass facades is incredible. Swipe for before/after comparison.',
      image: '/gallery/image2.jpg',
      timeAgo: '1d ago',
      likes: 189,
      comments: 32
    },
    {
      id: 3,
      author: {
        name: 'Marcus Rodriguez',
        avatar: getRandomProfileIcon(),
        level: 3,
        levelTitle: 'Designer',
        isOnline: true
      },
      content: 'Quick tip: Use the new material presets in the latest update for ultra-realistic concrete textures. Here\'s a brutalist design I created using the new workflow.',
      image: '/gallery/image3.jpg',
      timeAgo: '2d ago',
      likes: 156,
      comments: 28
    },
    {
      id: 4,
      author: {
        name: 'Emma Watson',
        avatar: getRandomProfileIcon(),
        level: 5,
        levelTitle: 'Designer',
        isOnline: false
      },
      content: 'Love how the new vegetation system handles large-scale landscapes. Created this tropical villa scene in half the time it usually takes. The palm trees and grass movement look so natural!',
      image: '/gallery/image4.jpg',
      timeAgo: '3d ago',
      likes: 312,
      comments: 67
    }
  ];

  const recommendedProfiles = [
    {
      name: 'Conrad Aiken',
      avatar: getRandomProfileIcon(),
      level: 3,
      levelTitle: 'Designer'
    },
    {
      name: 'Norman Amos',
      avatar: getRandomProfileIcon(),
      level: 4,
      levelTitle: 'Designer'
    },
    {
      name: 'Beth Anderson',
      avatar: getRandomProfileIcon(),
      level: 5,
      levelTitle: 'Designer'
    }
  ];

  const toggleFollow = (profileName: string) => {
    setFollowingStates(prev => ({
      ...prev,
      [profileName]: !prev[profileName]
    }));
  };

  return (
    <DashboardLayout currentPage="Library">
      <style jsx global>{scrollbarStyles}</style>
      <div className="w-full h-[calc(100vh-6rem)] bg-[#F6F8FA] rounded-2xl overflow-hidden">
        <div className="flex flex-col h-full">
          {/* Centered Tab Navigation */}
          <div className="flex justify-center px-8 py-2 bg-[#F6F8FA]">
            <div className="flex items-center p-1.5 gap-2.5 w-[870px] h-[52px] bg-white border border-[#CDD0D5] rounded-xl">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`flex justify-center items-center px-3 py-2.5 gap-1 flex-1 rounded-[10px] transition-all duration-200 ${
                    activeTab === tab.name
                      ? 'bg-gradient-to-r from-[#814ADA] to-[#392CA0]'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <Icon
                    name={activeTab === tab.name ? tab.iconWhite : tab.icon}
                    size={
                      tab.regularIconSize
                        ? (activeTab === tab.name ? tab.activeIconSize : tab.regularIconSize)
                        : tab.iconSize
                    }
                  />
                  <span
                    className={`font-roboto font-medium text-sm ${
                      activeTab === tab.name ? 'text-white' : 'text-[#202126]'
                    }`}
                  >
                    {tab.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex gap-5 p-6 h-[calc(100%-76px)] overflow-hidden">
            {/* Main Feed Column - Scrollable */}
            <div className="flex-1 max-w-[800px] overflow-y-auto custom-scrollbar pr-4">
              {/* Create Post Card */}
              <div className="bg-white rounded-xl border border-[#E0DAF3] p-4 mb-6">
                <div className="text-lg font-medium text-[#202126] mb-4">Share your render</div>
                <div className="flex items-center gap-4 mb-4">
                  <textarea 
                    placeholder="Share your architectural renders, design techniques, or ask for feedback..."
                    className="w-full min-h-[100px] p-3 rounded-lg border border-[#E0DAF3] resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-4">
                    <button className="flex items-center gap-2 text-[#202126] hover:text-purple-600 transition-colors">
                      <Icon name="image" size={20} />
                      <span>Image</span>
                    </button>
                    <button className="flex items-center gap-2 text-[#202126] hover:text-purple-600 transition-colors">
                      <Icon name="video" size={20} />
                      <span>Video</span>
                    </button>
                    <button className="flex items-center gap-2 text-[#202126] hover:text-purple-600 transition-colors">
                      <Icon name="file" size={20} />
                      <span>Document</span>
                    </button>
                  </div>
                  <button className="px-4 py-2 bg-gradient-to-r from-[#814ADA] to-[#392CA0] text-white rounded-lg hover:opacity-90 transition-opacity">
                    Post
                  </button>
                </div>
              </div>

              {/* New Activity Header */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-red-500 font-medium">New activity</span>
                <div className="h-[1px] flex-1 bg-[#E0DAF3]"></div>
              </div>

              {/* Feed Posts */}
              <div className="space-y-4">
                {feedPosts.map(post => (
                  <div key={post.id} className="bg-white rounded-xl border border-[#E0DAF3] p-4">
                    {/* Post Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                          <Image
                            src={post.author.avatar}
                            alt={post.author.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-contain p-1"
                          />
                        </div>
                        {post.author.isOnline && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-[#202126]">{post.author.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            <Image
                              src={levelBadges[post.author.level]}
                              alt={`Level ${post.author.level}`}
                              width={16}
                              height={16}
                              className="mr-1"
                            />
                            <span className="text-sm text-gray-500">
                              Level {post.author.level} {post.author.levelTitle}
                            </span>
                          </div>
                          <span className="text-gray-300">•</span>
                          <span className="text-sm text-gray-500">{post.timeAgo}</span>
                        </div>
                      </div>
                    </div>

                    {/* Post Content */}
                    <p className="text-[#202126] mb-4">{post.content}</p>
                    {post.image && (
                      <div 
                        className="mb-4 rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
                        onClick={() => setSelectedImage(post.image)}
                      >
                        <Image
                          src={post.image}
                          alt="Post image"
                          width={800}
                          height={450}
                          className="w-full object-cover"
                        />
                      </div>
                    )}

                    {/* Post Actions */}
                    <div className="flex items-center gap-6">
                      <button className="flex items-center gap-2 text-[#202126] hover:text-purple-600 transition-colors">
                        <Icon name="heart" size={20} />
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 text-[#202126] hover:text-purple-600 transition-colors">
                        <Icon name="comment" size={20} />
                        <span>{post.comments}</span>
                      </button>
                      <button className="flex items-center gap-2 text-[#202126] hover:text-purple-600 transition-colors">
                        <Icon name="share" size={20} />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Sidebar - Sticky */}
            <div className="w-[380px] shrink-0">
              {/* Recommended Profiles */}
              <div className="bg-white rounded-xl border border-[#E0DAF3] p-4 sticky top-0 z-[5]">
                <h3 className="text-lg font-medium text-[#202126] mb-4">Recommended profiles</h3>
                <div className="space-y-4">
                  {recommendedProfiles.map((profile, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                          <Image
                            src={profile.avatar}
                            alt={profile.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-contain p-1"
                          />
                        </div>
                        <div>
                          <div className="font-medium text-[#202126]">{profile.name}</div>
                          <div className="flex items-center gap-1">
                            <Image
                              src={levelBadges[profile.level]}
                              alt={`Level ${profile.level}`}
                              width={16}
                              height={16}
                            />
                            <span className="text-sm text-gray-500">
                              Level {profile.level} {profile.levelTitle}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button 
                        onClick={() => toggleFollow(profile.name)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
                          followingStates[profile.name]
                            ? 'bg-purple-50 text-purple-600'
                            : 'bg-[#F6F8FA] hover:text-purple-600'
                        }`}
                      >
                        {!followingStates[profile.name] && (
                          <Icon name="plus" size={14} />
                        )}
                        <span className="text-sm font-medium">
                          {followingStates[profile.name] ? 'Following' : 'Follow'}
                        </span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Events Section */}
              <div className="bg-white rounded-xl border border-[#E0DAF3] p-4 mt-4 h-[calc(100vh-26rem)] flex flex-col">
                <h3 className="text-lg font-medium text-[#202126] mb-4">Upcoming Events</h3>
                <div className="space-y-4 overflow-y-auto custom-scrollbar pr-2 flex-1 min-h-0">
                  {/* Event Card */}
                  <div className="p-3 bg-[#F6F8FA] rounded-lg hover:bg-purple-50/50 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-[#202126] mb-1">Advanced Lighting Techniques</h4>
                        <p className="text-sm text-gray-500 line-clamp-2">Learn professional lighting techniques for architectural visualization from industry experts.</p>
                      </div>
                      <div className="bg-purple-100 p-1.5 rounded">
                        <Icon name="calendar" size={16} className="text-purple-600" />
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-gray-500">
                        <Icon name="clock" size={14} />
                        <span>Tomorrow, 2:00 PM</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Icon name="users" size={14} />
                        <span>45 attending</span>
                      </div>
                    </div>
                  </div>

                  {/* Event Card */}
                  <div className="p-3 bg-[#F6F8FA] rounded-lg hover:bg-purple-50/50 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-[#202126] mb-1">Material Creation Workshop</h4>
                        <p className="text-sm text-gray-500 line-clamp-2">Master the art of creating photorealistic materials for your 3D renders.</p>
                      </div>
                      <div className="bg-purple-100 p-1.5 rounded">
                        <Icon name="calendar" size={16} className="text-purple-600" />
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-gray-500">
                        <Icon name="clock" size={14} />
                        <span>Fri, 11:00 AM</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Icon name="users" size={14} />
                        <span>32 attending</span>
                      </div>
                    </div>
                  </div>

                  {/* Event Card */}
                  <div className="p-3 bg-[#F6F8FA] rounded-lg hover:bg-purple-50/50 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-[#202126] mb-1">Portfolio Review Session</h4>
                        <p className="text-sm text-gray-500 line-clamp-2">Get feedback on your work from senior designers and improve your portfolio.</p>
                      </div>
                      <div className="bg-purple-100 p-1.5 rounded">
                        <Icon name="calendar" size={16} className="text-purple-600" />
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-gray-500">
                        <Icon name="clock" size={14} />
                        <span>Next Week</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Icon name="users" size={14} />
                        <span>28 attending</span>
                      </div>
                    </div>
                  </div>

                  {/* Event Card */}
                  <div className="p-3 bg-[#F6F8FA] rounded-lg hover:bg-purple-50/50 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-[#202126] mb-1">3D Modeling Masterclass</h4>
                        <p className="text-sm text-gray-500 line-clamp-2">Deep dive into advanced 3D modeling techniques with industry veterans.</p>
                      </div>
                      <div className="bg-purple-100 p-1.5 rounded">
                        <Icon name="calendar" size={16} className="text-purple-600" />
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-gray-500">
                        <Icon name="clock" size={14} />
                        <span>Next Mon, 3:00 PM</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Icon name="users" size={14} />
                        <span>52 attending</span>
                      </div>
                    </div>
                  </div>

                  {/* Event Card */}
                  <div className="p-3 bg-[#F6F8FA] rounded-lg hover:bg-purple-50/50 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-[#202126] mb-1">Rendering Optimization Workshop</h4>
                        <p className="text-sm text-gray-500 line-clamp-2">Learn how to optimize your renders for better performance without sacrificing quality.</p>
                      </div>
                      <div className="bg-purple-100 p-1.5 rounded">
                        <Icon name="calendar" size={16} className="text-purple-600" />
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-gray-500">
                        <Icon name="clock" size={14} />
                        <span>Next Tue, 1:00 PM</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Icon name="users" size={14} />
                        <span>38 attending</span>
                      </div>
                    </div>
                  </div>

                  {/* Event Card */}
                  <div className="p-3 bg-[#F6F8FA] rounded-lg hover:bg-purple-50/50 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-[#202126] mb-1">Color Theory in Architecture</h4>
                        <p className="text-sm text-gray-500 line-clamp-2">Explore the impact of color in architectural visualization and design psychology.</p>
                      </div>
                      <div className="bg-purple-100 p-1.5 rounded">
                        <Icon name="calendar" size={16} className="text-purple-600" />
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-gray-500">
                        <Icon name="clock" size={14} />
                        <span>Next Wed, 4:00 PM</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Icon name="users" size={14} />
                        <span>41 attending</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* View All Events Button */}
                <button className="w-full mt-4 px-4 py-2 text-sm font-medium text-purple-600 hover:text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                  View All Events
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center backdrop-blur-sm"
            onClick={handleCloseModal}
          >
            <div 
              className="relative max-w-[90vw] max-h-[90vh] rounded-xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Enlarged view"
                width={1600}
                height={900}
                className="w-full h-full object-contain"
              />
              <button 
                onClick={handleCloseModal}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 transition-colors flex items-center justify-center"
              >
                <Icon name="close" size={24} className="text-white" />
              </button>
            </div>
          </div>
        )}
    </div>
    </DashboardLayout>
  );
} 