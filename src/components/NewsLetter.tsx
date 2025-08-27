'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import toast from 'react-hot-toast';
import PrivacyPolicyModal from './PrivacyPolicyModal';
import { APPNAME } from '@/constraint';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    try {
      const encodedBody = `email=${encodeURIComponent(email)}`;

      const res = await fetch(process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL!, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodedBody,
      });

      await res.text();

      toast.success("Subscribed successfully!");
      setSubscribed(true);
      setEmail('');
    } catch (e) {
      console.log(e);
      toast.error("Subscription failed. Please try again later.");
    }
  };


  useEffect(() => {
    if (subscribed) {
      const timer = setTimeout(() => {
        setSubscribed(false);
      }, 6000); // Hide after 6 seconds
      return () => clearTimeout(timer); // Cleanup
    }
  }, [subscribed]);

  return (
    <>
      <section id='contact' className="py-16 px-4 bg-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-4xl mx-auto rounded-xl border border-gray-200 p-8 text-center shadow-sm"
        >
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
            Stay Updated with {APPNAME}
          </h2>
          <p className="text-gray-500 mb-6 text-sm md:text-base">
            Subscribe to our newsletter for the latest features, industry insights, and healthcare management tips.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-xl mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email address"
              className="w-full flex-1 px-4 py-3 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition caret-blue-600"
            />
            <button

              type="submit"
              className="bg-teal-500  text-white font-semibold text-sm px-6 py-3 rounded-md hover:bg-teal-600 transition cursor-pointer"
            >
              Subscribe
            </button>
          </form>

          {subscribed && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-4 text-sm text-green-600 font-medium"
            >
              Thanks for subscribing to our newsletter!
            </motion.p>
          )}

          <p className="mt-4 text-xs text-gray-600 max-w-md mx-auto">
            By subscribing, you agree to our <button onClick={() => setIsPrivacyPolicyOpen(true)} className="underline hover:text-gray-800 cursor-pointer">Privacy Policy</button> and consent to receive updates.
          </p>
        </motion.div>
        
      </section>
      <PrivacyPolicyModal
          isOpen={isPrivacyPolicyOpen}
          onClose={() => setIsPrivacyPolicyOpen(false)}
        />
    </>
  );
}
