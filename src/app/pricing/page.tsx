'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'AUD' | 'CAD' | 'CHF' | 'CNY' | 'INR' | 'NZD' | 'SGD' | 'ZAR';

const currencyConfig: Record<Currency, { symbol: string; position: 'before' | 'after' }> = {
  USD: { symbol: '$', position: 'before' },
  EUR: { symbol: '€', position: 'after' },
  GBP: { symbol: '£', position: 'before' },
  JPY: { symbol: '¥', position: 'before' },
  AUD: { symbol: 'A$', position: 'before' },
  CAD: { symbol: 'C$', position: 'before' },
  CHF: { symbol: 'Fr', position: 'after' },
  CNY: { symbol: '¥', position: 'before' },
  INR: { symbol: '₹', position: 'before' },
  NZD: { symbol: 'NZ$', position: 'before' },
  SGD: { symbol: 'S$', position: 'before' },
  ZAR: { symbol: 'R', position: 'before' }
};

interface PricingPlan {
  name: string;
  price: number;
  description: string;
  features: string[];
  isPopular?: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    name: "Starter Plan",
    price: 19,
    description: "Perfect for individuals",
    features: [
      "1,500 monthly credits",
      "Basic AI features",
      "Email support",
      "Standard resolution",
      "Basic templates"
    ]
  },
  {
    name: "Pro Plan",
    price: 39,
    description: "For professionals",
    features: [
      "5,000 monthly credits",
      "Advanced AI features",
      "Priority email support",
      "High resolution",
      "Premium templates",
      "Custom branding"
    ],
    isPopular: true
  },
  {
    name: "Studio Plan",
    price: 79,
    description: "For agencies",
    features: [
      "Unlimited designs",
      "All AI features",
      "24/7 priority support",
      "Ultra-high resolution",
      "All templates",
      "Custom branding",
      "API access",
      "Team collaboration"
    ]
  }
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('USD');
  const [exchangeRates, setExchangeRates] = useState<Record<Currency, number>>({} as Record<Currency, number>);
  const [userLocation, setUserLocation] = useState<string>('');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  useEffect(() => {
    // Fetch exchange rates
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
      .then(res => res.json())
      .then(data => {
        const rates: Record<Currency, number> = {} as Record<Currency, number>;
        Object.keys(currencyConfig).forEach(currency => {
          rates[currency as Currency] = data.rates[currency] || 1;
        });
        setExchangeRates(rates);
      })
      .catch(error => console.error('Error fetching exchange rates:', error));

    // Fetch user location
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        setUserLocation(data.country_code);
        // Set currency based on location
        const currencyMap: Record<string, Currency> = {
          'US': 'USD',
          'EU': 'EUR',
          'GB': 'GBP',
          'JP': 'JPY',
          'AU': 'AUD',
          'CA': 'CAD',
          'CH': 'CHF',
          'CN': 'CNY',
          'IN': 'INR',
          'NZ': 'NZD',
          'SG': 'SGD',
          'ZA': 'ZAR'
        };
        if (currencyMap[data.country_code]) {
          setSelectedCurrency(currencyMap[data.country_code]);
        }
      })
      .catch(error => console.error('Error fetching location:', error));
  }, []);

  const convertPrice = (price: number, currency: Currency): number => {
    return currency === 'USD' ? price : price * exchangeRates[currency];
  };

  const formatPrice = (price: number, currency: Currency): string => {
    const convertedPrice = convertPrice(price, currency);
    const { symbol, position } = currencyConfig[currency];
    return position === 'before' 
      ? `${symbol}${convertedPrice.toFixed(2)}`
      : `${convertedPrice.toFixed(2)}${symbol}`;
  };

  const calculateYearlyPrice = (monthlyPrice: number): number => {
    return monthlyPrice * 12 * 0.8; // 20% discount for yearly billing
  };

  return (
    <main className="relative max-w-[1728px] min-h-screen bg-white mx-auto overflow-x-hidden">
      {/* Navigation Bar */}
      <nav className="absolute w-full max-w-[1379px] h-[105px] left-1/2 -translate-x-1/2 top-[20px]">
        <div className="relative w-full h-full">
          {/* Logo */}
          <div className="absolute left-[35px] top-[60%] -translate-y-1/2 flex items-center">
            <Link href="/" className="block">
              <Image
                src="/studio-six-logo.svg"
                alt="Studio Six Logo"
                width={144}
                height={48}
                className="w-[144px] object-contain"
                style={{ height: 'auto' }}
                priority
              />
            </Link>
          </div>

          {/* Menu */}
          <div className="flex flex-row items-center gap-[40px] absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
            <Link href="/pricing" className="font-poppins text-[17px] font-medium leading-[20px] text-black hover:opacity-80">
              Pricing
            </Link>
            <Link href="/plugins" className="font-poppins text-[17px] font-medium leading-[20px] text-black hover:opacity-80">Plugins</Link>
            <Link href="/help" className="font-poppins text-[17px] font-medium leading-[20px] text-black hover:opacity-80">Help</Link>
            <Link href="/about" className="font-poppins text-[17px] font-medium leading-[20px] text-black hover:opacity-80">About Us</Link>
            <div className="flex items-center gap-2">
              <Link href="/teams" className="font-poppins text-[17px] font-medium leading-[20px] text-black hover:opacity-80">For Teams</Link>
              <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">New</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-row items-center gap-[16px] absolute right-[20px] top-1/2 -translate-y-1/2">
            <Link 
              href="/sign-in" 
              className="flex justify-center items-center px-6 py-2.5 bg-[#F8F8F8] rounded-lg hover:bg-[#F0F0F0]"
            >
              <span className="font-poppins text-[16px] font-medium whitespace-nowrap text-black">Log in</span>
            </Link>
            <Link 
              href="/sign-in" 
              className="flex justify-center items-center px-6 py-2.5 border border-[#7144D3] rounded-lg transition-all duration-300 hover:bg-[#7144D3] group"
            >
              <span className="font-poppins text-[16px] font-medium whitespace-nowrap text-[#7144D3] group-hover:text-white">Create</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="w-full max-w-[1200px] mx-auto px-6 pt-[180px] pb-20">
        <h1 className="text-[40px] font-semibold text-center mb-8 font-poppins">
            Find the perfect plan to power your creativity
          </h1>

        {/* Currency and Billing Controls */}
        <div className="flex justify-center items-center gap-8 mb-12">
          <div className="flex items-center gap-4">
            <select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value as Currency)}
              className="font-poppins text-[16px] border rounded-lg px-4 py-2"
            >
              {Object.keys(currencyConfig).map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-4">
              <button
              onClick={() => setBillingCycle('monthly')}
              className={`font-poppins text-[16px] px-4 py-2 rounded-lg ${
                  billingCycle === 'monthly'
                  ? 'bg-[#7144D3] text-white'
                  : 'bg-gray-100 text-gray-600'
                }`}
              >
              Monthly
              </button>
              <button
              onClick={() => setBillingCycle('yearly')}
              className={`font-poppins text-[16px] px-4 py-2 rounded-lg ${
                  billingCycle === 'yearly'
                  ? 'bg-[#7144D3] text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              Yearly
              {billingCycle === 'yearly' && (
                <span className="ml-2 text-sm bg-green-500 text-white px-2 py-0.5 rounded-full">
                  Save 20%
                </span>
              )}
              </button>
            </div>
          </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan) => (
                <div
                  key={plan.name}
              className={`relative p-8 rounded-2xl border-2 ${
                plan.isPopular
                  ? 'border-[#7144D3] bg-white shadow-lg'
                  : 'border-gray-200 hover:border-[#7144D3] transition-colors'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#7144D3] text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                    </div>
              )}
              <h3 className="text-2xl font-semibold mb-2 font-poppins">{plan.name}</h3>
              <p className="text-gray-600 mb-6 font-poppins">{plan.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold font-poppins">
                  {formatPrice(
                    billingCycle === 'monthly' ? plan.price : calculateYearlyPrice(plan.price),
                    selectedCurrency
                  )}
                      </span>
                    {billingCycle === 'yearly' && (
                  <span className="text-gray-500 font-poppins">/year</span>
                    )}
                  </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 font-poppins">
                    <svg
                      className="w-5 h-5 text-[#7144D3]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                          {feature}
                  </li>
                    ))}
              </ul>
                  <button
                onClick={() => setSelectedPlan(plan.name)}
                className={`w-full py-3 rounded-lg font-medium transition-colors ${
                  plan.isPopular
                    ? 'bg-[#7144D3] text-white hover:bg-[#5A35A9]'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                Get Started
                  </button>
                </div>
          ))}
          </div>

          {/* Student/Educator Discount Banner */}
        <div className="mt-12 p-8 bg-gradient-to-r from-[#7144D3] to-[#5A35A9] rounded-2xl text-white">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="text-2xl font-semibold mb-2 font-poppins">Student or Educator?</h3>
              <p className="text-lg font-poppins">Get 30% off all plans with our education discount</p>
            </div>
            <Link 
              href="/education"
              className="px-8 py-3 bg-white text-[#7144D3] rounded-lg font-medium hover:bg-gray-100 transition-colors font-poppins"
            >
              Apply for Discount
            </Link>
            </div>
          </div>

          {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-semibold text-center mb-12 font-poppins">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border-b pb-6">
              <h3 className="text-xl font-semibold mb-2 font-poppins">How does billing work?</h3>
              <p className="text-gray-600 font-poppins">
                You can choose between monthly or yearly billing. Yearly plans come with a 20% discount.
                You can cancel or change your plan at any time.
              </p>
            </div>
            <div className="border-b pb-6">
              <h3 className="text-xl font-semibold mb-2 font-poppins">Can I change my plan later?</h3>
              <p className="text-gray-600 font-poppins">
                Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
              </p>
            </div>
            <div className="border-b pb-6">
              <h3 className="text-xl font-semibold mb-2 font-poppins">What payment methods do you accept?</h3>
              <p className="text-gray-600 font-poppins">
                We accept all major credit cards, PayPal, and bank transfers for annual plans.
              </p>
                    </div>
            <div className="border-b pb-6">
              <h3 className="text-xl font-semibold mb-2 font-poppins">Do you offer education discounts?</h3>
              <p className="text-gray-600 font-poppins">
                Yes, students and educators are eligible for a 30% discount on all plans. Contact our support team to apply.
              </p>
                </div>
            <div className="border-b pb-6">
              <h3 className="text-xl font-semibold mb-2 font-poppins">How do credits work?</h3>
              <p className="text-gray-600 font-poppins">
                Credits are used for AI-powered features. Each plan comes with a monthly credit allowance that refreshes every billing cycle.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative w-full max-w-[1728px] mx-auto h-[138px] bg-white">
        <div className="absolute left-[73px] top-[35px] flex items-center gap-4">
          <div className="w-[25px] h-[25px] rounded-full border border-[#6B6B6B]" />
          <div className="flex flex-col">
            <span className="font-inter text-[20px] leading-[40px] text-[#6B6B6B]">StudioSix, 2025</span>
            <span className="font-inter text-[20px] leading-[40px] text-[#6B6B6B]">Visionate (PTY) Ltd. All Rights Reserved</span>
          </div>
        </div>

        {/* Center Menu */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
          <div className="flex items-center gap-[51px]">
            <Link href="/pricing" className="font-poppins text-[18px] font-medium leading-[27px] text-[#6B6B6B] hover:text-[#1B1464]">Pricing</Link>
            <Link href="/plugins" className="font-poppins text-[18px] font-medium leading-[27px] text-[#6B6B6B] hover:text-[#1B1464]">Plugins</Link>
            <Link href="/help" className="font-poppins text-[18px] font-medium leading-[27px] text-[#6B6B6B] hover:text-[#1B1464]">Help</Link>
            <Link href="/terms" className="font-poppins text-[18px] font-medium leading-[27px] text-[#6B6B6B] hover:text-[#1B1464]">Terms and Conditions</Link>
            <Link href="/privacy" className="font-poppins text-[18px] font-medium leading-[27px] text-[#6B6B6B] hover:text-[#1B1464]">Privacy Policy</Link>
          </div>
        </div>

        {/* Social Icons */}
        <div className="absolute right-[160px] top-[46px] flex items-center gap-[18px]">
          <Link href="#" className="w-[37px] h-[37px]">
            <svg viewBox="0 0 24 24" className="w-full h-full text-black">
              <path fill="currentColor" d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z" />
            </svg>
          </Link>
          <Link href="#" className="w-[36px] h-[37px]">
            <svg viewBox="0 0 24 24" className="w-full h-full">
              <path fill="#9146FF" d="M11.64 5.93H13.07V10.21H11.64M15.57 5.93H17V10.21H15.57M7 2L3.43 5.57V18.43H7.71V22L11.29 18.43H14.14L20.57 12V2M19.14 11.29L16.29 14.14H13.43L10.93 16.64V14.14H7.71V3.43H19.14Z"/>
            </svg>
          </Link>
          <Link href="#" className="w-[37px] h-[37px]">
            <svg viewBox="0 0 24 24" className="w-full h-full">
              <path fill="currentColor" d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" />
            </svg>
          </Link>
          <Link href="#" className="w-[48px] h-[48px]">
            <svg viewBox="0 0 24 24" className="w-full h-full">
              <path fill="#5865F2" d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.03-.07c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.04.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z"/>
            </svg>
          </Link>
        </div>
      </footer>
    </main>
  );
} 