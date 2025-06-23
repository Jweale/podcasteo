"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import PodcasteoHeader from './PodcasteoHeader';

const ConditionalHeader: React.FC = () => {
  const pathname = usePathname();
  if (pathname === '/' || pathname === '/auth') return null;
  return <PodcasteoHeader />;
};

export default ConditionalHeader; 