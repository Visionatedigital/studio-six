'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Icon } from '@/components/Icons';
import Image from 'next/image';

// Types
type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'AUD' | 'CAD' | 'JPY' | 'UGX' | 'KES' | 'ZAR';

type CurrencyInfo = {
  symbol: string;
  name: string;
};

// Currency configuration
const currencies: Record<CurrencyCode, CurrencyInfo> = {
  USD: { symbol: '$', name: 'USD' },
  EUR: { symbol: '€', name: 'EUR' },
  GBP: { symbol: '£', name: 'GBP' },
  AUD: { symbol: 'A$', name: 'AUD' },
  CAD: { symbol: 'C$', name: 'CAD' },
  JPY: { symbol: '¥', name: 'JPY' },
  UGX: { symbol: 'USh', name: 'UGX' },
  KES: { symbol: 'KSh', name: 'KES' },
  ZAR: { symbol: 'R', name: 'ZAR' },
  // Add more currencies as needed
};

// Sample transaction data
const recentTransactions = [
  {
    id: 1,
    type: 'credit',
    amount: 500,
    description: 'Added credits',
    date: 'Today, 2:30 PM',
    status: 'completed'
  },
  {
    id: 2,
    type: 'debit',
    amount: 12,
    description: 'Modern Villa Render',
    date: 'Today, 11:45 AM',
    status: 'completed'
  },
  {
    id: 3,
    type: 'debit',
    amount: 8,
    description: 'Interior Scene Generation',
    date: 'Yesterday, 4:20 PM',
    status: 'completed'
  },
  {
    id: 4,
    type: 'credit',
    amount: 100,
    description: 'Referral Bonus',
    date: 'Yesterday, 2:15 PM',
    status: 'completed'
  },
  {
    id: 5,
    type: 'debit',
    amount: 15,
    description: 'Landscape Design Render',
    date: '2 days ago',
    status: 'completed'
  }
];

// Credit package options
const creditPackages = [
  {
    credits: 100,
    priceUSD: 49,
    perCreditUSD: 0.49,
    popular: false,
    icon: '/icons/100-credits-icon.svg'
  },
  {
    credits: 500,
    priceUSD: 199,
    perCreditUSD: 0.40,
    popular: true,
    icon: '/icons/500-credits-icon.svg'
  },
  {
    credits: 1000,
    priceUSD: 349,
    perCreditUSD: 0.35,
    popular: false,
    icon: '/icons/1000-credits-icon.svg'
  }
];

