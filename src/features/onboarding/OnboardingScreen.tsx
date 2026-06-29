import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, Lock, HeartHandshake, ChevronRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useAuthStore } from '../../store/auth';

const ONBOARDING_STEPS = [
  {
    title: 'Your Safety is Priority',
    description: 'SafeHer provides tools to help you stay safe, document incidents, and reach out for help discreetly.',
    icon: ShieldAlert,
  },
  {
    title: 'Secure & Private',
    description: 'Your data is encrypted and stored securely. We provide a stealth mode for immediate privacy.',
    icon: Lock,
  },
  {
    title: 'Support & AI Assistant',
    description: 'Get guidance on safety planning and connect with local resources or trusted contacts instantly.',
    icon: HeartHandshake,
  }
];

export const OnboardingScreen: React.FC = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const navigate = useNavigate();
  const completeOnboarding = useAuthStore((state) => state.completeOnboarding);

  const currentStep = ONBOARDING_STEPS[stepIndex];
  const Icon = currentStep.icon;

  const handleNext = () => {
    if (stepIndex < ONBOARDING_STEPS.length - 1) {
      setStepIndex((prev) => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    completeOnboarding();
    navigate('/login', { replace: true });
  };

  return (
    <div className="flex h-screen flex-col bg-gray-50 dark:bg-gray-950">
      <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={stepIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex max-w-sm flex-col items-center"
          >
            <div className="mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400">
              <Icon className="h-16 w-16" />
            </div>
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              {currentStep.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {currentStep.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex flex-col items-center p-8">
        {/* Indicators */}
        <div className="mb-8 flex space-x-2">
          {ONBOARDING_STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full transition-colors ${
                i === stepIndex ? 'bg-pink-600 w-4' : 'bg-gray-300 dark:bg-gray-700'
              }`}
            />
          ))}
        </div>

        <div className="flex w-full max-w-sm flex-col space-y-3">
          <Button onClick={handleNext} className="w-full" size="lg">
            {stepIndex === ONBOARDING_STEPS.length - 1 ? 'Get Started' : 'Next'}
            {stepIndex !== ONBOARDING_STEPS.length - 1 && <ChevronRight className="ml-2 h-4 w-4" />}
          </Button>
          {stepIndex !== ONBOARDING_STEPS.length - 1 && (
            <Button variant="ghost" onClick={handleComplete} className="w-full text-gray-500">
              Skip
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
