'use client';
import { APPNAME } from '@/constraint';
import { motion } from 'motion/react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import {
  FaEnvelope, 
} from 'react-icons/fa';

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.15,
      when: 'beforeChildren',
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Footer() {
  return (
    <motion.footer
      className="bg-gray-50 text-gray-700 border-t border-gray-200"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <motion.div variants={itemVariants}>
            <h2 className="text-xl font-bold text-blue-400">
              {APPNAME}
            </h2>
            <p className="mt-2 text-sm">
              Empowering Healthcare. Simplifying Operations.
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Your complete hospital management solution.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-md font-semibold text-blue-500 mb-2">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {['Home', 'About', 'Features', 'Pricing'].map((item, i) => (
                <li key={i}>
                  <AnchorLink href={`#${item.toLowerCase()}`} className="hover:text-teal-600 transition">{item}</AnchorLink>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Features */}
          <motion.div variants={itemVariants}>
            <h3 className="text-md font-semibold text-blue-500 mb-2">Features</h3>
            <ul className="space-y-2 text-sm">
              {['Patient Management', 'Doctor Scheduling', 'Pharmacy Module', 'Laboratory', 'Billing & Invoicing'].map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div  variants={itemVariants}>
            <h3 className="text-md font-semibold text-blue-500 mb-2">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <FaEnvelope className="text-teal-500 mt-1" /><a href={`mailto:${APPNAME.toLowerCase()}.hms@gmail.com`} className="text-black">{APPNAME.toLowerCase()}.hms@gmail.com</a>
              </li>
              
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.p
          className="border-t w-full border-gray-200 mt-10 pt-6 flex sm:flex-row text-sm text-gray-500 place-content-center"
          variants={itemVariants}
        >
          © 2025 {APPNAME}. All rights reserved.

        </motion.p>
      </div>
    </motion.footer>
  );
}
