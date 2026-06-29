import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, Users, PhoneCall, Clock } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useSosStore } from '../../../store/sos';
import { SosConfirmModal } from '../components/SosConfirmModal';

export const SosScreen: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { activateSos } = useSosStore();
  const navigate = useNavigate();

  const handleTrigger = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
    // In production, create EmergencySession in Firestore first
    activateSos('sess_' + Date.now());
    navigate('/app/active-emergency');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex h-full flex-col p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Emergency Center</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Trigger alerts and manage emergency settings.</p>
      </header>

      <div className="flex flex-1 flex-col items-center justify-center py-10">
        <div className="relative mb-12">
          <div className="absolute -inset-4 animate-pulse rounded-full bg-red-100 dark:bg-red-900/20" />
          <div className="absolute -inset-8 animate-pulse rounded-full bg-red-50 delay-75 dark:bg-red-900/10" />
          <button
            onClick={handleTrigger}
            className="relative flex h-48 w-48 flex-col items-center justify-center rounded-full bg-red-600 shadow-2xl shadow-red-600/40 transition-transform hover:scale-105 active:scale-95"
          >
            <ShieldAlert className="mb-2 h-16 w-16 text-white" />
            <span className="text-2xl font-black tracking-widest text-white">SOS</span>
          </button>
        </div>
        
        <p className="max-w-xs text-center text-sm text-gray-600 dark:text-gray-400">
          Tap SOS to immediately share your live location with trusted contacts.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <button 
          onClick={() => navigate('/app/contacts')}
          className="flex items-center rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-colors hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-gray-800"
        >
          <div className="mr-4 rounded-full bg-pink-100 p-2 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400">
            <Users className="h-5 w-5" />
          </div>
          <div className="text-left">
            <h3 className="font-medium text-gray-900 dark:text-gray-100">Trusted Contacts</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Manage who gets notified</p>
          </div>
        </button>

        <button className="flex items-center rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-colors hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-gray-800">
          <div className="mr-4 rounded-full bg-orange-100 p-2 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
            <Clock className="h-5 w-5" />
          </div>
          <div className="text-left">
            <h3 className="font-medium text-gray-900 dark:text-gray-100">Emergency History</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">View past alerts & logs</p>
          </div>
        </button>
      </div>

      <SosConfirmModal 
        isOpen={isModalOpen}
        onConfirm={handleConfirm}
        onCancel={() => setIsModalOpen(false)}
      />
    </motion.div>
  );
};
