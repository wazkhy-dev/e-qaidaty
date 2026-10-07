import React, { useState } from 'react';
import {
  SearchCode,
  Sparkles,
  Bot,
  Volume2,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  Copy,
  Check,
  RefreshCw,
  Info,
  Layers,
  ArrowRight
} from 'lucide-react';
import { BedahSentenceResult } from '../types';
import { submitBedahKalimah } from '../services/api';
import { AudioPlayerButton } from './AudioPlayerButton';
import { isPrimarilyArabic } from '../utils/arabicText';

interface BedahKalimahStudioProps {
  initialSentence?: string;
  onAskAiTutor: (prompt: string) => void;
}

const PRESET_SENTENCES = [
  { label: 'Jumlah Fi\'liyyah Tsulatsi', text: 'قَامَ مُحَمَّدٌ فِي الفَصْلِ' },
  { label: 'Inna & Saudaranya', text: 'إِنَّ اللهَ مَعَ الصَّابِرِينَ' },
  { label: 'Fi\'il Sudasi (Istaghfara)', text: 'اِسْتَغْفَرَ المُؤْمِنُ رَبَّهُ' },
  { label: 'Isim Isyarah & Maushul', text: 'هَذَا الَّذِي نَصَرَ المَظْلُومَ' },
  { label: 'Isim Fi\'il (Qaidaty Bab 23)', text: 'هَيْهَاتَ هَيْهَاتَ لِمَا تُوعَدُونَ' },
  { label: 'Amil Jazim & Fi\'il Mudhari\'', text: 'لَمْ يَكْتُبْ زَيْدٌ الدَّرْسَ' },
  { label: 'Isim Mutsanna', text: 'جَاءَ الرَّجُلَانِ الكَرِيمَانِ' },
];

