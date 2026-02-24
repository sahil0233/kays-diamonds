"use client";
import Link from "next/link";
import React from "react";

const Hero = () => {
  // CTA state for delayed appearance
  const [showCTA, setShowCTA] = React.useState(false);
  React.useEffect(() => {
    const timer = setTimeout(() => setShowCTA(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-[90vh] md:min-h-[110vh] flex items-center">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          src="/assets/hero-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>


      {/* CTA: Diamond Jewelry Manufacturer */}
        <div
          className={`absolute left-1/2 bottom-10 md:bottom-32 transform -translate-x-1/2 transition-all duration-700 z-20 w-3/4 max-w-[600px] ${
            showCTA ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ pointerEvents: showCTA ? 'auto' : 'none' }}
        >
          <div className="text-primary px-6 py-6 md:px-12 md:py-10 flex flex-col items-center gap-2 md:gap-6 max-w-2xl mx-auto">
            <h2 className=" text-white text-md sm:text-xl md:text-4xl font-bold tracking-tight text-center">Your Trusted Diamond Jewelry Manufacturing Partner</h2>
            <p className="text-[10px] sm:text-sm md:text-base text-white text-center max-w-xs">
              Uncompromised Quality. Timeless Design. Skilled Craftsmanship.
            </p>
            <Link href="/collections" className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-black text-xs md:text-base font-semibold rounded-full shadow-md hover:bg-gray-200 transition-colors">
              Discover Collections
            </Link>
          </div>
        </div>
    </section>
  );
};

export default Hero;
