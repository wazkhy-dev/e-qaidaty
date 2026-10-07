import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Printer,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Clock,
  HelpCircle,
  AlertTriangle,
  Send,
  RefreshCw,
  Copy,
  Check
} from 'lucide-react';
import { QAIDATY_LESSONS } from '../data/qaidatyKnowledge';
import { TEACHER_LESSON_PLANS } from '../data/teacherLessonPlans';
import { TeacherLessonPlan } from '../types';

interface TeacherRangkumanViewProps {
  initialLessonId?: string;
  onOpenLesson: (lessonId: string) => void;
}

export const TeacherRangkumanView: React.FC<TeacherRangkumanViewProps> = ({
  initialLessonId = 'bab-01',
  onOpenLesson,
}) => {
  const [selectedLessonId, setSelectedLessonId] = useState(initialLessonId);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [copied, setCopied] = useState(false);

  const predefinedPlan = TEACHER_LESSON_PLANS.find((p) => p.lessonId === selectedLessonId);
  const lesson = QAIDATY_LESSONS.find((l) => l.id === selectedLessonId) || QAIDATY_LESSONS[0];

  // Default generated plan if not predefined
  const currentPlan: TeacherLessonPlan = predefinedPlan || {
    lessonId: lesson.id,
    title: lesson.title,
    jilid: 1,
    babNumber: lesson.babNumber,
    estimatedDuration: '45 Menit',
    tujuanPembelajaran: [
      `Santri menguasai kaidah dan konsep inti dari Bab ${lesson.babNumber}: ${lesson.title}.`,
      `Santri mampu menerapkan kaidah pada teks Arab gundul tanpa harakat secara tepat.`,
    ],
    poinPenting: [
      `Rujukan Kitab Qaidaty Jilid 1 ${lesson.pageReference}.`,
      `Fokus pembelajaran pada pembentukan pemahaman struktural (Shorof) dan fungsional (Nahwu).`,
    ],
    materiInti: lesson.rules,
    contohArab: lesson.examples.map((e) => ({ arabic: e.arabic, makna: e.makna })),
    pertanyaanPemantik: [
      `Bagaimana cara cepat kita mengidentifikasi ${lesson.title} dalam kalimat Arab?`,
      `Mengapa pemahaman bab ini sangat krusial dalam 5 Langkah Qaidaty?`,
    ],
    aktivitasKelas: [
      '10 Menit: Apersepsi & Pengenalan Kaidah Bab.',
      '15 Menit: Demonstrasi Wazan / Contoh Teks di Papan Tulis.',
      '15 Menit: Praktik Bedah Kalimah Santri & Latihan Mandiri.',
      '5 Menit: Evaluasi & Refleksi Bersama.',
    ],
    latihan: lesson.exercises,
    kesalahanUmum: [
      'Santri sering tertukar antara harakat akhir kata dan huruf zaidah.',
      'Kurang teliti melihat kalimah sebelum kata yang dianalisis.',
    ],
    evaluasi: [
      'Tanya jawab lisan secara acak.',
      'Pengerjaan 3 soal kuis di aplikasi Qaidaty.',
    ],
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const text = `Rencana Pelaksanaan Pembelajaran (RPP) 45 Menit Qaidaty\n` +
      `Materi: Bab ${currentPlan.babNumber} - ${currentPlan.title}\n` +
      `Alokasi Waktu: ${currentPlan.estimatedDuration}\n\n` +
      `Tujuan Pembelajaran:\n${currentPlan.tujuanPembelajaran.map((t, i) => `${i + 1}. ${t}`).join('\n')}\n\n` +
      `Aktivitas Kelas:\n${currentPlan.aktivitasKelas.join('\n')}\n\n` +
      `Latihan Santri:\n${currentPlan.latihan.join('\n')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 p-3.5 sm:p-5 md:p-8 overflow-y-auto max-w-5xl mx-auto space-y-4 sm:space-y-6 w-full min-w-0">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#123F9A] to-[#0B2A6F] text-white p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-[32px] shadow-md relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative z-10 space-y-1">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-blue-200">
            Modul Pengajar Terstandar
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black">Rangkuman Guru & RPP 45 Menit</h2>
          <p className="text-xs text-blue-100 max-w-xl">
            Struktur modul pengajaran siap ajar disesuaikan dengan kurikulum Kitab Qaidaty Jilid 1.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleCopyText}
            className="flex-1 sm:flex-initial justify-center px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold text-xs transition-all flex items-center gap-1.5 border border-white/20"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Tersalin' : 'Salin RPP'}</span>
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="flex-1 sm:flex-initial justify-center px-3.5 py-2 bg-white text-[#0B2A6F] hover:bg-sky-50 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak</span>
          </button>
        </div>
      </div>

      {/* Lesson Selector Bar */}
      <div className="glass-panel p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-sky-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto min-w-0">
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-blue-600 shrink-0" />
            <span className="text-xs font-bold text-[#0B2A6F] whitespace-nowrap">Pilih Materi Bab:</span>
          </div>
          <select
            value={selectedLessonId}
            onChange={(e) => setSelectedLessonId(e.target.value)}
            className="w-full sm:w-auto text-xs font-bold text-slate-700 bg-white px-3 py-2 rounded-xl border border-sky-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {QAIDATY_LESSONS.map((l) => (
              <option key={l.id} value={l.id}>
                Bab {l.babNumber.toString().padStart(2, '0')}: {l.title} ({l.arabicTitle})
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={() => onOpenLesson(selectedLessonId)}
          className="text-xs font-bold text-blue-600 hover:underline self-end sm:self-center"
        >
          Buka Teks Siswa ↗
        </button>
      </div>

      {/* RPP Document Paper Card */}
      <div className="bg-white p-4 sm:p-6 md:p-10 rounded-2xl sm:rounded-[32px] border border-sky-100 shadow-2xs space-y-6 sm:space-y-8 print:border-none print:shadow-none">
        {/* Document Header */}
        <div className="border-b border-sky-100 pb-4 sm:pb-6 text-center space-y-1">
          <span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-widest text-blue-600">
            RENCANA PELAKSANAAN PEMBELAJARAN (RPP) METODE QAIDATY
          </span>
          <h3 className="text-lg sm:text-xl md:text-2xl font-black text-[#0B2A6F]">
            Bab {currentPlan.babNumber}: {currentPlan.title}
          </h3>
          <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
            Alokasi: <b>{currentPlan.estimatedDuration}</b> • Sumber: <b>Kitab Jilid 1 {lesson.pageReference}</b>
          </p>
        </div>

        {/* Section 1: Tujuan Pembelajaran */}
        <div className="space-y-2.5 sm:space-y-3">
          <h4 className="font-extrabold text-xs sm:text-sm text-[#0B2A6F] uppercase tracking-wider flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs shrink-0">1</span>
            <span>Tujuan Pembelajaran</span>
          </h4>
          <div className="space-y-1.5 sm:space-y-2 pl-2 sm:pl-7">
            {currentPlan.tujuanPembelajaran.map((tujuan, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                <span className="text-blue-600 font-bold">•</span>
                <p className="leading-relaxed font-medium">{tujuan}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Poin Kunci & Kaidah */}
        <div className="space-y-2.5 sm:space-y-3">
          <h4 className="font-extrabold text-xs sm:text-sm text-[#0B2A6F] uppercase tracking-wider flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs shrink-0">2</span>
            <span>Materi Inti & Poin Kaidah</span>
          </h4>
          <div className="space-y-2 pl-2 sm:pl-7">
            {currentPlan.materiInti.map((materi, idx) => (
              <div key={idx} className="p-2.5 sm:p-3 bg-sky-50/70 rounded-xl border border-sky-100 text-xs text-slate-700 leading-relaxed">
                <span className="font-bold text-blue-900">{idx + 1}. </span>
                {materi}
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Contoh Teks Arab Baku */}
        <div className="space-y-2.5 sm:space-y-3">
          <h4 className="font-extrabold text-xs sm:text-sm text-[#0B2A6F] uppercase tracking-wider flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs shrink-0">3</span>
            <span>Contoh Teks Arab untuk Papan Tulis</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pl-2 sm:pl-7">
            {currentPlan.contohArab.map((ex, idx) => (
              <div key={idx} className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-sky-200/80 shadow-2xs">
                <p className="font-arabic text-lg sm:text-xl font-bold text-right text-[#0B2A6F] mb-1">
                  {ex.arabic}
                </p>
                <p className="text-[10px] sm:text-[11px] text-slate-600 font-semibold">{ex.makna}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: 45-Minute Activity Breakdown */}
        <div className="space-y-2.5 sm:space-y-3">
          <h4 className="font-extrabold text-xs sm:text-sm text-[#0B2A6F] uppercase tracking-wider flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs shrink-0">4</span>
            <span>Rangkaian Aktivitas Kelas (45 Menit)</span>
          </h4>
          <div className="space-y-2 pl-2 sm:pl-7">
            {currentPlan.aktivitasKelas.map((act, idx) => (
              <div key={idx} className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-medium text-slate-700 leading-snug">
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 shrink-0" />
                <span>{act}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Pertanyaan Pemantik & Kesalahan Umum */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6 pl-2 sm:pl-7">
          <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1.5 sm:space-y-2">
            <div className="flex items-center gap-1.5 sm:gap-2 text-amber-800 font-bold text-xs uppercase">
              <HelpCircle className="w-4 h-4 shrink-0" />
              <span>Pertanyaan Pemantik:</span>
            </div>
            {currentPlan.pertanyaanPemantik.map((q, idx) => (
              <p key={idx} className="text-xs text-amber-950 leading-relaxed font-medium">
                • {q}
              </p>
            ))}
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-rose-50/70 border border-rose-200 space-y-1.5 sm:space-y-2">
            <div className="flex items-center gap-1.5 sm:gap-2 text-rose-800 font-bold text-xs uppercase">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Antisipasi Kesalahan Umum:</span>
            </div>
            {currentPlan.kesalahanUmum.map((err, idx) => (
              <p key={idx} className="text-xs text-rose-950 leading-relaxed font-medium">
                • {err}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
