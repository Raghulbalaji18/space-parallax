
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

// Planet data with orbital properties - increasing orbit radius to spread planets out more
const planets = [
  {
    name: "Mercury",
    description: "The smallest planet in our solar system and closest to the Sun—is only slightly larger than Earth's Moon. Mercury is a rocky planet with a massive iron core.",
    diameter: "4,879 km",
    orbitPeriod: "88 Earth days",
    color: "#A9A9A9", // Gray
    size: 30,
    orbitRadius: 150, // Increased from 100
    orbitSpeed: 8.2, // Doubled speed
    eccentricity: 0.1, 
    initialAngle: 45, 
    zIndex: 8
  },
  {
    name: "Venus",
    description: "Venus is the second planet from the Sun and Earth's closest planetary neighbor. Even though Mercury is closer to the Sun, Venus is the hottest planet in our solar system.",
    diameter: "12,104 km",
    orbitPeriod: "225 Earth days",
    color: "#E6BE8A", // Light orange-brown
    size: 45,
    orbitRadius: 225, // Increased from 150
    orbitSpeed: 3.2, // Doubled speed
    eccentricity: 0.05,
    initialAngle: 120,
    zIndex: 7
  },
  {
    name: "Earth",
    description: "Our home planet is the third planet from the Sun, and the only place we know of so far that's inhabited by living things. It's the only planet in our solar system with liquid water on the surface.",
    diameter: "12,756 km",
    orbitPeriod: "365.25 days",
    color: "#4B92DB", // Blue
    size: 48,
    orbitRadius: 300, // Increased from 200
    orbitSpeed: 2.0, // Doubled speed
    eccentricity: 0.02,
    initialAngle: 230,
    zIndex: 6
  },
  {
    name: "Mars",
    description: "Mars is the fourth planet from the Sun – a dusty, cold, desert world with a very thin atmosphere. Mars is also a dynamic planet with seasons, polar ice caps, canyons, extinct volcanoes.",
    diameter: "6,792 km",
    orbitPeriod: "687 Earth days",
    color: "#E27B58", // Red-orange
    size: 40,
    orbitRadius: 375, // Increased from 250
    orbitSpeed: 1.0, // Doubled speed
    eccentricity: 0.09,
    initialAngle: 0,
    zIndex: 5
  },
  {
    name: "Jupiter",
    description: "Jupiter is the fifth planet from our Sun and is, by far, the largest planet in the solar system – more than twice as massive as all the other planets combined.",
    diameter: "142,984 km",
    orbitPeriod: "12 Earth years",
    color: "#E0A96D", // Light orange
    size: 85,
    orbitRadius: 480, // Increased from 320
    orbitSpeed: 0.16, // Doubled speed
    eccentricity: 0.05,
    initialAngle: 80,
    zIndex: 4
  },
  {
    name: "Saturn",
    description: "Saturn is the sixth planet from the Sun and the second-largest planet in our solar system. Adorned with a dazzling system of icy rings, Saturn is unique among the planets.",
    diameter: "120,536 km",
    orbitPeriod: "29.5 Earth years",
    color: "#EDC9AF", // Tan
    size: 75,
    orbitRadius: 600, // Increased from 400
    orbitSpeed: 0.06, // Doubled speed
    eccentricity: 0.06,
    initialAngle: 160,
    zIndex: 3,
    hasRings: true
  },
  {
    name: "Uranus",
    description: "Uranus is the seventh planet from the Sun. It has the third-largest diameter in our solar system. Uranus is very cold and windy and is surrounded by 13 faint rings and 27 small moons.",
    diameter: "51,118 km",
    orbitPeriod: "84 Earth years",
    color: "#B0E0E6", // Pale blue
    size: 60,
    orbitRadius: 705, // Increased from 470
    orbitSpeed: 0.024, // Doubled speed
    eccentricity: 0.04,
    initialAngle: 290,
    zIndex: 2
  },
  {
    name: "Neptune",
    description: "Neptune is the eighth and farthest planet from the Sun. In the Solar System, it is the fourth-largest planet by diameter, the third-most-massive planet, and the densest giant planet.",
    diameter: "49,528 km",
    orbitPeriod: "165 Earth years",
    color: "#5B8CDB", // Deep blue
    size: 58,
    orbitRadius: 780, // Increased from 520
    orbitSpeed: 0.012, // Doubled speed
    eccentricity: 0.01,
    initialAngle: 320,
    zIndex: 1
  }
];

