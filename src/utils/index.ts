import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility to merge tailwind classes safely
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Logger = {
  info: (msg: string, ...args: any[]) => {
    if (import.meta.env.DEV) console.log(`[INFO]: ${msg}`, ...args);
  },
  warn: (msg: string, ...args: any[]) => {
    if (import.meta.env.DEV) console.warn(`[WARN]: ${msg}`, ...args);
  },
  error: (msg: string, ...args: any[]) => {
    console.error(`[ERROR]: ${msg}`, ...args);
  }
};
