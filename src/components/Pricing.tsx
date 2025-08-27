'use client'
import { motion } from 'motion/react';
import { Check, X, Globe, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import toast from 'react-hot-toast';

// Type definitions
type CurrencyCode = 'INR' | 'USD' | 'EUR' | 'GBP';

interface Currency {
  symbol: string;
  multiplier: number;
  name: string;
}

interface Feature {
  label: string;
  included: boolean;
}

interface PricingPlan {
  name: string;
  price: number;
  desc: string;
  features: (string | Feature)[];
  isPopular: boolean;
  color: string;
}

interface AdditionalCost {
  title: string;
  desc: number | string;
  subtitle?: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  purpose: string;
}

// Currency configuration
const currencies: Record<CurrencyCode, Currency> = {
  INR: {
    symbol: '₹',
    multiplier: 1, // Base rate (INR)
    name: 'Indian Rupee'
  },
  USD: {
    symbol: '$',
    multiplier: 0.012,
    name: 'US Dollar'
  },
  EUR: {
    symbol: '€',
    multiplier: 0.011,
    name: 'Euro'
  },
  GBP: {
    symbol: '£',
    multiplier: 0.0095,
    name: 'British Pound'
  }
};

// Base pricing in INR
const basePricingPlans: PricingPlan[] = [
  {
    name: 'Basic',
    price: 7599,
    desc: 'Perfect for small clinics and practices just getting started.',
    features: [
      'Access for Patients, Doctors, Receptionists, Admin',
      'Appointment booking system',
      'Medical reports access',
      'Patient history tracking',
      'Basic analytics dashboard',
      { label: 'Pharmacy & lab modules', included: false },
      { label: 'Emergency bed management', included: false },
      {label:'Medical reports access',included:false}
    ],
    isPopular: false,
    color: 'bg-blue-100'
  },
  {
    name: 'Pro',
    price: 12599,
    desc: 'For growing healthcare facilities with advanced needs.',
    features: [
      'All Basic features',
      'Bed management system',
      'Advanced analytics dashboard',
      'Priority support',
      { label: 'Pharmacist module', included: false },
      { label: 'Lab module', included: false },
    ],
    isPopular: true,
    color: 'bg-emerald-100'
  },
  {
    name: 'Plus',
    price: 16649,
    desc: 'Complete solution for hospitals and medical centers.',
    features: [
      'All Pro features',
      'Pharmacist module',
      'Lab module',
      'Test creation & report uploads',
      'Custom reporting tools',
    ],
    isPopular: false,
    color: 'bg-cyan-100'
  },
];

const customPlan: PricingPlan = {
  name: 'Custom',
  price: 0,
  desc: 'Tailored solution for your healthcare facility.',
  features: [],
  isPopular: false,
  color: 'bg-purple-100'
};

const baseAdditionalCosts: AdditionalCost[] = [
  { title: 'Subscription Fee', desc: 'Included in plan pricing' },
  { title: 'Setup Fee', desc: 4000, subtitle: 'One-time payment for initial setup (Non-Refundable)' },
  { title: 'Data Backup & Restore', desc: 1500, subtitle: 'Per month (optional)' },
  { title: 'Taxes', desc: '18%', subtitle: 'Per month' },
];

const baseAddOns: AdditionalCost[] = [
  { title: 'Mail Notifications', desc: 299, subtitle: 'After 3000 mails till 15000' },
  { title: 'AI Support', desc: 799, subtitle: 'For patient side AI automation' },
  { title: 'Mobile App', desc: 600, subtitle: 'Maintenance & Auto update' },
];
const formatPrice = (price: number | string, currency: CurrencyCode): string => {
  if (typeof price === 'string') {
    return price;
  }
  const convertedPrice = Math.round(price * currencies[currency].multiplier);
  return currencies[currency].symbol + convertedPrice;
};

// Modal component
const SignupModal = ({ isOpen, onClose, selectedPlan, selectedCurrency }: {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: PricingPlan | null;
  selectedCurrency: CurrencyCode;
}) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    const finalData = {
      ...data,
      plan: selectedPlan?.name,
      price: formatPrice(selectedPlan!.price, selectedCurrency),
    };

    const encodedBody = Object.keys(finalData)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(
            finalData[key as keyof typeof finalData] ?? ""
          )}`
      )
      .join("&");

    try {
      await fetch(process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL!, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodedBody,
      });

      toast.success("Thank you for your interest! We'll contact you shortly.");
      reset();
      onClose();
      setLoading(false)
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
      console.log(error)
      setLoading(false)
    }
  };

  if (!isOpen || !selectedPlan) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-900">
              {selectedPlan.name === 'Custom' ? 'Request Custom Solution' : `Get Started with ${selectedPlan.name} Plan`}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          <div className="mb-4">
            <p className="text-gray-600">{selectedPlan.desc}</p>
            {selectedPlan.name !== 'Custom' && (
              <div className="mt-2 font-semibold text-blue-600">
                {formatPrice(selectedPlan.price, selectedCurrency)}
                <span className="text-sm font-normal text-gray-500"> /month</span>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                id="name"
                type="text"
                className={`w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${errors.name ? 'border-red-500' : ''}`}
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                id="email"
                type="email"
                className={`w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${errors.email ? 'border-red-500' : ''}`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
              />
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                id="phone"
                type="tel"
                className={`w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${errors.phone ? 'border-red-500' : ''}`}
                {...register("phone", { required: "Phone number is required" })}
              />
              {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea
                id="address"
                rows={3}
                className={`w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${errors.address ? 'border-red-500' : ''}`}
                {...register("address", { required: "Address is required" })}
              />
              {errors.address && <p className="mt-1 text-xs text-red-600">{errors.address.message}</p>}
            </div>

            <div>
              <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-1">Purpose</label>
              <textarea
                id="purpose"
                rows={3}
                placeholder="Tell us about your healthcare facility and how you plan to use our system..."
                className={`w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${errors.purpose ? 'border-red-500' : ''}`}
                {...register("purpose", { required: "Purpose is required" })}
              />
              {errors.purpose && <p className="mt-1 text-xs text-red-600">{errors.purpose.message}</p>}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium py-3 px-4 rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 flex items-center justify-center gap-2"
              >
                {loading ? (
                  "Submitting..."
                ) : (
                  <>
                    <span>Submit Application</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

interface PricingCardProps {
  plan: PricingPlan;
  selectedCurrency: CurrencyCode;
  onGetStarted: (plan: PricingPlan) => void;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, selectedCurrency, onGetStarted }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    whileHover={{ y: -10 }}
    className={`relative rounded-2xl p-8 flex flex-col justify-between h-full transition-all duration-300 ${plan.isPopular
      ? 'bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-300 shadow-xl z-10'
      : 'bg-white border border-gray-200 shadow-lg'
      }`}
  >
    {plan.isPopular && (
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-semibold px-6 py-2 rounded-full">
        MOST POPULAR
      </div>
    )}

    <div>
      <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
      <div className="mt-4 text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
        {formatPrice(plan.price, selectedCurrency)}
        <span className="text-base font-normal text-gray-500"> /month</span>
      </div>
      <p className="mt-3 text-gray-600">{plan.desc}</p>
      <ul className="mt-8 space-y-4">
        {plan.features.map((feature, idx) => {
          const label = typeof feature === 'string' ? feature : feature.label;
          const included = typeof feature === 'string' ? true : feature.included;
          return (
            <li key={idx} className="flex items-start gap-3">
              {included ? (
                <div className="bg-green-100 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="text-green-600 w-4 h-4" />
                </div>
              ) : (
                <div className="bg-gray-100 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <X className="text-gray-400 w-4 h-4" />
                </div>
              )}
              <span className={`text-gray-700 ${included ? '' : 'line-through text-gray-400'}`}>{label}</span>
            </li>
          );
        })}
      </ul>
    </div>
    <button
      onClick={() => onGetStarted(plan)}
      className={`mt-8 w-full font-medium py-4 rounded-xl transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 ${plan.isPopular
        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 shadow-lg'
        : 'bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
        }`}
    >
      <span>Get Started</span>
      <ArrowRight size={16} />
    </button>
  </motion.div>
);

const Pricing: React.FC = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>('INR');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);

  const handleGetStarted = (plan: PricingPlan) => {
    setSelectedPlan(plan);
    setModalOpen(true);
  };

  return (
    <section id='pricing' className="px-4 py-16 sm:py-20 lg:py-24 max-w-7xl mx-auto bg-transparent relative overflow-hidden">
      {/* Medical-themed background elements */}
      <div className="relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium mb-4"
          >
            Transparent Pricing
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-gray-900"
          >
            Affordable Plans for Every <span className="text-blue-600">Healthcare Facility</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600 mt-4 max-w-2xl mx-auto"
          >
            Simple, transparent pricing to fit your facility&apos;s needs. Start with what you need, upgrade anytime.
          </motion.p>
        </div>

        {/* Currency Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-white border border-blue-200 rounded-full px-5 py-2 shadow-sm">
            <Globe className="text-blue-500 w-5 h-5" />
            <select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value as CurrencyCode)}
              className="bg-transparent border-none text-base font-medium text-gray-700 cursor-pointer focus:outline-none"
            >
              {Object.keys(currencies).map((currencyCode) => (
                <option key={currencyCode} value={currencyCode}>
                  {currencies[currencyCode as CurrencyCode].symbol} {currencyCode}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {basePricingPlans.map((plan, idx) => (
            <PricingCard
              key={idx}
              plan={plan}
              selectedCurrency={selectedCurrency}
              onGetStarted={handleGetStarted}
            />
          ))}
        </div>

        {/* Additional Costs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 p-8 rounded-2xl bg-white border border-gray-200  gap-6 shadow-lg max-w-6xl mx-auto"
        >
          <div className="transform  text-2xl px-4 pb-3 rounded-full text-blue-600 font-bold text-center ">
            Additional Costs
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            {baseAdditionalCosts.map((item, idx) => (
              <div key={idx} className="bg-blue-50/30 p-5 rounded-xl border border-blue-100">
                <div className="font-semibold text-gray-800 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  {item.title}
                </div>
                <div className="text-blue-600 font-bold text-xl mt-2">
                  {typeof item.desc === 'number'
                    ? formatPrice(item.desc, selectedCurrency)
                    : item.desc}
                </div>
                {item.subtitle && <div className="text-gray-500 text-sm mt-2">{item.subtitle}</div>}
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 p-8 rounded-2xl bg-white border border-gray-200 shadow-lg max-w-6xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-blue-600 mb-6 text-center">
            Add-ons
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-blue-50 text-left text-gray-700">
                  <th className="py-3 px-4 font-semibold">Add-on</th>
                  <th className="py-3 px-4 font-semibold">Description</th>
                  <th className="py-3 px-4 font-semibold">Price /month</th>
                </tr>
              </thead>
              <tbody>
                {baseAddOns.map((addon, idx) => (
                  <tr
                    key={idx}
                    className="border-t border-gray-200 hover:bg-blue-50 transition"
                  >
                    <td className="py-3 px-4 text-gray-800 font-medium">{addon.title}</td>
                    <td className="py-3 px-4 text-gray-600">{addon.subtitle}</td>
                    <td className="py-3 px-4 text-blue-600 font-bold">
                      {formatPrice(addon.desc, selectedCurrency)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
        {/* Custom Solution */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-20 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-700 to-cyan-700 text-white shadow-2xl max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            <div className="lg:col-span-3 p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Need a custom healthcare solution?</h3>
              <p className="mb-6 text-blue-100 text-lg">
                We specialize in creating tailored hospital management systems that fit your unique requirements and workflow.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => {
                    setSelectedPlan(customPlan);
                    setModalOpen(true);
                  }}
                  className="px-8 py-3 bg-white text-blue-700 rounded-xl font-medium hover:bg-blue-50 transition-colors duration-300 cursor-pointer flex items-center gap-2"
                >
                  <span>Request Custom Plan</span>
                  <ArrowRight size={16} />
                </button>

              </div>
            </div>
            <div className="lg:col-span-2 h-[250px] sm:h-[300px] lg:h-full relative rounded-xl overflow-hidden">
              <Image
                src="/custom.jpg"
                alt="Healthcare professionals discussing custom solutions"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-l from-blue-700/80 to-cyan-700/80"></div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <SignupModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedPlan={selectedPlan}
        selectedCurrency={selectedCurrency}
      />
    </section>
  );
};

export default Pricing;