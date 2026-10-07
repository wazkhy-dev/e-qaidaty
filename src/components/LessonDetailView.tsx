import React, { useState } from 'react';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  CheckCircle2,
  Bookmark,
  Bot,
  SearchCode,
  Sparkles,
  HelpCircle,
  Volume2,
  Table as TableIcon,
  ListOrdered,
  FileCheck
} from 'lucide-react';
import { QAIDATY_LESSONS } from '../data/qaidatyKnowledge';
import { AudioPlayerButton } from './AudioPlayerButton';

interface LessonDetailViewProps {
  lessonId: string;
  onBack: () => void;
  onSelectLesson: (id: string) => void;
  isCompleted: boolean;
  isBookmarked: boolean;
  onToggleComplete: (id: string) => void;
  onToggleBookmark: (id: string) => void;
  onAskAi: (prompt: string, lessonId: string) => void;
  onOpenBedahWithText: (text: string) => void;
}

export const LessonDetailView: React.FC<LessonDetailViewProps> = ({
  lessonId,
  onBack,
  onSelectLesson,
  isCompleted,
  isBookmarked,
  onToggleComplete,
  onToggleBookmark,
  onAskAi,
  onOpenBedahWithText,
}) => {
  const currentIndex = QAIDATY_LESSONS.findIndex((l) => l.id === lessonId);
  const lesson = QAIDATY_LESSONS[currentIndex] || QAIDATY_LESSONS[0];

  const prevLesson = currentIndex > 0 ? QAIDATY_LESSONS[currentIndex - 1] : null;
  const nextLesson = currentIndex < QAIDATY_LESSONS.length - 1 ? QAIDATY_LESSONS[currentIndex + 1] : null;

  const [activeSubTab, setActiveSubTab] = useState<'kaidah' | 'tabel' | 'contoh' | 'latihan'>('kaidah');

  return (
    <div className="flex-1 p-3.5 sm:p-5 md:p-8 overflow-y-auto max-w-5xl mx-auto space-y-4 sm:space-y-6 w-full min-w-0">
      {/* Top Breadcrumb Bar */}
      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-slate-500 hover:text-blue-600 px-2.5 sm:px-3 py-1.5 rounded-xl bg-white border border-sky-100 shadow-2xs transition-all shrink-0"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Kembali ke Daftar Bab</span>
          <span className="sm:hidden">Daftar Bab</span>
        </button>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => onToggleBookmark(lesson.id)}
            className={`p-1.5 sm:p-2 rounded-xl border transition-all ${
              isBookmarked
                ? 'bg-amber-50 border-amber-200 text-amber-600'
                : 'bg-white border-sky-100 text-slate-400 hover:text-amber-500'
            }`}
            title="Bookmark Bab Ini"
          >
            <Bookmark className="w-4 h-4 fill-current" />
          </button>

          <button
            type="button"
            onClick={() => onToggleComplete(lesson.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all border shrink-0 ${
              isCompleted
                ? 'bg-emerald-500 text-white border-emerald-500 shadow-2xs'
                : 'bg-white border-sky-100 text-slate-600 hover:border-emerald-300'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isCompleted ? 'Selesai' : 'Tandai Selesai'}</span>
          </button>
        </div>
      </div>

      {/* Lesson Hero Header */}
      <div className="bg-gradient-to-br from-[#123F9A] to-[#0B2A6F] text-white p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-[32px] shadow-md relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-bold text-blue-200 mb-1.5 sm:mb-2">
            <span className="px-2 py-0.5 rounded-full bg-white/20">
              Bab {lesson.babNumber.toString().padStart(2, '0')} / 23
            </span>
            <span>•</span>
            <span>{lesson.pageReference}</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-black">{lesson.title}</h1>

          <div className="flex items-center justify-between mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-white/15">
            <p className="font-arabic text-xl sm:text-2xl md:text-3xl font-bold text-sky-200">
              {lesson.arabicTitle}
            </p>
            <AudioPlayerButton
              arabicText={lesson.arabicTitle}
              size="sm"
              showLabel
              className="bg-white/20 text-white border-white/30 hover:bg-white/30"
            />
          </div>

          <p className="text-xs sm:text-sm text-blue-100 mt-2 sm:mt-3 leading-relaxed max-w-3xl">
            {lesson.summary}
          </p>
        </div>

        <div className="absolute right-[-10px] -bottom-10 text-[120px] sm:text-[180px] font-arabic text-white opacity-5 select-none pointer-events-none">
          {lesson.babNumber}
        </div>
      </div>

      {/* Bahar Rojaz Spotlight (If Available) */}
      {lesson.baharRojaz && (
        <div className="glass-panel p-4 sm:p-6 rounded-2xl sm:rounded-[28px] border-2 border-blue-200/80 bg-gradient-to-r from-blue-50/80 via-white to-sky-50/80 shadow-2xs">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <div className="flex items-center gap-1.5">
              <span className="text-base sm:text-xl">🎵</span>
              <h3 className="font-bold text-[#0B2A6F] text-xs sm:text-sm">
                Syair Bahar Rojaz ({lesson.baharRojaz.title})
              </h3>
            </div>
            <AudioPlayerButton
              arabicText={lesson.baharRojaz.arabicPoem}
              size="sm"
              showLabel
              className="bg-blue-600 text-white border-blue-600"
            />
          </div>

          <div className="bg-white/90 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-sky-100 text-center mb-2.5 sm:mb-3">
            <p className="font-arabic text-lg sm:text-xl md:text-2xl font-bold text-[#0B2A6F] leading-loose">
              {lesson.baharRojaz.arabicPoem}
            </p>
          </div>

          <div className="space-y-1 text-xs text-slate-700 bg-sky-50/60 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-sky-100">
            <p className="font-bold text-blue-900 mb-1 text-[11px] sm:text-xs">Lantunan Bait Syair Qaidaty:</p>
            {(lesson.baharRojaz.poem ?? lesson.baharRojaz.indonesianPoem ?? []).map((line, idx) => (
              <p key={idx} className="font-medium text-[11px] sm:text-xs">
                • {line}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Sub Tab Navigation */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none w-full border-b border-sky-100">
        <button
          type="button"
          onClick={() => setActiveSubTab('kaidah')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all shrink-0 ${
            activeSubTab === 'kaidah'
              ? 'bg-blue-600 text-white shadow-2xs'
              : 'bg-white border border-sky-100 text-slate-600 hover:bg-sky-50'
          }`}
        >
          <ListOrdered className="w-3.5 h-3.5" />
          <span>Kaidah & Rumus</span>
        </button>

        {lesson.wazanTable && lesson.wazanTable.length > 0 && (
          <button
            type="button"
            onClick={() => setActiveSubTab('tabel')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all shrink-0 ${
              activeSubTab === 'tabel'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'bg-white border border-sky-100 text-slate-600 hover:bg-sky-50'
            }`}
          >
            <TableIcon className="w-3.5 h-3.5" />
            <span>Tabel Wazan</span>
          </button>
        )}

        <button
          type="button"
          onClick={() => setActiveSubTab('contoh')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all shrink-0 ${
            activeSubTab === 'contoh'
              ? 'bg-blue-600 text-white shadow-2xs'
              : 'bg-white border border-sky-100 text-slate-600 hover:bg-sky-50'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Contoh & Bedah</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('latihan')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all shrink-0 ${
            activeSubTab === 'latihan'
              ? 'bg-blue-600 text-white shadow-2xs'
              : 'bg-white border border-sky-100 text-slate-600 hover:bg-sky-50'
          }`}
        >
          <FileCheck className="w-3.5 h-3.5" />
          <span>Latihan Mandiri</span>
        </button>
      </div>

      {/* Tab 1: Kaidah & Rumus */}
      {activeSubTab === 'kaidah' && (
        <div className="space-y-3 sm:space-y-4">
          <div className="glass-panel p-4 sm:p-6 rounded-2xl sm:rounded-[28px] border border-sky-100 space-y-3 sm:space-y-4">
            <h3 className="font-extrabold text-sm sm:text-base text-[#0B2A6F] flex items-center gap-2">
              <span>📌</span> Poin Kaidah Inti Kitab Qaidaty
            </h3>

            <div className="space-y-2.5 sm:space-y-3">
              {lesson.rules.map((rule, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl sm:rounded-2xl bg-white border border-sky-100 shadow-2xs"
                >
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                    {rule}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Tabel Wazan */}
      {activeSubTab === 'tabel' && lesson.wazanTable && (
        <div className="glass-panel p-4 sm:p-6 rounded-2xl sm:rounded-[28px] border border-sky-100 overflow-hidden">
          <h3 className="font-extrabold text-sm sm:text-base text-[#0B2A6F] mb-3 sm:mb-4 flex items-center gap-2">
            <span>📐</span> Matriks Wazan & Mauzun Baku Qaidaty
          </h3>

          <div className="overflow-x-auto rounded-xl border border-sky-100 -mx-1 sm:mx-0">
            <table className="w-full text-left text-xs border-collapse min-w-[480px]">
              <thead>
                <tr className="bg-sky-100/70 text-[#0B2A6F] font-bold border-b border-sky-200">
                  <th className="p-2.5 sm:p-3">Wazan</th>
                  <th className="p-2.5 sm:p-3">Mauzun</th>
                  <th className="p-2.5 sm:p-3">Arti</th>
                  <th className="p-2.5 sm:p-3">Huruf Tambahan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sky-100 bg-white">
                {lesson.wazanTable.map((row, idx) => (
                  <tr key={idx} className="hover:bg-sky-50/50 transition-colors">
                    <td className="p-2.5 sm:p-3 font-arabic font-bold text-base sm:text-lg text-blue-700">{row.wazan}</td>
                    <td className="p-2.5 sm:p-3 font-arabic font-bold text-base sm:text-lg text-slate-800">{row.mauzun}</td>
                    <td className="p-2.5 sm:p-3 text-slate-600 font-medium text-[11px] sm:text-xs">{row.arti}</td>
                    <td className="p-2.5 sm:p-3 text-slate-500 font-mono text-[10px] sm:text-[11px]">{row.harfZaidah}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Contoh & Bedah */}
      {activeSubTab === 'contoh' && (
        <div className="space-y-3 sm:space-y-4">
          <div className="glass-panel p-4 sm:p-6 rounded-2xl sm:rounded-[28px] border border-sky-100 space-y-3 sm:space-y-4">
            <h3 className="font-extrabold text-sm sm:text-base text-[#0B2A6F] flex items-center gap-2">
              <span>🔍</span> Contoh Penerapan Kalimat & Bedah Tarkib
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {lesson.examples.map((ex, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 sm:p-5 rounded-2xl border border-sky-100 shadow-2xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 text-blue-700">
                        Contoh #{idx + 1}
                      </span>
                      <AudioPlayerButton arabicText={ex.arabic} size="sm" />
                    </div>
                    <p className="font-arabic text-xl sm:text-2xl font-bold text-right text-[#0B2A6F] my-2 leading-relaxed">
                      {ex.arabic}
                    </p>
                    <p className="text-xs font-semibold text-slate-700">Artinya: "{ex.makna}"</p>
                    {ex.tarkibNote && (
                      <p className="text-[11px] text-blue-800 bg-blue-50/80 p-2 sm:p-2.5 rounded-xl border border-blue-100 mt-2">
                        💡 <b>Analisis:</b> {ex.tarkibNote}
                      </p>
                    )}
                  </div>

                  <div className="pt-2.5 mt-2.5 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => onOpenBedahWithText(ex.arabic)}
                      className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <SearchCode className="w-3.5 h-3.5" />
                      <span>Bedah Kalimat Ini di Studio →</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Latihan Mandiri */}
      {activeSubTab === 'latihan' && (
        <div className="glass-panel p-4 sm:p-6 rounded-2xl sm:rounded-[28px] border border-sky-100 space-y-3 sm:space-y-4">
          <h3 className="font-extrabold text-sm sm:text-base text-[#0B2A6F] flex items-center gap-2">
            <span>✍️</span> Latihan Mandiri Santri
          </h3>

          <div className="space-y-2.5 sm:space-y-3">
            {lesson.exercises && lesson.exercises.length > 0 ? (
              lesson.exercises.map((ex, idx) => (
                <div key={idx} className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-sky-100 shadow-2xs">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <p className="text-xs font-bold text-slate-800">Soal Latihan:</p>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 pl-7">{ex}</p>
                </div>
              ))
            ) : (
              <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-sky-50/60 border border-sky-100 text-center">
                <p className="text-xs sm:text-sm text-slate-500 font-medium">Belum ada latihan untuk bab ini.</p>
              </div>
            )}
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="text-xs">
              <p className="font-bold text-[#0B2A6F]">Ingin menguji pemahaman dengan Kuis?</p>
              <p className="text-slate-500 text-[11px] sm:text-xs">Kerjakan kuis adaptif untuk bab ini dan dapatkan XP!</p>
            </div>
            <button
              type="button"
              onClick={() => onAskAi(`Jelaskan cara menyelesaikan latihan pada Bab ${lesson.babNumber}: ${lesson.title}`, lesson.id)}
              className="px-3.5 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-2xs hover:bg-blue-700 shrink-0"
            >
              Tanya AI Tutor ✨
            </button>
          </div>
        </div>
      )}

      {/* Bottom Floating/Bar AI Quick Action */}
      <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white border border-sky-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg sm:text-xl shrink-0">
            🤖
          </div>
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-[#0B1F44]">
              Ada kaidah yang belum Anda pahami di Bab {lesson.babNumber}?
            </h4>
            <p className="text-[10px] sm:text-[11px] text-slate-500">
              Qaidaty AI Tutor siap menjelaskan dengan referensi halaman kitab.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            onAskAi(
              `Mohon jelaskan lebih dalam kaidah utama dari Bab ${lesson.babNumber}: ${lesson.title} (${lesson.arabicTitle}) beserta contohnya`,
              lesson.id
            )
          }
          className="w-full sm:w-auto justify-center px-4 py-2 sm:py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-2xs flex items-center gap-1.5 shrink-0"
        >
          <Bot className="w-4 h-4" />
          <span>Tanya AI tentang Bab Ini</span>
        </button>
      </div>

      {/* Chapter Pagination Navigation */}
      <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-sky-100 gap-2">
        {prevLesson ? (
          <button
            type="button"
            onClick={() => onSelectLesson(prevLesson.id)}
            className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-slate-600 hover:text-blue-600 p-1.5 sm:p-2 rounded-xl hover:bg-white transition-all truncate max-w-[48%]"
          >
            <ChevronLeft className="w-4 h-4 shrink-0" />
            <span className="truncate">Bab {prevLesson.babNumber}: {prevLesson.title}</span>
          </button>
        ) : <div />}

        {nextLesson ? (
          <button
            type="button"
            onClick={() => onSelectLesson(nextLesson.id)}
            className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-blue-600 hover:text-blue-800 p-1.5 sm:p-2 rounded-xl hover:bg-white transition-all truncate max-w-[48%] justify-end"
          >
            <span className="truncate">Bab {nextLesson.babNumber}: {nextLesson.title}</span>
            <ChevronRight className="w-4 h-4 shrink-0" />
          </button>
        ) : <div />}
      </div>
    </div>
  );
};
