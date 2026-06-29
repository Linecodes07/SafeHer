import React from 'react';
import { motion } from 'motion/react';
import { useAuthStore } from '../../../store/auth';

export const Greeting: React.FC = () => {
  const { user } = useAuthStore();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const name = user?.displayName || user?.email?.split('@')[0] || '';

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
        {getGreeting()}{name ? `, ${name}` : ''}.
      </h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        You are not alone. Support is always within reach.
      </p>
    </motion.div>
  );
};
