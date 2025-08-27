import Navbar from '@/components/Navbar';
import './globals.css';
import { ReactNode } from 'react';
import Footer from '@/components/footer';
import { Toaster } from 'react-hot-toast';
import { Metadata } from 'next';
export const metadata: Metadata = {
  metadataBase: new URL('https://www.medireonhealth.com'),
  title: 'Medireon | Hospital Management System SaaS for Modern Healthcare',
  description:
    'Medireon is a cloud-based Hospital Management System (HMS) that empowers healthcare providers with patient management, billing, EMR, telemedicine, and analytics.',
  keywords: [
    'Hospital Management System',
    'HMS SaaS',
    'Healthcare Management Software',
    'Cloud-based Hospital Software',
    'Patient Management System',
    'Medical Billing Software',
    'Electronic Medical Records',
    'Telemedicine Platform',
    'Healthcare SaaS Solutions',
    'Hospital Software for Clinics',
    'Healthcare Analytics',
    'Doctor Scheduling Software',
    'Hospital ERP System',
    'Clinic Management Software'
  ],
  authors: [{ name: 'Medireon Team', url: 'https://www.medireonhealth.com' }],
  creator: 'Medireon',
  publisher: 'Medireon',

  verification: {
    google: 'googleeb131c10b109123e',
    yandex: '0317816fe5bafe37'
  },

  openGraph: {
    title: 'Medireon | Smart SaaS Hospital Management System',
    description:
      'All-in-one cloud-based Hospital Management System (HMS) for hospitals, clinics, and healthcare providers.',
    url: 'https://www.medireonhealth.com',
    siteName: 'Medireon',
    type: 'website',
    images: [
      {
        url: 'https://www.medireonhealth.com/Meta.png',
        width: 1200,
        height: 630,
        alt: 'Medireon Hospital Management SaaS Platform'
      }
    ],
    locale: 'en_US'
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Medireon | Cloud-based Hospital Management System',
    description:
      'Manage patients, billing, EMR, telemedicine, and analytics with Medireon’s all-in-one Hospital Management SaaS.',
    creator: '@ayushdasgupta01',
    images: ['https://www.medireonhealth.com/Meta.png']
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },

  applicationName: 'Medireon',
  appleWebApp: {
    capable: true,
    title: 'Medireon HMS',
    statusBarStyle: 'black-translucent'
  },
  formatDetection: {
    telephone: false
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className='select-none'>
      <body>
        <Toaster
              position="top-right"
              reverseOrder={false}
            />
        <Navbar/>
        <main>{children}</main>
        <Footer/>
      </body>
    </html>
  );
}