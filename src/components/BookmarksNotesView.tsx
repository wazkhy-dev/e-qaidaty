import React, { useState } from 'react';
import {
  Bookmark,
  FileText,
  Trash2,
  Plus,
  BookOpen,
  ArrowRight,
  Sparkles,
  Calendar
} from 'lucide-react';
import { QAIDATY_LESSONS } from '../data/qaidatyKnowledge';
import { PersonalNote } from '../types';

interface BookmarksNotesViewProps {
  bookmarkedLessonIds: string[];
  notes?: PersonalNote[];
  onOpenLesson: (lessonId: string) => void;
  onRemoveBookmark: (lessonId: string) => void;
  onAddNote?: (lessonId: string, content: string) => void;
  onDeleteNote?: (id: string) => void;
}

export const BookmarksNotesView: React.FC<BookmarksNotesViewProps> = ({
  bookmarkedLessonIds = [],
  notes = [],
  onOpenLesson,
  onRemoveBookmark,
  onAddNote,
  onDeleteNote,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'bookmarks' | 'notes'>('bookmarks');
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newNoteLessonId, setNewNoteLessonId] = useState('bab-01');
  const [isAddingNote, setIsAddingNote] = useState(false);

  const bookmarkedLessons = QAIDATY_LESSONS.filter((l) =>
    bookmarkedLessonIds.includes(l.id)
  );

  const handleAddNote = () => {
    if (!newNoteContent.trim()) return;
    const combinedContent = newNoteTitle.trim()
      ? `**${newNoteTitle.trim()}**\n${newNoteContent.trim()}`
      : newNoteContent.trim();

    if (typeof onAddNote === 'function') {
      onAddNote(newNoteLessonId, combinedContent);
    }
    setNewNoteTitle('');
    setNewNoteContent('');
    setIsAddingNote(false);
  };

  const handleDeleteNote = (id: string) => {
    if (typeof onDeleteNote === 'function') {
      onDeleteNote(id);
    }
  };

  return (
    <div className="flex-1 p-3.5 sm:p-5 md:p-8 overflow-y-auto max-w-5xl mx-auto space-y-4 sm:space-y-6 w-full min-w-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-[#0B1F44]">
            Bookmark & Catatan Pribadi
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Simpan bab penting dan tulis catatan rumus kaidah antum secara rapi.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100/80 rounded-2xl border border-sky-100 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveSubTab('bookmarks')}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeSubTab === 'bookmarks'
                ? 'bg-white text-blue-700 shadow-2xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Bookmark ({bookmarkedLessons.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('notes')}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeSubTab === 'notes'
                ? 'bg-white text-blue-700 shadow-2xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Catatan ({notes.length})</span>
          </button>
        </div>
      </div>

      {/* Bookmarks Tab Content */}
      {activeSubTab === 'bookmarks' && (
        <div className="space-y-4">
          {bookmarkedLessons.length === 0 ? (
            <div className="glass-panel p-8 sm:p-12 rounded-2xl sm:rounded-[32px] border border-sky-100 text-center space-y-3">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center text-2xl">
                📌
              </div>
              <h3 className="font-extrabold text-sm sm:text-base text-[#0B1F44]">
                Belum Ada Bab yang Dibookmark
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                Antum belum mem-bookmark bab apapun. Klik ikon bookmark pada daftar Materi Qaidaty untuk menyimpan bab yang ingin sering dipelajari kembali.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
              {bookmarkedLessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="bg-white p-4 sm:p-5 rounded-2xl sm:rounded-[24px] border border-sky-100 shadow-2xs hover:shadow-md transition-all space-y-3 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900">
                        Bab {lesson.babNumber.toString().padStart(2, '0')}
                      </span>
                      <button
                        type="button"
                        onClick={() => onRemoveBookmark(lesson.id)}
                        className="text-amber-500 hover:text-rose-500 p-1 transition-colors"
                        title="Hapus dari Bookmark"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h3 className="font-extrabold text-sm sm:text-base text-[#0B1F44]">
                      {lesson.title}
                    </h3>
                    <p className="font-arabic text-sm font-bold text-[#123F9A] mt-1">
                      {lesson.arabicTitle}
                    </p>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
                      {lesson.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-sky-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium text-[11px]">
                      {lesson.pageReference}
                    </span>
                    <button
                      type="button"
                      onClick={() => onOpenLesson(lesson.id)}
                      className="font-bold text-blue-600 group-hover:translate-x-1 transition-transform flex items-center gap-1 text-xs"
                    >
                      Buka Pelajaran <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Notes Tab Content */}
      {activeSubTab === 'notes' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-xs text-slate-500 font-medium">
              Total {notes.length} catatan tersimpan
            </p>
            <button
              type="button"
              onClick={() => setIsAddingNote(!isAddingNote)}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-xs hover:bg-blue-700 transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isAddingNote ? 'Tutup Form' : 'Tambah Catatan Baru'}</span>
            </button>
          </div>

          {/* Add Note Card Form */}
          {isAddingNote && (
            <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-[28px] border-2 border-blue-200 shadow-md space-y-3.5 animate-scale-up">
              <h3 className="font-extrabold text-sm sm:text-base text-[#0B1F44] flex items-center gap-2">
                <span>📝</span> Tulis Catatan Kaidah Baru
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                  placeholder="Judul Catatan (contoh: Kaidah Tashrif Bab 7)..."
                  className="p-2.5 sm:p-3 bg-slate-50 rounded-xl border border-sky-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <select
                  value={newNoteLessonId}
                  onChange={(e) => setNewNoteLessonId(e.target.value)}
                  className="p-2.5 sm:p-3 bg-slate-50 rounded-xl border border-sky-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {QAIDATY_LESSONS.map((l) => (
                    <option key={l.id} value={l.id}>
                      Bab {l.babNumber}: {l.title}
                    </option>
                  ))}
                </select>
              </div>

              <textarea
                value={newNoteContent}
                onChange={(e) => setNewNoteContent(e.target.value)}
                rows={3}
                placeholder="Tuliskan rumus, catatan muroja'ah, atau ringkasan..."
                className="w-full p-2.5 sm:p-3 bg-slate-50 rounded-xl border border-sky-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddingNote(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleAddNote}
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-xs hover:bg-blue-700"
                >
                  Simpan Catatan
                </button>
              </div>
            </div>
          )}

          {/* Notes Grid */}
          {notes.length === 0 && !isAddingNote ? (
            <div className="glass-panel p-8 sm:p-12 rounded-2xl sm:rounded-[32px] border border-sky-100 text-center space-y-3">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-sky-50 text-blue-500 flex items-center justify-center text-2xl">
                📝
              </div>
              <h3 className="font-extrabold text-sm sm:text-base text-[#0B1F44]">
                Belum Ada Catatan Pribadi
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                Antum belum membuat catatan rumus atau kaidah. Klik tombol "Tambah Catatan Baru" di atas untuk menyimpan ringkasan belajar antum.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {notes.map((note) => {
                const relLesson = QAIDATY_LESSONS.find((l) => l.id === note.lessonId);

                return (
                  <div
                    key={note.id}
                    className="bg-white p-4 sm:p-5 rounded-2xl sm:rounded-[24px] border border-sky-100 shadow-2xs space-y-3 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                          {relLesson ? `Bab ${relLesson.babNumber}` : 'Kaidah'}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDeleteNote(note.id)}
                          className="text-slate-300 hover:text-rose-500 transition-colors p-1"
                          title="Hapus Catatan"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4 className="font-bold text-xs sm:text-sm text-[#0B1F44]">{note.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed mt-1.5 sm:mt-2 whitespace-pre-line">
                        {note.content}
                      </p>
                    </div>

                    <div className="pt-2.5 sm:pt-3 mt-2.5 sm:mt-3 border-t border-sky-50 flex items-center justify-between text-[10px] text-slate-400 font-medium">
                      <span>{note.date}</span>
                      {relLesson && (
                        <button
                          type="button"
                          onClick={() => onOpenLesson(relLesson.id)}
                          className="text-blue-600 font-bold hover:underline"
                        >
                          Buka {relLesson.title} →
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
