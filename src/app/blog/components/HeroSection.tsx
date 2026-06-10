import React from 'react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-r from-purple-50 to-blue-50">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1764702/pexels-photo-1764702.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center opacity-5"></div>
      
      {/* Decorative elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/0 to-white/70"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
            The <span className="text-gradient">KD</span> Journal
          </h1>
          <p className="text-md text-gray-700 mb-8 leading-relaxed">
          Stay informed with the latest industry updates, deep market insights, manufacturing expertise, and practical guides from the world of diamonds and jewelry.
          </p>
          {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              Explore Tutorials
            </Button>
            <Button variant="outline" size="lg">
              Browse Categories
            </Button>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;