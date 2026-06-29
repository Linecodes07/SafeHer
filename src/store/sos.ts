import { create } from 'zustand';

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

interface SosState {
  isActive: boolean;
  sessionId: string | null;
  sessionStartTime: number | null;
  currentLocation: LocationData | null;
  isLocationSharingPaused: boolean;
  activateSos: (sessionId: string) => void;
  deactivateSos: () => void;
  updateLocation: (loc: LocationData) => void;
  setPauseLocationSharing: (pause: boolean) => void;
}

export const useSosStore = create<SosState>((set) => ({
  isActive: false,
  sessionId: null,
  sessionStartTime: null,
  currentLocation: null,
  isLocationSharingPaused: false,
  activateSos: (sessionId) => set({ isActive: true, sessionId, sessionStartTime: Date.now(), isLocationSharingPaused: false }),
  deactivateSos: () => set({ isActive: false, sessionId: null, sessionStartTime: null, currentLocation: null, isLocationSharingPaused: false }),
  updateLocation: (loc) => set({ currentLocation: loc }),
  setPauseLocationSharing: (pause) => set({ isLocationSharingPaused: pause }),
}));
