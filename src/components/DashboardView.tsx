import React, { useState } from 'react';
import {
  ArrowRight,
  Bot,
  SearchCode,
  HelpCircle,
  BookOpen,
  Bookmark,
  ChevronRight,
  Layers,
  Sparkles
} from 'lucide-react';
import { UserProfile, BedahSentenceResult } from '../types';
import { QAIDATY_LESSONS } from '../data/qaidatyKnowledge';
import { AudioPlayerButton } from './AudioPlayerButton';
import { submitBedahKalimah } from '../services/api';

interface DashboardViewProps {
  user: UserProfile;
  onNavigate: (tab: string, lessonId?: string) => void;
  onQuickBedah: (text: string) => void;
  onQuickAskAi: (prompt: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  onNavigate,
  onQuickBedah,
  onQuickAskAi,
}) => {
  const [quickInput, setQuickInput] = useState('قَامَ مُحَمَّدٌ فِي الفَصْلِ');
  const [quickResult, setQuickResult] = useState<BedahSentenceResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const lastLesson = QAIDATY_LESSONS.find((l) => l.id === user.currentLessonId) || QAIDATY_LESSONS[6];

  const handleRunQuickBedah = async () => {
    if (!quickInput.trim()) return;
    setIsAnalyzing(true);
    try {
      const res = await submitBedahKalimah(quickInput);
      setQuickResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex-1 p-3.5 sm:p-5 md:p-8 flex flex-col gap-4 sm:gap-6 md:gap-8 relative overflow-y-auto max-w-6xl mx-auto w-full min-w-0">
      {/* Background ambient aesthetic lighting */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#1677FF] opacity-[0.03] blur-[100px] rounded-full pointer-events-none" />

      {/* Main Greeting & Heading Header */}
      <header className="flex flex-col gap-1 sm:gap-1.5">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0B2A6F] tracking-tight leading-tight">
          Mari Kita Belajar Qaidaty Bersama
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm md:text-base font-medium leading-relaxed">
          Mulai perjalanan belajar membaca Al-Qur’an dengan Qaidaty.
        </p>
      </header>

      {/* Top Banner & AI Tutor Cards */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Deep Blue Hero Banner */}
        <div className="lg:col-span-7 bg-gradient-to-br from-[#123F9A] to-[#0B2A6F] rounded-2xl sm:rounded-[32px] p-4 sm:p-6 md:p-8 text-white relative overflow-hidden shadow-lg shadow-blue-900/10 flex flex-col justify-between min-h-0 sm:min-h-[220px]">
          <div className="relative z-10 space-y-3 sm:space-y-4">
            <div className="flex justify-between items-start gap-2">
              <div>
                <span className="text-blue-200 text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                  Materi Kitab Qaidaty
                </span>
                <h3 className="text-base sm:text-xl md:text-2xl font-bold mt-0.5 sm:mt-1 leading-snug">
                  Jilid 1 — Bab {lastLesson.babNumber.toString().padStart(2, '0')}: {lastLesson.title}
                </h3>
              </div>
              <AudioPlayerButton
                arabicText={lastLesson.arabicTitle}
                size="sm"
                className="bg-white/10 text-white border-white/20 hover:bg-white/20 shrink-0"
              />
            </div>

            <div className="space-y-1">
              <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed line-clamp-2">
                {lastLesson.summary}
              </p>
              <p className="text-[11px] text-blue-200 font-medium">
                Referensi: Kitab Qaidaty {lastLesson.pageReference}
              </p>
            </div>

            <div className="pt-1 sm:pt-2 flex flex-wrap items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => onNavigate('materi', lastLesson.id)}
                className="flex-1 sm:flex-initial px-4 sm:px-6 py-2.5 bg-white text-[#0B2A6F] rounded-xl font-bold text-xs sm:text-sm hover:bg-sky-50 transition-all shadow-sm active:scale-95 flex items-center justify-center gap-1.5"
              >
                <span>Pelajari Bab Ini</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('quiz')}
                className="px-3.5 sm:px-4 py-2.5 bg-white/15 hover:bg-white/25 text-white rounded-xl font-semibold text-xs sm:text-sm transition-all border border-white/20 text-center"
              >
                Kuis Bab Ini
              </button>
            </div>
          </div>

          {/* Decorative Arabic Calligraphy Watermark */}
          <div className="absolute top-[-10px] right-[-10px] text-[120px] sm:text-[170px] text-white opacity-10 font-arabic rotate-12 pointer-events-none select-none">
            ق
          </div>
        </div>

        {/* Qaidaty AI Tutor Card */}
        <div className="lg:col-span-5 bg-white/80 backdrop-blur-2xl border border-white rounded-2xl sm:rounded-[32px] p-4 sm:p-6 shadow-xs flex flex-col justify-between gap-3">
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2 sm:gap-2.5">
                <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 text-base sm:text-lg shadow-2xs border border-blue-100 shrink-0">
                  🤖
                </span>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-[#0B1F44]">Qaidaty AI Tutor</h4>
                  <p className="text-[10px] sm:text-[11px] text-slate-500">RAG Powered by Kitab Qaidaty</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('ai-tutor')}
                className="text-[11px] sm:text-xs font-bold text-blue-600 hover:text-blue-800"
              >
                Buka Chat →
              </button>
            </div>

            <div className="bg-[#F3F8FF] p-3 rounded-xl sm:rounded-2xl border border-blue-100/60 mb-2">
              <p className="text-xs text-slate-700 leading-relaxed">
                "Ahlan wa Sahlan! Ada pertanyaan seputar kaidah bahasa Arab atau ingin bedah tarkib kalimat hari ini?"
              </p>
            </div>
          </div>

          <div className="space-y-1.5">
            <p className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-wider">Tanya Cepat AI Tutor:</p>
            <div className="flex flex-wrap gap-1.5">
              {[
                "Apa saja 8 tanda isim?",
                "Wazan Fi'il Madhi Tsulatsi",
                "5 Langkah Membaca Gundul",
                "Perbedaan Nahwu & Shorof",
              ].map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onQuickAskAi(prompt)}
                  className="px-2.5 sm:px-3 py-1 bg-white border border-[#DCEEFF] rounded-full text-[10px] sm:text-[11px] font-medium text-[#1677FF] hover:bg-[#EAF4FF] transition-all text-left truncate max-w-full"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Bedah Studio & Learning Modules Shortcuts */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 min-h-0">
        {/* Left: Quick Bedah Kalimah Widget */}
        <div className="lg:col-span-7 bg-white/80 backdrop-blur-2xl border border-white rounded-2xl sm:rounded-[32px] p-4 sm:p-6 shadow-xs flex flex-col justify-between gap-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 mb-2">
            <div>
              <h4 className="font-bold text-sm sm:text-base text-[#0B1F44]">Quick Bedah Kalimah</h4>
              <p className="text-[11px] sm:text-xs text-slate-500">Uji kaidah & bedah struktur kalimat Arab gundul</p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('bedah')}
              className="text-[11px] sm:text-xs text-blue-600 font-bold hover:underline self-end sm:self-auto"
            >
              Buka Studio ↗
            </button>
          </div>

          <div className="bg-[#F7FAFF] rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-[#DCEEFF] flex-1 flex flex-col justify-between gap-3">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-[9px] sm:text-[10px] text-slate-400 uppercase font-bold tracking-tight">
                  Teks Arab (Gundul / Berharakat)
                </p>
                <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px]">
                  <button
                    type="button"
                    onClick={() => setQuickInput('قَامَ مُحَمَّدٌ فِي الفَصْلِ')}
                    className="text-blue-600 font-medium hover:underline"
                  >
                    Contoh 1
                  </button>
                  <span className="text-slate-300">•</span>
                  <button
                    type="button"
                    onClick={() => setQuickInput('إِنَّ اللهَ مَعَ الصَّابِرِينَ')}
                    className="text-blue-600 font-medium hover:underline"
                  >
                    Contoh 2
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 mb-2">
                <input
                  type="text"
                  value={quickInput}
                  onChange={(e) => setQuickInput(e.target.value)}
                  placeholder="Masukkan kalimat Arab..."
                  className="flex-1 font-arabic text-lg sm:text-xl md:text-2xl text-right px-3 py-2 bg-white rounded-xl border border-sky-200 text-[#0B2A6F] focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold"
                  dir="rtl"
                />
                <button
                  type="button"
                  onClick={handleRunQuickBedah}
                  disabled={isAnalyzing}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs active:scale-95 disabled:opacity-50"
                >
                  <SearchCode className="w-3.5 h-3.5" />
                  <span>{isAnalyzing ? 'Membedah...' : 'Bedah'}</span>
                </button>
              </div>
            </div>

            {/* Quick Result Preview Cards */}
            <div className="border-t border-[#DCEEFF] pt-2.5">
              <p className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase mb-1.5">Hasil Analisis Kaidah Qaidaty:</p>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2">
                {quickResult && quickResult.tokens.length > 0 ? (
                  quickResult.tokens.map((tok, i) => (
                    <div key={i} className="bg-white/90 p-2 sm:p-2.5 rounded-xl border border-sky-100 shadow-2xs">
                      <div className="flex justify-between items-center">
                        <span className="font-arabic font-bold text-sm sm:text-base text-blue-700">{tok.word}</span>
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-800">
                          {tok.kalimahType}
                        </span>
                      </div>
                      <p className="text-[10px] sm:text-[11px] font-semibold text-slate-700 mt-0.5 truncate">{tok.subType}</p>
                      <p className="text-[9px] sm:text-[10px] text-slate-500 truncate">{tok.jabatan || tok.irobOrBina}</p>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="bg-white/90 p-2 sm:p-2.5 rounded-xl border border-sky-100 shadow-2xs">
                      <div className="flex justify-between items-center">
                        <span className="font-arabic font-bold text-sm sm:text-base text-blue-700">قَامَ</span>
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-800">Fi'il</span>
                      </div>
                      <p className="text-[10px] sm:text-[11px] font-semibold text-slate-700 mt-0.5">Fi'il Madhi</p>
                      <p className="text-[9px] sm:text-[10px] text-slate-500">Wazan: فَعَلَ</p>
                    </div>
                    <div className="bg-white/90 p-2 sm:p-2.5 rounded-xl border border-sky-100 shadow-2xs">
                      <div className="flex justify-between items-center">
                        <span className="font-arabic font-bold text-sm sm:text-base text-blue-700">مُحَمَّدٌ</span>
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-sky-50 text-sky-800">Isim</span>
                      </div>
                      <p className="text-[10px] sm:text-[11px] font-semibold text-slate-700 mt-0.5">Marfu' (Fa'il)</p>
                      <p className="text-[9px] sm:text-[10px] text-slate-500">Tanda: Tanwin</p>
                    </div>
                    <div className="bg-white/90 p-2 sm:p-2.5 rounded-xl border border-sky-100 shadow-2xs">
                      <div className="flex justify-between items-center">
                        <span className="font-arabic font-bold text-sm sm:text-base text-blue-700">فِي</span>
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-800">Harf</span>
                      </div>
                      <p className="text-[10px] sm:text-[11px] font-semibold text-slate-700 mt-0.5">Harf Jar</p>
                      <p className="text-[9px] sm:text-[10px] text-slate-500">Mabni Sukun</p>
                    </div>
                    <div className="bg-white/90 p-2 sm:p-2.5 rounded-xl border border-sky-100 shadow-2xs">
                      <div className="flex justify-between items-center">
                        <span className="font-arabic font-bold text-sm sm:text-base text-blue-700">الفَصْلِ</span>
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-purple-50 text-purple-800">Isim</span>
                      </div>
                      <p className="text-[10px] sm:text-[11px] font-semibold text-slate-700 mt-0.5">Majrur</p>
                      <p className="text-[9px] sm:text-[10px] text-slate-500">Tanda: Kasrah</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Modul Pembelajaran Pintasan */}
        <div className="lg:col-span-5 bg-white/80 backdrop-blur-2xl border border-white rounded-2xl sm:rounded-[32px] p-4 sm:p-6 shadow-xs flex flex-col justify-between gap-3 sm:gap-4">
          <div className="flex justify-between items-center">
            <h4 className="font-bold text-xs sm:text-sm text-[#0B1F44]">Modul Belajar Qaidaty</h4>
            <span className="text-[11px] font-semibold text-blue-600">23 Bab Lengkap</span>
          </div>

          <div className="space-y-2.5">
            {/* Shortcut 1: Materi Kurikulum */}
            <div
              onClick={() => onNavigate('materi')}
              className="p-3 rounded-xl sm:rounded-2xl bg-white border border-sky-100 hover:border-blue-300 hover:shadow-2xs transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-base group-hover:scale-105 transition-transform shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-[#0B1F44] group-hover:text-blue-600 transition-colors">
                    Kurikulum 23 Bab
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-slate-500">
                    Kaidah Isim, Fi'il, Harf, Tashrif, dan I'rob
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>

            {/* Shortcut 2: Kuis & Latihan */}
            <div
              onClick={() => onNavigate('quiz')}
              className="p-3 rounded-xl sm:rounded-2xl bg-white border border-sky-100 hover:border-blue-300 hover:shadow-2xs transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-base group-hover:scale-105 transition-transform shrink-0">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-[#0B1F44] group-hover:text-emerald-600 transition-colors">
                    Kuis & Evaluasi
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-slate-500">
                    Latihan pemahaman kaidah terstruktur
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>

            {/* Shortcut 3: Bookmark & Catatan */}
            <div
              onClick={() => onNavigate('bookmarks')}
              className="p-3 rounded-xl sm:rounded-2xl bg-white border border-sky-100 hover:border-blue-300 hover:shadow-2xs transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-base group-hover:scale-105 transition-transform shrink-0">
                  <Bookmark className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-[#0B1F44] group-hover:text-amber-600 transition-colors">
                    Bookmark & Catatan
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-slate-500">
                    Arsip rumus kaidah & catatan mandiri
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>
          </div>

          <div className="p-2.5 sm:p-3 bg-gradient-to-r from-blue-50 to-indigo-50/50 rounded-xl sm:rounded-2xl border border-sky-100 flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 shrink-0" />
            <div className="text-[11px] sm:text-xs min-w-0">
              <p className="font-bold text-[#0B2A6F] truncate">Metode Abi Yasin Muthohar</p>
              <p className="text-[10px] text-slate-500 truncate">Sistematis, ringkas, & mudah dipahami</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Steps Reminder Banner */}
      <section className="bg-gradient-to-r from-blue-900 to-[#0B2A6F] text-white p-4 sm:p-6 rounded-2xl sm:rounded-[28px] shadow-sm flex flex-col md:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div className="space-y-1 text-left">
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-blue-300">
            Kaidah Inti Qaidaty (Hal. 4)
          </span>
          <h4 className="text-sm sm:text-base md:text-lg font-bold">5 Langkah Membaca Arab Gundul</h4>
          <p className="text-[11px] sm:text-xs text-blue-200">
            1. Kenali Kalimah • 2. Cek Kata Sebelumnya • 3. Tentukan I'rob • 4. Tentukan Jabatan • 5. Pahami Makna
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('materi', 'bab-02')}
          className="px-4 sm:px-5 py-2 sm:py-2.5 bg-white text-[#0B2A6F] rounded-xl font-bold text-xs hover:bg-sky-50 transition-all shrink-0 w-full sm:w-auto text-center"
        >
          Pelajari Detail Kaidah →
        </button>
      </section>
    </div>
  );
};

