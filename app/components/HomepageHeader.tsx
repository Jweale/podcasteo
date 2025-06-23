import React from 'react';
import Link from 'next/link';
import { Button } from './ui/button';

const HomepageHeader: React.FC = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
      <Link href="/" className="text-2xl font-bold text-blue-600 font-caprasimo">
        Podcasteo
      </Link>
      <div className="flex items-center gap-4">
        <Link href="/auth">
          <Button 
            variant="secondary" 
            size="lg" 
            className="px-8 font-bold bg-brand-accent text-white hover:bg-brand-accent/90 transition-all duration-300 shadow-md"
          >
            Get Started
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default HomepageHeader; 