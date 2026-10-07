import React, { useState } from 'react';
import {
  Search,
  BookOpen,
  CheckCircle2,
  Bookmark,
  Sparkles,
  ArrowRight,
  Filter,
  Volume2
} from 'lucide-react';
import { QAIDATY_LESSONS } from '../data/qaidatyKnowledge';
import { QaidatyLesson } from '../types';
import { AudioPlayerButton } from './AudioPlayerButton';

interface MateriListViewProps {
  onSelectLesson: (lessonId: string) => void;
  completedLessons: string[];
  inProgressLessons?: string[];
  bookmarkedLessons: string[];
  onToggleBookmark: (lessonId: string) => void;
}

export const MateriListView: React.FC<MateriListViewProps> = ({
  onSelectLesson,
  completedLessons = [],
  inProgressLessons = [],
  bookmarkedLessons = [],
  onToggleBookmark,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Semua Bab (23)' },
    { id: 'dasar', label: '1. Pondasi & 5 Langkah (Bab 1-6)' },
    { id: 'shorof', label: '2. Wazan & Tashrif (Bab 7-14)' },
    { id: 'isim', label: '3. Cabang Isim & I\'rab (Bab 15-20)' },
    { id: 'shighoh', label: '4. Shighoh Khusus (Bab 21-23)' },
  ];

  const filteredLessons = QAIDATY_LESSONS.filter((lesson) => {
    const matchesSearch =
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.arabicTitle.includes(searchQuery) ||
      lesson.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.babNumber.toString().includes(searchQuery);

    if (!matchesSearch) return false;

    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'dasar') return lesson.babNumber >= 1 && lesson.babNumber <= 6;
    if (selectedCategory === 'shorof') return lesson.babNumber >= 7 && lesson.babNumber <= 14;
    if (selectedCategory === 'isim') return lesson.babNumber >= 15 && lesson.babNumber <= 20;
    if (selectedCategory === 'shighoh') return lesson.babNumber >= 21 && lesson.babNumber <= 23;
    return true;
  });

  return (
    <div className="flex-1 p-3.5 sm:p-5 md:p-8 overflow-y-auto space-y-4 sm:space-y-6 max-w-6xl mx-auto w-full min-w-0">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#123F9A] to-[#0B2A6F] text-white p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-[32px] shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-blue-200">
            Kurikulum Kitab Resmi
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black mt-1">Materi Qaidaty Jilid 1</h2>
          <p className="text-xs sm:text-sm text-blue-100 mt-1 sm:mt-2 leading-relaxed">
            Metode Praktis Belajar Membaca Arab Gundul karya Abi Yasin Muthohar. 23 Bab disusun bertahap mulai dari pengenalan kalimah hingga isim fi'il dan uslub khusus.
          </p>
        </div>
        <div className="absolute right-2 sm:right-4 -bottom-4 sm:-bottom-6 text-[90px] sm:text-[140px] font-arabic opacity-10 text-white select-none pointer-events-none">
          كتاب
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col gap-2.5 items-stretch">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari bab, topik, kata kunci..."
            className="w-full pl-9 pr-3 py-2 sm:py-2.5 bg-white/80 backdrop-blur rounded-xl sm:rounded-2xl border border-sky-100 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-800"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none w-full">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-white/80 border border-sky-100 text-slate-600 hover:bg-sky-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Lessons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {filteredLessons.map((lesson) => {
          const isCompleted = completedLessons.includes(lesson.id);
          const isBookmarked = bookmarkedLessons.includes(lesson.id);

          return (
            <div
              key={lesson.id}
              onClick={() => onSelectLesson(lesson.id)}
              className="glass-panel p-4 sm:p-5 rounded-2xl sm:rounded-[24px] border border-sky-100/90 hover:border-blue-300 transition-all cursor-pointer group shadow-2xs hover:shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] sm:text-xs font-black px-2 py-0.5 rounded-full bg-blue-100 text-blue-900">
                      Bab {lesson.babNumber.toString().padStart(2, '0')}
                    </span>
                    {isCompleted ? (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" /> Selesai
                      </span>
                    ) : inProgressLessons.includes(lesson.id) ? (
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                        Dipelajari
                      </span>
                    ) : (
                      <span className="text-[10px] font-medium text-slate-400 bg-slate-100/70 px-2 py-0.5 rounded-full">
                        Belum Mulai
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark(lesson.id);
                    }}
                    className={`p-1.5 rounded-full transition-colors ${
                      isBookmarked
                        ? 'text-amber-500 bg-amber-50'
                        : 'text-slate-300 hover:text-amber-500'
                    }`}
                  >
                    <Bookmark className="w-4 h-4 fill-current" />
                  </button>
                </div>

                <h3 className="font-extrabold text-sm sm:text-base text-[#0B1F44] group-hover:text-blue-600 transition-colors">
                  {lesson.title}
                </h3>
                <div className="flex items-center justify-between my-1">
                  <p className="font-arabic text-sm sm:text-base font-bold text-[#123F9A]">{lesson.arabicTitle}</p>
                  <AudioPlayerButton arabicText={lesson.arabicTitle} size="sm" />
                </div>

                <p className="text-[11px] sm:text-xs text-slate-500 line-clamp-2 leading-relaxed mt-1.5">
                  {lesson.summary}
                </p>

                {lesson.baharRojaz && (
                  <div className="mt-2 p-1.5 sm:p-2 bg-blue-50/70 rounded-xl border border-blue-100 text-[10px] sm:text-[11px] text-blue-800 font-medium">
                    🎵 Memuat Syair Bahar Rojaz
                  </div>
                )}
              </div>

              <div className="pt-3 mt-3 border-t border-sky-100/70 flex items-center justify-between text-xs">
                <span className="text-[10px] sm:text-[11px] text-slate-400 font-semibold">{lesson.pageReference}</span>
                <span className="font-bold text-blue-600 group-hover:translate-x-1 transition-transform flex items-center gap-1 text-[11px] sm:text-xs">
                  Buka Pelajaran <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
