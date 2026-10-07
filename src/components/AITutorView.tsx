import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Bot,
  User,
  Sparkles,
  BookOpen,
  HelpCircle,
  Volume2,
  RefreshCw,
  Copy,
  Check,
  ChevronRight,
  Filter,
  AlertCircle,
  RotateCcw
} from 'lucide-react';
import { ChatMessage } from '../types';
import { QAIDATY_LESSONS } from '../data/qaidatyKnowledge';
import { askAITutor, ChatHistoryItem } from '../services/api';
import { MarkdownMessage } from './MarkdownMessage';
import { AudioPlayerButton } from './AudioPlayerButton';

interface AITutorViewProps {
  initialPrompt?: string;
  initialLessonContextId?: string;
  onOpenLesson: (lessonId: string) => void;
  onOpenBedahWithText: (text: string) => void;
}

export const AITutorView: React.FC<AITutorViewProps> = ({
  initialPrompt = '',
  initialLessonContextId = '',
  onOpenLesson,
  onOpenBedahWithText,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-01',
      sender: 'ai',
      text: `Assalamu'alaikum Warahmatullahi Wabarakatuh! 🌟

Saya adalah **Qaidaty AI Tutor**, asisten pembelajaran interaktif untuk Kitab *Jilid 1 Qaidaty (Pembelajaran Praktis Baca Arab Gundul)* karya Abi Yasin Muthohar.

Silakan tanyakan kaidah Nahwu, wazan Shorof, bedah tarkib ayat/kalimat, atau senandung Bahar Rojaz!`,
      sourceCitation: 'Qaidaty Jilid 1 — Abi Yasin Muthohar',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputMessage, setInputMessage] = useState(initialPrompt);
  const [selectedLessonContext, setSelectedLessonContext] = useState<string>(initialLessonContextId);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const isSendingRef = useRef(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, errorMessage]);

  useEffect(() => {
    if (initialPrompt && initialPrompt.trim()) {
      handleSendMessage(initialPrompt);
    }
  }, []);

  const handleSendMessage = async (textToSend?: string) => {
    const messageToSend = typeof textToSend === 'string' ? textToSend : inputMessage;
    const trimmed = messageToSend.trim();
    if (!trimmed || isLoading || isSendingRef.current) return;

    isSendingRef.current = true;
    setErrorMessage(null);

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Build conversation history excluding welcome message
      const history: ChatHistoryItem[] = messages
        .filter((m) => m.id !== 'welcome-01')
        .map((m) => ({
          role: m.sender === 'ai' ? 'assistant' : 'user',
          content: m.text,
        }));

      const response = await askAITutor(trimmed, selectedLessonContext || undefined, history);

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: response.reply,
        sourceCitation: response.sourceReference,
        relatedLessonId: response.relatedLessonId,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      console.error('AI Tutor request failed:', err);
      const errMsg = err?.message || 'Gagal terhubung dengan layanan AI. Silakan coba lagi.';
      setErrorMessage(errMsg);
    } finally {
      setIsLoading(false);
      isSendingRef.current = false;
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const samplePrompts = [
    { title: '8 Tanda Isim', prompt: 'Jelaskan 8 tanda Isim dalam Kitab Qaidaty beserta bait Bahar Rojaz-nya!' },
    { title: 'Bedah QS Al-Ikhlas: 1', prompt: 'Tolong bedah ayat 1 surat Al-Ikhlas (قُلْ هُوَ اللَّهُ أَحَدٌ) kata per kata menurut kaidah Qaidaty!' },
    { title: 'Tashrif Fi\'il Sudasi', prompt: 'Bagaimana wazan dan rumus tashrif untuk Fi\'il Sudasi seperti اِسْتَغْفَرَ?' },
    { title: 'I\'rob Mutsanna', prompt: 'Apa tanda I\'rob Isim Mutsanna ketika Rofa\', Nashab, dan Jar?' },
    { title: 'Isim Fi\'il Amar', prompt: 'Jelaskan apa itu Isim Fi\'il Amar dalam Bab 23 Qaidaty beserta contohnya!' },
  ];

  return (
    <div className="flex-1 flex flex-col h-[calc(100dvh-4.5rem)] md:h-screen p-3 sm:p-5 md:p-8 overflow-hidden max-w-5xl mx-auto w-full min-w-0">
      {/* Top Bar with Context Selector */}
      <div className="glass-panel p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl border border-sky-100/90 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3 shrink-0 mb-3 sm:mb-4">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#123F9A] to-[#1677FF] flex items-center justify-center text-white text-base sm:text-lg shadow-xs shrink-0">
            🤖
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <h3 className="font-extrabold text-[#0B2A6F] text-xs sm:text-sm md:text-base truncate">Qaidaty AI Tutor</h3>
              <span className="text-[9px] sm:text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 shrink-0">
                Gemini & RAG
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-500 truncate">Kitab Jilid 1 Qaidaty Update 26</p>
          </div>
        </div>

        {/* Lesson Context Filter */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <select
            value={selectedLessonContext}
            onChange={(e) => setSelectedLessonContext(e.target.value)}
            className="text-[11px] sm:text-xs font-semibold text-slate-700 bg-white px-2.5 py-1.5 rounded-xl border border-sky-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
          >
            <option value="">Fokus: Semua 23 Bab Qaidaty</option>
            {QAIDATY_LESSONS.map((l) => (
              <option key={l.id} value={l.id}>
                Bab {l.babNumber.toString().padStart(2, '0')}: {l.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Chat Messages Log */}
      <div className="flex-1 overflow-y-auto space-y-3 sm:space-y-4 px-1 sm:px-2 py-2 pr-1.5 sm:pr-3 min-w-0 w-full">
        {messages.map((msg) => {
          const isAi = msg.sender === 'ai';

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2 sm:gap-3 w-full min-w-0 ${isAi ? 'justify-start' : 'justify-end'}`}
            >
              {isAi && (
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 shadow-xs">
                  Q
                </div>
              )}

              <div
                className={`max-w-[90%] sm:max-w-[82%] md:max-w-[78%] rounded-2xl sm:rounded-[24px] p-3.5 sm:p-4 md:p-5 text-xs sm:text-sm leading-relaxed relative min-w-0 break-words ${
                  isAi
                    ? 'bg-white/95 backdrop-blur border border-sky-100/90 text-slate-800 shadow-xs'
                    : 'bg-gradient-to-r from-[#123F9A] to-[#1677FF] text-white shadow-sm'
                }`}
                style={{ overflowWrap: 'anywhere' }}
              >
                {/* Render with React Markdown */}
                <MarkdownMessage content={msg.text} isAi={isAi} />

                {/* Source Reference & Action Button */}
                {isAi && msg.sourceCitation && (
                  <div className="mt-3 pt-2.5 border-t border-sky-100/80 flex flex-wrap items-center justify-between gap-1.5 text-[10px] sm:text-[11px]">
                    <span className="font-bold text-blue-700 truncate max-w-full">
                      📖 {msg.sourceCitation}
                    </span>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleCopy(msg.id, msg.text)}
                        className="p-1 rounded-lg text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
                        title="Salin Teks"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>

                      {msg.relatedLessonId && (
                        <button
                          type="button"
                          onClick={() => onOpenLesson(msg.relatedLessonId!)}
                          className="px-2 py-1 rounded-lg bg-blue-50 text-blue-700 font-bold hover:bg-blue-100 transition-colors flex items-center gap-0.5 text-[10px] cursor-pointer"
                        >
                          <span>Buka Bab</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                )}

                <span
                  className={`text-[9px] block mt-1.5 text-right ${
                    isAi ? 'text-slate-400' : 'text-blue-200'
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>

              {!isAi && (
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-blue-100 text-[#0B2A6F] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
              Q
            </div>
            <div className="bg-white p-3 sm:p-4 rounded-2xl border border-sky-100 text-xs text-slate-600 flex items-center gap-2 shadow-xs">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-600" />
              <span>Memproses jawaban dan menganalisis kaidah Qaidaty...</span>
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="p-3 sm:p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2.5 shadow-2xs">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="font-bold">Gagal memproses pertanyaan</p>
              <p className="text-[11px] text-rose-700 mt-0.5">{errorMessage}</p>
            </div>
            <button
              type="button"
              onClick={() => {
                const lastUserMsg = [...messages].reverse().find((m) => m.sender === 'user');
                if (lastUserMsg) {
                  handleSendMessage(lastUserMsg.text);
                }
              }}
              className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-bold rounded-lg shrink-0 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Coba Lagi</span>
            </button>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompt Chips */}
      <div className="pt-1.5 pb-2 shrink-0 w-full min-w-0">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {samplePrompts.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendMessage(p.prompt)}
              className="px-2.5 sm:px-3 py-1 bg-white/90 hover:bg-sky-50 border border-sky-200/80 rounded-full text-[10px] sm:text-[11px] font-semibold text-[#1677FF] whitespace-nowrap transition-all shadow-2xs shrink-0 cursor-pointer"
            >
              ⚡ {p.title}
            </button>
          ))}
        </div>
      </div>

      {/* Input Message Area */}
      <div className="glass-panel p-1.5 sm:p-2 rounded-2xl border border-sky-200/80 shadow-xs flex items-center gap-1.5 sm:gap-2 bg-white shrink-0 w-full min-w-0">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          placeholder="Tanyakan kaidah, wazan, atau bedah tarkib..."
          className="flex-1 min-w-0 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none font-medium bg-transparent"
        />

        <button
          type="button"
          onClick={() => handleSendMessage()}
          disabled={isLoading || !inputMessage.trim()}
          className="p-2.5 sm:p-3 rounded-xl bg-gradient-to-r from-[#123F9A] to-[#1677FF] text-white hover:shadow-md transition-all active:scale-95 disabled:opacity-50 shrink-0 cursor-pointer"
          aria-label="Kirim Pesan"
        >
          <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </div>
    </div>
  );
};

