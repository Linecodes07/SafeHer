import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  uid: string;
  email: string | null;
  phoneNumber: string | null;
  displayName: string | null;
  emailVerified: boolean;
}

interface AuthState {
  user: User | null;
  isAuthInitialized: boolean;
  isOnboardingComplete: boolean;
  isBiometricEnabled: boolean;
  setUser: (user: User | null) => void;
  setAuthInitialized: (initialized: boolean) => void;
  completeOnboarding: () => void;
  enableBiometric: (enable: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthInitialized: false,
      isOnboardingComplete: false,
      isBiometricEnabled: false,
      setUser: (user) => set({ user }),
      setAuthInitialized: (isAuthInitialized) => set({ isAuthInitialized }),
      completeOnboarding: () => set({ isOnboardingComplete: true }),
      enableBiometric: (isBiometricEnabled) => set({ isBiometricEnabled }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'safeher-auth',
      partialize: (state) => ({ 
        isOnboardingComplete: state.isOnboardingComplete,
        isBiometricEnabled: state.isBiometricEnabled,
        // We do not persist the user here, Firebase Auth handles session persistence
      }),
    }
  )
);
