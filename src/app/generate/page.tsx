"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '@/components/Icons';
import DashboardLayout from '@/components/DashboardLayout';
import ImagePreviewModal from '@/components/ImagePreviewModal';
import { RenderSettingsPanel } from '@/components/RenderSettingsPanel';
import type { RenderSettings } from '@/components/RenderSettingsPanel';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import ShareModal from '@/components/ShareModal';
import { ShareIcon } from '@/components/Icons';

const defaultSettings: RenderSettings = {
  style: {
    architecturalStyle: 'modern',
    buildingType: 'residential',
    customStyleNotes: '',
  },
  materials: {
    primaryMaterial: 'concrete',
    secondaryMaterial: 'glass',
    finishType: 'matte',
  },
  lighting: {
    timeOfDay: 12,
    weather: 'clear',
    shadowIntensity: 50,
  },
  technical: {
    controlNetMode: 'Balanced',
    denoisingStrength: 0.65,
    steps: 40,
    cfgScale: 7.0,
  },
};

export default function GeneratePage() {
  const { data: session } = useSession();
  const [settings, setSettings] = useState({
    ...defaultSettings,
    technical: {
      ...defaultSettings.technical,
      denoisingStrength: 0.65,
      steps: 40,
      cfgScale: 7.0,
      controlNetMode: 'Balanced'
    }
  });
  const [userPrompt, setUserPrompt] = useState('');
  const [selectedTool, setSelectedTool] = useState('Exterior AI');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedImage, setGeneratedImage] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState('style');
  const [isToolDropdownOpen, setIsToolDropdownOpen] = useState(false);
  const [credits, setCredits] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

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

  const tools = [
    'Exterior AI',
    'Interior AI',
    'Render Enhancer',
    'Landscape AI',
    'Video AI'
  ];

  const handleToolSelect = (tool: string) => {
    setSelectedTool(tool);
    setIsToolDropdownOpen(false);
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    setProgress(0);

    try {
      // Check if user has enough credits
      if (credits === null || credits < 13) {
        setError('Insufficient credits. Please purchase more credits to continue.');
        setIsLoading(false);
        return;
      }

      if (!uploadedImage) {
        setError('Please upload an image first');
        setIsLoading(false);
        return;
      }

      // Extract base64 data from data URL
      const base64Data = uploadedImage.split(',')[1];

      // Use credits
      const useCreditsResponse = await fetch('/api/credits/use', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 13,
          description: 'Generated one image'
        }),
      });

      if (!useCreditsResponse.ok) {
        const errorData = await useCreditsResponse.json();
        throw new Error(errorData.error || 'Failed to use credits');
      }

      // Call the image generation API
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          settings,
          image: base64Data,
          prompt: userPrompt
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate image');
      }

      const data = await response.json();
      if (!data.image) {
        throw new Error('No image data in response');
      }

      setGeneratedImage(data.image);
      
      // Update credits display
      const { credits: updatedCredits } = await useCreditsResponse.json();
      setCredits(updatedCredits);
    } catch (error) {
      console.error('Generation error:', error);
      setError(error instanceof Error ? error.message : 'Failed to generate image');
    } finally {
      setIsLoading(false);
      setProgress(100);
    }
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

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target?.result as string;
        setUploadedImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target?.result as string;
        setUploadedImage(base64String);
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

  const handleImageClick = (imageUrl: string) => {
    setPreviewImage(imageUrl);
    setIsPreviewOpen(true);
  };

  // Fetch user's credits on component mount
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

  useEffect(() => {
    fetchCredits();
  }, []);

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Please sign in to generate images</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <DashboardLayout currentPage="Generate">
        <div className="w-full h-[calc(100vh-6rem)] bg-[radial-gradient(18.31%_18.31%_at_50%_50%,#F0C6FF_0%,#F6F8FA_100%)] rounded-2xl overflow-hidden">
          <div className="flex px-5 h-full overflow-hidden">
            {/* Left Panel */}
            <div className="w-[484px] overflow-hidden">
              <div className="h-full overflow-y-auto custom-scrollbar pr-5">
                <div className="pt-4 flex flex-col gap-6">
                  {/* Tool Selection */}
                  <div className="flex flex-col gap-1.5 w-[380px]">
                    <label className="font-roboto font-medium text-base text-[#1A1B1E]">Tool</label>
                    <div className="relative">
                      <button
                        onClick={() => setIsToolDropdownOpen(!isToolDropdownOpen)}
                        className="flex justify-between items-center px-[19px] py-[13px] w-full h-[63px] bg-white border border-[#E0DAF3] rounded-lg hover:border-[#844BDC] transition-colors"
                      >
                        <span className="font-roboto text-base text-[#2F3033]">{selectedTool}</span>
                        <div className={`transition-transform duration-200 ${isToolDropdownOpen ? 'rotate-180' : ''}`}>
                          <Icon name="chevron-down" size={20} className="text-[#202126]" />
                        </div>
                      </button>
                      
                      {isToolDropdownOpen && (
                        <div className="absolute z-20 w-full mt-2 bg-white border border-[#E0DAF3] rounded-lg shadow-lg overflow-hidden">
                          {tools.map((tool) => (
                            <button
                              key={tool}
                              onClick={() => handleToolSelect(tool)}
                              className={`w-full px-[19px] py-[13px] text-left hover:bg-[#F6F8FA] transition-colors
                                ${selectedTool === tool ? 'bg-[#F6F8FA] text-[#844BDC]' : 'text-[#2F3033]'}
                              `}
                            >
                              <span className="font-roboto text-base">{tool}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Upload Section */}
                  <div className="flex flex-col gap-1.5 w-[380px]">
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
                            className="w-full h-full object-contain cursor-pointer"
                            onClick={() => handleImageClick(uploadedImage)}
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

                  {/* Settings Panel */}
                  <div className="w-[380px]">
                    {/* Settings Tabs */}
                    <div className="flex gap-2 mb-6">
                      {['style', 'materials', 'lighting', 'technical'].map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            activeTab === tab
                              ? 'bg-gradient-to-r from-[#844BDC] to-[#342A9C] text-white'
                              : 'text-[#2F3033] border border-[#E0DAF3] bg-white'
                          }`}
                        >
                          {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                      ))}
                    </div>

                    {/* Settings Content */}
                    <div className="bg-white rounded-lg border border-[#E0DAF3] p-6">
                      {/* Style Tab */}
                      {activeTab === 'style' && (
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <label className="font-roboto font-medium text-sm text-[#1A1B1E]">Architectural Style</label>
                            <select
                              value={settings.style.architecturalStyle}
                              onChange={(e) =>
                                setSettings({
                                  ...settings,
                                  style: { ...settings.style, architecturalStyle: e.target.value },
                                })
                              }
                              className="w-full px-4 py-2.5 bg-white border border-[#E0DAF3] rounded-lg font-roboto text-base text-[#2F3033]"
                            >
                              <option value="modern">Modern</option>
                              <option value="minimalist">Minimalist</option>
                              <option value="industrial">Industrial</option>
                              <option value="traditional">Traditional</option>
                              <option value="contemporary">Contemporary</option>
                            </select>
                          </div>

                          <div className="space-y-2">
                            <label className="font-roboto font-medium text-sm text-[#1A1B1E]">Building Type</label>
                            <select
                              value={settings.style.buildingType}
                              onChange={(e) =>
                                setSettings({
                                  ...settings,
                                  style: { ...settings.style, buildingType: e.target.value },
                                })
                              }
                              className="w-full px-4 py-2.5 bg-white border border-[#E0DAF3] rounded-lg font-roboto text-base text-[#2F3033]"
                            >
                              <option value="residential">Residential</option>
                              <option value="commercial">Commercial</option>
                              <option value="mixed-use">Mixed Use</option>
                            </select>
                          </div>

                          <div className="space-y-2">
                            <label className="font-roboto font-medium text-sm text-[#1A1B1E]">Style Notes</label>
                            <textarea
                              value={settings.style.customStyleNotes}
                              onChange={(e) =>
                                setSettings({
                                  ...settings,
                                  style: { ...settings.style, customStyleNotes: e.target.value },
                                })
                              }
                              className="w-full h-24 px-4 py-2.5 bg-white border border-[#E0DAF3] rounded-lg font-roboto text-base text-[#2F3033] resize-none"
                              placeholder="Add any specific style instructions..."
                            />
                          </div>
                        </div>
                      )}

                      {/* Materials Tab */}
                      {activeTab === 'materials' && (
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <label className="font-roboto font-medium text-sm text-[#1A1B1E]">Primary Material</label>
                            <div className="relative">
                              <div className="flex gap-4 overflow-x-auto pb-8 hide-scrollbar">
                                {[
                                  { value: 'concrete', image: '/materials/concrete.avif' },
                                  { value: 'brick', image: '/materials/brick.avif' },
                                  { value: 'wood', image: '/materials/wood.avif' },
                                  { value: 'stone', image: '/materials/stone.avif' },
                                  { value: 'metal', image: '/materials/metal.avif' },
                                ].map((material) => (
                                  <button
                                    key={material.value}
                                    onClick={() =>
                                      setSettings({
                                        ...settings,
                                        materials: { ...settings.materials, primaryMaterial: material.value },
                                      })
                                    }
                                    className="relative flex-shrink-0 group"
                                  >
                                    <div className={`w-16 h-16 rounded-full overflow-hidden border-2 transition-all ${
                                      settings.materials.primaryMaterial === material.value
                                        ? 'border-[#844BDC] scale-110'
                                        : 'border-transparent hover:border-[#844BDC] hover:scale-105'
                                    }`}>
                                      <img
                                        src={material.image}
                                        alt={material.value}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-[#2F3033] text-white px-3 py-1.5 rounded-md text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                      {material.value.charAt(0).toUpperCase() + material.value.slice(1)}
                                    </div>
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="font-roboto font-medium text-sm text-[#1A1B1E]">Secondary Material</label>
                            <div className="relative">
                              <div className="flex gap-4 overflow-x-auto pb-8 hide-scrollbar">
                                {[
                                  { value: 'steel', image: '/materials/steel.avif' },
                                  { value: 'copper', image: '/materials/copper.avif' },
                                  { value: 'marble', image: '/materials/marble.avif' },
                                  { value: 'brass', image: '/materials/brass.avif' },
                                  { value: 'timber', image: '/materials/timber.avif' },
                                  { value: 'bronze', image: '/materials/bronze.avif' },
                                ].map((material) => (
                                  <button
                                    key={material.value}
                                    onClick={() =>
                                      setSettings({
                                        ...settings,
                                        materials: { ...settings.materials, secondaryMaterial: material.value },
                                      })
                                    }
                                    className="relative flex-shrink-0 group"
                                  >
                                    <div className={`w-16 h-16 rounded-full overflow-hidden border-2 transition-all ${
                                      settings.materials.secondaryMaterial === material.value
                                        ? 'border-[#844BDC] scale-110'
                                        : 'border-transparent hover:border-[#844BDC] hover:scale-105'
                                    }`}>
                                      <img
                                        src={material.image}
                                        alt={material.value}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-[#2F3033] text-white px-3 py-1.5 rounded-md text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                      {material.value.charAt(0).toUpperCase() + material.value.slice(1)}
                                    </div>
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="font-roboto font-medium text-sm text-[#1A1B1E]">Finish Type</label>
                            <div className="grid grid-cols-3 gap-2">
                              {['matte', 'glossy', 'textured'].map((finish) => (
                                <button
                                  key={finish}
                                  onClick={() =>
                                    setSettings({
                                      ...settings,
                                      materials: { ...settings.materials, finishType: finish },
                                    })
                                  }
                                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    settings.materials.finishType === finish
                                      ? 'bg-gradient-to-r from-[#844BDC] to-[#342A9C] text-white'
                                      : 'border border-[#E0DAF3] text-[#2F3033] bg-white'
                                  }`}
                                >
                                  {finish}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Lighting Tab */}
                      {activeTab === 'lighting' && (
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <label className="font-roboto font-medium text-sm text-[#1A1B1E]">Time of Day</label>
                            <div className="space-y-2">
                              <input
                                type="range"
                                min="0"
                                max="24"
                                value={settings.lighting.timeOfDay}
                                onChange={(e) =>
                                  setSettings({
                                    ...settings,
                                    lighting: { ...settings.lighting, timeOfDay: parseInt(e.target.value) },
                                  })
                                }
                                className="w-full accent-[#844BDC]"
                              />
                              <div className="flex justify-between text-sm text-[#2F3033] font-roboto px-2">
                                <span>00:00</span>
                                <span>12:00</span>
                                <span>24:00</span>
                              </div>
                              <div className="text-sm text-[#2F3033] text-right font-roboto">
                                {settings.lighting.timeOfDay.toString().padStart(2, '0')}:00
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="font-roboto font-medium text-sm text-[#1A1B1E]">Weather</label>
                            <div className="grid grid-cols-3 gap-2">
                              {[
                                { value: 'clear', emoji: '☀️' },
                                { value: 'overcast', emoji: '☁️' },
                                { value: 'rainy', emoji: '🌧️' }
                              ].map(({ value, emoji }) => (
                                <button
                                  key={value}
                                  onClick={() =>
                                    setSettings({
                                      ...settings,
                                      lighting: { ...settings.lighting, weather: value },
                                    })
                                  }
                                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    settings.lighting.weather === value
                                      ? 'bg-gradient-to-r from-[#844BDC] to-[#342A9C] text-white'
                                      : 'border border-[#E0DAF3] text-[#2F3033] bg-white'
                                  }`}
                                >
                                  <span>{emoji} {value}</span>
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="font-roboto font-medium text-sm text-[#1A1B1E]">Shadow Intensity</label>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={settings.lighting.shadowIntensity}
                              onChange={(e) =>
                                setSettings({
                                  ...settings,
                                  lighting: { ...settings.lighting, shadowIntensity: parseInt(e.target.value) },
                                })
                              }
                              className="w-full accent-[#844BDC]"
                            />
                          </div>
                        </div>
                      )}

                      {/* Technical Tab */}
                      {activeTab === 'technical' && (
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <label className="font-roboto font-medium text-sm text-[#1A1B1E]">ControlNet Mode</label>
                            <select
                              value={settings.technical.controlNetMode}
                              onChange={(e) =>
                                setSettings({
                                  ...settings,
                                  technical: {
                                    ...settings.technical,
                                    controlNetMode: e.target.value as RenderSettings['technical']['controlNetMode'],
                                  },
                                })
                              }
                              className="w-full px-4 py-2.5 bg-white border border-[#E0DAF3] rounded-lg font-roboto text-base text-[#2F3033]"
                            >
                              <option value="Balanced">Balanced</option>
                              <option value="My prompt is more important">Prompt Focus</option>
                              <option value="ControlNet is more important">Sketch Focus</option>
                            </select>
                          </div>

                          <div className="space-y-2">
                            <label className="font-roboto font-medium text-sm text-[#1A1B1E]">
                              Denoising Strength: {settings.technical.denoisingStrength.toFixed(2)}
                            </label>
                            <input
                              type="range"
                              min="0.4"
                              max="0.8"
                              step="0.05"
                              value={settings.technical.denoisingStrength}
                              onChange={(e) =>
                                setSettings({
                                  ...settings,
                                  technical: {
                                    ...settings.technical,
                                    denoisingStrength: parseFloat(e.target.value),
                                  },
                                })
                              }
                              className="w-full accent-[#844BDC]"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="font-roboto font-medium text-sm text-[#1A1B1E]">
                              Steps: {settings.technical.steps}
                            </label>
                            <input
                              type="range"
                              min="20"
                              max="50"
                              value={settings.technical.steps}
                              onChange={(e) =>
                                setSettings({
                                  ...settings,
                                  technical: { ...settings.technical, steps: parseInt(e.target.value) },
                                })
                              }
                              className="w-full accent-[#844BDC]"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel */}
            <div className="flex-grow ml-5 flex flex-col gap-4">
              {/* Top Section with Prompt and Generate Button */}
              <div className="flex flex-col gap-4">
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
                    value={userPrompt}
                    onChange={(e) => setUserPrompt(e.target.value)}
                    className="w-full h-[106px] p-[13px_19px] bg-white border border-[#E0DAF3] rounded-lg font-roboto text-base resize-none"
                    placeholder="Describe the architectural style and any specific features you want to emphasize..."
                  />
                  <button 
                    onClick={handleGenerate}
                    disabled={isLoading || (credits !== null && credits < 13)}
                    className={`w-full flex justify-center items-center py-[13px] px-4 gap-1 h-[50px] ${
                      isLoading || (credits !== null && credits < 13)
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-gradient-to-r from-[#8A53DD] to-[#372B9F] hover:opacity-90'
                    } shadow-[0px_1px_2px_rgba(135,80,255,0.05)] rounded-[10px] mt-4 transition-all`}
                  >
                    <span className="font-roboto font-medium text-base text-white">
                      {isLoading ? 'Generating...' : 'Generate Image (13 Credits)'}
                    </span>
                  </button>
                  {error && (
                    <p className="mt-2 text-red-500 text-sm">{error}</p>
                  )}
                </div>
              </div>

              {/* Generated Image Result */}
              <div className="flex-grow bg-white rounded-2xl overflow-hidden flex flex-col">
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
                    <div className="relative mt-8 rounded-lg overflow-hidden">
                      <img
                        src={`data:image/png;base64,${generatedImage}`}
                        alt="Generated render"
                        className="w-full h-auto"
                        onClick={() => handleImageClick(`data:image/png;base64,${generatedImage}`)}
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
                        <div className="flex justify-between items-center">
                          <div className="flex space-x-4">
                            <button
                              onClick={() => setIsShareModalOpen(true)}
                              className="text-white hover:text-gray-200 transition-colors"
                              title="Share"
                            >
                              <ShareIcon className="h-6 w-6" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-roboto text-base text-[#6C7275]">
                        {uploadedImage ? 'Click Generate to create an image' : 'Upload an image and click Generate'}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons Container */}
              <div className="bg-white rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <button className="flex items-center gap-2 text-[#6C7275] hover:text-[#202126] transition-colors">
                      <Icon name="trash" size={20} />
                      <span className="font-roboto text-sm">Delete</span>
                    </button>
                    <button 
                      onClick={() => setIsShareModalOpen(true)}
                      className="flex items-center gap-2 text-[#6C7275] hover:text-[#202126] transition-colors"
                    >
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
      </DashboardLayout>

      <ImagePreviewModal
        imageUrl={previewImage || ''}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        imageUrl={generatedImage ? `data:image/png;base64,${generatedImage}` : ''}
      />

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

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
} 