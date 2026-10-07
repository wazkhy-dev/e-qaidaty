import React from 'react';
import {
  Home,
  BookOpen,
  SearchCode,
  Bot,
  HelpCircle,
  FileSpreadsheet,
  BarChart3,
  Bookmark,
  Sparkles,
  GraduationCap,
  ChevronRight
} from 'lucide-react';
import { UserProfile } from '../types';
import { calculateProgress } from '../services/userStore';
import { QaidatyLogo } from './QaidatyLogo';

interface SidebarProps {
  currentTab?: string;
  activeTab?: string;
  onSelectTab?: (tab: string) => void;
  onNavigate?: (tab: string) => void;
  user: UserProfile;
  completedLessons?: string[];
  onToggleRole?: () => void;
  onOpenAuth?: () => void;
  onOpenSettings?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  activeTab,
  onSelectTab,
  onNavigate,
  user,
  completedLessons = [],
  onToggleRole,
  onOpenAuth,
  onOpenSettings,
}) => {
  const effectiveTab = activeTab || currentTab || 'dashboard';
  const progressPercent = calculateProgress(completedLessons);

  const handleTabClick = (tabId: string) => {
    if (typeof onNavigate === 'function') {
      onNavigate(tabId);
    } else if (typeof onSelectTab === 'function') {
      onSelectTab(tabId);
    }
  };

  const handleOpenSettingsModal = () => {
    if (typeof onOpenSettings === 'function') {
      onOpenSettings();
    } else if (typeof onOpenAuth === 'function') {
      onOpenAuth();
    }
  };

  // Exact 8 items required by Qaidaty platform
  const navItems = [
    { id: 'dashboard', label: 'Beranda', icon: Home, badge: '' },
    { id: 'materi', label: 'Materi Qaidaty', icon: BookOpen, badge: '23 Bab' },
    { id: 'bedah', label: 'Bedah Kalimah', icon: SearchCode, badge: 'AI + Rule' },
    { id: 'ai-tutor', label: 'Chat AI Tutor', icon: Bot, badge: 'RAG' },
    { id: 'quiz', label: 'Quiz & Latihan', icon: HelpCircle, badge: '10 Soal' },
    { id: 'rangkuman-guru', label: 'Modul RPP', icon: FileSpreadsheet, badge: '45 Mnt' },
    { id: 'progress', label: 'Progress Belajar', icon: BarChart3, badge: `${progressPercent}%` },
    { id: 'bookmarks', label: 'Bookmark & Catatan', icon: Bookmark, badge: '' },
  ];

  return (
    <aside className="hidden md:flex flex-col w-72 h-screen sticky top-0 left-0 glass-sidebar z-30 select-none">
      {/* Brand Header */}
      <div className="p-6 border-b border-sky-100/80">
        <div className="flex items-center gap-3">
          <QaidatyLogo variant="icon" size="md" />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold tracking-tight text-[#0B2A6F]">QAIDATY</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-blue-100 text-[#123F9A]">
                Jilid 1
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium truncate">
              Metode Qaidaty by Abi Yasin
            </p>
          </div>
        </div>

        {/* Role Pill Switcher */}
        <div className="mt-4 p-1 bg-sky-100/60 rounded-xl flex items-center gap-1 border border-sky-200/50">
          <button
            type="button"
            onClick={() => onToggleRole && onToggleRole()}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              user.role === 'santri'
                ? 'bg-white text-[#0B2A6F] shadow-sm'
                : 'text-slate-600 hover:text-[#0B2A6F]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Santri
          </button>
          <button
            type="button"
            onClick={() => onToggleRole && onToggleRole()}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              user.role === 'guru'
                ? 'bg-white text-[#0B2A6F] shadow-sm'
                : 'text-slate-600 hover:text-[#0B2A6F]'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
            Guru
          </button>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1.5">
        <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Navigasi Utama
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = effectiveTab === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleTabClick(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-[#123F9A] text-white shadow-md shadow-blue-600/20'
                  : 'text-slate-600 hover:bg-sky-50 hover:text-[#0B2A6F]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-600'
                  }`}
                />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-sky-100 text-blue-700'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* User Profile Card at Bottom */}
      <div className="p-4 border-t border-sky-100/80">
        <div
          onClick={handleOpenSettingsModal}
          className="p-2.5 rounded-2xl bg-white/70 border border-sky-100 hover:border-sky-200 transition-all flex items-center justify-between cursor-pointer group shadow-sm hover:shadow"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
              {user.name ? user.name.trim().charAt(0).toUpperCase() : 'Q'}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-[#0B2A6F] truncate group-hover:text-blue-600 transition-colors">
                {user.name || 'Pengguna Qaidaty'}
              </p>
              <p className="text-[11px] text-slate-500 font-medium">
                {user.role === 'guru' ? 'Guru' : 'Santri'}
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </aside>
  );
};
