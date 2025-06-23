import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Plug, Shield, CreditCard, Globe } from 'lucide-react';

const IntegrationsSection: React.FC = () => {
  const features = [
    {
      icon: Plug,
      title: "Works with what you already use",
      description: "Descript, Otter, Riverside and more.",
      badges: ["Descript", "Otter", "Riverside", "Rev"]
    },
    {
      icon: Globe,
      title: "No developer needed",
      description: "OAuth to WordPress or just paste your API token.",
      badges: ["WordPress", "API", "One-click"]
    },
    {
      icon: CreditCard,
      title: "Usage-based pricing",
      description: "Pay only for words processed; first 15k words/month free.",
      badges: ["15k Free", "No Monthly Fee", "Pay Per Use"]
    },
    {
      icon: Shield,
      title: "SOC-2 roadmap & EU data",
      description: "Ready for brand-safety reviews.",
      badges: ["SOC-2", "EU Compliant", "Enterprise Ready"]
    }
  ];

  return (
    <section className="py-20 px-6 bg-brand-bg">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-caprasimo text-brand-primary mb-6">
            Built for the way content managers work
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-brand-primary" />
                  </div>
                  <CardTitle className="text-xl text-brand-primary">{feature.title}</CardTitle>
                </div>
                <p className="text-gray-600">{feature.description}</p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {feature.badges.map((badge, badgeIndex) => (
                    <Badge key={badgeIndex} variant="secondary" className="bg-brand-accent/10 text-brand-accent hover:bg-brand-accent/20">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntegrationsSection;
