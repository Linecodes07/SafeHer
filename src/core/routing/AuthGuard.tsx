import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { useAuthStore } from '../../store/auth';

export const AuthGuard: React.FC = () => {
  const { user, isAuthInitialized } = useAuthStore();

  if (!isAuthInitialized) {
    // Could return a minimal loader here, but Splash screen usually handles initial load.
    // If somehow reached before initialized, show nothing or minimal spinner.
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export const GuestGuard: React.FC = () => {
  const { user, isAuthInitialized } = useAuthStore();

  if (!isAuthInitialized) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (user) {
    return <Navigate to="/app" replace />;
  }

  return <Outlet />;
};
