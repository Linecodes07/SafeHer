import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Edit3 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useDashboardStore } from '../../../store/dashboard';
import { cn } from '../../../utils';

const MOODS = [
  { id: 'terrible', emoji: '😥', label: 'Tough' },
  { id: 'bad', emoji: '😕', label: 'Uneasy' },
  { id: 'neutral', emoji: '😐', label: 'Okay' },
  { id: 'good', emoji: '🙂', label: 'Good' },
  { id: 'great', emoji: '✨', label: 'Strong' },
];

export const DailyWellness: React.FC = () => {
  const selectedMood = useDashboardStore((state) => state.recentWellnessMood);
  const setSelectedMood = useDashboardStore((state) => state.setRecentWellnessMood);
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Heart className="h-5 w-5 text-rose-500" />
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Daily Check-in</h2>
        </div>
        <button 
          onClick={() => navigate('/app/journal')}
          className="flex items-center text-sm font-medium text-pink-600 hover:text-pink-700 dark:text-pink-400"
        >
          <Edit3 className="mr-1 h-4 w-4" />
          Journal
        </button>
      </div>

      <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
        How are you feeling today? Your check-ins are completely private.
      </p>

      <div className="flex justify-between sm:justify-start sm:space-x-6">
        {MOODS.map((mood) => (
          <button
            key={mood.id}
            onClick={() => setSelectedMood(mood.id)}
            className={cn(
              "flex flex-col items-center space-y-2 rounded-xl p-2 transition-all hover:bg-gray-50 dark:hover:bg-gray-800",
              selectedMood === mood.id ? "scale-110 bg-gray-50 dark:bg-gray-800" : "opacity-70 hover:opacity-100"
            )}
          >
            <span className="text-3xl">{mood.emoji}</span>
            <span className={cn(
              "text-xs font-medium",
              selectedMood === mood.id ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"
            )}>
              {mood.label}
            </span>
          </button>
        ))}
      </div>

      {selectedMood && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-6 rounded-xl bg-pink-50 p-4 dark:bg-pink-900/20"
        >
          <p className="text-sm font-medium text-pink-800 dark:text-pink-300">
            {selectedMood === 'terrible' || selectedMood === 'bad' 
              ? "I'm sorry things are hard right now. Remember, you have resources available in the AI Chat if you need someone to talk to." 
              : "Thank you for checking in. Tracking your mood helps build awareness over time."}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};
