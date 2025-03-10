'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const SubscriptionPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#F6F8FA] p-6">
      {/* Container */}
      <div className="max-w-[1440px] mx-auto bg-white border border-[#CDD0D5] rounded-[16px] min-h-[calc(100vh-48px)] relative">
        {/* Header Container */}
        <div className="p-6">
          {/* Navigation */}
          <div className="flex items-center gap-4 mb-8">
            {/* Back Icon */}
            <button 
              onClick={() => router.back()}
              className="box-border w-[24px] h-[24px] border border-[#CDD0D5] rounded-[6px] flex items-center justify-center hover:bg-gray-50"
            >
              <div className="border-[1.5px] border-[#202126] w-[9px] h-[9px] transform rotate-45 translate-x-[2px] border-t-0 border-r-0"></div>
            </button>
            
            {/* Breadcrumb Icon */}
            <div className="box-border w-[24px] h-[24px] border border-[#CDD0D5] rounded-[6px] flex items-center justify-center">
              <div className="border-[1.5px] border-[#CDD0D5] w-[9px] h-[9px]"></div>
            </div>
          </div>

          {/* Content Container */}
          <div className="flex flex-col items-center gap-8 max-w-[768px] mx-auto">
            {/* Section Title */}
            <h2 className="font-roboto font-semibold text-[24px] leading-[34px] text-[#202126]">
              Subscription
            </h2>

            {/* Current Plan */}
            <div className="w-full flex flex-row justify-between items-center p-5 bg-[#ECE1FF] border border-[#8352F0] rounded-[16px]">
              <div className="flex flex-col gap-1">
                <h3 className="font-roboto font-medium text-[20px] leading-[28px] text-[#202126]">Pro Plan</h3>
                <p className="font-roboto text-[16px] leading-[24px] text-[#5E5F63]">Active</p>
              </div>
              <button className="flex justify-center items-center px-4 py-2 bg-gradient-to-r from-[#814ADA] to-[#4130A7] rounded-lg hover:opacity-90 transition-opacity">
                <span className="font-roboto font-medium text-[14px] leading-[20px] text-white">Upgrade</span>
              </button>
            </div>

            {/* Section Title - History */}
            <h3 className="font-roboto font-semibold text-[24px] leading-[34px] text-[#202126]">
              History
            </h3>

            {/* History Table */}
            <div className="w-full bg-[#F6F8FA] border border-[#CDD0D5] rounded-[16px] p-5">
              {/* Header Row */}
              <div className="grid grid-cols-5 w-full text-[#5E5F63] font-roboto text-[16px] leading-[24px] mb-4">
                <div>Plan Name</div>
                <div>Payment Date</div>
                <div>Expire Date</div>
                <div>Amount</div>
                <div>Invoice</div>
              </div>

              <div className="w-full border-t border-[#ECE1FF] mb-4"></div>

              {/* History Rows */}
              {[1, 2, 3, 4].map((_, index) => (
                <div key={index} className="grid grid-cols-5 w-full items-center py-2">
                  <div className="font-roboto text-[16px] leading-[24px] text-[#202126]">Pro</div>
                  <div className="font-roboto text-[16px] leading-[24px] text-[#202126]">01/01/2024</div>
                  <div className="font-roboto text-[16px] leading-[24px] text-[#202126]">02/01/2024</div>
                  <div className="font-roboto text-[16px] leading-[24px] text-[#202126]">$99</div>
                  <button className="box-border flex flex-row items-center px-3 py-2 bg-white border border-[#D3BBFB] rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
                    <span className="font-roboto font-medium text-[14px] leading-[20px] bg-gradient-to-b from-[#2A0856] to-[#3E0B80] bg-clip-text text-transparent">
                      Download Invoice
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage; 