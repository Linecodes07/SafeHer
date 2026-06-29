import React, { useEffect } from 'react';
import { AppRouter } from './core/routing/router';
import { useAuthStore } from './store/auth';

export default function App() {
  const setAuthInitialized = useAuthStore((state) => state.setAuthInitialized);

  useEffect(() => {
    // Simulate checking Firebase Auth on app mount
    const initAuth = async () => {
      // In real app: onAuthStateChanged(...)
      await new Promise((resolve) => setTimeout(resolve, 500));
      setAuthInitialized(true);
    };

    initAuth();
  }, [setAuthInitialized]);

  return <AppRouter />;
}
