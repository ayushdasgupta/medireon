'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'Do you offer a free trial period?',
    answer:
      "We don't have any free plan, but we offer a 50% return if you're not satisfied with the service within the first month.",
  },
  {
    question: 'Can I upgrade or downgrade my plan later?',
    answer:
      'Both are possible, but we encourage you to upgrade or stick with your current plan for the best experience.',
  },
  {
    question: 'Is there a limit on the number of patients we can manage?',
    answer:
      'There’s no fixed upper limit on the number of patients you can manage. Our system is designed to scale with your needs, whether you’re a small clinic or a large hospital. However, if your usage grows significantly—such as handling tens of thousands of patient records or generating high volumes of real-time data—we may apply additional charges to ensure optimal performance and dedicated resources. We’re always happy to discuss custom solutions for large-scale requirements.',
  },
  {
    question: 'What kind of support do you offer?',
    answer:
      'We provide full system maintenance. In case of any crashes, we resolve them effciently.',
  },
];




export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setActiveIndex(prev => (prev === index ? null : index));
  };

  return (
    <section className=" hbg-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-10">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;

            return (
              <div
                key={index}
                className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left focus:outline-none cursor-pointer"
                >
                  <span className="text-gray-900 font-medium">{faq.question}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  </motion.span>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-4 text-gray-600"
                    >
                      <div className="h-20 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
