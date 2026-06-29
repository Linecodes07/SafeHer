import { Timestamp } from 'firebase/firestore';

export interface UserProfile {
  uid: string;
  name: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoUrl: string | null;
  preferredLanguage: string;
  themePreference: 'light' | 'dark' | 'system';
  isBiometricEnabled: boolean;
  isOnboardingCompleted: boolean;
  isEmailVerified: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastLoginAt: Timestamp;
}
