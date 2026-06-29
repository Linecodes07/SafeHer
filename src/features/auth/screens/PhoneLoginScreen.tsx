import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { Phone, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { useAuthStore } from '../../../store/auth';

export const PhoneLoginScreen: React.FC = () => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate sending OTP via Firebase
    setTimeout(() => {
      setIsLoading(false);
      if (phoneNumber.length > 5) {
        setStep('otp');
      } else {
        setError('Please enter a valid phone number.');
      }
    }, 1500);
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate verifying OTP via Firebase
    setTimeout(() => {
      setIsLoading(false);
      if (otp.length === 6) {
        setUser({ uid: 'phone_123', email: null, phoneNumber, displayName: 'Phone User', emailVerified: true });
        navigate('/app', { replace: true });
      } else {
        setError('Invalid verification code.');
      }
    }, 1500);
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-50 px-6 py-12 sm:px-6 lg:px-8 dark:bg-gray-950">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sm:mx-auto sm:w-full sm:max-w-md text-center"
      >
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400">
          <Phone className="h-8 w-8" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          {step === 'phone' ? 'Sign in with phone' : 'Enter verification code'}
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {step === 'phone' 
            ? "We'll send you a verification code via SMS." 
            : `Code sent to ${phoneNumber}`}
        </p>
      </motion.div>

      <motion.div 
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="bg-white px-4 py-8 shadow-sm sm:rounded-lg sm:px-10 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
          {step === 'phone' ? (
            <form className="space-y-6" onSubmit={handleSendCode}>
              {error && (
                <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/20">
                  <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
                </div>
              )}

              <Input
                id="phone"
                type="tel"
                label="Phone number"
                placeholder="+1 (555) 000-0000"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />

              <Button type="submit" className="w-full" isLoading={isLoading}>
                Send code
              </Button>
            </form>
          ) : (
            <form className="space-y-6" onSubmit={handleVerifyOTP}>
              {error && (
                <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/20">
                  <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
                </div>
              )}

              <Input
                id="otp"
                type="text"
                label="6-digit code"
                placeholder="123456"
                maxLength={6}
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />

              <Button type="submit" className="w-full" isLoading={isLoading}>
                Verify & Sign In
              </Button>
              
              <div className="mt-4 text-center">
                <button 
                  type="button"
                  onClick={() => setStep('phone')}
                  className="text-sm font-medium text-pink-600 hover:text-pink-500"
                >
                  Change phone number
                </button>
              </div>
            </form>
          )}

          <div className="mt-6 text-center">
            <Link to="/login" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Use email instead
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
