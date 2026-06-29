'use client';

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { AuthResponseDto } from '@/types/api';
import {
  AUTH_STATE_EVENT,
  getCurrentUser,
  logout as clearCurrentUser,
} from '@/services/authStorage';

interface AuthContextValue {
  currentUser: AuthResponseDto | null;
  isAuthInitialized: boolean;
  refreshCurrentUser: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<AuthResponseDto | null>(() => getCurrentUser());
  const [isAuthInitialized] = useState(true);

  const refreshCurrentUser = () => setCurrentUser(getCurrentUser());

  useEffect(() => {
    refreshCurrentUser();
    window.addEventListener(AUTH_STATE_EVENT, refreshCurrentUser);
    return () => window.removeEventListener(AUTH_STATE_EVENT, refreshCurrentUser);
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    currentUser,
    isAuthInitialized,
    refreshCurrentUser,
    logout: clearCurrentUser,
  }), [currentUser, isAuthInitialized]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
