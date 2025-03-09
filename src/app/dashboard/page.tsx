import React from 'react';
import Image from 'next/image';

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

export default function DashboardPage() {
  return (
    <div className="relative w-[1728px] h-[1080px] bg-[#F6F8FA]">
      {/* Left Sidebar */}
      <div className="absolute left-6 top-24 w-[206px] flex flex-col gap-4">
        {/* Logo */}
        <div className="flex flex-row items-center gap-2.5 w-[173px] h-9">
          <div className="w-9 h-9 bg-[#530EA9] rounded-[13.93px]" />
          <span className="text-gradient-primary">StudioSix</span>
        </div>

        {/* Profile Section */}
        <div className="flex flex-col p-2.5 gap-2.5 w-[206px] bg-gradient-to-r from-[#814ADA] to-[#4130A7] rounded-lg">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-[13.93px] bg-gray-200" />
              <div className="flex flex-col">
                <span className="text-white font-inter font-semibold text-lg">Mark</span>
                <span className="text-white font-inter text-xs">Free</span>
              </div>
            </div>
            <button className="w-6 h-6">
              <div className="border-[1.5px] border-white w-1.5 h-0.5 mx-auto" />
            </button>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-0.5">
              <div className="w-5 h-5" />
              <span className="text-white font-inter text-xs">500 Tokens</span>
            </div>
            <button className="px-1.5 py-1 bg-white rounded-[30px]">
              <span className="text-xs font-roboto bg-gradient-to-r from-[#854BDC] to-[#AB4FF0] bg-clip-text text-transparent">
                Get More
              </span>
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col gap-2.5 w-[206px]">
          <MenuItem icon="home" label="Home" isActive={true} />
          <MenuItem icon="edit" label="Generate Images" />
          <MenuItem icon="gallery" label="Image Library" />
          <MenuItem icon="video" label="Video Library" />
          <div className="w-full border-t border-dashed border-[#CDD0D5] my-2.5" />
          <MenuItem icon="grid" label="Feed" />
          <MenuItem icon="wallet" label="Pricing" />
          <MenuItem icon="card" label="Upgrade" />
          <div className="w-full border-t border-dashed border-[#C7CCD8] my-2.5" />
          <MenuItem icon="star" label="Review" />
          <MenuItem icon="crown" label="Premium" />
          <MenuItem icon="settings" label="Settings" />
          <MenuItem icon="help" label="Help" />
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-3.5 w-[206px]">
          <div className="flex justify-between items-center">
            <span className="text-[#202126] font-inter font-medium text-sm">Terms</span>
            <span className="text-[#202126] font-inter font-medium text-sm">|</span>
            <span className="text-[#202126] font-inter font-medium text-sm">DMCA</span>
            <span className="text-[#202126] font-inter font-medium text-sm">|</span>
            <span className="text-[#202126] font-inter font-medium text-sm">Affiliates</span>
          </div>
          <div className="flex justify-between items-center">
            {['facebook', 'blogger', 'messenger', 'youtube', 'whatsapp'].map((icon) => (
              <button key={icon} className="w-5 h-5">
                {/* Social icons will be added later */}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="absolute left-[254px] top-6 w-[1439px] h-[1002px] bg-[radial-gradient(18.31%_18.31%_at_50%_50%,#F0C6FF_0%,#F6F8FA_100%)] border border-[#CDD0D5] rounded-2xl">
        {/* Header Container */}
        <div className="flex flex-row items-center gap-2.5 absolute left-5 top-5 w-[106px] h-6">
          {/* Back Icon */}
          <button className="w-6 h-6 border border-[#CDD0D5] rounded-md flex items-center justify-center">
            <div className="w-1.5 h-1.5 border-[1.5px] border-[#202126]"></div>
          </button>
          
          {/* Breadcrumb Icon */}
          <button className="w-6 h-6 border border-[#CDD0D5] rounded-md flex items-center justify-center">
            <div className="w-1.5 h-1.5 border-[1.5px] border-[#CDD0D5]"></div>
          </button>
          
          {/* Header Title */}
          <span className="font-roboto font-medium text-sm text-[#202126]">Home</span>
        </div>

        {/* Hero Section */}
        <div className="absolute left-5 top-16 w-[1400px] h-[360px] rounded-2xl bg-white">
          <div className="flex flex-col items-center gap-1.5 absolute left-[527px] top-[81px] w-[381px]">
            <h1 className="w-[935px] font-roboto font-semibold text-5xl text-center text-[#1B1464]">
              Transform Your Sketches into Stunning Renders
            </h1>
            <p className="w-[381px] font-roboto text-base text-center text-[#1B1464]">
              Experience the future of architectural visualization
            </p>
          </div>

          {/* Most Used Quick Access */}
          <div className="absolute left-1/2 -translate-x-1/2 top-[180px] flex justify-center items-center gap-1.5 w-[563px] h-[83px] bg-white border border-[#CDD0D5] shadow-[0px_4px_10px_rgba(0,0,0,0.02),0px_4px_4px_rgba(135,80,255,0.1)] rounded-[50px]">
            <button className="flex flex-col items-center p-[10px_12px] gap-1.5 w-[114px] h-[62px] bg-white rounded-[140px]">
              <div className="w-5 h-5" />
              <span className="font-roboto font-medium text-xs text-[#202126]">Add Sketch</span>
            </button>
            <button className="flex flex-col items-center p-4 gap-1.5 w-[177px] h-[88px] bg-gradient-to-r from-[#844BDC] to-[#362B9E] border border-[#F6F8FA] shadow-[0px_2px_3px_rgba(0,0,0,0.01),0px_2px_2px_rgba(135,80,255,0.06)] rounded-[140px]">
              <div className="w-[30px] h-[30px]" />
              <span className="font-roboto font-medium text-sm text-white">Generate Images</span>
            </button>
            <button className="flex flex-col items-center p-[10px_12px] gap-1.5 w-[112px] h-[62px] bg-white rounded-[140px]">
              <div className="w-5 h-5" />
              <span className="font-roboto font-medium text-xs text-[#202126]">Add Video</span>
            </button>
          </div>
        </div>

        {/* Most Used Section */}
        <div className="absolute left-5 top-[527px] w-[1385px] flex flex-wrap items-start content-start gap-4">
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
      </div>
    </div>
  );
} 