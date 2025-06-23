import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Upload, Edit, Globe, BarChart } from 'lucide-react';

const WorkflowSection: React.FC = () => {
  const steps = [
    {
      icon: Upload,
      title: "Upload your transcript",
      description: "(.md, .txt or .vtt).",
      color: "bg-blue-500"
    },
    {
      icon: Edit,
      title: "Review the auto-draft",
      description: "toggle blocks on/off, tweak tone.",
      color: "bg-green-500"
    },
    {
      icon: Globe,
      title: "Publish to WordPress",
      description: "(or download Markdown).",
      color: "bg-purple-500"
    },
    {
      icon: BarChart,
      title: "Track keywords & impressions",
      description: "in the dashboard.",
      color: "bg-orange-500"
    }
  ];

  return (
    <section id="workflow" className="py-20 px-6 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-caprasimo text-brand-primary mb-6">
            See how fast it is
          </h2>
        </div>
        
        <div className="relative">
          {/* Connection lines for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-brand-accent to-transparent transform -translate-y-1/2"></div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="relative border-2 border-gray-100 hover:border-brand-accent/30 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className="relative mb-6">
                    <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto text-white shadow-lg`}>
                      <step.icon className="h-8 w-8" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-brand-accent text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-brand-primary mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-lg text-gray-600">
            That's it. <strong>Minutes saved, pages live, traffic growing</strong>—every week.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
