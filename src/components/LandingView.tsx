import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Bot,
  BrainCircuit,
  HelpCircle,
  BarChart3,
  Award,
  Volume2,
  Lock,
  ChevronRight,
  BookOpen,
  Compass,
  CheckCircle2,
  Users
} from 'lucide-react';
import { QAIDATY_METADATA, QAIDATY_LESSONS } from '../data/qaidatyKnowledge';
import { AudioPlayerButton } from './AudioPlayerButton';
import { QaidatyLogo } from './QaidatyLogo';

interface LandingViewProps {
  onStartLearning: () => void;
  onExploreMateri?: () => void;
  onOpenBedah?: () => void;
  onDirectBedah?: () => void;
  onDirectAiTutor?: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({
  onStartLearning,
  onExploreMateri,
  onOpenBedah,
  onDirectBedah,
  onDirectAiTutor,
}) => {
  const [activeDemoTab, setActiveDemoTab] = useState<'bedah' | 'tutor' | 'rojaz'>('bedah');

  const handleBedahAction = () => {
    if (typeof onDirectBedah === 'function') {
      onDirectBedah();
    } else if (typeof onOpenBedah === 'function') {
      onOpenBedah();
    } else {
      onStartLearning();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F7FAFF] via-white to-[#EAF4FF] text-[#0B1F44]">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-sky-100/80 px-4 sm:px-6 py-3.5 sm:py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <QaidatyLogo
              variant="full"
              size="md"
              className="max-w-[55vw] sm:max-w-none"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onStartLearning}
              className="px-4 sm:px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#123F9A] to-[#1677FF] text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 transition-all active:scale-95 cursor-pointer"
            >
              Masuk Platform →
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 px-6">
        {/* Ambient subtle glow */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[320px] bg-gradient-to-r from-blue-300/20 to-sky-200/20 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold mb-6">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Resmi Berdasarkan Kitab Jilid 1 Qaidaty Update 26</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[#0B2A6F] leading-[1.15] mb-6">
            Belajar Membaca <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#123F9A] to-[#1677FF]">Arab Gundul</span> dengan Metode Qaidaty
          </h1>

          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Platform edukasi cerdas berbasis 5 Langkah Qaidaty oleh Abi Yasin Muthohar: menggabungkan Bedah Kalimah, RAG AI Tutor, Quiz adaptif, dan Rencana Pembelajaran Guru.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <button
              type="button"
              onClick={onStartLearning}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#123F9A] to-[#1677FF] text-white font-bold text-base shadow-xl shadow-blue-900/15 hover:shadow-2xl hover:shadow-blue-900/25 transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              Mulai Belajar Sekarang →
            </button>
            <button
              type="button"
              onClick={handleBedahAction}
              className="px-8 py-3.5 rounded-2xl bg-white/80 backdrop-blur border border-sky-200/80 text-[#0B2A6F] font-bold text-base hover:bg-sky-50 transition-all shadow-sm"
            >
              Uji Coba Bedah Kalimah 🔎
            </button>
          </div>

          {/* Core Learning Loop Pill */}
          <div className="glass-panel p-4 rounded-3xl max-w-4xl mx-auto shadow-sm border border-sky-100">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Siklus Pembelajaran Terpadu</p>
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-bold text-[#0B2A6F]">
              <span className="px-3 py-1.5 rounded-xl bg-blue-100/70 text-blue-900">1. BELAJAR</span>
              <span className="text-slate-400">→</span>
              <span className="px-3 py-1.5 rounded-xl bg-sky-100/70 text-sky-900">2. PAHAMI</span>
              <span className="text-slate-400">→</span>
              <span className="px-3 py-1.5 rounded-xl bg-indigo-100/70 text-indigo-900">3. BEDAH KALIMAH</span>
              <span className="text-slate-400">→</span>
              <span className="px-3 py-1.5 rounded-xl bg-blue-100/70 text-blue-900">4. TANYA AI</span>
              <span className="text-slate-400">→</span>
              <span className="px-3 py-1.5 rounded-xl bg-emerald-100/70 text-emerald-900">5. QUIZ</span>
              <span className="text-slate-400">→</span>
              <span className="px-3 py-1.5 rounded-xl bg-amber-100/70 text-amber-900">6. EVALUASI</span>
              <span className="text-slate-400">→</span>
              <span className="px-3 py-1.5 rounded-xl bg-purple-100/70 text-purple-900">7. REKOMENDASI</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Feature Demo Box */}
      <section className="py-12 px-6 max-w-6xl mx-auto" id="metodologi">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0B2A6F]">5 Langkah Pasti Membaca Teks Arab</h2>
          <p className="text-slate-500 text-sm mt-2">Didasarkan pada kaidah Qaidaty Jilid 1 Halaman 4</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12">
          {[
            { num: '01', title: 'Identifikasi Kalimah', desc: 'Isim, Fi\'il, atau Harf berdasarkan tanda & shighoh.' },
            { num: '02', title: 'Cek Kalimah Sebelum', desc: 'Mengetahui ada tidaknya amil jar, nashab, jazm.' },
            { num: '03', title: 'Perubahan Akhir (I\'rob)', desc: 'Menentukan Rofa\', Nashab, Jar, atau Sukun.' },
            { num: '04', title: 'Jabatan Kalimah', desc: 'Fa\'il, Mubtada\', Khabar, Maf\'ul Bih, Mudhaf Ilaih.' },
            { num: '05', title: 'Makna Kalimah', desc: 'Merujuk pada kamus & kaidah tashrif wazan.' },
          ].map((step, idx) => (
            <div key={idx} className="glass-panel p-5 rounded-2xl border border-sky-100 flex flex-col justify-between">
              <div>
                <span className="text-2xl font-black text-blue-600">{step.num}</span>
                <h3 className="font-bold text-sm text-[#0B2A6F] mt-2 mb-1.5">{step.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Live Interactive Preview Tabs */}
        <div className="glass-panel rounded-3xl p-6 md:p-8 border border-sky-200/70 shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-sky-100 pb-5 mb-6">
            <div>
              <h3 className="text-xl font-bold text-[#0B2A6F]">Coba Interaktivitas Qaidaty</h3>
              <p className="text-xs text-slate-500">Rasakan pengalaman teknologi pembelajaran modern</p>
            </div>
            <div className="flex items-center gap-2 p-1 bg-sky-100/60 rounded-xl">
              <button
                type="button"
                onClick={() => setActiveDemoTab('bedah')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeDemoTab === 'bedah' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600'
                }`}
              >
                🔎 Bedah Kalimah
              </button>
              <button
                type="button"
                onClick={() => setActiveDemoTab('tutor')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeDemoTab === 'tutor' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600'
                }`}
              >
                🤖 RAG AI Tutor
              </button>
              <button
                type="button"
                onClick={() => setActiveDemoTab('rojaz')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeDemoTab === 'rojaz' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600'
                }`}
              >
                🎵 Bahar Rojaz Qaidaty
              </button>
            </div>
          </div>

          {activeDemoTab === 'bedah' && (
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-blue-300 font-bold">Contoh Kalimat Analisis</span>
                  <p className="font-arabic text-3xl font-bold mt-1 text-right">قَامَ مُحَمَّدٌ فِي الفَصْلِ</p>
                </div>
                <AudioPlayerButton arabicText="قَامَ مُحَمَّدٌ فِي الفَصْلِ" showLabel size="lg" className="bg-white/20 text-white border-white/30" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="p-4 rounded-xl bg-white border border-sky-100 shadow-sm">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-arabic font-bold text-xl text-blue-700">قَامَ</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">Fi'il Madhi</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-700">Wazan: فَعَلَ</p>
                  <p className="text-[11px] text-slate-500">I'rob: Mabni Fathah</p>
                  <p className="text-[11px] text-slate-500">Jabatan: Fi'il (Predikat)</p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-sky-100 shadow-sm">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-arabic font-bold text-xl text-blue-700">مُحَمَّدٌ</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800">Isim Mu'rab</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-700">Tanda: Tanwin & Ma-</p>
                  <p className="text-[11px] text-slate-500">I'rob: Marfu' (Dhommah)</p>
                  <p className="text-[11px] text-slate-500">Jabatan: Fa'il (Pelaku)</p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-sky-100 shadow-sm">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-arabic font-bold text-xl text-blue-700">فِي</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">Harf Jar</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-700">Jenis: Harf Amilah</p>
                  <p className="text-[11px] text-slate-500">I'rob: Mabni Sukun</p>
                  <p className="text-[11px] text-slate-500">Amal: Menjarkan Isim</p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-sky-100 shadow-sm">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-arabic font-bold text-xl text-blue-700">الفَصْلِ</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800">Isim Majrur</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-700">Tanda: Alif Lam (Al-)</p>
                  <p className="text-[11px] text-slate-500">I'rob: Majrur (Kasrah)</p>
                  <p className="text-[11px] text-slate-500">Jabatan: Majrur bi Harf</p>
                </div>
              </div>
            </div>
          )}

          {activeDemoTab === 'tutor' && (
            <div className="space-y-3 bg-white p-5 rounded-2xl border border-sky-100">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">Q</div>
                <div className="flex-1 bg-sky-50/70 p-4 rounded-2xl border border-sky-100 text-xs leading-relaxed">
                  <p className="font-bold text-[#0B2A6F] mb-1">Qaidaty AI Tutor:</p>
                  <p>
                    "Wa'alaikumussalam! Menurut Kitab Qaidaty Jilid 1, tanda Isim terbagi menjadi 8 tanda pasti. Untuk mengingatnya dengan mudah, Abi Yasin Muthohar menyusun syair Bahar Rojaz. Huruf 'Ain fi'il pada wazan menentukan shighoh dan arti yang dituju."
                  </p>
                  <span className="inline-block mt-2 font-bold text-blue-700">📖 Rujukan: Qaidaty Jilid 1 Bab 05, Hal. 19</span>
                </div>
              </div>
            </div>
          )}

          {activeDemoTab === 'rojaz' && (
            <div className="bg-gradient-to-br from-sky-50 to-blue-50/50 p-6 rounded-2xl border border-sky-100 text-center">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">Senandung Bahar Rojaz (Tanda Isim)</span>
              <p className="font-arabic text-xl font-bold my-3 text-[#0B2A6F]">
                مُسْتَفْعِلُنْ مُسْتَفْعِلُنْ مُسْتَفْعِلُنْ # مُسْتَفْعِلُنْ مُسْتَفْعِلُنْ مُسْتَفْعِلُنْ
              </p>
              <div className="space-y-1 text-sm font-medium text-slate-700 max-w-lg mx-auto bg-white/80 p-4 rounded-xl border border-sky-100">
                <p>• Tanda Isim jumlahnya ada delapan</p>
                <p>• Ma-mi-mu al- tanwin dan nida di depan</p>
                <p>• Haraf nashab haraf jar serta idhofah</p>
                <p>• Tanda yang terakhir itu ta marbuthah</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Curriculum Overview */}
      <section className="py-16 px-6 bg-[#F3F8FF]/60 border-t border-sky-100" id="kurikulum">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-[#0B2A6F]">Struktur Kurikulum Qaidaty Jilid 1</h2>
            <p className="text-slate-500 text-sm mt-2">Tersusun sistematis dari 23 Bab materi praktis baca Arab gundul</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {QAIDATY_LESSONS.map((lesson) => (
              <div
                key={lesson.id}
                onClick={onStartLearning}
                className="glass-panel p-5 rounded-2xl border border-sky-100 hover:border-blue-300 transition-all cursor-pointer group shadow-sm hover:shadow-md"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-[#0B2A6F]">
                    Bab {lesson.babNumber.toString().padStart(2, '0')}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">{lesson.pageReference}</span>
                </div>
                <h3 className="font-bold text-[#0B1F44] text-base group-hover:text-blue-600 transition-colors">
                  {lesson.title}
                </h3>
                <p className="font-arabic text-sm text-slate-500 text-right my-1">{lesson.arabicTitle}</p>
                <p className="text-xs text-slate-600 line-clamp-2 mt-2">{lesson.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-sky-200/80 bg-white text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm">ق</div>
            <span className="font-black text-[#0B2A6F] text-lg">QAIDATY</span>
          </div>
          <p className="text-xs text-slate-500">
            Platform Pembelajaran Kitab Qaidaty Jilid 1 karya Abi Yasin Muthohar. Belajar • Memahami • Berlatih • Menguasai.
          </p>
          <div className="mt-6">
            <button
              type="button"
              onClick={onStartLearning}
              className="px-6 py-2.5 rounded-xl bg-[#0B2A6F] text-white text-xs font-bold hover:bg-blue-800 transition-all shadow-sm"
            >
              Masuk ke Aplikasi Edukasi →
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
