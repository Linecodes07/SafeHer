import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, ShieldAlert } from 'lucide-react';

interface SosConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const SosConfirmModal: React.FC<SosConfirmModalProps> = ({ isOpen, onConfirm, onCancel }) => {
  const [isPressing, setIsPressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const pressDuration = 1500; // 1.5 seconds

  React.useEffect(() => {
    let timer: number;
    let startTime: number;

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / pressDuration) * 100, 100);
      setProgress(newProgress);

      if (newProgress < 100 && isPressing) {
        timer = requestAnimationFrame(updateProgress);
      } else if (newProgress >= 100) {
        onConfirm();
      }
    };

    if (isPressing) {
      startTime = Date.now();
      timer = requestAnimationFrame(updateProgress);
    } else {
      setProgress(0);
    }

    return () => cancelAnimationFrame(timer);
  }, [isPressing, onConfirm]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-900"
        >
          <div className="mb-4 flex items-center space-x-3 text-red-600 dark:text-red-500">
            <AlertTriangle className="h-8 w-8" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Trigger SOS?</h2>
          </div>
          
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            This will immediately share your live location with your primary trusted contacts.
          </p>

          <div className="flex flex-col items-center justify-center space-y-6">
            <button
              onMouseDown={() => setIsPressing(true)}
              onMouseUp={() => setIsPressing(false)}
              onMouseLeave={() => setIsPressing(false)}
              onTouchStart={() => setIsPressing(true)}
              onTouchEnd={() => setIsPressing(false)}
              className="relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-red-100 shadow-inner transition-transform active:scale-95 dark:bg-red-900/30"
            >
              <div 
                className="absolute bottom-0 left-0 w-full bg-red-600 transition-all ease-linear dark:bg-red-500"
                style={{ height: `${progress}%` }}
              />
              <div className="relative z-10 flex flex-col items-center text-red-700 dark:text-red-300">
                <ShieldAlert className="mb-1 h-8 w-8" />
                <span className="text-sm font-bold uppercase tracking-wider">Hold</span>
              </div>
            </button>

            <button
              onClick={onCancel}
              className="font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