export default function WalletPage() {
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>('USD');
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({});
  const [userLocation, setUserLocation] = useState<string | null>(null);

  // Fetch exchange rates
  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        setExchangeRates(data.rates);
      } catch (error) {
        console.error('Failed to fetch exchange rates:', error);
      }
    };

    fetchExchangeRates();
  }, []);

  // Detect user's location and set initial currency
  useEffect(() => {
    const detectUserLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        setUserLocation(data.country);
        
        // Map country to currency (simplified version)
        const currencyMap: Record<string, string> = {
          US: 'USD',
          GB: 'GBP',
          EU: 'EUR',
          AU: 'AUD',
          CA: 'CAD',
          JP: 'JPY',
          UG: 'UGX',
          KE: 'KES',
          ZA: 'ZAR',
        };
        
        if (currencyMap[data.country]) {
          setSelectedCurrency(currencyMap[data.country] as CurrencyCode);
        }
      } catch (error) {
        console.error('Failed to detect location:', error);
      }
    };

    detectUserLocation();
  }, []);

  // Convert price to selected currency
  const convertPrice = (priceUSD: number) => {
    if (!exchangeRates[selectedCurrency]) return priceUSD;
    const converted = priceUSD * exchangeRates[selectedCurrency];
    
    // Round to whole numbers for currencies that typically don't use decimals
    if (['UGX', 'KES', 'JPY'].includes(selectedCurrency)) {
      return Math.round(converted).toLocaleString();
    }
    
    return converted.toFixed(2);
  };

  return (
    <DashboardLayout currentPage="Wallet">
      <div className="w-full h-[calc(100vh-6rem)] bg-[#F6F8FA] rounded-2xl overflow-hidden pt-2 px-6 pb-6">
        <div className="flex flex-col gap-6">
          {/* Credits Balance Card */}
          <div className="bg-gradient-to-r from-[#814ADA] to-[#392CA0] rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-lg font-medium opacity-90">Available Credits</span>
                <div className="flex items-center gap-3 mt-2">
                  <Icon name="coins" size={32} className="text-yellow-300" />
                  <span className="text-4xl font-bold">1,265</span>
                </div>
                <span className="text-sm opacity-75 mt-2">
                  ≈ {currencies[selectedCurrency].symbol}{convertPrice(632.50)} {selectedCurrency}
                </span>
              </div>
              <button className="px-6 py-3 bg-white text-purple-600 rounded-xl font-medium hover:bg-opacity-90 transition-colors">
                Add Credits
              </button>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-3 gap-6">
            {/* Credit Packages */}
            <div className="col-span-2 bg-white rounded-xl border border-[#E0DAF3] p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-[#202126]">Credit Packages</h2>
                <select
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value as CurrencyCode)}
                  className="px-3 py-1.5 bg-white border border-[#E0DAF3] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {Object.entries(currencies).map(([code, { name }]) => (
                    <option key={code} value={code}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {creditPackages.map((pkg) => (
                  <div 
                    key={pkg.credits}
                    className={`relative p-4 rounded-xl border ${
                      pkg.popular ? 'border-purple-400' : 'border-[#E0DAF3]'
                    }`}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="px-3 py-1 bg-purple-100 text-purple-600 text-sm font-medium rounded-full">
                          Most Popular 🔥
                        </span>
                      </div>
                    )}
                    <div className="text-center mt-2">
                      <div className={`flex items-center justify-center mb-4 ${
                        pkg.credits === 100 ? 'gap-1' : 'gap-3'
                      }`}>
                        <Image
                          src={pkg.icon}
                          alt={`${pkg.credits} credits`}
                          width={64}
                          height={64}
                          className="w-16 h-16"
                        />
                        <span className="text-4xl font-bold text-[#202126]">{pkg.credits}</span>
                      </div>
                      <div className="text-sm text-gray-500 mb-3">
                        {currencies[selectedCurrency].symbol}{convertPrice(pkg.perCreditUSD)} per credit
                      </div>
                      <div className="text-xl font-bold text-[#202126] mb-4">
                        {currencies[selectedCurrency].symbol}{convertPrice(pkg.priceUSD)}
                      </div>
                      <button className="w-full px-4 py-2 bg-gradient-to-r from-[#814ADA] to-[#392CA0] text-white rounded-lg hover:opacity-90 transition-opacity">
                        Purchase
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-[#E0DAF3] p-6">
              <h2 className="text-lg font-medium text-[#202126] mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-4 bg-[#F6F8FA] rounded-lg hover:bg-purple-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Icon name="gift" size={20} className="text-purple-600" />
                    <span className="font-medium">Redeem Code</span>
                  </div>
                  <Icon name="chevron-right" size={20} className="text-gray-400" />
                </button>
                <button className="w-full flex items-center justify-between p-4 bg-[#F6F8FA] rounded-lg hover:bg-purple-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Icon name="users" size={20} className="text-purple-600" />
                    <span className="font-medium">Refer Friends</span>
                  </div>
                  <Icon name="chevron-right" size={20} className="text-gray-400" />
                </button>
                <button className="w-full flex items-center justify-between p-4 bg-[#F6F8FA] rounded-lg hover:bg-purple-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Icon name="settings" size={20} className="text-purple-600" />
                    <span className="font-medium">Auto-reload Settings</span>
                  </div>
                  <Icon name="chevron-right" size={20} className="text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-xl border border-[#E0DAF3] p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-[#202126]">Recent Transactions</h2>
              <button className="text-purple-600 hover:text-purple-700 font-medium">
                View All
              </button>
            </div>
            <div className="h-[220px] overflow-y-auto custom-scrollbar pr-2">
              <div className="space-y-3">
                {recentTransactions.map((transaction) => (
                  <div 
                    key={transaction.id}
                    className="flex items-center justify-between p-3.5 bg-[#F6F8FA] rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${
                        transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        <Icon 
                          name={transaction.type === 'credit' ? 'plus' : 'minus'} 
                          size={16}
                          className={transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}
                        />
                      </div>
                      <div>
                        <div className="font-medium text-[#202126]">{transaction.description}</div>
                        <div className="text-sm text-gray-500">{transaction.date}</div>
                      </div>
                    </div>
                    <div className={`font-medium ${
                      transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'credit' ? '+' : '-'}{transaction.amount} credits
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 