export const BedahKalimahStudio: React.FC<BedahKalimahStudioProps> = ({
  initialSentence = 'قَامَ مُحَمَّدٌ فِي الفَصْلِ',
  onAskAiTutor,
}) => {
  const [inputText, setInputText] = useState(initialSentence);
  const [result, setResult] = useState<BedahSentenceResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Trigger initial analysis on mount
  React.useEffect(() => {
    handleAnalyze(initialSentence);
  }, []);

  const handleAnalyze = async (textToAnalyze = inputText) => {
    if (!textToAnalyze.trim()) return;
    setIsLoading(true);
    try {
      const data = await submitBedahKalimah(textToAnalyze);
      setResult(data);
    } catch (err) {
      console.error('Analysis error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const insertChar = (char: string) => {
    setInputText((prev) => prev + char);
  };

  const handleCopyAnalysis = () => {
    if (!result) return;
    const text = `BEDAH KALIMAH QAIDATY:\nKalimat: ${result.sentence}\n` +
      result.tokens.map((t, idx) => `[${idx+1}] ${t.word}: ${t.kalimahType} (${t.subType}) | I'rob: ${t.irobOrBina} (${t.tandaIrob}) | Jabatan: ${t.jabatan}`).join('\n') +
      `\nRingkasan: ${result.overallSummary}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 p-3.5 sm:p-5 md:p-8 overflow-y-auto space-y-4 sm:space-y-6 max-w-6xl mx-auto w-full min-w-0">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#123F9A] to-[#0B2A6F] text-white p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-[32px] shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-[10px] sm:text-xs font-bold mb-1.5 sm:mb-2">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-sky-300" />
            <span>Hybrid Engine: Qaidaty Rule Parser + AI</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black">Studio Bedah Kalimah</h2>
          <p className="text-xs sm:text-sm text-blue-100 mt-1 sm:mt-2 leading-relaxed">
            Analisis struktur kalimat bahasa Arab gundul secara mendalam dan otomatis berdasarkan 5 Langkah Qaidaty oleh Abi Yasin Muthohar.
          </p>
        </div>
        <div className="absolute right-2 sm:right-4 -bottom-4 sm:-bottom-6 text-[90px] sm:text-[140px] font-arabic opacity-10 text-white select-none pointer-events-none">
          إعراب
        </div>
      </div>

      {/* Input Box & Toolbar */}
      <div className="glass-panel p-4 sm:p-6 rounded-2xl sm:rounded-[28px] border border-sky-200/80 shadow-xs space-y-3 sm:space-y-4">
        {/* Preset Selector */}
        <div>
          <label className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5 sm:mb-2">
            Pilih Contoh Teks Kaidah Qaidaty:
          </label>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {PRESET_SENTENCES.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setInputText(preset.text);
                  handleAnalyze(preset.text);
                }}
                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-semibold transition-all border ${
                  inputText === preset.text
                    ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                    : 'bg-white border-sky-100 text-slate-600 hover:bg-sky-50'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input Text Area */}
        <div className="relative">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            dir="rtl"
            rows={2}
            placeholder="Ketik atau tempel teks bahasa Arab di sini..."
            className="w-full p-3 sm:p-4 font-arabic text-xl sm:text-2xl md:text-3xl font-bold text-right text-[#0B2A6F] bg-white rounded-xl sm:rounded-2xl border-2 border-sky-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-inner"
          />
        </div>

        {/* Arabic Diacritics Quick Keyboard Helper */}
        <div className="flex flex-col gap-2.5 pt-1">
          <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none w-full">
            <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase mr-1 shrink-0">Harakat:</span>
            {[
              { label: 'َ Fathah', char: '\u064E' },
              { label: 'ِ Kasrah', char: '\u0650' },
              { label: 'ُ Dhommah', char: '\u064F' },
              { label: 'ْ Sukun', char: '\u0652' },
              { label: 'ً Fathatain', char: '\u064B' },
              { label: 'ٍ Kasratain', char: '\u064D' },
              { label: 'ٌ Dhommatain', char: '\u064C' },
              { label: 'ّ Tasydid', char: '\u0651' },
            ].map((hk, i) => (
              <button
                key={i}
                type="button"
                onClick={() => insertChar(hk.char)}
                className="px-2 py-1 rounded-lg bg-sky-50 hover:bg-sky-100 border border-sky-200/70 text-[11px] sm:text-xs font-arabic font-bold text-[#0B2A6F] shrink-0 whitespace-nowrap"
              >
                {hk.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
            <AudioPlayerButton arabicText={inputText} size="md" showLabel className="bg-white justify-center" />

            <button
              type="button"
              onClick={() => handleAnalyze()}
              disabled={isLoading || !inputText.trim()}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#123F9A] to-[#1677FF] text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Membedah...</span>
                </>
              ) : (
                <>
                  <SearchCode className="w-4 h-4" />
                  <span>Bedah Kalimah Sekarang</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {result && (
        <div className="space-y-4 sm:space-y-6">
          {/* Summary & Accuracy Card */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl sm:rounded-[24px] border border-sky-100 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                  Struktur Kalimat
                </span>
                <span className="text-[11px] sm:text-xs text-slate-400 font-medium">
                  {result.tokens.length} Kalimah Terdeteksi
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-700 mt-1">
                {result.overallSummary}
              </p>
            </div>

            <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto border-t md:border-t-0 pt-2 md:pt-0 border-sky-50">
              <div className="text-left md:text-right">
                <p className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase">Tingkat Keyakinan</p>
                <p className="text-xs sm:text-sm font-black text-emerald-600">
                  {result.confidenceScore}% (Akurat Kitab)
                </p>
              </div>

              <button
                type="button"
                onClick={handleCopyAnalysis}
                className="p-2 sm:p-2.5 rounded-xl border border-sky-100 hover:bg-sky-50 text-slate-600 transition-all flex items-center gap-1.5 text-xs font-bold shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                <span>{copied ? 'Tersalin' : 'Salin'}</span>
              </button>
            </div>
          </div>

          {/* Token Cards Grid */}
          <div className="space-y-2.5 sm:space-y-3">
            <h3 className="text-xs sm:text-sm font-extrabold text-[#0B2A6F] uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4" />
              <span>Rincian Bedah per Kalimah (5 Langkah Qaidaty)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {result.tokens.map((tok, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl sm:rounded-[24px] p-4 sm:p-5 border border-sky-100 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2.5 sm:space-y-3">
                    {/* Token Header */}
                    <div className="flex justify-between items-start border-b border-sky-50 pb-2.5">
                      <div>
                        <span className="text-[9px] sm:text-[10px] font-bold text-slate-400">
                          Kalimah #{idx + 1}
                        </span>
                        <p className="font-arabic text-xl sm:text-2xl font-black text-[#0B2A6F] mt-0.5">
                          {tok.word}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span
                          className={`text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded-full ${
                            tok.kalimahType === 'Isim'
                              ? 'bg-sky-100 text-sky-800'
                              : tok.kalimahType === "Fi'il"
                              ? 'bg-blue-100 text-blue-800'
                              : tok.kalimahType === 'Isim Fi\'il'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {tok.kalimahType}
                        </span>
                        <AudioPlayerButton arabicText={tok.word} size="sm" />
                      </div>
                    </div>

                    {/* Specifications */}
                    <div className="space-y-1.5 sm:space-y-2 text-xs">
                      <div>
                        <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase block">
                          Klasifikasi / Shighoh:
                        </span>
                        <p className="font-bold text-slate-800 text-[11px] sm:text-xs">{tok.subType || '-'}</p>
                      </div>

                      {tok.wazan && (
                        <div className="p-1.5 sm:p-2 bg-sky-50/70 rounded-xl border border-sky-100">
                          <span className="text-[9px] sm:text-[10px] font-bold text-blue-700 uppercase block">
                            Wazan (Cetakan Baku):
                          </span>
                          <p className="font-arabic text-base sm:text-lg font-bold text-[#0B2A6F]">{tok.wazan}</p>
                        </div>
                      )}

                      {tok.harfZaidah && tok.harfZaidah.length > 0 && (
                        <div>
                          <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase block">
                            Huruf Zaidah:
                          </span>
                          <p className="text-slate-600 font-mono text-[10px] sm:text-[11px]">
                            {tok.harfZaidah.join(', ')}
                          </p>
                        </div>
                      )}

                      <div>
                        <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase block">
                          Status I'rob / Bina:
                        </span>
                        <p className="font-bold text-blue-900 text-[11px] sm:text-xs">{tok.irobOrBina || '-'}</p>
                        <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium">
                          Tanda: {tok.tandaIrob || '-'}
                        </p>
                      </div>

                      <div>
                        <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase block">
                          Kedudukan / Jabatan:
                        </span>
                        <p className="font-semibold text-slate-700 text-[11px] sm:text-xs">{tok.jabatan || '-'}</p>
                      </div>

                      <div>
                        <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase block">
                          Makna / Faedah:
                        </span>
                        <p className="text-slate-600 italic text-[11px] sm:text-xs">"{tok.makna || '-'}"</p>
                      </div>
                    </div>
                  </div>

                  {/* Reference Citation Badge */}
                  <div className="pt-2.5 mt-3 border-t border-sky-50 text-[10px] text-blue-700 font-semibold flex items-center justify-between">
                    <span>📖 {tok.qaidatyReference || 'Qaidaty Jilid 1'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI In-depth Syntactic Explanation */}
          {result.aiExplanation && (
            <div className="glass-panel p-4 sm:p-6 rounded-2xl sm:rounded-[28px] border-2 border-blue-200/80 bg-gradient-to-br from-blue-50/50 via-white to-sky-50/50 shadow-2xs space-y-2.5 sm:space-y-3">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs sm:text-sm text-[#0B2A6F]">
                      Ulasan Mendalam AI Tutor Qaidaty
                    </h4>
                    <p className="text-[10px] sm:text-[11px] text-slate-500">
                      Sintesis Kaidah Nahwu & Shorof terpadu
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    onAskAiTutor(`Tolong jelaskan lebih lanjut mengenai kalimat "${result.sentence}" dan detail I'rob tiap katanya berdasarkan kaidah Qaidaty`)
                  }
                  className="text-[11px] sm:text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Diskusikan di AI Tutor →</span>
                </button>
              </div>

              <div className="bg-white/90 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-sky-100 text-xs text-slate-700 leading-relaxed font-medium break-words space-y-1">
                {result.aiExplanation.split('\n').map((line, idx) =>
                  isPrimarilyArabic(line) ? (
                    <p key={idx} className="font-arabic text-right text-sm sm:text-base leading-loose text-[#0B1F44]" dir="rtl">
                      {line}
                    </p>
                  ) : (
                    <p key={idx} dir="auto">{line}</p>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
