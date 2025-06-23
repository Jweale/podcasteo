import React from 'react';
import { Button } from '../ui/button';
import { Coffee, Zap, ArrowRight, Mic, FileText, Search, Sparkles } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-20 pb-32 px-6 overflow-hidden bg-brand-primary">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary via-brand-primary to-brand-secondary opacity-90"></div>
      
      {/* Floating background elements */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-brand-accent/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/5 rounded-full blur-lg animate-pulse delay-500"></div>
      
      {/* Floating icons */}
      <div className="absolute top-32 left-20 animate-bounce delay-300">
        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
          <Mic className="h-6 w-6 text-white/70" />
        </div>
      </div>
      <div className="absolute top-40 right-32 animate-bounce delay-700">
        <div className="w-10 h-10 bg-brand-accent/20 rounded-full flex items-center justify-center backdrop-blur-sm">
          <Search className="h-5 w-5 text-white/70" />
        </div>
      </div>
      <div className="absolute bottom-40 right-20 animate-bounce delay-1000">
        <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
          <FileText className="h-7 w-7 text-white/70" />
        </div>
      </div>
      <div className="absolute bottom-32 left-32 animate-bounce delay-500">
        <div className="w-8 h-8 bg-brand-accent/30 rounded-full flex items-center justify-center backdrop-blur-sm">
          <Sparkles className="h-4 w-4 text-white/70" />
        </div>
      </div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center animate-fade-in">
          {/* Main headline with enhanced styling */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-caprasimo text-white mb-8 leading-tight drop-shadow-lg">
            Turn every podcast transcript into{' '}
            <span className="whitespace-nowrap text-brand-accent bg-gradient-to-r from-brand-accent to-yellow-300 bg-clip-text text-transparent drop-shadow-none">
              search&#8209;winning
            </span>
            , content all before your coffee goes cold{' '}
            <span className="inline-flex items-center">
              <Coffee className="ml-2 h-8 w-8 text-amber-300 drop-shadow-md" />
            </span>
          </h1>
          
          {/* Subheadline with better contrast */}
          <p className="text-lg md:text-xl text-white/90 max-w-5xl mx-auto mb-12 leading-relaxed drop-shadow-sm">
            Podcasteo gives busy B2B content managers a one-click way to convert raw transcripts into fully-formatted, search-ready pages that drive organic traffic—no extra writers, no extra hours.
          </p>
          
          {/* Enhanced CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              size="lg" 
              className="px-8 py-4 text-lg font-semibold bg-white text-brand-primary hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              <Zap className="mr-2 h-5 w-5" />
              Get early-access
            </Button>
            <a 
              href="#demo" 
              className="text-lg font-semibold text-white hover:text-brand-accent transition-colors duration-300 flex items-center group drop-shadow-sm"
            >
              Watch 60-sec demo 
              <ArrowRight className="ml-1 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
        </div>
        
        {/* Enhanced visual element with better contrast */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-500 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
              <span className="text-sm text-gray-500 font-medium">podcast-transcript.txt</span>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-accent/30 to-yellow-300/30 rounded-lg blur-xl transform rotate-1"></div>
              <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-lg p-8 border border-gray-100">
                <div className="flex items-center justify-center space-x-8">
                  <div className="text-center transform hover:scale-110 transition-transform duration-300">
                    <div className="w-20 h-20 bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 rounded-full flex items-center justify-center mb-4 shadow-lg">
                      <span className="text-3xl">🎙️</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">Podcast Episode</span>
                  </div>
                  
                  <div className="flex-1 flex items-center justify-center">
                    <div className="bg-gradient-to-r from-brand-primary to-brand-accent rounded-full p-3">
                      <ArrowRight className="h-8 w-8 text-white animate-pulse" />
                    </div>
                  </div>
                  
                  <div className="text-center transform hover:scale-110 transition-transform duration-300">
                    <div className="w-20 h-20 bg-gradient-to-br from-brand-accent/20 to-yellow-300/20 rounded-full flex items-center justify-center mb-4 shadow-lg">
                      <span className="text-3xl">📄</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">SEO Article</span>
                  </div>
                </div>
                
                {/* Additional visual indicators */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex justify-center space-x-6 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-brand-accent rounded-full"></div>
                      <span>FAQ Ready</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span>SEO Optimized</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span>AI-Ready</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
