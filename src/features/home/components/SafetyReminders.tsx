import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, X, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router';

export const SafetyReminders: React.FC = () => {
  const [reminders, setReminders] = useState([
    { id: 1, text: 'Review and update your safety plan.', route: '/app/safety-plan' },
    { id: 2, text: 'Check your trusted contacts list.', route: '/app/contacts' },
  ]);
  const navigate = useNavigate();

  if (reminders.length === 0) return null;

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">Reminders</h3>
      <div className="space-y-2">
        <AnimatePresence>
          {reminders.map((reminder) => (
            <motion.div
              key={reminder.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              className="group flex items-center justify-between rounded-xl border border-pink-100 bg-pink-50/50 p-3 dark:border-pink-900/30 dark:bg-pink-900/10"
            >
              <button 
                onClick={() => navigate(reminder.route)}
                className="flex flex-1 items-center text-left"
              >
                <AlertCircle className="mr-3 h-5 w-5 text-pink-500 shrink-0" />
                <span className="text-sm font-medium text-pink-900 dark:text-pink-200">
                  {reminder.text}
                </span>
                <ChevronRight className="ml-2 h-4 w-4 text-pink-400 opacity-0 transition-opacity group-hover:opacity-100 shrink-0" />
              </button>
              <button
                onClick={() => setReminders(reminders.filter(r => r.id !== reminder.id))}
                className="ml-2 rounded-full p-1.5 text-pink-400 hover:bg-pink-100 hover:text-pink-600 dark:hover:bg-pink-800 shrink-0"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
