import React from 'react';
import { motion } from 'motion/react';

interface SuggestionChipsProps {
  onSelect: (text: string) => void;
}

const SUGGESTIONS = [
  "Help me create a safety plan.",
  "What are the signs of emotional abuse?",
  "How can I improve my digital privacy?",
  "What should I pack in an emergency bag?",
];

export const SuggestionChips: React.FC<SuggestionChipsProps> = ({ onSelect }) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center mt-6">
      {SUGGESTIONS.map((suggestion, idx) => (
        <motion.button
          key={idx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          onClick={() => onSelect(suggestion)}
          className="px-4 py-2 text-sm text-pink-700 bg-pink-50 hover:bg-pink-100 rounded-full border border-pink-100 transition-colors dark:bg-pink-900/20 dark:text-pink-300 dark:border-pink-800/30 dark:hover:bg-pink-900/40 text-left"
        >
          {suggestion}
        </motion.button>
      ))}
    </div>
  );
};
