import React from 'react';

export default function GeneratePage() {
  return (
    <div className="relative w-[1728px] h-[1080px] bg-[#F6F8FA]">
      {/* Main Container */}
      <div className="absolute w-[1439px] h-[1002px] left-[254px] top-6 bg-[radial-gradient(18.31%_18.31%_at_50%_50%,#F0C6FF_0%,#F6F8FA_100%)] border border-[#CDD0D5] rounded-2xl">
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
          <span className="font-roboto font-medium text-sm text-[#202126]">Generate</span>
        </div>

        {/* Left Sidebar */}
        <div className="absolute w-[484px] h-[904px] left-5 top-[67px] overflow-y-scroll">
          {/* Style Selection */}
          <div className="flex flex-col gap-1.5 w-[380px] h-[93px] ml-[34px] mt-[22px]">
            <label className="font-roboto font-medium text-base text-[#1A1B1E]">Style</label>
            <div className="flex justify-between items-center px-[19px] py-[13px] w-full h-[63px] bg-white border border-[#E0DAF3] rounded-lg">
              <span className="font-roboto text-base text-[#2F3033]">Select style</span>
              <div className="w-6 h-6">
                <div className="border-[1.5px] border-[#202126] w-1.5 h-1.5 transform rotate-45 translate-x-2 translate-y-2"></div>
              </div>
            </div>
          </div>

          {/* Upload Section */}
          <div className="flex flex-col gap-1.5 w-[380px] ml-[35px] mt-[17px]">
            <label className="font-roboto font-medium text-base text-[#1A1B1E]">Upload Sketch</label>
            <div className="flex flex-col items-center justify-center w-[379px] h-[232px] bg-white border border-dashed border-[#6B6B6B] rounded-[9px]">
              <button className="flex justify-center items-center px-4 py-2.5 w-[149.6px] h-10 bg-gradient-to-r from-[#844BDC] to-[#342A9C] border-2 border-white shadow-[0px_1px_2px_rgba(135,80,255,0.05)] rounded-[10px]">
                <span className="font-roboto font-medium text-sm text-white">Upload Sketch</span>
              </button>
              <span className="mt-6 font-roboto text-base text-[#7E7F83]">or drop files here</span>
            </div>
          </div>

          {/* Reference Images */}
          <div className="flex flex-col gap-1.5 w-[380px] ml-[34px] mt-[27px]">
            <label className="font-roboto font-medium text-base text-[#1A1B1E]">Reference Images</label>
            <div className="flex flex-wrap gap-4 w-[371.84px] h-[87px]">
              <div className="w-[100.91px] h-[51.45px] rounded-md bg-gray-200"></div>
              <div className="w-[100.91px] h-[51.45px] rounded-md bg-gray-200"></div>
              <div className="w-[100.91px] h-[51.45px] rounded-md bg-gray-200"></div>
              <span className="text-xs text-[#7E7F83]">unnamed.png</span>
              <span className="text-xs text-[#7E7F83]">3d-house.jpg</span>
              <span className="text-xs text-[#7E7F83]">render.png</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 w-[379px] ml-[28px] mt-[37px]">
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

        {/* Panel Content */}
        <div className="flex flex-col gap-5 absolute w-[800px] h-[206px] left-[798px] top-[91px]">
          {/* Input Section */}
          <div className="flex flex-col gap-1.5 w-full">
            <label className="font-roboto font-medium text-base text-[#1A1B1E]">Prompt</label>
            <textarea 
              className="w-full h-[106px] p-[13px_19px] bg-white border border-[#E0DAF3] rounded-lg font-roboto text-base resize-none"
              placeholder="Write your prompt here..."
            />
          </div>

          {/* Generate Button */}
          <button className="flex justify-center items-center py-[13px] px-4 gap-1 w-full h-[50px] bg-gradient-to-r from-[#8A53DD] to-[#372B9F] shadow-[0px_1px_2px_rgba(135,80,255,0.05)] rounded-[10px]">
            <span className="font-roboto font-medium text-base text-white">Generate Image</span>
          </button>
        </div>

        {/* Footer Container */}
        <div className="flex flex-row justify-center items-center p-1.5 gap-2.5 absolute w-[800px] h-[52px] left-[542px] top-[935px] bg-[#F6F8FA] border border-[#CDD0D5] rounded-xl">
          {/* Footer Items */}
          <button className="flex justify-center items-center px-3 py-2.5 gap-1 flex-1 rounded-[10px] hover:bg-white">
            <span className="font-roboto font-medium text-sm text-[#202126]">Delete</span>
          </button>
          <button className="flex justify-center items-center px-3 py-2.5 gap-1 flex-1 rounded-[10px] hover:bg-white">
            <span className="font-roboto font-medium text-sm text-[#202126]">Send</span>
          </button>
          <button className="flex justify-center items-center px-3 py-2.5 gap-1 flex-1 rounded-[10px] hover:bg-white">
            <span className="font-roboto font-medium text-sm text-[#202126]">Download</span>
          </button>
          <button className="flex justify-center items-center px-3 py-2.5 gap-1 flex-1 rounded-[10px] hover:bg-white">
            <span className="font-roboto font-medium text-sm text-[#202126]">HD</span>
          </button>
          <button className="flex justify-center items-center px-3 py-2.5 gap-1 flex-1 rounded-[10px] bg-[#433D84]">
            <span className="font-roboto font-medium text-sm text-white">Generate</span>
          </button>
        </div>
      </div>
    </div>
  );
} 