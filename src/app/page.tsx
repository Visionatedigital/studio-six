import Image from "next/image";
import Link from "next/link";
import ScrollArrow from "./components/ScrollArrow";

export default function HomePage() {
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
            <Link href="/subscription" className="font-poppins text-[17px] font-medium leading-[20px] text-black hover:opacity-80">Pricing</Link>
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
            <button className="flex justify-center items-center px-6 py-2.5 bg-[#F8F8F8] rounded-lg hover:bg-[#F0F0F0]">
              <span className="font-poppins text-[16px] font-medium whitespace-nowrap text-black">Log in</span>
            </button>
            <button className="flex justify-center items-center px-6 py-2.5 border border-[#7144D3] rounded-lg transition-all duration-300 hover:bg-[#7144D3] group">
              <span className="font-poppins text-[16px] font-medium whitespace-nowrap text-[#7144D3] group-hover:text-white">Create</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative mt-[200px]">
        <div className="flex justify-between px-[173px]">
          {/* Left Content */}
          <div className="flex flex-col items-start gap-7 w-[571px] pb-[30px]">
            <h1 className="font-inter font-bold text-[52px] leading-[60px] text-[#1B1464] w-[571px]">
              AI Design Assistant:<br />
              Design Smarter,<br />
              Render Faster
            </h1>
            <p className="font-inter text-[18px] leading-6 text-[#6B6B6B]">
              Join <span className="font-semibold">10,000+</span> happy designers and counting!
            </p>
            <button className="group relative flex justify-center items-center px-8 py-4 bg-[#7144D3] rounded-full transition-colors overflow-hidden hover:bg-[#8355E5] after:absolute after:content-[''] after:top-0 after:left-[-75%] after:w-[50%] after:h-full after:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)] after:skew-x-[-25deg] after:animate-shine">
              <span className="font-inter font-semibold text-[18px] leading-5 text-white mr-2 relative z-10">Start Creating</span>
              <span className="w-2.5 h-2.5 border-t-2 border-r-2 border-white transform rotate-45 relative z-10" />
            </button>
            
            {/* Store buttons */}
            <div className="flex items-center gap-4 mt-8">
              <a href="#" className="transition-opacity hover:opacity-80">
                <div className="w-[180px] h-[60px] bg-black rounded-xl flex items-center justify-center px-6">
                  <div className="flex items-center gap-3">
                    <svg viewBox="0 0 24 24" className="w-8 h-8 text-white">
                      <path fill="currentColor" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] text-white/80">Download on the</span>
                      <span className="text-[18px] font-semibold text-white leading-5">App Store</span>
                    </div>
                  </div>
                </div>
              </a>
              <a href="#" className="transition-opacity hover:opacity-80">
                <div className="w-[180px] h-[60px] bg-black rounded-xl flex items-center justify-center px-6">
                  <div className="flex items-center gap-3">
                    <svg viewBox="0 0 24 24" className="w-8 h-8 text-white">
                      <path fill="currentColor" d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                    </svg>
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] text-white/80">GET IT ON</span>
                      <span className="text-[14px] font-semibold text-white leading-5 whitespace-nowrap">Google Play</span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Right Images */}
          <div className="relative w-[850px] h-[650px]">
            {/* Render Image (behind) */}
            <div className="absolute right-[-20px] top-[160px] w-[750px] h-[422px] bg-white rounded-[24px] shadow-lg overflow-hidden transition-all duration-500 ease-out hover:scale-105 hover:shadow-xl">
              <Image
                src="/render-example.jpg"
                alt="Rendered visualization"
                width={750}
                height={422}
                className="w-full h-full object-cover rounded-[24px]"
                priority
              />
            </div>
            {/* Sketch Image (on top) */}
            <div className="absolute right-[270px] top-[-30px] w-[515px] h-[286px] bg-white rounded-[24px] shadow-lg overflow-hidden z-10 transition-all duration-500 ease-out hover:scale-[1.03] hover:shadow-xl">
              <Image
                src="/sketch-example.jpg"
                alt="Architectural sketch"
                width={515}
                height={286}
                className="w-full h-full object-cover rounded-[24px]"
                priority
              />
            </div>
          </div>
        </div>

        {/* Scroll Arrow */}
        <ScrollArrow />
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="relative w-full max-w-[1728px] h-[1176px] bg-[#FFFDFD] mx-auto mt-[-60px] px-4">
        {/* Main Heading */}
        <h2 className="font-inter font-bold text-[64px] leading-[60px] text-[#1B1464] text-center mt-[109px] mb-[60px] mx-auto max-w-[790px]">
          How it Works
        </h2>

        {/* Steps Container */}
        <div className="relative max-w-[1407px] mx-auto">
          {/* Steps Content */}
          <div className="grid grid-cols-3 gap-x-[86px]">
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-center gap-8">
                <div className="w-[82px] h-[82px] rounded-full bg-[#8326CD] flex items-center justify-center">
                  <span className="font-poppins font-bold text-[60px] leading-[18px] text-white tracking-[0.08em]">1</span>
                </div>
                <h3 className="font-poppins font-bold text-[36px] leading-[50px] text-[#1B1464] text-center w-[393px]">
                  Upload Your Design
                </h3>
              </div>
              <p className="font-poppins font-normal text-[18px] leading-[30px] text-[#1B1464] text-center w-[378px] mt-[40px] mb-[48px]">
                Upload your architectural sketch, massing model, or 3D design. Whether it's a hand-drawn concept or a digital model, Studio Six instantly prepares it for rendering.
              </p>
              <div className="w-[450px] h-[280px] rounded-[24px] overflow-hidden">
                <Image
                  src="/upload-sketch.gif"
                  alt="Upload sketch interface"
                  width={450}
                  height={280}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-center gap-8">
                <div className="w-[82px] h-[82px] rounded-full bg-[#8326CD] flex items-center justify-center">
                  <span className="font-poppins font-bold text-[60px] leading-[18px] text-white tracking-[0.08em]">2</span>
                </div>
                <h3 className="font-poppins font-bold text-[36px] leading-[50px] text-[#1B1464] text-center w-[393px]">
                  Select Your Style & Settings
                </h3>
              </div>
              <p className="font-poppins font-normal text-[18px] leading-[30px] text-[#1B1464] text-center w-[378px] mt-[40px] mb-[48px]">
                Choose your preferred render style—photorealistic, conceptual, or artistic. Adjust lighting, materials, and environmental settings to match your design intent.
              </p>
              <div className="w-[450px] h-[280px] rounded-[24px] overflow-hidden">
                <Image
                  src="/settings.gif"
                  alt="Style settings interface"
                  width={450}
                  height={280}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-center gap-8">
                <div className="w-[82px] h-[82px] rounded-full bg-[#8326CD] flex items-center justify-center">
                  <span className="font-poppins font-bold text-[60px] leading-[18px] text-white tracking-[0.08em]">3</span>
                </div>
                <h3 className="font-poppins font-bold text-[36px] leading-[50px] text-[#1B1464] text-center w-[393px]">
                  AI-Powered Rendering in Minutes
                </h3>
              </div>
              <p className="font-poppins font-normal text-[18px] leading-[30px] text-[#1B1464] text-center w-[378px] mt-[40px] mb-[48px]">
                Let our AI transform your input into a stunning high-quality render. Download your finished image and bring your vision to life—faster than ever before!
              </p>
              <div className="w-[450px] h-[280px] rounded-[24px] overflow-hidden">
                <Image
                  src="/render-in-minutes.gif"
                  alt="Rendering result"
                  width={450}
                  height={280}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>

        {/* Try For Free Button */}
        <div className="flex flex-col items-center mt-[100px] gap-4">
          <button className="flex items-center justify-center px-[18px] py-[14px] w-[302px] h-[82px] bg-gradient-to-r from-[#844BDC] to-[#AC4FF1] rounded-[23px] shadow-[0px_1px_4px_rgba(25,33,61,0.08)] group">
            <span className="font-inter font-semibold text-[30px] leading-[20px] text-white">Try For Free</span>
            <span className="ml-[3px] w-[12px] h-[12px] border-t-2 border-r-2 border-white transform rotate-45 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="font-inter font-normal text-[16px] leading-[24px] text-[#6B6B6B]">
            Join <span className="font-semibold">1,000,000+</span> happy designers and counting!
          </p>
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