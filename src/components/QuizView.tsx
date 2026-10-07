import React, { useState } from 'react';
import {
  HelpCircle,
  Award,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Volume2,
  BookOpen,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { QAIDATY_QUIZZES } from '../data/qaidatyQuizzes';
import { QAIDATY_LESSONS } from '../data/qaidatyKnowledge';
import { AudioPlayerButton } from './AudioPlayerButton';
import { isPrimarilyArabic } from '../utils/arabicText';

interface QuizViewProps {
  onOpenLesson: (lessonId: string) => void;
  onAddXp: (amount: number) => void;
  onQuizComplete?: (result: { score: number; total: number; percentage: number }) => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ onOpenLesson, onAddXp, onQuizComplete }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const questions = QAIDATY_QUIZZES;
  const currentQ = questions[currentIdx];

  const handleSelectOption = (option: string) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(option);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);
    const isCorrect = selectedAnswer === currentQ.correctAnswer;

    if (isCorrect) {
      setScore((prev) => prev + 1);
      onAddXp(25);
    }

    setUserAnswers((prev) => ({
      ...prev,
      [currentIdx]: selectedAnswer,
    }));
  };

  const handleNextQuestion = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsQuizCompleted(true);
      const percentage = Math.round((score / questions.length) * 100);
      if (typeof onQuizComplete === 'function') {
        onQuizComplete({
          score,
          total: questions.length,
          percentage,
        });
      }
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setUserAnswers({});
    setIsQuizCompleted(false);
    setScore(0);
  };

  // Determine weak topics
  const getWeakTopics = () => {
    const wrongQuestions = questions.filter((q, idx) => userAnswers[idx] !== q.correctAnswer);
    return wrongQuestions.map((q) => {
      const lesson = QAIDATY_LESSONS.find((l) => l.id === q.lessonId);
      return {
        lessonId: q.lessonId,
        title: lesson ? `Bab ${lesson.babNumber}: ${lesson.title}` : 'Materi Terkait',
        question: q.question,
      };
    });
  };

  if (isQuizCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    const weakTopics = getWeakTopics();

    return (
      <div className="flex-1 p-3.5 sm:p-5 md:p-8 overflow-y-auto max-w-4xl mx-auto space-y-4 sm:space-y-6 w-full min-w-0">
        <div className="glass-panel p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-[32px] border border-sky-100/90 text-center space-y-4 sm:space-y-6 shadow-xs">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-2xl sm:rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-2xl sm:text-3xl shadow-md shadow-blue-600/20">
            {percentage >= 80 ? '🏆' : percentage >= 60 ? '✨' : '📚'}
          </div>

          <div>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-blue-600">
              Hasil Evaluasi Pemahaman Qaidaty
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#0B2A6F] mt-1">
              {percentage >= 80
                ? 'Mumtaz! Penguasaan Luar Biasa!'
                : percentage >= 60
                ? 'Jayyid Jiddan! Sangat Baik!'
                : 'Terus Semangat Muroja\'ah!'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5 sm:mt-2">
              Anda menjawab <b>{score}</b> benar dari <b>{questions.length}</b> soal ({percentage}%).
            </p>
          </div>

          {/* Score Badge Card */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-lg mx-auto">
            <div className="p-2.5 sm:p-4 bg-blue-50/70 rounded-xl sm:rounded-2xl border border-blue-100">
              <p className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase">Skor</p>
              <p className="text-lg sm:text-2xl font-black text-blue-700">{percentage}%</p>
            </div>
            <div className="p-2.5 sm:p-4 bg-emerald-50/70 rounded-xl sm:rounded-2xl border border-emerald-100">
              <p className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase">Benar</p>
              <p className="text-lg sm:text-2xl font-black text-emerald-600">{score}</p>
            </div>
            <div className="p-2.5 sm:p-4 bg-amber-50/70 rounded-xl sm:rounded-2xl border border-amber-100">
              <p className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase">XP</p>
              <p className="text-lg sm:text-2xl font-black text-amber-500">+{score * 25}</p>
            </div>
          </div>

          {/* Diagnostic Weak Topics & Remedial Recommendations */}
          {weakTopics.length > 0 && (
            <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-rose-50/70 border border-rose-100 text-left space-y-2.5 sm:space-y-3">
              <div className="flex items-center gap-1.5 text-rose-800 font-bold text-[11px] sm:text-xs uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                <span>Rekomendasi Muroja'ah:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {weakTopics.map((topic, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onOpenLesson(topic.lessonId)}
                    className="p-2.5 sm:p-3 bg-white rounded-xl border border-rose-200 text-left hover:border-blue-400 transition-all flex items-center justify-between group"
                  >
                    <div>
                      <p className="text-xs font-bold text-[#0B2A6F] group-hover:text-blue-600 line-clamp-1">
                        {topic.title}
                      </p>
                      <p className="text-[10px] text-slate-500">Pelajari ulang kaidah ini →</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-center gap-3 pt-2 sm:pt-4">
            <button
              type="button"
              onClick={handleRestartQuiz}
              className="px-5 py-2.5 rounded-xl bg-white border border-sky-200 text-[#0B2A6F] font-bold text-xs hover:bg-sky-50 transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Ulangi Kuis</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-3.5 sm:p-5 md:p-8 overflow-y-auto max-w-4xl mx-auto space-y-4 sm:space-y-6 w-full min-w-0">
      {/* Header & Progress Bar */}
      <div className="glass-panel p-4 sm:p-6 rounded-2xl sm:rounded-[28px] border border-sky-100 shadow-2xs space-y-3 sm:space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
              ?
            </span>
            <div>
              <h3 className="font-extrabold text-[#0B2A6F] text-xs sm:text-base">
                Kuis Evaluasi Qaidaty
              </h3>
              <p className="text-[10px] sm:text-[11px] text-slate-500">
                Soal #{currentIdx + 1} dari {questions.length}
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[11px] sm:text-xs font-bold text-blue-600">Skor: {score}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-sky-100 h-2 rounded-full overflow-hidden">
          <div
            className="bg-blue-600 h-full transition-all duration-300 rounded-full"
            style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Active Question Box */}
      <div className="glass-panel p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-[32px] border border-sky-200/80 shadow-2xs space-y-4 sm:space-y-6">
        <div>
          <span className="text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 uppercase tracking-wider">
            {currentQ.type.replace('_', ' ')}
          </span>
          <h2 className="text-base sm:text-lg md:text-xl font-bold text-[#0B1F44] mt-1.5 sm:mt-2 leading-relaxed">
            {currentQ.question}
          </h2>
        </div>

        {/* Arabic Prompt Box with Audio */}
        {currentQ.arabicPrompt && (
          <div className="bg-gradient-to-r from-blue-900 to-[#0B2A6F] text-white p-4 sm:p-6 rounded-xl sm:rounded-2xl flex items-center justify-between shadow-inner gap-3">
            <p className="font-arabic text-2xl sm:text-3xl md:text-4xl font-bold text-sky-100 text-right flex-1 break-words">
              {currentQ.arabicPrompt}
            </p>
            <AudioPlayerButton
              arabicText={currentQ.arabicPrompt}
              size="sm"
              className="bg-white/20 text-white border-white/30 shrink-0"
            />
          </div>
        )}

        {/* Options */}
        <div className="space-y-2.5 sm:space-y-3">
          {currentQ.options.map((option, idx) => {
            let stateStyle = 'bg-white border-sky-100 hover:border-blue-300 text-slate-800';

            if (isAnswerSubmitted) {
              if (option === currentQ.correctAnswer) {
                stateStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold';
              } else if (selectedAnswer === option) {
                stateStyle = 'bg-rose-50 border-rose-300 text-rose-900 line-through';
              }
            } else if (selectedAnswer === option) {
              stateStyle = 'bg-blue-50 border-blue-600 text-[#0B2A6F] font-bold shadow-2xs';
            }

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectOption(option)}
                className={`w-full p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between group gap-2 ${stateStyle}`}
              >
                <span className={`leading-snug ${isPrimarilyArabic(option) ? 'font-arabic text-base sm:text-lg' : ''}`}>
                  {option}
                </span>
                {isAnswerSubmitted && option === currentQ.correctAnswer && (
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0" />
                )}
                {isAnswerSubmitted && selectedAnswer === option && option !== currentQ.correctAnswer && (
                  <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Answer Explanation Box */}
        {isAnswerSubmitted && (
          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-sky-50/80 border border-sky-200 text-xs space-y-1.5 sm:space-y-2">
            <p className="font-bold text-[#0B2A6F]">💡 Penjelasan Kaidah Qaidaty:</p>
            <p className="text-slate-700 leading-relaxed text-[11px] sm:text-xs">{currentQ.explanation}</p>
            <p className="font-bold text-blue-700 text-[10px] sm:text-[11px]">📖 {currentQ.qaidatyCitation}</p>
          </div>
        )}

        {/* Action Button */}
        <div className="flex justify-end pt-1 sm:pt-2">
          {!isAnswerSubmitted ? (
            <button
              type="button"
              onClick={handleSubmitAnswer}
              disabled={!selectedAnswer}
              className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-[#123F9A] to-[#1677FF] text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all active:scale-95 disabled:opacity-50"
            >
              Kirim Jawaban
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNextQuestion}
              className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl bg-[#0B2A6F] hover:bg-blue-900 text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <span>{currentIdx < questions.length - 1 ? 'Soal Berikutnya' : 'Lihat Hasil Evaluasi'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
