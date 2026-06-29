import React from 'react';
import { motion } from 'motion/react';
import { Button } from '../../../components/ui/Button';
import { useNavigate } from 'react-router';
import { Construction } from 'lucide-react';

interface PlaceholderScreenProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export const PlaceholderScreen: React.FC<PlaceholderScreenProps> = ({ title, description, icon }) => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="flex h-full flex-col items-center justify-center p-6 text-center"
    >
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-pink-50 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400">
        {icon || <Construction className="h-12 w-12" />}
      </div>
      <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
      <p className="mb-8 max-w-md text-gray-600 dark:text-gray-400">
        {description}
      </p>
      <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 px-6 py-4 dark:border-gray-700 dark:bg-gray-800/50">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Coming Soon</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">This module is currently under construction.</p>
      </div>
      <div className="mt-8">
        <Button onClick={() => navigate('/app', { replace: true })} variant="secondary">
          Return to Dashboard
        </Button>
      </div>
    </motion.div>
  );
};
