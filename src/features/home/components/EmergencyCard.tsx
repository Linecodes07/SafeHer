import React from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, LogOut, MapPin, Users } from 'lucide-react';
import { useNavigate } from 'react-router';

export const EmergencyCard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-600 to-red-700 p-6 shadow-lg shadow-red-600/20"
    >
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="mb-6 sm:mb-0">
          <div className="mb-2 flex items-center space-x-2">
            <ShieldAlert className="h-6 w-6 text-red-100" />
            <h2 className="text-xl font-bold text-white">Emergency Action</h2>
          </div>
          <p className="max-w-xs text-red-100">
            Instantly alert your trusted contacts or disguise the app.
          </p>
        </div>

        <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
          <button 
            onClick={() => navigate('/app/sos')}
            className="group flex items-center justify-center rounded-xl bg-white px-6 py-3 font-bold text-red-600 shadow-sm transition-all hover:bg-red-50 hover:shadow-md active:scale-95"
          >
            <ShieldAlert className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
            Trigger SOS
          </button>
          
          <div className="grid grid-cols-3 gap-2 sm:flex sm:space-x-2 sm:gap-0">
            <button className="flex items-center justify-center rounded-xl bg-red-800/40 p-3 text-white transition-colors hover:bg-red-800/60" aria-label="Quick Exit">
              <LogOut className="h-5 w-5" />
            </button>
            <button onClick={() => navigate('/app/nearby')} className="flex items-center justify-center rounded-xl bg-red-800/40 p-3 text-white transition-colors hover:bg-red-800/60" aria-label="Share Location">
              <MapPin className="h-5 w-5" />
            </button>
            <button onClick={() => navigate('/app/contacts')} className="flex items-center justify-center rounded-xl bg-red-800/40 p-3 text-white transition-colors hover:bg-red-800/60" aria-label="Emergency Contacts">
              <Users className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
