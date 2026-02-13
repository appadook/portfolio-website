'use client';

import { ConvexProvider } from 'convex/react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { convex } from '@/lib/convex';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ConvexProvider client={convex}>
      <TooltipProvider>
        {children}
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </ConvexProvider>
  );
}
