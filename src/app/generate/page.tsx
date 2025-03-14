'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '@/components/Icons';
import DashboardLayout from '@/components/DashboardLayout';

export default function GeneratePage() {
  const [selectedTool, setSelectedTool] = useState('Exterior AI');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedImage, setGeneratedImage] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sample images array (replace with your actual gallery images)
  const sampleImages = [
    '/gallery/image1.jpg',
    '/gallery/image2.jpg',
    '/gallery/image3.jpg',
    '/gallery/image4.jpg',
    '/gallery/image5.jpg',
    '/gallery/image6.jpg',
    '/gallery/image7.jpg',
    '/gallery/image8.jpg',
  ];

  const handleGenerate = async () => {
    setIsLoading(true);
    setProgress(0);
    setGeneratedImage('');

    // Simulate progress animation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    // After progress reaches 100%, show random image
    setTimeout(() => {
      const randomImage = sampleImages[Math.floor(Math.random() * sampleImages.length)];
      setGeneratedImage(randomImage);
      setIsLoading(false);
    }, 5000);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleDeleteImage = () => {
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <DashboardLayout currentPage="Generate">
      {/* Content Container */}
      <div className="w-full h-[calc(100vh-6rem)] bg-[radial-gradient(18.31%_18.31%_at_50%_50%,#F0C6FF_0%,#F6F8FA_100%)] rounded-2xl overflow-hidden">
        <div className="flex px-5 h-full overflow-hidden">
          {/* Left Panel */}
          <div className="w-[484px] overflow-hidden">
            <div className="h-full overflow-y-auto custom-scrollbar pr-5">
              <div className="pt-4">
                {/* Tool Selection */}
                <div className="flex flex-col gap-1.5 w-[380px] h-[93px]">
                  <label className="font-roboto font-medium text-base text-[#1A1B1E]">Tool</label>
            <div className="flex justify-between items-center px-[19px] py-[13px] w-full h-[63px] bg-white border border-[#E0DAF3] rounded-lg">
                    <span className="font-roboto text-base text-[#2F3033]">{selectedTool}</span>
              <div className="w-6 h-6">
                <div className="border-[1.5px] border-[#202126] w-1.5 h-1.5 transform rotate-45 translate-x-2 translate-y-2"></div>
              </div>
            </div>
          </div>

          {/* Upload Section */}
                <div className="flex flex-col gap-1.5 w-[380px] mt-[17px]">
                  <label className="font-roboto font-medium text-base text-[#1A1B1E]">Upload Image</label>
                  <div 
                    className={`flex flex-col items-center justify-center w-[379px] h-[232px] bg-white border-2 border-dashed transition-colors duration-200 rounded-[9px] relative overflow-hidden
                      ${isDragging ? 'border-[#844BDC] bg-purple-50/20' : 'border-[#D3D3D3]'}
                      ${uploadedImage ? 'p-0' : 'p-4'}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileSelect}
                    />
                    
                    {uploadedImage ? (
                      <div className="relative w-full h-full group">
                        <img 
                          src={uploadedImage} 
                          alt="Uploaded sketch"
                          className="w-full h-full object-contain"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                          <button
                            onClick={handleUploadClick}
                            className="flex justify-center items-center px-4 py-2.5 bg-white/90 hover:bg-white transition-colors rounded-[10px]"
                          >
                            <span className="font-roboto font-medium text-sm text-[#202126]">Change Image</span>
                          </button>
                          <button
                            onClick={handleDeleteImage}
                            className="flex justify-center items-center px-4 py-2.5 bg-red-500/90 hover:bg-red-500 transition-colors rounded-[10px]"
                          >
                            <span className="font-roboto font-medium text-sm text-white">Delete</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full gap-3">
                        <button 
                          onClick={handleUploadClick}
                          className="flex justify-center items-center px-4 py-2.5 w-[149.6px] h-10 bg-gradient-to-r from-[#844BDC] to-[#342A9C] border-2 border-white shadow-[0px_1px_2px_rgba(135,80,255,0.05)] rounded-[10px]"
                        >
                          <span className="font-roboto font-medium text-sm text-white">Upload Image</span>
                        </button>
                        <span className="font-roboto text-base text-[#7E7F83]">or drag & drop image</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Output Image */}
                <div className="flex flex-col gap-1.5 w-[380px] mt-[27px]">
                  <label className="font-roboto font-medium text-base text-[#1A1B1E]">Output Image</label>
                  <div className="flex gap-4 w-[371.84px]">
                    <div className="w-[100.91px] h-[51.45px] rounded-md bg-gray-200 flex items-center justify-center">
                      <span className="text-xs text-[#7E7F83]">3D Mass</span>
                    </div>
                    <div className="w-[100.91px] h-[51.45px] rounded-md bg-gray-200 flex items-center justify-center">
                      <span className="text-xs text-[#7E7F83]">Photorealistic</span>
                    </div>
                    <div className="w-[100.91px] h-[51.45px] rounded-md bg-gray-200 flex items-center justify-center">
                      <span className="text-xs text-[#7E7F83]">Water Color</span>
                    </div>
                  </div>
                </div>

                {/* Creativity Section */}
                <div className="flex flex-col gap-4 w-[380px] mt-[27px]">
                  <span className="font-roboto font-medium text-base text-[#1A1B1E]">Creativity</span>
                  <p className="text-sm text-[#7E7F83]">
                    Choose between precision and creativity—Exact Render follows your input closely, while Creative Render adds artistic variations and unique details.
                  </p>
                  <div className="flex gap-4">
                    <button className="flex-1 px-4 py-2.5 bg-[#433D84] rounded-[10px]">
                      <span className="font-roboto font-medium text-sm text-white">Exact Render</span>
                    </button>
                    <button className="flex-1 px-4 py-2.5 border border-[#D3BBFB] rounded-[10px]">
                      <span className="font-roboto font-medium text-sm text-[#1B1464]">Creative Render</span>
              </button>
            </div>
          </div>

                {/* Lighting Control */}
                <div className="flex flex-col gap-1.5 w-[380px] mt-[27px]">
                  <label className="font-roboto font-medium text-base text-[#1A1B1E]">Lighting Control</label>
                  <div className="flex justify-between items-center px-[19px] py-[13px] w-full h-[63px] bg-white border border-[#E0DAF3] rounded-lg">
                    <span className="font-roboto text-base text-[#2F3033]">Morning ☀️</span>
                    <div className="w-6 h-6">
                      <div className="border-[1.5px] border-[#202126] w-1.5 h-1.5 transform rotate-45 translate-x-2 translate-y-2"></div>
                    </div>
            </div>
          </div>

          {/* Action Buttons */}
                <div className="flex flex-col gap-4 w-[379px] mt-[27px]">
            <div className="flex justify-between items-center p-1.5 w-full h-[84px] bg-white border border-[#D3BBFB] rounded-[9px]">
              <button className="flex justify-center items-center px-4 py-2.5 w-[149.6px] h-10 bg-gradient-to-r from-[#844BDC] to-[#342A9C] border-2 border-white shadow-[0px_1px_2px_rgba(135,80,255,0.05)] rounded-[10px]">
                <span className="font-roboto font-medium text-sm text-white">Generate Now</span>
              </button>
              <button className="flex justify-center items-center px-4 py-2.5 w-[149.6px] h-10 border-2 border-[#D3BBFB] rounded-[10px]">
                <span className="font-roboto font-medium text-sm text-[#1B1464]">Save for Later</span>
              </button>
                  </div>
                </div>
            </div>
          </div>
        </div>

          {/* Right Panel */}
          <div className="flex-grow ml-5 flex flex-col gap-4">
            {/* Prompt Input */}
          <div className="flex flex-col gap-1.5 w-full">
              <div className="flex justify-between items-center">
            <label className="font-roboto font-medium text-base text-[#1A1B1E]">Prompt</label>
                <button className="flex items-center gap-1 text-[#804ED5]">
                  <span className="font-roboto text-base">Generate Prompt</span>
                  <Icon name="sparkles" size={20} />
                </button>
              </div>
            <textarea 
              className="w-full h-[106px] p-[13px_19px] bg-white border border-[#E0DAF3] rounded-lg font-roboto text-base resize-none"
                placeholder="Enter a description of your image, e.g., villa, modern design, daylight"
            />
          </div>

          {/* Generate Button */}
            <button 
              onClick={handleGenerate}
              className="flex justify-center items-center py-[13px] px-4 gap-1 w-full h-[50px] bg-gradient-to-r from-[#8A53DD] to-[#372B9F] shadow-[0px_1px_2px_rgba(135,80,255,0.05)] rounded-[10px]"
            >
              <span className="font-roboto font-medium text-base text-white">Generate Image (12 Credits)</span>
          </button>

            {/* Generated Image Result */}
            <div className="flex-grow bg-white rounded-2xl overflow-hidden flex flex-col h-[600px]">
              {/* Image Container */}
              <div className="relative w-full h-full">
                {isLoading ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="w-10 h-10 relative">
                      <div 
                        className="absolute inset-[15%] rounded-full animate-spin"
                        style={{
                          border: '2px solid transparent',
                          borderTopColor: '#844BDC',
                          borderRightColor: '#342A9C',
                          transform: 'rotate(45deg)',
                        }}
                      ></div>
                    </div>
                    <span className="mt-4 font-roboto text-base text-[#6C7275]">
                      Generating... {progress}%
                    </span>
                  </div>
                ) : generatedImage ? (
                  <div className="w-full h-full">
                    <img 
                      src={generatedImage} 
                      alt="Generated render"
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-roboto text-base text-[#6C7275]">
                      Click Generate to create an image
                    </span>
                  </div>
                )}
              </div>
        </div>

            {/* Action Buttons Container */}
            <div className="bg-white rounded-2xl p-4 mt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <button className="flex items-center gap-2 text-[#6C7275] hover:text-[#202126] transition-colors">
                    <Icon name="trash" size={20} />
                    <span className="font-roboto text-sm">Delete</span>
          </button>
                  <button className="flex items-center gap-2 text-[#6C7275] hover:text-[#202126] transition-colors">
                    <Icon name="share" size={20} />
                    <span className="font-roboto text-sm">Share</span>
          </button>
                  <button className="flex items-center gap-2 text-[#6C7275] hover:text-[#202126] transition-colors">
                    <Icon name="refresh" size={20} />
                    <span className="font-roboto text-sm">Regenerate</span>
          </button>
                  <button className="flex items-center gap-2 text-[#6C7275] hover:text-[#202126] transition-colors">
                    <Icon name="gif" size={20} />
                    <span className="font-roboto text-sm">Gif</span>
          </button>
                </div>
                <button className="flex items-center gap-2 px-6 py-2.5 bg-[#433D84] rounded-lg text-white hover:bg-[#372F6A] transition-colors">
                  <Icon name="download" size={20} className="text-white" />
                  <span className="font-roboto text-sm font-medium">Download</span>
          </button>
        </div>
      </div>
    </div>
        </div>
      </div>

      {/* Add this CSS at the end of the file */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(203, 213, 225, 0.8);
          border-radius: 20px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(203, 213, 225, 1);
        }
      `}</style>
    </DashboardLayout>
  );
} 