import React from 'react';
import HeroSection from './landing/HeroSection';
import ComparisonSection from './landing/ComparisonSection';
import ValueSection from './landing/ValueSection';
import WorkflowSection from './landing/WorkflowSection';
import IntegrationsSection from './landing/IntegrationsSection';
import TestimonialSection from './landing/TestimonialSection';
import SignupSection from './landing/SignupSection';
import FAQSection from './landing/FAQSection';
import FinalCTASection from './landing/FinalCTASection';
import Footer from './landing/Footer';
import HomepageHeader from './HomepageHeader';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-bg">
      <HomepageHeader />
      <HeroSection />
      <ComparisonSection />
      <ValueSection />
      <WorkflowSection />
      <IntegrationsSection />
      <TestimonialSection />
      <SignupSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
};

export default LandingPage;
