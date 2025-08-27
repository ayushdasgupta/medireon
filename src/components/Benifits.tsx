'use client';

import { motion } from 'motion/react';
import {
  ShieldCheck,
  Bolt,
  DollarSign,
  ClipboardList,
  BarChart2,
  RefreshCw,
} from 'lucide-react';
import { APPNAME } from '@/constraint';

const benefits = [
  {
    title: 'Improved Efficiency',
    description:
      'Automate repetitive tasks and streamline workflows, reducing administrative burden by up to 60% and allowing staff to focus on patient care.',
    icon: <Bolt className="text-blue-500" />,
    bg: 'bg-blue-50',
  },
  {
    title: 'Enhanced Data Security',
    description:
      'HIPAA-compliant infrastructure with end-to-end encryption, regular backups, and granular access controls to protect sensitive patient information.',
    icon: <ShieldCheck className="text-teal-500" />,
    bg: 'bg-teal-50',
  },
  {
    title: 'Cost Reduction',
    description:
      'Decrease operational costs by 30% through optimized resource allocation, reduced paperwork, and minimized billing errors and claim rejections.',
    icon: <DollarSign className="text-orange-400" />,
    bg: 'bg-orange-50',
  },
  {
    title: 'Better Patient Experience',
    description:
      'Self-service portals, online appointment booking, and digital access to medical records lead to increased patient satisfaction and loyalty.',
    icon: <ClipboardList className="text-blue-400" />,
    bg: 'bg-blue-50',
  },
  {
    title: 'Data-Driven Insights',
    description:
      'Comprehensive analytics and reporting tools help identify trends, optimize resource allocation, and make informed strategic decisions.',
    icon: <BarChart2 className="text-teal-400" />,
    bg: 'bg-teal-50',
  },
  {
    title: 'Seamless Integration',
    description:
      'Easily connects with existing healthcare systems, medical devices, and third-party applications for a unified operational ecosystem.',
    icon: <RefreshCw className="text-orange-400" />,
    bg: 'bg-orange-50',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

export default function BenefitsSection() {
  return (
    <section id='benefits' className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Benefits</h2>
        <p className="mt-2 text-gray-500">
          How {APPNAME} transforms your healthcare facility’s operations and patient care.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            custom={index}
            className="bg-white rounded-xl shadow-sm p-6 text-left border border-gray-100"
          >
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-full mb-4 ${benefit.bg}`}
            >
              {benefit.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{benefit.title}</h3>
            <p className="text-sm text-gray-600">{benefit.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
