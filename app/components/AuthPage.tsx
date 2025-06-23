"use client";

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Coffee, Headphones, Mic, Sparkles, ArrowRight, Eye, EyeOff } from 'lucide-react';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    agreeToTerms: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle authentication logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-primary via-brand-secondary to-brand-accent flex items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-brand-accent/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/5 rounded-full blur-lg animate-pulse delay-500"></div>
      {/* Floating icons */}
      <div className="absolute top-32 left-20 animate-bounce delay-300">
        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
          <Headphones className="h-6 w-6 text-white/70" />
        </div>
      </div>
      <div className="absolute top-40 right-32 animate-bounce delay-700">
        <div className="w-10 h-10 bg-brand-accent/20 rounded-full flex items-center justify-center backdrop-blur-sm">
          <Mic className="h-5 w-5 text-white/70" />
        </div>
      </div>
      <div className="absolute bottom-40 right-20 animate-bounce delay-1000">
        <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
          <Coffee className="h-7 w-7 text-white/70" />
        </div>
      </div>
      <div className="absolute bottom-32 left-32 animate-bounce delay-500">
        <div className="w-8 h-8 bg-brand-accent/30 rounded-full flex items-center justify-center backdrop-blur-sm">
          <Sparkles className="h-4 w-4 text-white/70" />
        </div>
      </div>
      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-caprasimo text-white mb-2 drop-shadow-lg">
            Welcome to Podcasteo
          </h1>
          <p className="text-white/80 text-lg drop-shadow-sm">
            {isLogin ? "Ready to turn episodes into search-ready gold? ✨" : "Join the podcast content revolution! 🚀"}
          </p>
        </div>
        {/* Auth Card */}
        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center space-x-1 mb-4">
              <Button
                variant={isLogin ? "default" : "ghost"}
                onClick={() => setIsLogin(true)}
                className={`flex-1 ${isLogin ? 'bg-brand-primary hover:bg-brand-primary/90' : 'text-gray-600 hover:text-brand-primary'}`}
              >
                Sign In
              </Button>
              <Button
                variant={!isLogin ? "default" : "ghost"}
                onClick={() => setIsLogin(false)}
                className={`flex-1 ${!isLogin ? 'bg-brand-primary hover:bg-brand-primary/90' : 'text-gray-600 hover:text-brand-primary'}`}
              >
                Sign Up
              </Button>
            </div>
            <CardTitle className="text-2xl text-brand-primary">
              {isLogin ? "Welcome back! 👋" : "Let's get started! 🎉"}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {isLogin 
                ? "Time to create some content magic" 
                : "Your podcast content deserves better"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name fields for registration */}
              {!isLogin && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="border-gray-300 focus:border-brand-primary focus:ring-brand-primary"
                      required={!isLogin}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="border-gray-300 focus:border-brand-primary focus:ring-brand-primary"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@podcast.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="border-gray-300 focus:border-brand-primary focus:ring-brand-primary"
                  required
                />
              </div>
              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="border-gray-300 focus:border-brand-primary focus:ring-brand-primary pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-brand-primary"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              {/* Confirm Password for registration */}
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="border-gray-300 focus:border-brand-primary focus:ring-brand-primary"
                    required={!isLogin}
                  />
                </div>
              )}
              {/* Forgot password for login */}
              {isLogin && (
                <div className="text-right">
                  <a href="#" className="text-sm text-brand-primary hover:text-brand-secondary transition-colors">
                    Forgot your password? 🤔
                  </a>
                </div>
              )}
              {/* Terms checkbox for registration */}
              {!isLogin && (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => handleInputChange('agreeToTerms', !!checked)}
                    required
                  />
                  <Label htmlFor="terms" className="text-sm text-gray-600">
                    I agree to the <a href="#" className="underline text-brand-primary">terms & conditions</a>
                  </Label>
                </div>
              )}
              <Button
                type="submit"
                variant="secondary"
                size="lg"
                className="w-full font-bold bg-brand-accent text-white hover:bg-brand-accent/90 transition-all duration-300 shadow-md"
              >
                {isLogin ? 'Sign In' : 'Create Account'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage; 