import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router';
import { Mail, ArrowRight, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '../../../components/ui/Button';

export const VerifyEmailScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || 'your email';

  const handleResend = () => {
    setIsLoading(true);
    // Simulate API call to resend verification
    setTimeout(() => {
      setIsLoading(false);
      // Show toast or success indicator here in a real app
    }, 1500);
  };

  const handleContinue = () => {
    // In a real app, we would verify the Firebase Auth state here
    // For now, simulate continuing after verification
    navigate('/login', { replace: true });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 py-12 dark:bg-gray-950">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md text-center"
      >
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400">
          <Mail className="h-12 w-12" />
        </div>
        
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Verify your email
        </h2>
        
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          We've sent a verification link to <strong>{email}</strong>. 
          For your security, you must verify your email before accessing SafeHer.
        </p>

        <div className="space-y-4">
          <Button onClick={handleContinue} className="w-full" size="lg">
            I've verified my email
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          
          <Button 
            variant="ghost" 
            onClick={handleResend} 
            isLoading={isLoading}
            className="w-full"
          >
            Resend verification email
          </Button>
        </div>

        <div className="mt-12 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-left dark:border-yellow-900/30 dark:bg-yellow-900/20">
          <div className="flex">
            <ShieldAlert className="h-5 w-5 text-yellow-600 dark:text-yellow-500" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-400">Safety Tip</h3>
              <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-500">
                If you are in immediate danger, close this app and dial emergency services. 
                Be aware that email notifications may be visible to others who have access to your device.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-sm">
          <Link to="/login" className="font-medium text-pink-600 hover:text-pink-500">
            Back to sign in
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
