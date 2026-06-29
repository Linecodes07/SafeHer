import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router';
import { Home, BookOpen, Bot, User, ShieldAlert, Bell, Menu, X, Users, Lock, Book, MapPin } from 'lucide-react';
import { useAuthStore } from '../../../store/auth';
import { useDashboardStore } from '../../../store/dashboard';
import { cn } from '../../../utils';

export const AppShell: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { user } = useAuthStore();
  const unreadCount = useDashboardStore((state) => state.unreadNotificationCount);
  const navigate = useNavigate();

  const closeDrawer = () => setIsDrawerOpen(false);

  const NAV_ITEMS = [
    { to: '/app', icon: <Home className="h-5 w-5" />, label: 'Home', end: true },
    { to: '/app/sos', icon: <ShieldAlert className="h-5 w-5" />, label: 'Emergency SOS', mobileHidden: true, danger: true },
    { to: '/app/contacts', icon: <Users className="h-5 w-5" />, label: 'Trusted Contacts', mobileHidden: true },
    { to: '/app/vault', icon: <Lock className="h-5 w-5" />, label: 'Evidence Vault', mobileHidden: true },
    { to: '/app/journal', icon: <Book className="h-5 w-5" />, label: 'Journal', mobileHidden: true },
    { to: '/app/safety-plan', icon: <ShieldAlert className="h-5 w-5" />, label: 'Safety Plan', mobileHidden: true },
    { to: '/app/nearby', icon: <MapPin className="h-5 w-5" />, label: 'Nearby Help', mobileHidden: true },
    { to: '/app/resources', icon: <BookOpen className="h-5 w-5" />, label: 'Resources' },
    { to: '/app/ai', icon: <Bot className="h-5 w-5" />, label: 'AI Chat' },
    { to: '/app/profile', icon: <User className="h-5 w-5" />, label: 'Profile' },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
      
      {/* Desktop Drawer (Sidebar) */}
      <aside className="hidden w-64 flex-col border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 md:flex">
        <div className="flex h-16 shrink-0 items-center px-6">
          <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-pink-100 dark:bg-pink-900/30">
            <ShieldAlert className="h-5 w-5 text-pink-600 dark:text-pink-400" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">SafeHer</span>
        </div>
        
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  "flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? item.danger ? "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400" : "bg-pink-50 text-pink-700 dark:bg-pink-900/20 dark:text-pink-400"
                    : item.danger ? "text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/10" : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                )
              }
            >
              <div className="mr-3">{item.icon}</div>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top App Bar */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 dark:border-gray-800 dark:bg-gray-900 md:px-6">
          <div className="flex items-center md:hidden">
            <button onClick={() => setIsDrawerOpen(true)} className="mr-2 rounded-md p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800">
              <Menu className="h-6 w-6" />
            </button>
            <span className="text-lg font-bold text-gray-900 dark:text-white">SafeHer</span>
          </div>

          <div className="hidden items-center md:flex">
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
            </h2>
          </div>

          <div className="flex items-center space-x-3">
            <button 
              onClick={() => navigate('/app/notifications')}
              className="relative rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            >
              <Bell className="h-6 w-6" />
              {unreadCount > 0 && (
                <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white ring-2 ring-white dark:ring-gray-900">
                  {unreadCount}
                </span>
              )}
            </button>
            <button 
              onClick={() => navigate('/app/profile')}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-100 font-bold text-pink-600 dark:bg-pink-900/40 dark:text-pink-300"
            >
              {user?.email?.[0].toUpperCase() || 'U'}
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden relative">
          <Outlet />
        </main>

        {/* Bottom Navigation for Mobile */}
        <nav className="shrink-0 border-t border-gray-200 bg-white pb-safe dark:border-gray-800 dark:bg-gray-900 md:hidden">
          <div className="flex h-16 justify-around px-2">
            {NAV_ITEMS.filter(item => !item.mobileHidden).map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    "flex flex-1 flex-col items-center justify-center space-y-1 transition-colors",
                    isActive
                      ? "text-pink-600 dark:text-pink-400"
                      : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  )
                }
              >
                {item.icon}
                <span className="text-[10px] font-medium">{item.label}</span>
              </NavLink>
            ))}
          </div>
        </nav>
      </div>

      {/* Mobile Drawer Overlay */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={closeDrawer} />
          <div className="relative flex w-4/5 max-w-sm flex-col bg-white shadow-xl dark:bg-gray-900">
            <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4 dark:border-gray-800">
              <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">SafeHer</span>
              <button onClick={closeDrawer} className="rounded-md p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800">
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={closeDrawer}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center rounded-md px-3 py-3 text-base font-medium transition-colors",
                      isActive
                        ? item.danger ? "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400" : "bg-pink-50 text-pink-700 dark:bg-pink-900/20 dark:text-pink-400"
                        : item.danger ? "text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/10" : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                    )
                  }
                >
                  <div className="mr-4">{item.icon}</div>
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};
