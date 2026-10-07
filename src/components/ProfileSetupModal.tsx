import React, { useState } from 'react';
import { ArrowRight, User, GraduationCap, BookOpen, AlertCircle } from 'lucide-react';
import { QaidatyLogo } from './QaidatyLogo';

interface ProfileSetupModalProps {
  isOpen: boolean;
  initialName?: string;
  initialRole?: 'santri' | 'guru' | null;
  onSave: (data: { name: string; role: 'santri' | 'guru' }) => void;
}

export const ProfileSetupModal: React.FC<ProfileSetupModalProps> = ({
  isOpen,
  initialName = '',
  initialRole = null,
  onSave,
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState(initialName);
  const [role, setRole] = useState<'santri' | 'guru' | null>(initialRole);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();

    if (!trimmedName || trimmedName.toLowerCase() === 'isi nama antum di sini') {
      setError('Silakan isi nama antum terlebih dahulu.');
      return;
    }

    if (!role) {
      setError('Silakan pilih Santri atau Guru.');
      return;
    }

    setError(null);
    onSave({
      name: trimmedName,
      role,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-4 bg-slate-900/70 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div className="bg-white w-full max-w-lg rounded-2xl sm:rounded-[32px] p-6 sm:p-8 shadow-2xl border border-sky-100 space-y-5 sm:space-y-6 relative my-auto">
        {/* Header with Icon */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center mb-1">
            <QaidatyLogo variant="icon" size="lg" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#0B2A6F] tracking-tight">
            Selamat Datang di Qaidaty!
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
            Lengkapi profil antum terlebih dahulu untuk mulai belajar bersama Qaidaty.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Validation Alert */}
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-rose-700 text-xs font-semibold animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {/* Name Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-blue-600" />
              <span>Nama</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError(null);
              }}
              placeholder="Isi nama antum di sini"
              autoFocus
              className="w-full px-4 py-3 bg-slate-50 border border-sky-200 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all shadow-2xs"
            />
          </div>

          {/* User Status / Role Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
              <span>Antum sebagai</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              {/* Option 1: Santri */}
              <button
                type="button"
                onClick={() => {
                  setRole('santri');
                  if (error) setError(null);
                }}
                className={`p-4 rounded-2xl border-2 text-left transition-all relative flex flex-col justify-between cursor-pointer ${
                  role === 'santri'
                    ? 'bg-blue-50/90 border-blue-600 shadow-sm ring-2 ring-blue-600/10'
                    : 'bg-white border-slate-200/90 text-slate-700 hover:border-blue-300 hover:bg-slate-50/60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center text-lg">
                    📖
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      role === 'santri'
                        ? 'border-blue-600 bg-blue-600'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {role === 'santri' && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                </div>
                <div>
                  <p className="font-extrabold text-sm sm:text-base text-[#0B1F44]">Santri</p>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">
                    Mempelajari 23 bab kaidah, bedah kalimah, kuis & AI Tutor.
                  </p>
                </div>
              </button>

              {/* Option 2: Guru */}
              <button
                type="button"
                onClick={() => {
                  setRole('guru');
                  if (error) setError(null);
                }}
                className={`p-4 rounded-2xl border-2 text-left transition-all relative flex flex-col justify-between cursor-pointer ${
                  role === 'guru'
                    ? 'bg-blue-50/90 border-blue-600 shadow-sm ring-2 ring-blue-600/10'
                    : 'bg-white border-slate-200/90 text-slate-700 hover:border-blue-300 hover:bg-slate-50/60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-lg">
                    👨‍🏫
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      role === 'guru'
                        ? 'border-blue-600 bg-blue-600'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {role === 'guru' && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                </div>
                <div>
                  <p className="font-extrabold text-sm sm:text-base text-[#0B1F44]">Guru</p>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">
                    Akses modul RPP pembelajaran 45 menit, materi & panduan mengajar.
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Action Button */}
          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#123F9A] to-[#1677FF] text-white font-extrabold text-sm sm:text-base shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer mt-3"
          >
            <span>Mulai Belajar</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
