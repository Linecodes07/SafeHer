import React from 'react';
import { motion } from 'motion/react';
import { useAuthStore } from '../../../store/auth';
import { Button } from '../../../components/ui/Button';
import { useNavigate } from 'react-router';

export const ProfileScreen: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Profile</h1>
      
      <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-center space-x-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-100 text-xl font-bold text-pink-600 dark:bg-pink-900 dark:text-pink-300">
            {user?.email?.[0].toUpperCase() || 'U'}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {user?.displayName || 'User'}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">{user?.email || user?.phoneNumber}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Button variant="secondary" className="w-full justify-start">Settings</Button>
        <Button variant="secondary" className="w-full justify-start">Trusted Contacts</Button>
        <Button variant="secondary" className="w-full justify-start">Security & Biometrics</Button>
        <Button variant="ghost" onClick={handleLogout} className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20">
          Sign Out
        </Button>
      </div>
    </motion.div>
  );
};
