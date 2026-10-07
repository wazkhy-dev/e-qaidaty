import React, { useState } from 'react';
import {
  X,
  User,
  Volume2,
  GraduationCap,
  BookOpen,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { UserProfile, UserRole } from '../types';

interface SettingsAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
}

export const SettingsAuthModal: React.FC<SettingsAuthModalProps> = ({
  isOpen,
  onClose,
  user,
  onUpdateUser,
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState(user.name || '');
  const [role, setRole] = useState<UserRole>(user.role === 'guru' ? 'guru' : 'santri');
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleSave = () => {
    const trimmed = name.trim();
    if (!trimmed || trimmed.toLowerCase() === 'isi nama antum di sini') {
      setError('Silakan isi nama antum terlebih dahulu.');
      return;
    }

    setError(null);
    onUpdateUser({
      name: trimmed,
      role: role === 'guru' ? 'guru' : 'santri',
      profileCompleted: true,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div className="bg-white w-full max-w-md rounded-2xl sm:rounded-[32px] p-5 sm:p-8 shadow-2xl border border-sky-100 space-y-4 sm:space-y-6 relative my-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3.5 top-3.5 sm:right-5 sm:top-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="flex items-center gap-2.5 sm:gap-3 pr-8">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-base sm:text-lg shrink-0">
            ⚙️
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-[#0B1F44]">Edit Profil Pengguna</h3>
            <p className="text-[11px] sm:text-xs text-slate-500">Sesuaikan nama dan status akun antum</p>
          </div>
        </div>

        {/* Validation error */}
        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-rose-700 text-xs font-semibold">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        {/* Name Input */}
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
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-sky-200 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
        </div>

        {/* Role Selector (Status: Santri / Guru) */}
        <div className="space-y-1.5 sm:space-y-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
            <span>Status Pengguna</span>
          </label>
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
            {/* Santri Card */}
            <button
              type="button"
              onClick={() => {
                setRole('santri');
                if (error) setError(null);
              }}
              className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 text-left transition-all cursor-pointer ${
                role === 'santri'
                  ? 'bg-blue-50/90 border-blue-600 shadow-2xs ring-2 ring-blue-600/10'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="text-xl">📖</div>
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    role === 'santri'
                      ? 'border-blue-600 bg-blue-600'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  {role === 'santri' && (
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </div>
              </div>
              <p className="font-extrabold text-xs sm:text-sm text-[#0B1F44]">Santri</p>
              <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">Materi, kuis, gamifikasi & AI tutor</p>
            </button>

            {/* Guru Card */}
            <button
              type="button"
              onClick={() => {
                setRole('guru');
                if (error) setError(null);
              }}
              className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 text-left transition-all cursor-pointer ${
                role === 'guru'
                  ? 'bg-blue-50/90 border-blue-600 shadow-2xs ring-2 ring-blue-600/10'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="text-xl">👨‍🏫</div>
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    role === 'guru'
                      ? 'border-blue-600 bg-blue-600'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  {role === 'guru' && (
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </div>
              </div>
              <p className="font-extrabold text-xs sm:text-sm text-[#0B1F44]">Guru</p>
              <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">Kelola kelas, remedial, & RPP</p>
            </button>
          </div>
        </div>

        {/* Audio Toggle */}
        <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-sky-50/70 border border-sky-100 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 shrink-0" />
            <div>
              <p className="text-xs font-bold text-slate-800">Audio Pelafalan Arab</p>
              <p className="text-[10px] text-slate-500">Text-to-speech bahasa Arab</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setAudioEnabled(!audioEnabled)}
            className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors shrink-0 cursor-pointer ${
              audioEnabled ? 'bg-blue-600' : 'bg-slate-300'
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                audioEnabled ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-2 pt-1 sm:pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 sm:px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#123F9A] to-[#1677FF] text-white font-bold text-xs shadow-xs hover:shadow-md transition-all active:scale-95 cursor-pointer"
          >
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
};
