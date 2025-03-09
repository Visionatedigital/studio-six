import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative max-w-[1728px] min-h-screen bg-white mx-auto overflow-x-hidden">
      {/* Navigation Bar */}
      <nav className="absolute w-[1379px] h-[105.3px] left-[calc(50%-1379px/2+3.5px)] top-[111px]">
        <div className="relative w-full h-full">
          {/* Logo */}
          <div className="absolute left-[10.3%] right-[81.48%] top-[1.85%] bottom-[96.39%]">
            <Link href="/">
              <Image
                src="/studio-six-logo.svg"
                alt="Studio Six Logo"
                width={120}
                height={40}
                className="h-10 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Menu */}
          <div className="flex flex-row items-center gap-[51px] absolute w-[530px] left-[calc(50%-530px/2+41px)] top-[2.38%]">
            <Link href="/subscription" className="font-poppins text-[18px] font-medium leading-[27px] text-black">Pricing</Link>
            <Link href="/plugins" className="font-poppins text-[18px] font-medium leading-[27px] text-black">Plugins</Link>
            <Link href="/help" className="font-poppins text-[18px] font-medium leading-[27px] text-black">Help</Link>
            <Link href="/about" className="font-poppins text-[18px] font-medium leading-[27px] text-black">About Us</Link>
            <Link href="/teams" className="font-poppins text-[18px] font-medium leading-[27px] text-black">For Teams</Link>
          </div>

          {/* Buttons */}
          <div className="flex flex-row items-start gap-[10px] absolute left-[75.58%] right-[9.9%] top-[2.25%]">
            <button className="flex justify-center items-center px-6 py-3 gap-5 w-[95px] h-[43px] bg-[#F4F4F4] rounded-[5px]">
              <span className="font-inter text-base font-medium leading-[19px] text-black">Log in</span>
            </button>
            <button className="flex justify-center items-center px-6 py-3 gap-5 w-[100px] h-[43px] border-2 border-[#7144D3] rounded-[5px]">
              <span className="font-inter text-base font-medium leading-[19px] text-black">Create</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative mt-[315px]">
        <div className="flex justify-between px-[173px]">
          {/* Left Content */}
          <div className="flex flex-col items-start gap-7 w-[571px] pb-[30px]">
            <h1 className="font-inter font-bold text-[52px] leading-[60px] text-[#1B1464] w-[571px] h-[158px]">
              Transform your architectural sketches into stunning renders
            </h1>
            <div className="h-6 opacity-0" /> {/* Spacer */}
            <p className="font-inter font-normal text-base leading-6 text-[#6B6B6B] w-[571px]">
              Experience the future of architectural visualization
            </p>
            <div className="h-[30px] opacity-0" /> {/* Spacer */}
            <button className="flex justify-center items-center px-[18px] py-[14px] gap-[3px] w-[243px] h-[66px] bg-gradient-to-r from-[#844BDC] to-[#AC4FF1] rounded-[23px] shadow-[0px_1px_4px_rgba(25,33,61,0.08)]">
              <span className="font-inter font-semibold text-[20px] leading-5 text-white">Start Creating</span>
              <span className="w-3 h-3 border-t-2 border-r-2 border-white transform rotate-45" />
            </button>
          </div>

          {/* Right Images */}
          <div className="relative">
            <div className="absolute w-[538.64px] h-[300.1px] left-[718px] top-[216px]">
              <Image
                src="/sketch-example.jpg"
                alt="Architectural sketch"
                width={539}
                height={300}
                className="rounded-[16px]"
                priority
              />
            </div>
            <div className="absolute w-[813.7px] h-[456.41px] left-[768.11px] top-[430.59px]">
              <Image
                src="/render-example.jpg"
                alt="Rendered visualization"
                width={814}
                height={456}
                className="rounded-[16px]"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-[100px]">
        <h2 className="font-lato font-bold text-[36px] leading-[43px] text-center text-black mb-[50px]">
          What Our Designers Say About It
        </h2>

        {/* Testimonial Cards */}
        <div className="flex flex-col lg:flex-row justify-center gap-8 px-4 lg:px-[160px] max-w-[1656px] mx-auto">
          {/* Left Testimonial */}
          <div className="relative bg-text-primary p-8 rounded-lg transform rotate-[7.35deg] w-full lg:w-[432.9px]">
            <div className="flex flex-col items-center">
              <div className="w-[108.94px] h-[108.94px] rounded-full border-2 border-white bg-[#F6F8FA] mb-4" />
              <h3 className="font-poppins font-bold text-[18px] leading-[27px] text-white mb-2">
                Sarah Johnson
              </h3>
              <p className="font-lato text-[15px] leading-[18px] text-white mb-6">
                Lead Designer
              </p>
              <div className="w-[31.54px] h-[31.54px] mb-4">
                {/* Quote icon placeholder */}
              </div>
              <p className="font-poppins text-[15px] leading-[22px] text-white text-center">
                "StudioSix has revolutionized our design workflow. The AI-powered renders are incredibly realistic and save us countless hours."
              </p>
            </div>
          </div>

          {/* Center Testimonial */}
          <div className="relative bg-white p-8 rounded-lg shadow-xl w-full lg:w-[594.88px] z-10">
            <div className="flex flex-col items-center">
              <div className="w-[146.21px] h-[146.21px] rounded-full border-2 border-text-primary bg-[#F6F8FA] mb-4" />
              <h3 className="font-poppins font-bold text-[24px] leading-[36px] text-text-primary mb-2">
                Michael Chen
              </h3>
              <p className="font-lato text-[18px] leading-[22px] text-text-primary mb-6">
                Senior Architect
              </p>
              <div className="w-[51.6px] h-[51.6px] mb-4">
                {/* Quote icon placeholder */}
              </div>
              <p className="font-poppins text-[18px] leading-[27px] text-text-primary text-center">
                "The quality and speed of renders are unmatched. It's become an essential tool in our design process."
              </p>
            </div>
          </div>

          {/* Right Testimonial */}
          <div className="relative bg-text-primary p-8 rounded-lg transform -rotate-[7.35deg] w-full lg:w-[432.9px]">
            <div className="flex flex-col items-center">
              <div className="w-[108.94px] h-[108.94px] rounded-full border-2 border-white bg-[#F6F8FA] mb-4" />
              <h3 className="font-poppins font-bold text-[18px] leading-[27px] text-white mb-2">
                Emma Thompson
              </h3>
              <p className="font-lato text-[15px] leading-[18px] text-[#CFCFCF] mb-6">
                Interior Designer
              </p>
              <div className="w-[31.54px] h-[31.54px] mb-4">
                {/* Quote icon placeholder */}
              </div>
              <p className="font-poppins text-[15px] leading-[22px] text-white text-center">
                "The attention to detail in the renders is amazing. It helps us communicate our vision clearly to clients."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="relative py-[100px] bg-gradient-to-b from-white/30 to-[#5D4FF1]/30">
        <h2 className="font-poppins font-bold text-[50px] leading-[70px] text-center text-text-primary mb-[50px] border-[3px] border-white max-w-[975px] mx-auto">
          Explore Our Gallery
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4 lg:px-[35px]">
          {/* Gallery items - using divs for now instead of images */}
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="aspect-[4/6] rounded-[53px] border-[7px] border-white bg-gray-100"
            />
          ))}
        </div>
      </section>

      {/* Sign In Section */}
      <section className="relative py-[100px]">
        <h2 className="font-poppins font-bold text-[64px] leading-[92px] text-center text-text-primary mb-[50px] max-w-[1036px] mx-auto">
          Ready to Transform Your Designs?
        </h2>
        <p className="font-inter text-[40px] leading-[40px] text-text-secondary text-center mb-[50px]">
          Join thousands of architects and designers
        </p>
        <div className="max-w-[481px] mx-auto bg-white rounded-[23px] shadow-[0px_1px_4px_rgba(25,33,61,0.08)] p-8">
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-2">
              {/* Logo colors */}
              <div className="w-3 h-3 bg-primary-blue" />
              <div className="w-3 h-3 bg-primary-cyan" />
              <div className="w-3 h-3 bg-primary-purple" />
              <div className="w-3 h-3 bg-primary-pink" />
            </div>
            <h3 className="font-poppins font-medium text-[32px] text-text-primary">Sign in</h3>
            <p className="font-poppins text-base text-black text-center">Sign in to start rendering</p>
            <button className="w-[186px] h-[71px] bg-white shadow rounded-lg">
              {/* Google sign in button placeholder */}
              <span className="font-poppins text-base">Sign in with Google</span>
            </button>
            <div className="w-full space-y-4">
              <div>
                <label className="font-poppins text-base text-black">Email</label>
                <input type="email" className="w-full h-[34px] bg-[rgba(199,204,216,0.22)] rounded-[10px]" />
              </div>
              <div>
                <label className="font-poppins text-base text-black">Password</label>
                <input type="password" className="w-full h-[34px] bg-[#ECEEF3] rounded-[10px]" />
              </div>
              <div className="flex justify-between items-center">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-6 h-6 bg-[#ECEEF3] rounded" />
                  <span className="font-poppins text-base text-black">Remember me</span>
                </label>
                <a href="#" className="font-poppins text-base text-text-primary">Forgot Password</a>
              </div>
              <button className="w-full h-[52px] bg-gradient-primary rounded-[10px] text-white font-poppins font-semibold text-xl">
                Sign in
              </button>
              <p className="text-center">
                <span className="font-cabin text-base text-black">Don't have an account yet? </span>
                <a href="#" className="font-cabin font-bold text-base text-text-primary">Sign up</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 