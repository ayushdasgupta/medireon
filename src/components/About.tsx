'use client';

import { ReactNode } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { APPNAME } from '@/constraint';

type AnimationProps = {
  children: ReactNode;
  direction?: 'left' | 'right';
};

const AboutAnimation = ({ children, direction = 'left' }: AnimationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: direction === 'left' ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ margin: '-50px' }}
    >
      {children}
    </motion.div>
  );
};

export default function About() {
  return (
    <section id='about' className="relative bg-gradient-to-b from-[#f0f9ff] to-[#e6f7ff] py-16 sm:py-20 md:py-28 min-h-screen overflow-x-hidden">
      {/* Medical-themed background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-100/20 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-24 h-24 rounded-full bg-cyan-200/30 blur-3xl"></div>
      
      {/* Floating medical icons */}
      <div className="absolute top-1/4 left-8 opacity-20">
        <MedicalIcon icon="heart" />
      </div>
      <div className="absolute bottom-1/3 right-12 opacity-20 rotate-12">
        <MedicalIcon icon="pill" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <AboutAnimation direction="left">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-cyan-600 mb-4">
              About {APPNAME}
            </h2>
            
            <div className='flex justify-center items-center mb-6 md:mb-8'>
              <span className="relative inline-block px-2">
                <span className="absolute h-1 w-20 sm:w-24 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full -bottom-2 left-1/2 transform -translate-x-1/2"></span>
                <span className="relative z-10 text-sm sm:text-base text-blue-700 font-medium">
                  Empowering Healthcare. Simplifying Operations.
                </span>
              </span>
            </div>
          </div>
        </AboutAnimation>
        
        <div className="flex flex-col justify-center lg:flex-row items-center gap-8 lg:gap-16">
          {/* Left: Text Content */}
          <div className="w-full lg:w-1/2">
            <AboutAnimation direction="left">
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-blue-50">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-5 leading-tight text-gray-800">
                  Your Hospital&apos;s <span className="text-blue-600">Digital Brain</span>
                </h3>
                
                <p className="text-gray-600 mb-6 text-base sm:text-lg leading-relaxed">
                  {APPNAME} is a comprehensive SaaS solution built to simplify and digitize
                  healthcare administration. Whether you manage a clinic, nursing home, or
                  multi-specialty hospital, our platform ensures efficient workflows, data
                  security, and better patient care outcomes.
                </p>

                <ul className="space-y-5 sm:space-y-6">
                  <li className="flex items-start gap-4 sm:gap-5 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                    <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-base sm:text-lg">Tailored for Every Role</p>
                      <p className="text-sm sm:text-base text-gray-500 mt-1">
                        Customized modules for patients, doctors, receptionists, pharmacists, lab technicians, and administrators.
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start gap-4 sm:gap-5 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                    <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-base sm:text-lg">Security First</p>
                      <p className="text-sm sm:text-base text-gray-500 mt-1">
                        Advanced data protection and HIPAA-compliant infrastructure for complete peace of mind.
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start gap-4 sm:gap-5 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                    <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-base sm:text-lg">Better Patient Care</p>
                      <p className="text-sm sm:text-base text-gray-500 mt-1">
                        Streamlined operations lead to reduced wait times and improved healthcare delivery.
                      </p>
                    </div>
                  </li>
                </ul>

                <div className="mt-8 sm:mt-10">
                  <AnchorLink
                    href="/features"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                  >
                    <span>Explore Our Features</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </AnchorLink>
                </div>
              </div>
            </AboutAnimation>
          </div>

          {/* Right: Image */}
          <div className="lg:w-1/2 mt-8 lg:mt-0">
            <AboutAnimation direction="right">
              <div className="relative w-full max-w-xl ">
                <Image
                alt='about image'
                draggable={false}
                src="/about.jpg"
                width={1920}
                height={1080}
                />
              </div>
            </AboutAnimation>
          </div>
        </div>
      </div>
    </section>
  );
}

// Medical icon component
const MedicalIcon = ({ icon = "heart" }: { icon?: string }) => {
  const icons = {
    heart: (
      <motion.div 
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-300" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
        </svg>
      </motion.div>
    ),
    pill: (
      <motion.div 
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-cyan-300" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      </motion.div>
    ),
    cross: (
      <motion.div 
        animate={{ rotate: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      </motion.div>
    )
  };
  
  return icons[icon] || icons.heart;
};