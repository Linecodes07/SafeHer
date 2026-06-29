import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';

// Guards
import { AuthGuard, GuestGuard } from './AuthGuard';

// Screens
import { SplashScreen } from '../../features/splash/SplashScreen';
import { OnboardingScreen } from '../../features/onboarding/OnboardingScreen';
import { LoginScreen } from '../../features/auth/screens/LoginScreen';
import { SignUpScreen } from '../../features/auth/screens/SignUpScreen';
import { ForgotPasswordScreen } from '../../features/auth/screens/ForgotPasswordScreen';
import { PhoneLoginScreen } from '../../features/auth/screens/PhoneLoginScreen';
import { VerifyEmailScreen } from '../../features/auth/screens/VerifyEmailScreen';

import { AppShell } from '../../features/appShell/screens/AppShell';
import { HomeScreen } from '../../features/home/screens/HomeScreen';
import { ResourcesScreen } from '../../features/resources/screens/ResourcesScreen';
import { AiAssistantScreen } from '../../features/ai_assistant/screens/AiAssistantScreen';
import { ProfileScreen } from '../../features/profile/screens/ProfileScreen';
import { NotificationScreen } from '../../features/notifications/screens/NotificationScreen';
import { PlaceholderScreen } from '../../features/placeholders/screens/PlaceholderScreen';
import { SosScreen } from '../../features/sos/screens/SosScreen';
import { ActiveEmergencyScreen } from '../../features/sos/screens/ActiveEmergencyScreen';
import { ContactsScreen } from '../../features/contacts/screens/ContactsScreen';
import { ContactFormScreen } from '../../features/contacts/screens/ContactFormScreen';
import { ShieldAlert, Users, Lock, Book, MapPin } from 'lucide-react';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SplashScreen />,
  },
  {
    path: '/onboarding',
    element: <OnboardingScreen />,
  },
  {
    element: <GuestGuard />,
    children: [
      {
        path: '/login',
        element: <LoginScreen />,
      },
      {
        path: '/login/phone',
        element: <PhoneLoginScreen />,
      },
      {
        path: '/signup',
        element: <SignUpScreen />,
      },
      {
        path: '/forgot-password',
        element: <ForgotPasswordScreen />,
      },
      {
        path: '/verify-email',
        element: <VerifyEmailScreen />,
      },
    ],
  },
  {
    element: <AuthGuard />,
    children: [
      {
        path: '/app',
        element: <AppShell />,
        children: [
          {
            index: true,
            element: <HomeScreen />,
          },
          {
            path: 'resources',
            element: <ResourcesScreen />,
          },
          {
            path: 'ai',
            element: <AiAssistantScreen />,
          },
          {
            path: 'profile',
            element: <ProfileScreen />,
          },
          {
            path: 'notifications',
            element: <NotificationScreen />,
          },
          {
            path: 'sos',
            element: <SosScreen />
          },
          {
            path: 'active-emergency',
            element: <ActiveEmergencyScreen />
          },
          {
            path: 'contacts',
            element: <ContactsScreen />
          },
          {
            path: 'contacts/add',
            element: <ContactFormScreen />
          },
          {
            path: 'vault',
            element: <PlaceholderScreen title="Evidence Vault" description="Securely store and encrypt photos, audio, and documents." icon={<Lock className="h-12 w-12" />} />
          },
          {
            path: 'journal',
            element: <PlaceholderScreen title="Private Journal" description="Document incidents and your daily wellness safely." icon={<Book className="h-12 w-12" />} />
          },
          {
            path: 'nearby',
            element: <PlaceholderScreen title="Nearby Help" description="Find local shelters, clinics, and legal assistance quickly." icon={<MapPin className="h-12 w-12" />} />
          },
          {
            path: 'safety-plan',
            element: <PlaceholderScreen title="Safety Plan" description="Review and update your personalized exit and safety strategy." icon={<ShieldAlert className="h-12 w-12" />} />
          }
        ]
      }
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
