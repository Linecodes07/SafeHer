import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Shield } from 'lucide-react';
import { useAuthStore } from '../../store/auth';
import { motion } from 'motion/react';

export const SplashScreen: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthInitialized, user, isOnboardingComplete } = useAuthStore();

  useEffect(() => {
    if (!isAuthInitialized) return;

    const timer = setTimeout(() => {
      if (!isOnboardingComplete) {
        navigate('/onboarding', { replace: true });
      } else if (user) {
        navigate('/app', { replace: true });
      } else {
        navigate('/login', { replace: true });
      }
    }, 1500); // Minimum splash time for branding

    return () => clearTimeout(timer);
  }, [isAuthInitialized, user, isOnboardingComplete, navigate]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-pink-600">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center text-white"
      >
        <div className="mb-4 rounded-full bg-white/20 p-4 backdrop-blur-sm">
          <Shield className="h-16 w-16 text-white" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">SafeHer</h1>
        <p className="mt-2 text-pink-100">Secure. Private. Supportive.</p>
      </motion.div>
    </div>
  );
};
