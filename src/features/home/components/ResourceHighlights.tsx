import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router';

const RESOURCES = [
  { id: 1, title: 'Understanding Digital Privacy', category: 'Privacy', readTime: '5 min read' },
  { id: 2, title: 'How to build a safe exit strategy', category: 'Safety Planning', readTime: '8 min read' },
];

export const ResourceHighlights: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Featured Resources</h2>
        <button 
          onClick={() => navigate('/app/resources')}
          className="text-sm font-medium text-pink-600 hover:text-pink-700 dark:text-pink-400"
        >
          View all
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {RESOURCES.map((resource, idx) => (
          <motion.div
            key={resource.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => navigate('/app/resources')}
            className="group cursor-pointer overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:border-pink-200 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-pink-900/50"
          >
            <div className="flex h-24 items-center justify-center bg-gray-100 dark:bg-gray-800">
              <BookOpen className="h-8 w-8 text-gray-400" />
            </div>
            <div className="p-4">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-xs font-semibold text-pink-600 dark:text-pink-400">{resource.category}</span>
                <span className="text-xs text-gray-500">{resource.readTime}</span>
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-pink-600 dark:text-gray-100 dark:group-hover:text-pink-400">
                {resource.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
