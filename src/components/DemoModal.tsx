'use client';

import { useState, useEffect } from 'react';
import { format, addDays } from 'date-fns';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { APPNAME } from '@/constraint';

interface DemoSchedulerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormInputs {
  name: string;
  email: string;
  date: string;
  time: string;
}

export default function DemoSchedulerModal({ isOpen, onClose }: DemoSchedulerModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const tomorrow = format(addDays(new Date(), 1), 'yyyy-MM-dd');
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset,
    setValue 
  } = useForm<FormInputs>({
    defaultValues: {
      name: '',
      email: '',
      date: tomorrow,
      time: ''
    }
  });

  useEffect(() => {
    if (isOpen) {
      // Set default date to tomorrow when modal opens
      setValue('date', tomorrow);
    }
  }, [isOpen, setValue, tomorrow]);

  // Generate available times from 11 AM to 6 PM IST
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 11; hour <= 18; hour++) {
      const formattedHour = hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`;
      slots.push(`${formattedHour} IST`);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setIsSubmitting(true);
  
    try {
      const encodedBody = new URLSearchParams({
        name: data.name,
        email: data.email,
        date: data.date,
        time: data.time,
      }).toString();
  
      const res = await fetch(process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL!, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: encodedBody,
      });
  
      await res.text();
  
      toast.success("Demo scheduled successfully! We'll be in touch.");
      reset();
      onClose();
    } catch (error) {
      console.error("Error scheduling demo:", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Don't render anything if modal is closed
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        <div className="bg-blue-600 text-white py-4 px-6">
          <h3 className="text-xl font-bold">Schedule a Personalized Demo</h3>
          <p className="text-blue-100 text-sm mt-1">
            Let us show you how {APPNAME} can transform your hospital operations
          </p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Full Name
            </label>
            <input
              id="name"
              {...register('name', { required: 'Name is required' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>
          
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Please enter a valid email address'
                }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
          
          <div className="mb-4">
            <label htmlFor="date" className="block text-gray-700 font-medium mb-2">
              Select Date (Next day onwards)
            </label>
            <input
              type="date"
              id="date"
              min={tomorrow}
              {...register('date', { required: 'Please select a date' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.date && (
              <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
            )}
          </div>
          
          <div className="mb-6">
            <label htmlFor="time" className="block text-gray-700 font-medium mb-2">
              Select Time between 11 AM - 6 PM IST (GMT + 5:30)
            </label>
            <select
              id="time"
              {...register('time', { required: 'Please select a time' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a time</option>
              {timeSlots.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
            {errors.time && (
              <p className="mt-1 text-sm text-red-600">{errors.time.message}</p>
            )}
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-400"
            >
              {isSubmitting ? 'Scheduling...' : 'Schedule Demo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}