import React from 'react';
import {
  BarChart3,
  Award,
  Flame,
  Zap,
  TrendingUp,
  CheckCircle2,
  Calendar,
  BookOpen,
  HelpCircle,
  Clock
} from 'lucide-react';
import { UserProfile, UserLearningState } from '../types';
import { QAIDATY_LESSONS } from '../data/qaidatyKnowledge';
import { calculateProgress } from '../services/userStore';

interface ProgressAnalyticsViewProps {
  user: UserProfile;
  learningState: UserLearningState;
  onOpenLesson: (lessonId: string) => void;
}

export const ProgressAnalyticsView: React.FC<ProgressAnalyticsViewProps> = ({
  user,
  learningState,
  onOpenLesson,
}) => {
  const completedLessons = learningState.completedLessons || [];
  const completedCount = completedLessons.length;
  const totalLessons = 23;
  const progressPercent = calculateProgress(completedLessons);

  const quizScores = learningState.quizScores || [];
  const quizAverage =
    quizScores.length > 0
      ? Math.round(quizScores.reduce((a, b) => a + b, 0) / quizScores.length)
      : 0;

  const badges = [
    {
      id: 'badge-1',
      title: 'Pondasi Nahwu',
      desc: 'Menyelesaikan Bab 01 - 06 (5 Langkah Qaidaty)',
      icon: '🏛️',
      unlocked: completedCount >= 6,
    },
    {
      id: 'badge-2',
      title: 'Bahar Rojaz Singer',
      desc: 'Menghafal bait 8 tanda isim dengan lagu Bahar Rojaz',
      icon: '🎵',
      unlocked: completedLessons.includes('bab-02') || completedLessons.includes('bab-05'),
    },
    {
      id: 'badge-3',
      title: 'Pemburu Wazan',
      desc: 'Menguasai wazan Tsulatsi, Ruba\'i, dan Sudasi',
      icon: '📐',
      unlocked: completedCount >= 12,
    },
    {
      id: 'badge-4',
      title: 'Master I\'rab Qaidaty',
      desc: 'Menguasai tabel perubahan 8 isim mu\'rab',
      icon: '👑',
      unlocked: completedLessons.includes('bab-20'),
    },
  ];

  return (
    <div className="flex-1 p-3.5 sm:p-5 md:p-8 overflow-y-auto max-w-5xl mx-auto space-y-4 sm:space-y-6 w-full min-w-0">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#123F9A] to-[#0B2A6F] text-white p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-[32px] shadow-md relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative z-10 space-y-1">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-blue-200">
            Analitik & Gamifikasi
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black">Progress Belajar Santri</h2>
          <p className="text-xs text-blue-100 max-w-md">
            Pantau penguasaan 23 Bab Kitab Qaidaty, kumpulkan poin XP, pertahankan streak harian, dan raih lencana kemahiran.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <div className="flex-1 sm:flex-initial bg-white/10 backdrop-blur p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border border-white/20 text-center min-w-[80px]">
            <p className="text-[9px] sm:text-[10px] text-blue-200 uppercase font-bold">Level Belajar</p>
            <p className="text-lg sm:text-xl font-black text-white">Level {learningState.level || 1}</p>
          </div>
          <div className="flex-1 sm:flex-initial bg-white/10 backdrop-blur p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border border-white/20 text-center min-w-[80px]">
            <p className="text-[9px] sm:text-[10px] text-blue-200 uppercase font-bold">Total XP</p>
            <p className="text-lg sm:text-xl font-black text-amber-300">⚡ {learningState.xp || 0}</p>
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4">
        <div className="glass-panel p-4 sm:p-6 rounded-2xl sm:rounded-[28px] border border-sky-100 shadow-2xs space-y-2 sm:space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase">Bab Selesai</span>
            <BookOpen className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-[#0B2A6F]">
            {completedCount} <span className="text-xs sm:text-sm font-semibold text-slate-400">/ {totalLessons} Bab</span>
          </p>
          <div className="w-full bg-sky-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium">{progressPercent}% materi dikuasai</p>
        </div>

        <div className="glass-panel p-4 sm:p-6 rounded-2xl sm:rounded-[28px] border border-sky-100 shadow-2xs space-y-2 sm:space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase">Streak Belajar</span>
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-amber-500">
            {learningState.streakDays || 0} <span className="text-xs sm:text-sm font-semibold text-slate-400">Hari</span>
          </p>
          <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium">
            Konsisten 10 menit setiap hari melipatgandakan retensi hafalan kaidah.
          </p>
        </div>

        <div className="glass-panel p-4 sm:p-6 rounded-2xl sm:rounded-[28px] border border-sky-100 shadow-2xs space-y-2 sm:space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase">Akurasi Kuis</span>
            <Award className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-emerald-600">
            {quizScores.length > 0 ? `${quizAverage}%` : '0%'}
          </p>
          <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium">
            {quizScores.length > 0
              ? `Rata-rata dari ${quizScores.length} sesi evaluasi kuis.`
              : 'Selesaikan kuis untuk menguji pemahaman kaidah.'}
          </p>
        </div>
      </div>

      {/* Badges Achievements */}
      <div className="glass-panel p-4 sm:p-6 rounded-2xl sm:rounded-[28px] border border-sky-100 space-y-3 sm:space-y-4 shadow-2xs">
        <h3 className="font-extrabold text-sm sm:text-base text-[#0B2A6F] flex items-center gap-2">
          <Award className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
          <span>Lencana Kemahiran Kaidah</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {badges.map((b) => (
            <div
              key={b.id}
              className={`p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border transition-all flex flex-col justify-between ${
                b.unlocked
                  ? 'bg-white border-amber-200/80 shadow-2xs'
                  : 'bg-slate-50/70 border-slate-200 opacity-60'
              }`}
            >
              <div>
                <div className="text-2xl sm:text-3xl mb-1.5 sm:mb-2">{b.icon}</div>
                <h4 className="font-bold text-xs sm:text-sm text-[#0B1F44]">{b.title}</h4>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1 leading-relaxed">{b.desc}</p>
              </div>

              <div className="mt-2.5 sm:mt-3 pt-2.5 sm:pt-3 border-t border-slate-100">
                {b.unlocked ? (
                  <span className="text-[9px] sm:text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                    ✓ Terbuka
                  </span>
                ) : (
                  <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                    🔒 Terkunci
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
