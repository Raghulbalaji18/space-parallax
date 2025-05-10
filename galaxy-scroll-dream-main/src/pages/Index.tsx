
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setWindowHeight(window.innerHeight);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Calculate the sun/moon position and day/night transition based on scroll
  const skyColorValue = Math.min(255, Math.max(0, 255 - (scrollY / windowHeight) * 255));
  const nightSkyOpacity = Math.min(1, scrollY / (windowHeight * 0.8));
  const celestialBodyLeft = Math.min(80, 20 + (scrollY / windowHeight) * 60); // Move from 20% to 80%
  
  // Sun to moon transition
  const sunOpacity = Math.max(0, 1 - scrollY / (windowHeight * 0.5));
  const moonOpacity = Math.min(1, (scrollY / windowHeight) * 1.2);
  
  // Stars opacity
  const starsOpacity = Math.min(1, scrollY / (windowHeight * 0.3));

  return (
    <div className="min-h-[200vh] relative overflow-hidden">
      {/* Dynamic sky background */}
      <div 
        className="fixed inset-0 transition-colors duration-300"
        style={{ 
          backgroundColor: `rgb(${skyColorValue}, ${skyColorValue}, 255)`,
          zIndex: -10
        }}
      />
      
      {/* Night sky overlay */}
      <div 
        className="fixed inset-0 bg-space-dark-blue transition-opacity duration-300"
        style={{ 
          opacity: nightSkyOpacity,
          zIndex: -9
        }}
      />
      
      {/* Stars - appear as we scroll */}
      <div 
        className="fixed inset-0 z-[-8]"
        style={{ opacity: starsOpacity }}
      >
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full bg-white animate-${i % 3 === 0 ? 'twinkle' : i % 3 === 1 ? 'twinkle-delay' : 'twinkle-delay-2'}`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
            }}
          />
        ))}
      </div>
      
      {/* Sun - fades out as you scroll */}
      <div 
        className="fixed top-[15%] transition-all duration-300"
        style={{ 
          left: `${celestialBodyLeft}%`,
          opacity: sunOpacity,
          zIndex: -7
        }}
      >
        <div className="w-[120px] h-[120px] rounded-full bg-space-bright-orange shadow-[0_0_60px_20px_rgba(249,115,22,0.7)]" />
      </div>
      
      {/* Moon - appears as you scroll */}
      <div 
        className="fixed top-[15%] transition-all duration-300"
        style={{ 
          left: `${celestialBodyLeft}%`,
          opacity: moonOpacity,
          zIndex: -7
        }}
      >
        <div className="w-[120px] h-[120px] rounded-full bg-space-light-purple shadow-[0_0_40px_10px_rgba(214,188,250,0.6)]" />
      </div>
      
      {/* Main content with parallax effect */}
      <div 
        ref={contentRef}
        className="min-h-screen flex flex-col items-center justify-center text-center p-8 relative z-10"
      >
        <div 
          className="max-w-3xl mx-auto"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            Journey Through the Cosmos
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-white">
            The universe is vast and mysterious, filled with wonders beyond our imagination.
            From the blazing heat of our Sun to the cold depths of space, each celestial body
            tells a story of cosmic evolution spanning billions of years.
          </p>
          <p className="text-lg mb-12 text-white">
            Our solar system formed about 4.6 billion years ago from a dense cloud of
            interstellar gas and dust. The Sun contains 99.8% of the mass in our solar system,
            with planets, moons, asteroids, and comets making up the rest. Each planet has its own
            unique characteristics and mysteries waiting to be explored.
          </p>
        </div>
        
        <div 
          className="mt-12"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        >
          <Link to="/solar-system">
            <Button 
              size="lg"
              className="bg-space-light-purple hover:bg-space-light-purple/80 text-black text-lg"
            >
              Explore More
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Second section with more information */}
      <div className="min-h-screen flex items-center justify-center p-8 relative z-10">
        <div 
          className="max-w-3xl mx-auto text-center"
          style={{ transform: `translateY(${-scrollY * 0.1}px)` }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Beyond Our Atmosphere
          </h2>
          <p className="text-xl mb-12 text-white">
            Space is not just empty vacuum. It's filled with radiation, magnetic fields, and 
            particles that flow from the Sun in what we call the solar wind. This constant stream
            of particles interacts with Earth's magnetic field, creating beautiful auroras near 
            our poles.
          </p>
          <p className="text-lg mb-12 text-white">
            As you venture further into our solar system, you'll encounter gas giants with 
            powerful storms, icy worlds with subsurface oceans, and rocky planets with histories 
            not unlike our own Earth. Each has a unique story to tell about the formation and 
            evolution of our cosmic neighborhood.
          </p>
          <p className="text-lg text-white">
            Continue scrolling to see how day transitions into night, just as it does in space
            when planets rotate away from their stars.
          </p>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div 
        className="fixed bottom-10 left-1/2 transform -translate-x-1/2 text-white animate-bounce"
        style={{ opacity: Math.max(0, 1 - scrollY / 300) }}
      >
        <p className="text-sm">Scroll to continue the journey</p>
        <div className="h-10 w-0.5 bg-white mx-auto mt-2"></div>
      </div>
    </div>
  );
};

export default Index;
