'use client'
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { APPNAME } from '@/constraint';

interface AccordionItemProps {
  title: string;
  content: React.ReactNode;
  isOpen: boolean;
  toggleAccordion: () => void;
  index: number;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ 
  title, 
  content, 
  isOpen, 
  toggleAccordion,
  index
}) => {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <motion.button
        initial={false}
        className="flex justify-between items-center w-full py-4 px-6 text-left bg-white hover:bg-gray-50 focus:outline-none"
        onClick={toggleAccordion}
        whileTap={{ scale: 0.98 }}
      >
        <h3 className="text-lg font-medium text-gray-900">{index}. {title}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M19 9L12 16L5 9" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-6 bg-gray-50">{content}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyPolicyModal({ isOpen, onClose }:PrivacyPolicyModalProps){
  const [openSection, setOpenSection] = useState<number | null>(null);

  const toggleSection = (index: number) => {
    setOpenSection(openSection === index ? null : index);
  };

  const policyData = [
    {
      title: "Information We Collect",
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">a. Personal Information</h4>
            <p>We collect personal data that you provide directly, including:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>Name, email address, phone number</li>
              <li>Hospital or clinic name</li>
              <li>Payment and billing details</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">b. Health Information</h4>
            <p>
              If you are a patient or medical staff, we may collect protected health information (PHI) 
              as part of your use of {APPNAME}, in accordance with HIPAA regulations.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "How We Use Your Information",
      content: (
        <div>
          <p>We use the collected information to:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>Provide and improve our services</li>
            <li>Manage user accounts and roles</li>
            <li>Process payments</li>
            <li>Communicate with users regarding updates and support</li>
            <li>Ensure security and prevent fraud</li>
          </ul>
        </div>
      ),
    },
    {
      title: "Data Security",
      content: (
        <div className="space-y-4">
          <p>
            We implement robust technical and organizational measures to protect your data, including:
          </p>
          <ul className="list-disc pl-5">
            <li>You own secure system we provide</li>
            <li>Role-based access controls</li>
            <li>Secure data storage</li>
            <li>Regular vulnerability assessments</li>
          </ul>
          <p>
            We are HIPAA-compliant and follow all industry best practices to protect your health data.
          </p>
        </div>
      ),
    },
    {
      title: "Data Sharing and Disclosure",
      content: (
        <div className="space-y-4">
          <p>
            We do not sell, rent, or trade your information. We may share data:
          </p>
          <ul className="list-disc pl-5">
            <li>With authorized healthcare professionals within your organization</li>
            <li>With third-party services (e.g., payment gateways) necessary to operate our platform</li>
            <li>When required by law or to enforce legal rights</li>
          </ul>
          <p>
            All third-party services are contractually obligated to protect your data.
          </p>
        </div>
      ),
    },
    {
      title: "Your Rights",
      content: (
        <div className="space-y-4">
          <p>You have the right to:</p>
          <ul className="list-disc pl-5">
            <li>Access, correct, or delete your personal data</li>
            <li>Request data portability</li>
            <li>Withdraw consent at any time</li>
          </ul>
          <p>
            If you are part of a healthcare organization, contact your administrator to manage your data preferences.
          </p>
        </div>
      ),
    },
    {
      title: "Data Retention",
      content: (
        <p>
          We retain your information as long as your account is active or as needed for legal, regulatory, and operational purposes.
        </p>
      ),
    },
    {
      title: "International Users",
      content: (
        <p>
          If you are accessing {APPNAME} from outside your local jurisdiction, your data may be transferred and stored in regions where our servers or service providers are located.
        </p>
      ),
    },
    {
      title: "Updates to this Policy",
      content: (
        <p>
          We may update this Privacy Policy periodically. We will notify users of any significant changes via email or a platform notice.
        </p>
      ),
    },
    {
      title: "Contact Us",
      content: (
        <div className="space-y-4">
          <p>
            If you have any questions or concerns regarding this Privacy Policy, please contact:
          </p>
          <p>
            📧 <a href="mailto:{APPNAME}.hms@gmail.com" className="text-blue-600 hover:underline">{APPNAME}.hms@gmail.com</a>
          </p>
        </div>
      ),
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto scrollbar-none">
          <div className="flex min-h-screen items-center justify-center p-4 text-center">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black"
              onClick={onClose}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="
              text-left relative w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-lg bg-white shadow-xl"
            >
              <div className="max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 z-10 bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Privacy Policy</h2>
                    <p className="text-sm text-gray-600">Effective Date: [Insert Date]</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none"
                  >
                    <svg 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>

                {/* Content */}
                <div className="px-6 py-4">
                  <p className="text-gray-700">
                    Welcome to {APPNAME}. We are committed to protecting your privacy and ensuring that your 
                    personal information is handled in a safe and responsible manner.
                  </p>
                  <p className="mt-3 text-gray-700">
                    By using our services, you agree to the collection and use of information in accordance with this Privacy Policy.
                  </p>
                </div>

                {/* Accordion Sections */}
                <div className="divide-y divide-gray-200">
                  {policyData.map((section, index) => (
                    <AccordionItem
                      key={index}
                      title={section.title}
                      content={section.content}
                      isOpen={openSection === index}
                      toggleAccordion={() => toggleSection(index)}
                      index={index + 1}
                    />
                  ))}
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-white px-6 py-4 border-t border-gray-200 flex justify-end">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 rounded bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
