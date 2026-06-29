import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { useAuthStore } from '../../../store/auth';

export const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const isBiometricEnabled = useAuthStore((state) => state.isBiometricEnabled);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simulate API call / Firebase Auth
    setTimeout(() => {
      setIsLoading(false);
      if (email && password.length >= 6) {
        setUser({ uid: '123', email, displayName: null, phoneNumber: null, emailVerified: true });
        navigate('/app', { replace: true });
      } else {
        setError('Invalid email or password.');
      }
    }, 1000);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setUser({ uid: 'google_123', email: 'user@gmail.com', displayName: 'Google User', phoneNumber: null, emailVerified: true });
      navigate('/app', { replace: true });
    }, 1000);
  };

  const handleBiometricLogin = () => {
    // Simulate WebAuthn / Passkey prompt
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setUser({ uid: 'bio_123', email: 'user@biometric.com', displayName: 'Bio User', phoneNumber: null, emailVerified: true });
      navigate('/app', { replace: true });
    }, 1000);
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-50 px-6 py-12 sm:px-6 lg:px-8 dark:bg-gray-950">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sm:mx-auto sm:w-full sm:max-w-md"
      >
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Welcome back
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Or{' '}
          <Link to="/signup" className="font-medium text-pink-600 hover:text-pink-500">
            create a new account
          </Link>
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="bg-white px-4 py-8 shadow-sm sm:rounded-lg sm:px-10 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/20">
                <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
              </div>
            )}

            <Input
              id="email"
              type="email"
              label="Email address"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                label="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-[34px] text-gray-400 hover:text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-pink-600 focus:ring-pink-600 dark:border-gray-700 dark:bg-gray-800"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-pink-600 hover:text-pink-500">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <Button type="submit" className="w-full" isLoading={isLoading}>
              Sign in
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500 dark:bg-gray-900">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button variant="secondary" onClick={handleGoogleLogin} type="button">
                Google
              </Button>
              <Button variant="secondary" onClick={() => navigate('/login/phone')} type="button">
                Phone
              </Button>
            </div>
            
            {isBiometricEnabled && (
               <div className="mt-4">
                 <Button variant="ghost" onClick={handleBiometricLogin} className="w-full" type="button">
                    <Lock className="mr-2 h-4 w-4" /> Sign in with Biometrics
                 </Button>
               </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
