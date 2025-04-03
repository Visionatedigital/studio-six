'use client';

import React, { useState, useEffect, useRef } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Icon } from '@/components/Icons';
import Image from 'next/image';
import { getRandomProfileIcon } from '@/utils/profileIcons';
import { useSession } from 'next-auth/react';
import ShareModal from '@/components/ShareModal';
import { useRouter } from 'next/navigation';
import { Post } from '../../types';
import { PostCard } from '@/components/PostCard';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';

// Define interfaces at the top level
interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    image: string;
  };
}

interface SelectedFile {
  file: File;
  type: string;
  preview?: string;
}

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
  // Authentication and routing
  const { data: session, status } = useSession();
  const router = useRouter();

  // State management
  const [activeTab, setActiveTab] = useState('Your Feed');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [followingStates, setFollowingStates] = useState<{ [key: string]: boolean }>({});
  const [recommendedProfiles, setRecommendedProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<{ [key: string]: Comment[] }>({});
  const [newComment, setNewComment] = useState<{ [key: string]: string }>({});
  const [showComments, setShowComments] = useState<{ [key: string]: boolean }>({});
  const [selectedFile, setSelectedFile] = useState<SelectedFile | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [caption, setCaption] = useState('');
  const [postType, setPostType] = useState<'image' | 'video' | 'document'>('image');

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Constants
  const allowedFileTypes = {
    image: '.jpg,.jpeg,.png,.gif,.webp',
    video: '.mp4,.webm,.mov',
    document: '.pdf,.doc,.docx,.txt'
  };

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      if (status !== 'authenticated') return;

      try {
        console.log('Starting to fetch posts...');
        const response = await fetch('/api/posts');
        console.log('Response status:', response.status);
        
        const data = await response.json();
        console.log('Response data:', data);
        
        if (!response.ok) {
          console.error('Error response:', data);
          throw new Error(
            `HTTP error! Status: ${response.status}, Message: ${data.error || 'Unknown error'}, Details: ${data.details || 'No details available'}`
          );
        }

        if (!data.success) {
          throw new Error(data.error || 'Failed to fetch posts');
        }

        if (!data.posts || !Array.isArray(data.posts)) {
          console.error('Invalid posts data:', data);
          throw new Error('Invalid posts data format');
        }

        setPosts(data.posts);
        setError(null);
      } catch (error) {
        console.error('Error fetching posts:', error);
        if (error instanceof Error) {
          console.error('Error stack:', error.stack);
        }
        setError(error instanceof Error ? error.message : 'Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [status]);

  // Handle authentication
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  // Handle escape key press
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    if (selectedImage) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [selectedImage]);

  // Clean up object URLs when component unmounts or file changes
  useEffect(() => {
    return () => {
      if (selectedFile?.preview) {
        URL.revokeObjectURL(selectedFile.preview);
      }
    };
  }, [selectedFile]);

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  const handleLike = async (postId: string) => {
    if (!session?.user) {
      alert('Please sign in to like posts');
      return;
    }

    try {
      console.log('Attempting to like post:', postId);
      const response = await fetch(`/api/posts/${postId}/like`, {
        method: 'POST',
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        throw new Error(errorData.error || 'Failed to like post');
      }

      const { liked } = await response.json();
      console.log('Like response:', { postId, liked });

      // Update the post's like state and count
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId
            ? {
                ...post,
                isLiked: liked,
                likesCount: liked ? post.likesCount + 1 : post.likesCount - 1,
              }
            : post
        )
      );
      } catch (error) {
      console.error('Error liking post:', error);
      alert(error instanceof Error ? error.message : 'Failed to like post. Please try again.');
      }
    };

  // Close modal when clicking outside or pressing escape
  const handleCloseModal = () => {
    setSelectedImage(null);
  };

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

  const toggleFollow = async (profileId: string) => {
    try {
      const response = await fetch('/api/follow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ targetUserId: profileId }),
      });

      if (response.ok) {
        const data = await response.json();
        setFollowingStates(prev => ({
          ...prev,
          [profileId]: data.followed
        }));
        
        // Refresh recommended profiles
        const profilesResponse = await fetch('/api/recommended-profiles');
        if (profilesResponse.ok) {
          const profilesData = await profilesResponse.json();
          setRecommendedProfiles(profilesData.profiles);
        }
      }
    } catch (error) {
      console.error('Error toggling follow:', error);
    }
  };

  const toggleComments = async (postId: string) => {
    try {
      if (!showComments[postId]) {
        await fetchComments(postId);
      }
      setShowComments(prev => ({
        ...prev,
        [postId]: !prev[postId],
      }));
    } catch (error) {
      console.error('Error toggling comments:', error);
      setError(error instanceof Error ? error.message : 'Failed to toggle comments');
    }
  };

  const fetchComments = async (postId: string) => {
    try {
      console.log('Fetching comments for post:', postId);
      const response = await fetch(`/api/posts/${postId}/comments`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch comments');
      }

      const data = await response.json();
      console.log('Fetched comments:', data.comments);

      if (!Array.isArray(data.comments)) {
        throw new Error('Invalid comments data received');
      }

      // Transform comments to include default user image if none is provided
      const transformedComments = data.comments.map(comment => ({
        ...comment,
        user: {
          ...comment.user,
          image: comment.user?.image || getRandomProfileIcon(),
        },
      }));

      setComments(prev => ({
        ...prev,
        [postId]: transformedComments,
      }));
    } catch (error) {
      console.error('Error fetching comments:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch comments');
    }
  };

  const handleComment = async (postId: string) => {
    try {
      const commentContent = newComment[postId]?.trim();
      if (!commentContent) {
        alert('Please enter a comment');
        return;
      }

      console.log('Creating comment for post:', postId);
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: commentContent }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create comment');
      }

      const data = await response.json();
      console.log('Comment created:', data);

      if (!data.comment || !data.comment.user) {
        throw new Error('Invalid comment data received');
      }

      // Transform the new comment to include default user image
      const transformedComment = {
        ...data.comment,
        user: {
          ...data.comment.user,
          image: data.comment.user.image || getRandomProfileIcon(),
        },
      };

      // Update the comments state
      setComments(prev => ({
        ...prev,
        [postId]: [transformedComment, ...(prev[postId] || [])],
      }));

      // Update the post's comments count
      setPosts(prev => prev.map(post => 
        post.id === postId 
          ? { ...post, commentsCount: post.commentsCount + 1 }
          : post
      ));

      // Clear the comment input
      setNewComment(prev => ({
        ...prev,
        [postId]: '',
      }));

      // Show the comments section
      setShowComments(prev => ({
        ...prev,
        [postId]: true,
      }));
    } catch (error) {
      console.error('Error creating comment:', error);
      setError(error instanceof Error ? error.message : 'Failed to create comment');
    }
  };

  const handleFileSelect = (type: 'image' | 'video' | 'document') => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = allowedFileTypes[type];
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileType = file.type.split('/')[0] as 'image' | 'video' | 'document';
    let preview = '';

    if (fileType === 'image' || fileType === 'video') {
      preview = URL.createObjectURL(file);
    }

    const newSelectedFile: SelectedFile = {
      file,
      type: fileType,
      preview
    };

    setSelectedFile(newSelectedFile);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Validate file type
      const fileType = selectedFile.file.type.split('/')[0];
      if (!['image', 'video', 'application'].includes(fileType)) {
        throw new Error('Invalid file type. Please upload an image, video, or document.');
      }

      // Validate file size (max 50MB)
      if (selectedFile.file.size > 50 * 1024 * 1024) {
        throw new Error('File size too large. Maximum size is 50MB.');
      }

      const formData = new FormData();
      formData.append('file', selectedFile.file);
      formData.append('type', selectedFile.type);
      
      // Get the caption from the textarea
      const caption = (document.querySelector('textarea[placeholder*="Share your"]') as HTMLTextAreaElement)?.value || '';
      formData.append('caption', caption);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        // Add signal to allow for timeout/cancellation
        signal: AbortSignal.timeout(30000), // 30 second timeout
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: `Upload failed with status ${response.status}` }));
        throw new Error(errorData.error || `Upload failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log('Upload successful:', data);

      // Create new post object
      const newPost: Post = {
        ...data.post,
        author: {
          name: session?.user?.name || '',
          image: session?.user?.image || getRandomProfileIcon()
        }
      };

      // Add the new post to the feed
      setPosts(prevPosts => [newPost, ...prevPosts]);

      // Clear the form
      setSelectedFile(null);
      setUploadProgress(0);
      if (document.querySelector('textarea[placeholder*="Share your"]')) {
        (document.querySelector('textarea[placeholder*="Share your"]') as HTMLTextAreaElement).value = '';
      }

      // Show success message
      alert('File uploaded successfully!');

    } catch (error) {
      console.error('Error uploading file:', error);
      alert(error instanceof Error ? error.message : 'Error uploading file. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  // Add this function to handle share button click
  const handleShare = (post: Post) => {
    setSelectedPost(post);
    setShareModalOpen(true);
  };

  // Update the post rendering to include likes and comments
  const renderPost = (post: Post) => (
    <div key={post.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <Image
            src={post.author?.image || getRandomProfileIcon()}
            alt={post.author?.name || 'Anonymous'}
            width={40}
            height={40}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="font-semibold">{post.author?.name || 'Anonymous'}</h3>
          <p className="text-sm text-gray-500">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Post content */}
      <div className="mt-4">
        {post.type === 'image' && post.imageUrl && (
          <Image
            src={post.imageUrl}
            alt={post.caption || 'Post image'}
            width={500}
            height={500}
            className="rounded-lg w-full"
          />
        )}
        {post.type === 'video' && post.imageUrl && (
          <video
            src={post.imageUrl}
            controls
            className="rounded-lg w-full"
          />
        )}
        {post.type === 'document' && post.imageUrl && (
          <a
            href={post.imageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-4 bg-gray-50 rounded-lg"
          >
            <Icon name="document" className="w-6 h-6 text-gray-500 mr-2" />
            <span className="text-gray-700">View Document</span>
          </a>
        )}
      </div>

      {/* Post caption */}
      {post.caption && (
        <p className="mt-2 text-gray-700">{post.caption}</p>
      )}

      {/* Post actions */}
      <div className="flex items-center space-x-4 mt-4">
        <button
          onClick={() => handleLike(post.id)}
          className={`flex items-center space-x-1 ${
            post.isLiked ? 'text-red-500' : 'text-gray-500'
          }`}
        >
          <Icon name="heart" className="w-5 h-5" />
          <span>{post.likesCount || 0}</span>
        </button>
        <button
          onClick={() => toggleComments(post.id)}
          className="flex items-center space-x-1 text-gray-500"
        >
          <Icon name="comment" className="w-5 h-5" />
          <span>{post.commentsCount || 0}</span>
        </button>
        <button 
          onClick={() => handleShare(post)}
          className="flex items-center space-x-1 text-gray-500"
        >
          <Icon name="share" className="w-5 h-5" />
          <span>0</span>
        </button>
      </div>

      {/* Comments section */}
      {showComments[post.id] && (
        <div className="mt-4 border-t pt-4">
          {/* Comment input */}
          <div className="flex space-x-2">
            <input
              type="text"
              value={newComment[post.id] || ''}
              onChange={(e) =>
                setNewComment(prev => ({
                  ...prev,
                  [post.id]: e.target.value,
                }))
              }
              placeholder="Add a comment..."
              className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={() => handleComment(post.id)}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
            >
              Post
            </button>
          </div>

          {/* Comments list */}
          <div className="mt-4 space-y-4">
            {comments[post.id]?.map((comment) => (
              <div key={comment.id} className="flex space-x-3">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <Image
                    src={comment.user?.image || getRandomProfileIcon()}
                    alt={comment.user?.name || 'Anonymous'}
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="bg-gray-100 rounded-lg px-3 py-2">
                    <p className="font-medium text-sm">{comment.user?.name || 'Anonymous'}</p>
                    <p className="text-sm text-gray-700">{comment.content}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

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
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-4">
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
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <button 
                      onClick={() => handleFileSelect('image')}
                      className="flex items-center gap-2 text-[#202126] hover:text-purple-600 transition-colors"
                    >
                      <Icon name="image" size={20} />
                      <span>Image</span>
                    </button>
                    <button 
                      onClick={() => handleFileSelect('video')}
                      className="flex items-center gap-2 text-[#202126] hover:text-purple-600 transition-colors"
                    >
                      <Icon name="video" size={20} />
                      <span>Video</span>
                    </button>
                    <button 
                      onClick={() => handleFileSelect('document')}
                      className="flex items-center gap-2 text-[#202126] hover:text-purple-600 transition-colors"
                    >
                      <Icon name="file" size={20} />
                      <span>Document</span>
                    </button>
                  </div>
                  <button 
                    onClick={handleUpload}
                    disabled={!selectedFile || isUploading}
                    className={`px-4 py-2 bg-gradient-to-r from-[#814ADA] to-[#392CA0] text-white rounded-lg transition-opacity ${
                      (!selectedFile || isUploading) ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
                    }`}
                  >
                    {isUploading ? `Uploading... ${uploadProgress}%` : 'Post'}
                  </button>
                </div>
              </div>

              {/* File Preview */}
              {selectedFile && (
                <div className="mt-4 relative">
                  {selectedFile.type === 'image' && (
                    <div className="relative w-full h-48 rounded-lg overflow-hidden">
                      <Image
                        src={selectedFile.preview || ''}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  {selectedFile.type === 'video' && (
                    <video
                      src={selectedFile.preview}
                      controls
                      className="w-full max-h-48 rounded-lg"
                    />
                  )}
                  {selectedFile.type === 'document' && (
                    <div className="flex items-center gap-2 p-4 bg-gray-100 rounded-lg">
                      <Icon name="file" size={24} />
                      <span className="text-sm truncate">{selectedFile.file.name}</span>
                    </div>
                  )}
                  <button
                    onClick={() => {
                      if (selectedFile.preview) {
                        URL.revokeObjectURL(selectedFile.preview);
                      }
                      setSelectedFile(null);
                    }}
                    className="absolute top-2 right-2 p-1 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70"
                  >
                    <Icon name="close" size={16} />
                  </button>
                </div>
              )}

              {/* New Activity Header */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-red-500 font-medium">New activity</span>
                <div className="h-[1px] flex-1 bg-[#E0DAF3]"></div>
              </div>

              {/* Feed Posts */}
              <div className="space-y-4">
                {loading ? (
                  <div className="text-center py-4">Loading...</div>
                ) : posts.length === 0 ? (
                  <div className="text-center py-4 text-gray-500">No posts yet</div>
                ) : (
                  posts.map((post) => renderPost(post))
                )}
              </div>
            </div>

            {/* Right Sidebar - Sticky */}
            <div className="w-[380px] shrink-0 sticky top-6">
              {/* Recommended Profiles */}
              <div className="bg-white rounded-xl border border-[#E0DAF3] p-4 mb-4">
                <h3 className="text-lg font-medium text-[#202126] mb-4">Recommended profiles</h3>
                <div className="space-y-4">
                  {loading ? (
                    <div className="flex justify-center items-center h-32">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                    </div>
                  ) : recommendedProfiles.length > 0 ? (
                    recommendedProfiles.map((profile) => (
                      <div key={profile.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full overflow-hidden">
                            <Image
                              src={profile.avatar}
                              alt={profile.name}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
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
                            <div className="text-xs text-gray-500">
                              {profile.followers} followers • {profile.following} following
                            </div>
                          </div>
                        </div>
                        <button 
                          onClick={() => toggleFollow(profile.id)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
                            followingStates[profile.id]
                              ? 'bg-purple-50 text-purple-600'
                              : 'bg-[#F6F8FA] hover:text-purple-600'
                          }`}
                        >
                          {!followingStates[profile.id] && (
                            <Icon name="plus" size={14} />
                          )}
                          <span className="text-sm font-medium">
                            {followingStates[profile.id] ? 'Following' : 'Follow'}
                          </span>
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-500 py-4">
                      No recommended profiles at the moment
                    </div>
                  )}
                </div>
              </div>

              {/* Upcoming Events Section */}
              <div className="bg-white rounded-xl border border-[#E0DAF3] p-4 h-[calc(100vh-26rem)] flex flex-col">
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

        {/* Share Modal */}
        {selectedPost && (
          <ShareModal
            isOpen={shareModalOpen}
            onClose={() => setShareModalOpen(false)}
            postUrl={`${window.location.origin}/posts/${selectedPost.id}`}
            postCaption={selectedPost.caption}
          />
        )}
    </div>
    </DashboardLayout>
  );
} 