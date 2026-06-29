import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, ShieldAlert, CheckCircle2, Trash2 } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { useDashboardStore } from '../../../store/dashboard';
import { cn } from '../../../utils';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'alert' | 'reminder' | 'update';
  isRead: boolean;
  timestamp: string;
}

const MOCK_NOTIFICATIONS: NotificationItem[] = [
  { id: '1', title: 'Review Safety Plan', message: 'It has been 30 days since you last reviewed your safety plan.', type: 'reminder', isRead: false, timestamp: '2 hours ago' },
  { id: '2', title: 'Trusted Contact Added', message: 'Sarah has accepted your trusted contact request.', type: 'update', isRead: false, timestamp: 'Yesterday' },
  { id: '3', title: 'Emergency Contact Updated', message: 'Your emergency contacts have been synced.', type: 'update', isRead: true, timestamp: '2 days ago' },
];

export const NotificationScreen: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);
  const setUnreadCount = useDashboardStore((state) => state.setUnreadNotificationCount);

  useEffect(() => {
    const unread = notifications.filter((n) => !n.isRead).length;
    setUnreadCount(unread);
  }, [notifications, setUnreadCount]);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 dark:border-gray-800 dark:bg-gray-900">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h1>
        {notifications.some(n => !n.isRead) && (
          <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-pink-600 hover:text-pink-700 dark:text-pink-400">
            <CheckCircle2 className="mr-2 h-4 w-4" /> Mark all read
          </Button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto bg-gray-50 p-4 dark:bg-gray-950">
        <AnimatePresence>
          {notifications.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                <Bell className="h-8 w-8 text-gray-400 dark:text-gray-500" />
              </div>
              <p className="text-gray-500 dark:text-gray-400">You're all caught up.</p>
            </motion.div>
          ) : (
            <div className="space-y-3">
              {notifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className={cn(
                    "flex items-start rounded-lg border p-4 shadow-sm transition-colors",
                    notification.isRead 
                      ? "border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900" 
                      : "border-pink-100 bg-pink-50 dark:border-pink-900/30 dark:bg-pink-900/10"
                  )}
                >
                  <div className="mr-4 mt-0.5 shrink-0">
                    {notification.type === 'alert' ? (
                      <ShieldAlert className="h-5 w-5 text-red-500" />
                    ) : (
                      <Bell className={cn("h-5 w-5", notification.isRead ? "text-gray-400" : "text-pink-500")} />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className={cn("text-sm font-medium", notification.isRead ? "text-gray-700 dark:text-gray-300" : "text-gray-900 dark:text-gray-100")}>
                      {notification.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{notification.message}</p>
                    <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">{notification.timestamp}</p>
                  </div>
                  <button 
                    onClick={() => deleteNotification(notification.id)}
                    className="ml-4 shrink-0 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-red-500 dark:hover:bg-gray-800"
                    aria-label="Delete notification"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
