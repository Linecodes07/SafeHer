import { create } from 'zustand';

interface AppState {
  isStealthMode: boolean;
  theme: 'light' | 'dark' | 'system';
  setStealthMode: (value: boolean) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

export const useAppStore = create<AppState>((set) => ({
  isStealthMode: false,
  theme: 'system',
  setStealthMode: (value) => set({ isStealthMode: value }),
  setTheme: (theme) => set({ theme }),
}));
