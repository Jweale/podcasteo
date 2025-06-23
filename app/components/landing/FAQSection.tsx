import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

const FAQSection: React.FC = () => {
  const faqs = [
    {
      question: "Do you transcribe audio?",
      answer: "Today we focus on the repurposing magic; simply drop in any transcript. Want end-to-end audio → SEO? Join the wait-list—we're building it."
    },
    {
      question: "Can I review before anything goes live?",
      answer: "Absolutely. Nothing publishes without your approval."
    },
    {
      question: "Will this trigger Google's spam filters?",
      answer: "We follow the March-24 helpful-content guidelines, add citations, and surface alerts for thin or duplicated blocks."
    }
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-caprasimo text-brand-primary mb-6">
            FAQ
          </h2>
        </div>
        
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-2 border-gray-100 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold text-brand-primary hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
