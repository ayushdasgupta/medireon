'use client';

import Image from 'next/image';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

import { APPNAME, demoURL } from '@/constraint';

export default function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const floatTransition = {
    repeat: Infinity,
    duration: 4,
    ease: 'easeInOut',
  };

  const handleBooking = () => {
    window.open(demoURL, "_blank");
  };

  return (
    <>
      <motion.section
        id='home'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-600 text-white min-h-screen py-20 lg:py-0 overflow-hidden flex items-center"
      >
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[30%] -left-[20%] w-[60%] aspect-square bg-cyan-500/10 rounded-full"></div>
          <div className="absolute -bottom-[40%] -right-[20%] w-[70%] aspect-square bg-blue-800/10 rounded-full"></div>

          {/* Medical pattern overlay */}
          <div className="absolute inset-0 bg-[url('/medical-pattern.svg')] bg-[length:400px] opacity-10"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
          <div className="flex-1">
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              Streamline Your <br />
              Hospital Operations <br />
              with <span className="text-cyan-300 drop-shadow-lg">{APPNAME}</span>
            </motion.h1>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-blue-100 mb-8 max-w-lg"
            >
              Revolutionize your healthcare facility with an all-in-one hospital
              management SaaS. Experience seamless coordination between patients,
              doctors, and staff.
            </motion.p>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex sm:flex-row flex-col justify-start items-center gap-4"
            >
              <button
                onClick={handleBooking}
                className="bg-transparent border-2 border-cyan-300 text-white font-semibold w-full sm:w-auto px-8 py-4 rounded-lg shadow-lg hover:bg-cyan-400/20 hover:border-white transition-all duration-300 transform hover:-translate-y-1"
              >
                Schedule a Personalized Demo
              </button>
            </motion.div>
          </div>

          {/* Image with overlays */}
          <motion.div
            ref={ref}
            className="flex-1 relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-xl blur-xl"></div>
              <Image
                src="/hero.jpg"
                draggable={false}
                alt="Team working"
                width={600}
                height={400}
                className="relative rounded-xl shadow-2xl border-4 border-white/10"
              />
            </div>

            {isInView && (
              <>
                <motion.div
                  initial={{ y: 0, scale: 0.8 }}
                  animate={{
                    y: [0, -30, 0],
                    scale: [0.8, 1, 0.8]
                  }}
                  transition={{ ...floatTransition, delay: 0.2 }}
                  className="hidden md:block absolute -left-10 top-1/4 bg-gradient-to-br from-white to-blue-50 p-4 rounded-xl shadow-2xl z-20 border border-blue-100"
                >
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-blue-600 mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                      </svg>
                    </div>
                    <p className="font-bold text-blue-800 text-sm">Patient Records</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ y: 0, scale: 0.8 }}
                  animate={{
                    y: [0, -20, 0],
                    scale: [0.8, 1, 0.8]
                  }}
                  transition={{ ...floatTransition, delay: 0.4 }}
                  className="hidden md:block absolute -bottom-8 left-1/4 bg-gradient-to-br from-amber-400 to-amber-500 p-4 rounded-xl shadow-2xl z-20 border border-amber-300"
                >
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-white mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <p className="font-bold text-white text-sm">Billing &amp; Payments</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ y: 0, scale: 0.8 }}
                  animate={{
                    y: [0, -25, 0],
                    scale: [0.8, 1, 0.8]
                  }}
                  transition={{ ...floatTransition, delay: 0.6 }}
                  className="hidden md:block absolute -right-12 top-1/2 transform -translate-y-1/2 bg-gradient-to-br from-teal-400 to-teal-500 p-4 rounded-xl shadow-2xl z-20 border border-teal-300"
                >
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-white mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <p className="font-bold text-white text-sm">Appointment Scheduling</p>
                  </div>
                </motion.div>
              </>
            )}
          </motion.div>
        </div>

        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 pointer-events-none">
          <div className="flex gap-6">
            {[...Array(6)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ scale:0.8, opacity: 0.6 }}
                animate={{
                  scale: [0.8, 1.1, 0.8],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.3, // first-to-last wave
                  ease: "linear"
                }}
                
              >
                <MedicalIcon />
              </motion.div>
            ))}
          </div>
        </div>


      </motion.section>

    </>
  );
}

// Medical icon component
const MedicalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);
