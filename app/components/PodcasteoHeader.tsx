"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { ChevronDown } from 'lucide-react';

const PodcasteoHeader = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
      <div className="flex items-center gap-6">
        <Link href="/" className="text-2xl font-bold text-blue-600 font-caprasimo">
          Podcasteo
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/" className="text-sm font-medium text-gray-500 hover:text-gray-900">
            Dashboard
          </Link>
          <Link href="/upload" className="text-sm font-medium text-gray-500 hover:text-gray-900">
            Upload
          </Link>
          <Link href="/analytics" className="text-sm font-medium text-gray-500 hover:text-gray-900">
            Analytics
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="outline">
          + New Upload
        </Button>
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <span className="font-medium">John Doe</span>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </div>
      </div>
    </header>
  );
};

export default PodcasteoHeader; 