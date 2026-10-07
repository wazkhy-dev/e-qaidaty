import React from 'react';
import { Home, BookOpen, SearchCode, Bot, BarChart3, FileSpreadsheet } from 'lucide-react';
import { UserProfile } from '../types';

interface MobileNavProps {
  currentTab?: string;
  activeTab?: string;
  onSelectTab?: (tab: string) => void;
  onNavigate?: (tab: string) => void;
  user?: UserProfile;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  currentTab,
  activeTab,
  onSelectTab,
  onNavigate,
  user,
}) => {
  const effectiveTab = activeTab || currentTab || 'dashboard';

  const handleClick = (tabId: string) => {
    if (typeof onNavigate === 'function') {
      onNavigate(tabId);
    } else if (typeof onSelectTab === 'function') {
      onSelectTab(tabId);
    }
  };

  const baseItems = [
    { id: 'dashboard', label: 'Beranda', icon: Home },
    { id: 'materi', label: 'Materi', icon: BookOpen },
    { id: 'bedah', label: 'Bedah', icon: SearchCode },
    { id: 'ai-tutor', label: 'AI Tutor', icon: Bot },
    { id: 'progress', label: 'Progress', icon: BarChart3 },
  ];

  // Modul RPP (rangkuman-guru) is a Guru-only tool in the Sidebar's nav
  // ordering (placed right before "Progress"). It was previously missing
  // entirely from the mobile bottom nav, so Guru users had no way to reach
  // it on small screens even though the route itself worked fine. We insert
  // it here for role === 'guru' only — Santri's item set is left untouched.
  const items =
    user?.role === 'guru'
      ? [
          ...baseItems.slice(0, 4),
          { id: 'rangkuman-guru', label: 'RPP', icon: FileSpreadsheet },
          ...baseItems.slice(4),
        ]
      : baseItems;

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-2xl border-t border-sky-200/80 px-1.5 py-1.5 flex items-center justify-around gap-0.5 shadow-[0_-4px_20px_rgba(11,42,111,0.06)] h-16 safe-bottom overflow-hidden"
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = effectiveTab === item.id || (item.id === 'materi' && effectiveTab === 'materi-detail');

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => handleClick(item.id)}
            className={`flex-1 min-w-0 flex flex-col items-center justify-center py-1 px-0.5 rounded-xl transition-all duration-200 min-h-[44px] ${
              isActive
                ? 'text-blue-600 font-bold'
                : 'text-slate-500 hover:text-slate-800 font-medium'
            }`}
          >
            <div
              className={`p-1 rounded-xl transition-all ${
                isActive ? 'bg-blue-50 text-blue-600' : 'text-slate-500'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
            </div>
            <span className="text-[10px] tracking-tight truncate max-w-full mt-0.5">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

