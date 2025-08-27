'use client';
import { motion } from 'motion/react';
import { CheckCircle } from 'lucide-react';
import Image from 'next/image';

import { APPNAME, demoURL } from '@/constraint';

export default function ScaleSection() {
     const handleBooking = () => {
    window.open(demoURL, "_blank");
  };
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto rounded-2xl overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-2 bg-[#1976D2]">
        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="p-8 md:p-12 text-white flex flex-col justify-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Scale Your Healthcare Productivity
          </h2>
          <p className="text-white/90 mb-6 leading-relaxed">
            Choose {APPNAME} – The Smarter Way to Manage Healthcare. Streamline operations,
            improve patient satisfaction, and empower your staff with our comprehensive solution.
          </p>

          <ul className="space-y-4 mb-8">
            {[
              'HIPAA-compliant secure platform',
              "Easy to monitor",
              'Dedicated onboarding & 24/7 support',
            ].map((text, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-white" />
                <span>{text}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-4">
            <button onClick={handleBooking} className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all cursor-pointer">
            Schedule a Personalized Demo
            </button>
          </div>
        </motion.div>

        {/* Image content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative h-80 lg:h-auto"
        >
          <Image
            src="/cta.jpg"
            width={600}
            height={400}
            alt="Business professional in suit"
            className="object-cover w-full h-full"
          />
         
        </motion.div>
      </div>
      
    </section>
  );
}
