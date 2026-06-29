import { create } from 'zustand';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'alert' | 'reminder' | 'update';
  isRead: boolean;
  timestamp: string;
}

interface DashboardState {
  unreadNotificationCount: number;
  recentWellnessMood: string | null;
  setUnreadNotificationCount: (count: number) => void;
  setRecentWellnessMood: (mood: string) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  unreadNotificationCount: 2,
  recentWellnessMood: null,
  setUnreadNotificationCount: (count) => set({ unreadNotificationCount: count }),
  setRecentWellnessMood: (mood) => set({ recentWellnessMood: mood }),
}));
