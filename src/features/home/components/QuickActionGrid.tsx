import React from 'react';
import { motion } from 'motion/react';
import { Users, Bot, Shield, Lock, Book, MapPin, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router';
import { cn } from '../../../utils';

const ACTIONS = [
  { id: 'contacts', title: 'Trusted Contacts', desc: 'Manage your circle', icon: Users, route: '/app/contacts', color: 'text-pink-600', bg: 'bg-pink-100 dark:bg-pink-900/30' },
  { id: 'ai', title: 'AI Assistant', desc: 'Get 24/7 support', icon: Bot, route: '/app/ai', color: 'text-purple-600', bg: 'bg-purple-100 dark:bg-purple-900/30' },
  { id: 'vault', title: 'Evidence Vault', desc: 'Secure storage', icon: Lock, route: '/app/vault', color: 'text-emerald-600', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
  { id: 'plan', title: 'Safety Plan', desc: 'Exit strategy', icon: Shield, route: '/app/safety-plan', color: 'text-amber-600', bg: 'bg-amber-100 dark:bg-amber-900/30' },
  { id: 'journal', title: 'Private Journal', desc: 'Document incidents', icon: Book, route: '/app/journal', color: 'text-indigo-600', bg: 'bg-indigo-100 dark:bg-indigo-900/30' },
  { id: 'nearby', title: 'Nearby Help', desc: 'Find local support', icon: MapPin, route: '/app/nearby', color: 'text-rose-600', bg: 'bg-rose-100 dark:bg-rose-900/30' },
];

export const QuickActionGrid: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {ACTIONS.map((action, index) => (
        <motion.button
          key={action.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          onClick={() => navigate(action.route)}
          className="group flex flex-col items-start rounded-2xl border border-gray-200 bg-white p-4 text-left shadow-sm transition-all hover:border-gray-300 hover:shadow-md active:scale-95 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700"
        >
          <div className={cn("mb-3 rounded-xl p-3 transition-transform group-hover:scale-110", action.bg, action.color)}>
            <action.icon className="h-6 w-6" />
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">{action.title}</h3>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{action.desc}</p>
        </motion.button>
      ))}
    </div>
  );
};
