import React, { useState } from 'react';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';

interface AudioPlayerButtonProps {
  arabicText: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const AudioPlayerButton: React.FC<AudioPlayerButtonProps> = ({
  arabicText,
  className = '',
  size = 'md',
  showLabel = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayAudio = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!('speechSynthesis' in window)) {
      alert('Browser Anda belum mendukung Web Speech Audio.');
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(arabicText);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.85; // Slightly slower for clear Arabic pronunciation

    // Try finding Arabic voice
    const voices = window.speechSynthesis.getVoices();
    const arabicVoice = voices.find(v => v.lang.startsWith('ar'));
    if (arabicVoice) {
      utterance.voice = arabicVoice;
    }

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  const sizeClasses = {
    sm: 'p-1 text-xs',
    md: 'p-1.5 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  return (
    <button
      type="button"
      onClick={handlePlayAudio}
      title="Dengarkan pengucapan bahasa Arab"
      className={`inline-flex items-center gap-1.5 rounded-full transition-all duration-200 ${
        isPlaying
          ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-105 ring-2 ring-blue-400/50'
          : 'bg-sky-50 text-[#123F9A] hover:bg-sky-100 border border-sky-200/80 active:scale-95'
      } ${sizeClasses[size]} ${className}`}
    >
      {isPlaying ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
      ) : (
        <Volume2 className="w-3.5 h-3.5" />
      )}
      {showLabel && (
        <span className="font-medium text-xs">
          {isPlaying ? 'Memutar...' : 'Dengarkan'}
        </span>
      )}
    </button>
  );
};
