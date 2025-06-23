import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Clock, Zap, Eye, Target } from 'lucide-react';

const ComparisonSection: React.FC = () => {
  const comparisons = [
    {
      pain: "2–4 hours per episode rewriting into \"SEO format\".",
      solution: "Auto-generates 600-900-word article, FAQ and pull-quotes in under 45 seconds.",
      painIcon: Clock,
      solutionIcon: Zap
    },
    {
      pain: "Transcripts dumped in a hidden tab nobody reads.",
      solution: "Publishes searchable, schema-marked posts on your own domain.",
      painIcon: Eye,
      solutionIcon: Target
    },
    {
      pain: "Google's March-24 spam rules & accessibility audits.",
      solution: "Built-in helpful-content checklist + accessibility flags.",
      painIcon: "⚠️",
      solutionIcon: "✅"
    },
    {
      pain: "\"Will ChatGPT ever show our show?\"",
      solution: "Entity-rich JSON-LD & Q-A blocks feed LLMs and SGE—so your brand is the answer.",
      painIcon: "🤖",
      solutionIcon: "🎯"
    }
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-caprasimo text-brand-primary mb-6">
            Why content managers choose Podcasteo
          </h2>
        </div>
        
        <div className="grid gap-8">
          {comparisons.map((item, index) => (
            <Card key={index} className="overflow-hidden border-2 border-gray-100 hover:border-brand-accent/30 transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2">
                  {/* Pain Point */}
                  <div className="p-8 bg-red-50 border-r border-gray-100">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {typeof item.painIcon === 'string' ? (
                          <span className="text-2xl">{item.painIcon}</span>
                        ) : (
                          <item.painIcon className="h-8 w-8 text-red-500" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-red-700 mb-2">Pain you feel</h3>
                        <p className="text-gray-700">{item.pain}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Solution */}
                  <div className="p-8 bg-green-50">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {typeof item.solutionIcon === 'string' ? (
                          <span className="text-2xl">{item.solutionIcon}</span>
                        ) : (
                          <item.solutionIcon className="h-8 w-8 text-brand-accent" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-brand-accent mb-2">How Podcasteo fixes it</h3>
                        <p className="text-gray-700">{item.solution}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
