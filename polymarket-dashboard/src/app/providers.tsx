'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { useSseEvents } from '@/hooks/useSseEvents';

const queryClient = new QueryClient();

function SseEventBridge() {
  useSseEvents();
  return null;
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SseEventBridge />
      {children}
    </QueryClientProvider>
  );
}
