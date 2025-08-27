'use client';
import { JSX } from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import {
  FaUser,
  FaUserMd,
  FaUserTie,
  FaPills,
  FaMicroscope,
  FaCrown,
} from 'react-icons/fa';

type Role = {
  title: string;
  icon: JSX.Element;
  img: string;
  color: string;
  points: string[];
};

const roles: Role[] = [
  {
    title: 'For Patients',
    icon: <FaUser className="text-xl text-fuchsia-600" />,
    color: 'border-fuchsia-500',
    img: '/patient.jpg',
    points: [
      'Quick online registration & login',
      'Book or cancel appointments instantly',
      'Secure online payments',
      'Access invoices & medical reports',
      'Manage personal and medical information',
      'Change password anytime',
    ],
  },
  {
    title: 'For Doctors',
    icon: <FaUserMd className="text-xl text-emerald-500" />,
    color: 'border-emerald-400',
    img: '/doctor.jpg',
    points: [
      "View today's appointments",
      'Reschedule or complete appointments',
      'Access patient history',
      'Update profile and avatar',
    ],
  },
  {
    title: 'For Receptionists',
    icon: <FaUserTie className="text-xl text-green-500" />,
    color: 'border-green-400',
    img: '/receptionist.jpg',
    points: [
      'Create and manage patient profiles',
      'View and schedule daily appointments',
      'Manage doctor & patient lists',
      'Handle emergency & bed bookings',
      'Generate bills for all services',
    ],
  },
  {
    title: 'For Pharmacists',
    icon: <FaPills className="text-xl text-yellow-500" />,
    color: 'border-yellow-400',
    img: '/pharmacist.jpg',
    points: [
      'Manage full medicine inventory',
      'Sell and update medicine stock',
      'Access patient lists',
      'Manage profile and security',
    ],
  },
  {
    title: 'For Lab Technicians',
    icon: <FaMicroscope className="text-xl text-rose-500" />,
    color: 'border-rose-400',
    img: '/lab-technician.jpg',
    points: [
      'Manage test bookings',
      'Upload diagnostic reports',
      'Maintain patient lists',
      'Update profile and avatar',
    ],
  },
  {
    title: 'For Admins',
    icon: <FaCrown className="text-xl text-purple-500" />,
    color: 'border-purple-400',
    img: '/admin.jpg',
    points: [
      'View smart dashboards & reports',
      'Create & manage all roles',
      'Full control over appointments, beds, staff, and more',
    ],
  },
];

const swipeVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
  }),
};

export const KeyFeatures = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleTabClick = (newIndex: number) => {
    if (newIndex !== index) {
      setDirection(newIndex > index ? 1 : -1);
      setIndex(newIndex);
    }
  };

  return (
    <section
      id="features"
      className="px-4 py-16 sm:py-20 bg-gradient-to-br from-blue-50 to-cyan-50"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4"
          >
            Role-Specific Features
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Tailored features designed for each role within your healthcare
            facility
          </motion.p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
          {roles.map((role, i) => (
            <motion.button
              key={role.title}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                index === i
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 shadow-md hover:bg-blue-50'
              }`}
              onClick={() => handleTabClick(i)}
            >
              {role.icon}
              <span className="hidden xs:inline">{role.title}</span>
              <span className="xs:hidden">{role.title.split(' ')[1]}</span>
            </motion.button>
          ))}
        </div>

        {/* Main content */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              variants={swipeVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
                duration: 0.5,
              }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="flex flex-col lg:flex-row">
                {/* Left image */}
                <div className="w-full lg:w-2/5 relative min-h-[250px] sm:min-h-[300px]">
                  <Image
                    src={roles[index].img}
                    alt={`${roles[index].title} illustration`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4 sm:p-6">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="bg-white/20 backdrop-blur-sm p-2 sm:p-3 rounded-full">
                        {roles[index].icon}
                      </div>
                      <h3 className="text-lg sm:text-2xl font-bold text-white">
                        {roles[index].title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Right content */}
                <div className="w-full lg:w-3/5 p-5 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
                    Key Features for {roles[index].title}
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    {roles[index].points.map((point, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.1 }}
                        className="flex items-start gap-2 sm:gap-3 bg-blue-50/50 p-3 sm:p-4 rounded-lg border border-blue-100"
                      >
                        <div className="bg-blue-100 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-700"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <span className="text-gray-700 text-sm sm:text-base">
                          {point}
                        </span>
                      </motion.li>
                    ))}
                  </ul>

                 
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex justify-center mt-6 sm:mt-8 gap-3 sm:gap-4 flex-wrap">
          <button
            onClick={() =>
              handleTabClick((index + roles.length - 1) % roles.length)
            }
            className="bg-white p-2.5 sm:p-3 rounded-full shadow-md hover:bg-blue-50 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <div className="flex items-center gap-1">
            {roles.map((_, i) => (
              <button
                key={i}
                onClick={() => handleTabClick(i)}
                className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-colors ${
                  index === i ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => handleTabClick((index + 1) % roles.length)}
            className="bg-white p-2.5 sm:p-3 rounded-full shadow-md hover:bg-blue-50 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
