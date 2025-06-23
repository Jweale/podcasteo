import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Quote } from 'lucide-react';

const TestimonialSection: React.FC = () => {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="container mx-auto max-w-4xl">
        <Card className="bg-gradient-to-br from-brand-accent/5 to-brand-accent/10 border-brand-accent/20 shadow-xl">
          <CardContent className="p-12 text-center">
            <Quote className="h-12 w-12 text-brand-accent mx-auto mb-8" />
            <blockquote className="text-xl md:text-2xl text-gray-700 font-medium leading-relaxed mb-8">
              "I run a 40-episode backlog. Podcasteo shipped 40 SEO pages in a morning—indexed within a week. That alone covered a quarter of our MQL target."
            </blockquote>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full flex items-center justify-center text-white font-bold text-lg">
                JG
              </div>
              <div className="text-left">
                <div className="font-semibold text-brand-primary">Jamie G.</div>
                <div className="text-gray-600">Head of Content @ GrowthB2B</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default TestimonialSection;
