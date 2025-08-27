import Hero from '@/components/Hero';
import About from '@/components/About';
import Features from '@/components/Features';
import WhyChoose from '@/components/WhyChoose';
import Pricing from '@/components/Pricing';
import CTA from '@/components/CTA';
import FaqSection from '@/components/FaqSection';
import BenefitsSection from '@/components/Benifits';
import NewsletterSection from '@/components/NewsLetter';


export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Features />
      <WhyChoose />
      <BenefitsSection/>
      <Pricing />
      <FaqSection/>
      <CTA />
      <NewsletterSection/>
      {/* <ContactForm/> */}
      
    </>
  );
}