import React from 'react';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const FinalCTASection: React.FC = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-brand-primary to-brand-secondary text-white">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-5xl font-caprasimo mb-8 leading-tight">
          Still scrolling?
        </h2>
        <p className="text-xl md:text-2xl mb-4 opacity-90">
          Stop leaving podcast insight buried in audio players.
        </p>
        <p className="text-xl md:text-2xl mb-12 opacity-90">
          Turn your next episode into a traffic asset today.
        </p>
        <Link href="/auth">
          <Button 
            size="lg" 
            variant="secondary"
            className="px-12 py-6 text-xl font-bold bg-white text-brand-primary hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg mb-6"
          >
            Get Started
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
        </Link>
        <p className="text-white/80">
          15k words free • Cancel anytime
        </p>
      </div>
    </section>
  );
};

export default FinalCTASection;
