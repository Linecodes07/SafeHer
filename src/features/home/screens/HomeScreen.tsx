import React from 'react';
import { motion } from 'motion/react';
import { Greeting } from '../components/Greeting';
import { EmergencyCard } from '../components/EmergencyCard';
import { QuickActionGrid } from '../components/QuickActionGrid';
import { SafetyReminders } from '../components/SafetyReminders';
import { DailyWellness } from '../components/DailyWellness';
import { RecentActivity } from '../components/RecentActivity';
import { ResourceHighlights } from '../components/ResourceHighlights';

export const HomeScreen: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mx-auto max-w-5xl space-y-8 p-4 pb-24 sm:p-6 md:p-8"
    >
      <Greeting />
      
      <EmergencyCard />
      
      <SafetyReminders />
      
      <div>
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">Quick Actions</h2>
        <QuickActionGrid />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <DailyWellness />
        <RecentActivity />
      </div>

      <ResourceHighlights />
      
    </motion.div>
  );
};


