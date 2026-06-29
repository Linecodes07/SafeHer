import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, MapPin, PhoneCall, StopCircle, PauseCircle, PlayCircle, Users } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useSosStore } from '../../../store/sos';
import { LocationService } from '../../../core/services/LocationService';
import { LiveLocationMap } from '../components/LiveLocationMap';

export const ActiveEmergencyScreen: React.FC = () => {
  const { isActive, deactivateSos, sessionStartTime, isLocationSharingPaused, setPauseLocationSharing } = useSosStore();
  const navigate = useNavigate();
  const [elapsed, setElapsed] = useState('00:00');

  useEffect(() => {
    if (!isActive) {
      navigate('/app', { replace: true });
      return;
    }

    LocationService.startWatching();

    const interval = setInterval(() => {
      if (sessionStartTime) {
        const diff = Math.floor((Date.now() - sessionStartTime) / 1000);
        const mins = Math.floor(diff / 60).toString().padStart(2, '0');
        const secs = (diff % 60).toString().padStart(2, '0');
        setElapsed(`${mins}:${secs}`);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      LocationService.stopWatching();
    };
  }, [isActive, sessionStartTime, navigate]);

  const handleEndEmergency = () => {
    // In production, might require PIN to cancel
    deactivateSos();
    navigate('/app', { replace: true });
  };

  const togglePause = () => {
    setPauseLocationSharing(!isLocationSharingPaused);
    if (!isLocationSharingPaused) {
      LocationService.stopWatching();
    } else {
      LocationService.startWatching();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="flex h-screen flex-col bg-red-600 text-white"
    >
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center space-x-2">
          <ShieldAlert className="h-6 w-6 animate-pulse text-white" />
          <span className="font-bold tracking-tight">Emergency Active</span>
        </div>
        <div className="font-mono text-lg font-bold">
          {elapsed}
        </div>
      </div>

      <div className="flex-1 overflow-hidden p-4 sm:px-6">
        <div className="h-2/3 w-full rounded-2xl bg-white/10 p-1 shadow-inner backdrop-blur-sm sm:h-3/4">
          <LiveLocationMap />
        </div>
        
        <div className="mt-6 flex flex-col space-y-4">
          <div className="flex items-center justify-between rounded-xl bg-red-700/50 p-4 backdrop-blur-md">
            <div className="flex items-center space-x-3">
              <Users className="h-6 w-6 text-red-200" />
              <div>
                <p className="font-semibold">Contacts Notified</p>
                <p className="text-sm text-red-200">2 Primary Contacts</p>
              </div>
            </div>
            <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-bold text-green-300">
              Delivered
            </span>
          </div>
        </div>
      </div>

      <div className="mt-auto grid grid-cols-3 gap-2 bg-red-900/40 p-4 pb-safe sm:px-6">
        <button 
          onClick={togglePause}
          className="flex flex-col items-center justify-center space-y-1 rounded-xl bg-white/10 py-3 transition-colors hover:bg-white/20"
        >
          {isLocationSharingPaused ? <PlayCircle className="h-6 w-6" /> : <PauseCircle className="h-6 w-6" />}
          <span className="text-xs font-medium">{isLocationSharingPaused ? 'Resume' : 'Pause'}</span>
        </button>
        
        <button className="flex flex-col items-center justify-center space-y-1 rounded-xl bg-white/10 py-3 transition-colors hover:bg-white/20">
          <PhoneCall className="h-6 w-6" />
          <span className="text-xs font-medium">Call 911</span>
        </button>
        
        <button 
          onClick={handleEndEmergency}
          className="flex flex-col items-center justify-center space-y-1 rounded-xl bg-black/30 py-3 transition-colors hover:bg-black/50"
        >
          <StopCircle className="h-6 w-6 text-red-400" />
          <span className="text-xs font-medium text-red-200">End</span>
        </button>
      </div>
    </motion.div>
  );
};
