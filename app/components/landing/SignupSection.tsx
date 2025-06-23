import React from 'react';
import { Button } from '../ui/button';
import { Sparkles } from 'lucide-react';

const SignupSection: React.FC = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-brand-accent/10 to-brand-primary/10">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="bg-white rounded-2xl shadow-2xl p-12">
          <Sparkles className="h-16 w-16 text-brand-accent mx-auto mb-8" />
          <Button 
            size="lg" 
            className="px-12 py-6 text-xl font-bold bg-brand-accent hover:bg-brand-accent/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Start repurposing for free
          </Button>
          <p className="text-gray-600 mt-6">
            No credit card • 15k words on us
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignupSection;
