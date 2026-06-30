'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';
import { useSseEvents } from '@/hooks/useSseEvents';
import { AuthProvider } from '@/contexts/AuthContext';

const queryClient = new QueryClient();

function SseEventBridge() {
  useSseEvents();
  return null;
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <SseEventBridge />
        {children}
        <Toaster
          position="top-right"
          richColors
          closeButton
          duration={4000}
          toastOptions={{ className: 'font-sans' }}
        />
      </QueryClientProvider>
    </AuthProvider>
  );
}
