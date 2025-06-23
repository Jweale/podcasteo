import React from 'react';
import { Card, CardContent } from '../ui/card';
import { FileText, HelpCircle, Quote, Accessibility } from 'lucide-react';

const ValueSection: React.FC = () => {
  const benefits = [
    {
      icon: FileText,
      title: "A rank-ready article that captures long-tail keywords.",
      color: "bg-blue-50 text-brand-primary"
    },
    {
      icon: HelpCircle,
      title: "A FAQ block tuned for Google's \"People Also Ask\".",
      color: "bg-green-50 text-brand-accent"
    },
    {
      icon: Quote,
      title: "Pull-quotes & timestamps for social snippets.",
      color: "bg-purple-50 text-purple-600"
    },
    {
      icon: Accessibility,
      title: "EAA/ADA-friendly transcript on-page.",
      color: "bg-orange-50 text-orange-600"
    }
  ];

  return (
    <section className="py-20 px-6 bg-brand-bg">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-caprasimo text-brand-primary mb-6">
            Ship more high-quality content with{' '}
            <span className="text-brand-accent">zero extra headcount</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8">Every episode becomes:</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className={`w-16 h-16 rounded-full ${benefit.color} flex items-center justify-center mx-auto mb-6`}>
                  <benefit.icon className="h-8 w-8" />
                </div>
                <p className="text-gray-700 font-medium leading-relaxed">{benefit.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-brand-primary/5 to-brand-accent/5 border-brand-accent/20">
            <CardContent className="p-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                <strong>Result:</strong> higher organic traffic, brand visibility in AI answers, and provable ROI on the podcast you already invest in.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ValueSection;
