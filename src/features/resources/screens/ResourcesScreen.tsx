import React from 'react';
import { motion } from 'motion/react';

export const ResourcesScreen: React.FC = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Resources</h1>
      <p className="text-gray-600 dark:text-gray-400">Local shelters, legal advice, and hotlines will appear here.</p>
    </motion.div>
  );
};