// New comets data with random properties
const comets = Array.from({ length: 12 }).map((_, index) => ({
  id: `comet-${index}`,
  startPosition: {
    x: Math.random() * 100,
    y: Math.random() * 100
  },
  length: 80 + Math.random() * 120,
  angle: -45 + (Math.random() * 90),
  opacity: 0.7 + Math.random() * 0.3,
  animationDuration: 5 + Math.random() * 15,
  delay: Math.random() * 10
}));

const SolarSystem = () => {
  const [scrollY, setScrollY] = useState(0);
  const [time, setTime] = useState(Date.now() / 1000);
  const [blackHoleActive, setBlackHoleActive] = useState(false);
  const [swallowedPlanets, setSwallowedPlanets] = useState<string[]>([]);
  const solarSystemRef = useRef<HTMLDivElement>(null);
  const blackHoleRef = useRef<HTMLDivElement>(null);

  // Animation loop for continuous rotation - faster update rate for smoother animation
  useEffect(() => {
    const animationFrame = requestAnimationFrame(function animate() {
      setTime(Date.now() / 1000);
      requestAnimationFrame(animate);
    });
    
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Check if user scrolled to black hole section
      if (blackHoleRef.current) {
        const blackHolePosition = blackHoleRef.current.getBoundingClientRect().top;
        
        // Activate black hole when it's in view
        if (blackHolePosition < window.innerHeight * 0.8) {
          setBlackHoleActive(true);
        } else {
          setBlackHoleActive(false);
          setSwallowedPlanets([]);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle planet swallowing - only Neptune gets swallowed
  useEffect(() => {
    if (blackHoleActive) {
      setSwallowedPlanets(["Neptune"]);
    }
  }, [blackHoleActive]);

  // Calculate orbit for each planet with elliptical orbits
  const calculateOrbitPosition = (planet: typeof planets[0], time: number) => {
    const angle = ((time * planet.orbitSpeed) + planet.initialAngle) % 360;
    const radians = angle * (Math.PI / 180);
    
    // Calculate position using eccentricity for elliptical orbits
    const distance = planet.orbitRadius * (1 - planet.eccentricity * Math.cos(radians));
    
    return {
      x: Math.cos(radians) * distance,
      y: Math.sin(radians) * distance * 0.3 // Flattened ellipse
    };
  };

  return (
    <div className="min-h-screen bg-space-dark-blue text-white overflow-hidden">
      {/* Solar System Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center py-20">
        <h1 className="text-5xl font-bold mb-12 text-center z-10">Our Solar System</h1>
        
        {/* Solar System Visualization - Continuous animation regardless of scroll */}
        <div 
          ref={solarSystemRef}
          className="relative w-full max-w-5xl h-[700px] mx-auto mb-20" // Increased height and width to accommodate larger orbits
          style={{
            transform: `translateY(${scrollY * 0.1}px) scale(${1 + scrollY * 0.0002})`
          }}
        >
          {/* Sun */}
          <div 
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #FDB813 10%, #F97316 100%)',
              boxShadow: '0 0 60px 20px rgba(249, 115, 22, 0.7)',
              animation: 'pulse 3s infinite alternate'
            }}
          ></div>
          
          {/* Planets - Now with continuous animation independent of scroll */}
          {planets.map((planet, index) => {
            const position = calculateOrbitPosition(planet, time);
            const isSwallowed = swallowedPlanets.includes(planet.name);
            const rotationSpeed = 1 / planet.orbitSpeed * 2.5; // Faster rotation (changed from 5 to 2.5)
            
            return (
              <div 
                key={planet.name}
                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
                style={{
                  zIndex: planet.zIndex,
                  transition: `transform ${0.2 + index * 0.1}s ease-in-out`,
                  transform: `translate(${position.x}px, ${position.y}px) translateZ(${-index * 10}px)`,
                  animation: isSwallowed ? 'shrink-in 2s ease-in-out forwards' : ''
                }}
              >
                <div 
                  className="rounded-full relative"
                  style={{
                    width: `${planet.size}px`,
                    height: `${planet.size}px`,
                    backgroundColor: planet.color,
                    boxShadow: `0 0 10px 2px ${planet.color}80`,
                    animation: `rotate ${rotationSpeed}s linear infinite`
                  }}
                >
                  {planet.hasRings && (
                    <div 
                      className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[-1]"
                      style={{
                        width: `${planet.size * 2.2}px`,
                        height: `${planet.size * 0.4}px`,
                        backgroundColor: 'rgba(237, 185, 99, 0.6)',
                        borderRadius: '100%',
                        transform: 'rotate(20deg)',
                        boxShadow: '0 0 5px 1px rgba(237, 185, 99, 0.3)'
                      }}
                    ></div>
                  )}
                </div>
                <span 
                  className="absolute -bottom-6 text-xs whitespace-nowrap"
                  style={{ opacity: isSwallowed ? 0 : 1 }}
                >
                  {planet.name}
                </span>
              </div>
            );
          })}
          
          {/* Orbit Paths */}
          {planets.map((planet) => (
            <div 
              key={`orbit-${planet.name}`}
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
              style={{
                width: `${planet.orbitRadius * 2}px`,
                height: `${planet.orbitRadius * 0.6}px`,
                zIndex: 0
              }}
            ></div>
          ))}
          
          {/* Animated comets - new feature */}
          {comets.map((comet) => (
            <div
              key={comet.id}
              className="absolute z-20"
              style={{
                top: `${comet.startPosition.y}%`,
                left: `${comet.startPosition.x}%`,
                width: `${comet.length}px`,
                height: '2px',
                background: 'linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,1))',
                transform: `rotate(${comet.angle}deg)`,
                opacity: comet.opacity,
                animation: `comet-fly ${comet.animationDuration}s linear ${comet.delay}s infinite`
              }}
            >
              <div className="absolute right-0 w-2 h-2 rounded-full bg-white shadow-glow"></div>
            </div>
          ))}
          
          {/* Star cluster effects - new feature */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
              <Sparkles className="w-24 h-24 text-white opacity-30 animate-pulse" />
            </div>
            <div className="absolute top-3/4 right-1/4 transform translate-x-1/2 -translate-y-1/2">
              <Sparkles className="w-20 h-20 text-blue-100 opacity-40 animate-pulse" />
            </div>
            <div className="absolute top-2/4 right-1/3 transform translate-x-1/3 -translate-y-1/3">
              <Sparkles className="w-16 h-16 text-purple-100 opacity-30 animate-pulse" />
            </div>
          </div>
        </div>
        
        {/* Planet Details with enhanced parallax */}
        <div className="w-full max-w-6xl mx-auto px-4">
          {planets.map((planet, index) => (
            <div 
              key={`detail-${planet.name}`}
              className="flex flex-col md:flex-row items-center justify-between py-16 px-4 md:px-8"
              style={{
                opacity: swallowedPlanets.includes(planet.name) ? 0 : 1,
                // Enhanced parallax effect based on scroll position
                transform: `translateY(${scrollY * 0.08 * (index % 2 === 0 ? 1 : -1)}px) translateX(${(index % 2 === 0 ? -1 : 1) * scrollY * 0.03}px)`,
                transition: 'opacity 0.5s ease-in-out, transform 0.2s ease-out'
              }}
            >
              <div className={`w-full md:w-1/2 p-6 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                <h2 className="text-3xl font-bold mb-4">{planet.name}</h2>
                <p className="mb-4">{planet.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-space-light-purple">Diameter</h3>
                    <p>{planet.diameter}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-space-light-purple">Orbit Period</h3>
                    <p>{planet.orbitPeriod}</p>
                  </div>
                </div>
              </div>
              <div 
                className={`w-full md:w-1/2 flex justify-center items-center p-6 ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}
                // Add separate parallax effect for planet images
                style={{
                  transform: `translateY(${scrollY * 0.05 * (index % 2 === 0 ? -1 : 1)}px) scale(${1 + scrollY * 0.0001})`
                }}
              >
                <div 
                  className="rounded-full shadow-lg relative"
                  style={{
                    width: `${planet.size * 2}px`,
                    height: `${planet.size * 2}px`,
                    backgroundColor: planet.color,
                    boxShadow: `0 0 30px 5px ${planet.color}80`,
                    animation: `rotate ${5 + index * 1.5}s linear infinite` // Faster rotation
                  }}
                >
                  {planet.hasRings && (
                    <div 
                      className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[-1]"
                      style={{
                        width: `${planet.size * 4}px`,
                        height: `${planet.size * 0.8}px`,
                        backgroundColor: 'rgba(237, 185, 99, 0.6)',
                        borderRadius: '100%',
                        transform: 'rotate(20deg)',
                        boxShadow: '0 0 8px 2px rgba(237, 185, 99, 0.4)'
                      }}
                    ></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Black Hole Section */}
      <section 
        ref={blackHoleRef}
        className="relative min-h-screen flex flex-col items-center justify-center py-20"
      >
        <h2 className="text-4xl font-bold mb-12 text-center z-10">The Cosmic Devourer</h2>
        
        {/* Black Hole with enhanced animation */}
        <div 
          className={`w-80 h-80 relative z-10 ${blackHoleActive ? 'animate-black-hole-expand' : ''}`}
          style={{
            transform: `scale(${1 + (scrollY * 0.0005)}) rotate(${scrollY * 0.05}deg)`,
            background: 'radial-gradient(circle, #000000 30%, rgba(0,0,0,0) 70%)',
            boxShadow: '0 0 80px 15px rgba(130, 87, 230, 0.3)'
          }}
        >
          <div className="absolute inset-0 rounded-full bg-transparent border-4 border-purple-500/30 animate-rotate-slow"></div>
          <div className="absolute inset-2 rounded-full bg-transparent border-2 border-blue-400/20 animate-rotate-medium" style={{ animationDirection: 'reverse' }}></div>
        </div>
        
        <div className="max-w-2xl text-center mt-12 z-10">
          <p className="text-xl mb-8">
            As our cosmic journey comes to an end, witness as Neptune is drawn into the void. 
            Scroll up to see this distant planet surrender to the irresistible pull of the black hole.
          </p>
          
          <div className="mt-20">
            <h3 className="text-2xl font-semibold mb-4">Thank You For Exploring With Us</h3>
            <p className="mb-8">
              Our universe is vast and full of wonders. This journey through our solar system 
              is just the beginning of what lies beyond in the cosmic ocean.
            </p>
            
            <Link to="/">
              <Button 
                className="bg-space-bright-orange hover:bg-space-bright-orange/80 text-white"
              >
                Return Home
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Animated comets in black hole section */}
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={`black-hole-comet-${i}`}
            className="absolute"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${60 + Math.random() * 100}px`,
              height: '2px',
              background: 'linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,1))',
              transform: `rotate(${-45 + (Math.random() * 90)}deg)`,
              opacity: 0.7 + Math.random() * 0.3,
              animation: `comet-fly ${8 + Math.random() * 12}s linear ${Math.random() * 5}s infinite`
            }}
          >
            <div className="absolute right-0 w-1 h-1 rounded-full bg-white shadow-glow"></div>
          </div>
        ))}
        
        {/* Enhanced star background with different sizes and brightness */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 300 }).map((_, i) => (
            <div
              key={`bg-star-${i}`}
              className={`absolute rounded-full bg-white animate-${i % 3 === 0 ? 'twinkle' : i % 3 === 1 ? 'twinkle-delay' : 'twinkle-delay-2'}`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                boxShadow: i % 10 === 0 ? '0 0 4px 1px rgba(255, 255, 255, 0.8)' : 'none'
              }}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default SolarSystem;
