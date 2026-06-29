import React from 'react';
import { motion } from 'motion/react';
import { Clock, Book, Lock, Shield } from 'lucide-react';

const ACTIVITIES = [
  { id: 1, type: 'journal', text: 'Added a new journal entry', time: '2 hours ago', icon: Book, color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
  { id: 2, type: 'vault', text: 'Uploaded 2 photos to Evidence Vault', time: 'Yesterday', icon: Lock, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
  { id: 3, type: 'plan', text: 'Updated Safety Plan exit route', time: '3 days ago', icon: Shield, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20' },
];

export const RecentActivity: React.FC = () => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-4 flex items-center space-x-2">
        <Clock className="h-5 w-5 text-gray-500" />
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Recent Activity</h2>
      </div>

      <div className="space-y-4">
        {ACTIVITIES.map((activity, idx) => (
          <motion.div 
            key={activity.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex items-start"
          >
            <div className={`mr-4 mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${activity.bg} ${activity.color}`}>
              <activity.icon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{activity.text}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
