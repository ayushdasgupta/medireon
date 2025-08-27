'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import {
  FaTachometerAlt,
  FaUsersCog,
  FaShieldAlt,
  FaCloud,
  FaClock,
  FaDesktop,
  FaLifeRing,
} from 'react-icons/fa';

import { APPNAME, demoURL } from '@/constraint';

// Define TypeScript interfaces
interface Feature {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const features: Feature[] = [
  {
    icon: <FaTachometerAlt className="text-blue-600 text-2xl" />,
    title: 'All-in-One Dashboard',
    desc: 'Control every aspect of your hospital from a single platform.',
  },
  {
    icon: <FaUsersCog className="text-blue-600 text-2xl" />,
    title: 'Role-Based Access',
    desc: 'Custom interfaces for each user type for maximum efficiency.',
  },
  {
    icon: <FaShieldAlt className="text-blue-600 text-2xl" />,
    title: 'Scalable & Secure',
    desc: 'Designed to scale with your facility while keeping patient data protected.',
  },
  {
    icon: <FaCloud className="text-blue-600 text-2xl" />,
    title: 'Cloud-Powered',
    desc: 'No installations needed. Access from anywhere, anytime.',
  },
  {
    icon: <FaClock className="text-blue-600 text-2xl" />,
    title: 'Emergency Ready',
    desc: 'Quick emergency booking and bed allocation system.',
  },
  {
    icon: <FaDesktop className="text-blue-600 text-2xl" />,
    title: 'Modern UI',
    desc: 'Intuitive design with a seamless user experience.',
  },
  {
    icon: <FaLifeRing className="text-blue-600 text-2xl" />,
    title: '24/7 Support',
    desc: "We're here whenever you need help.",
  },
];

export default function WhyChoose() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const handleBooking = () => {
    window.open(demoURL, "_blank");
  };
  // Add to cardsRef
  const addToCardsRef = (el: HTMLDivElement | null): void => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  useEffect(() => {
    // Make sure we're in the browser environment
    if (typeof window === 'undefined') return;
    
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Reset cards initially to ensure they're hidden before animation
    const resetCards = (): void => {
      gsap.set(cardsRef.current, { 
        opacity: 0, 
        y: 30 
      });
    };
    
    // Animation function that will run every time the section enters the viewport
    const animateCards = (): void => {
      // First reset cards
      resetCards();
      
      // Then animate them
      gsap.to(cardsRef.current, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power2.out',
        overwrite: true,
      });
    };
    
    // Create intersection observer to detect when element is in viewport
    let observer: IntersectionObserver;
    
    if (sectionRef.current && cardsRef.current.length > 0) {
      resetCards(); // Initial reset
      
      observer = new IntersectionObserver((entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          // Element is in viewport, run animation
          animateCards();
        } else {
          // Element is out of viewport, reset for next appearance
          resetCards();
        }
      }, {
        root: null, // viewport
        threshold: 0.2, // trigger when 20% visible
        rootMargin: '0px'
      });
      
      // Start observing our section
      observer.observe(sectionRef.current);
    }
    
    // Clean up
    return () => {
      if (observer) {
        observer.disconnect();
      }
      // Kill any remaining GSAP animations
      gsap.killTweensOf(cardsRef);
    };
  }, []);

  return (
    <>
    <section 
      ref={sectionRef} 
      className="py-16 md:py-24 px-4 bg-white text-center relative"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
          Why Choose <span className="text-blue-600">{APPNAME}</span>
        </h2>
        <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto mb-8 md:mb-12">
          Our platform is designed with healthcare professionals in mind, offering
          features that make a real difference in your daily operations.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-10">
          {features.map((item, idx) => (
            <div
              key={idx}
              ref={addToCardsRef}
              className="feature-card flex items-start gap-3 md:gap-4 text-left p-3 md:p-4 bg-white shadow-sm rounded-lg md:rounded-xl border border-blue-100 hover:shadow-md transition"
            >
              <div className="bg-white border border-blue-200 shadow-md p-2 md:p-3 rounded-lg md:rounded-xl flex-shrink-0">
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm md:text-md font-semibold mb-1">{item.title}</h4>
                <p className="text-xs md:text-sm text-gray-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        
        <button onClick={handleBooking} className="mt-8 md:mt-12 px-4 md:px-6 py-2 md:py-3 border-2 border-blue-500 rounded-lg text-blue-600 hover:bg-blue-50 transition text-sm md:text-base cursor-pointer">
          Schedule a Personalized Demo
        </button>
      </div>
      
    </section>
    
    </>
  );
}