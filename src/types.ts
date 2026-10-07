export type UserRole = 'santri' | 'guru';

export type ChapterStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';

export type ActiveTab =
  | 'landing'
  | 'dashboard'
  | 'materi'
  | 'materi-detail'
  | 'bedah'
  | 'ai-tutor'
  | 'quiz'
  | 'rangkuman-guru'
  | 'progress'
  | 'bookmarks';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  profileCompleted?: boolean;
  currentLessonId?: string;
  completedLessons?: string[];
  bookmarkedLessons?: string[];
  xp?: number;
  level?: number;
  streakDays?: number;
}

export interface PersonalNote {
  id: string;
  lessonId: string;
  title?: string;
  content: string;
  date?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface QuizAttempt {
  id: string;
  date: string;
  score: number;
  total: number;
  percentage: number;
}

export interface UserLearningState {
  currentLessonId?: string;
  completedLessons: string[];
  inProgressLessons: string[];
  bookmarkedLessons: string[];
  notes: PersonalNote[];
  quizAttempts: QuizAttempt[];
  quizScores: number[];
  chatHistory: Array<{
    id: string;
    sender: 'user' | 'ai';
    text: string;
    timestamp: string;
    sourceCitation?: string;
  }>;
  xp: number;
  level: number;
  streakDays: number;
  lastActivity?: string | null;
  lastActiveDate?: string;
}

export interface Lesson {
  id: string;
  jilid: number;
  babNumber: number;
  title: string;
  arabicTitle: string;
  category: 'Pengantar' | 'Kalimah' | 'Fiil & Shorof' | 'Isim' | 'Irob & Bina' | 'Harf & Amil';
  pageReference: string; // e.g. "Hal. 2-3"
  summary: string;
  objectives: string[];
  explanation: string;
  rules: string[];
  baharRojaz?: {
    title?: string;
    arabicPoem?: string;
    indonesianPoem?: string[];
    arabicMeter?: string;
    poem?: string[];
    meaning?: string;
  };
  wazanTable?: Array<{
    wazan: string;
    mauzun: string;
    arti: string;
    harfZaidah: string;
  }>;
  tables?: {
    title: string;
    headers: string[];
    rows: Array<{
      col1: string;
      col2?: string;
      col3?: string;
      col4?: string;
      col5?: string;
      note?: string;
    }>;
  }[];
  examples: Array<{
    arabic: string;
    latin?: string;
    translation?: string;
    makna?: string;
    wazan?: string;
    shighoh?: string;
    analysis?: string;
    tarkibNote?: string;
  }>;
  exercises?: string[];
  notes?: string[];
  estimatedMinutes: number;
}

export type QaidatyLesson = Lesson;

export interface StudentProgress {
  id: string;
  name: string;
  avatar: string;
  currentLessonId: string;
  completedLessonsCount: number;
  quizAverage: number;
  lastActive: string;
  remedialNeeded: string[];
}

export type ClassRoom = Classroom;

export interface BedahKalimahAnalysis {
  word: string;
  normalizedWord: string;
  kalimahType: 'Isim' | 'Fi\'il' | 'Harf' | 'Isim Fi\'il';
  subType?: string; // e.g. 'Fi\'il Madhi', 'Isim Fa\'il', 'Isim Mufrad', 'Harf Jar'
  wazan?: string;
  mauzun?: string;
  rootLetters?: string;
  harfZaidah?: string[];
  irobOrBina: 'Marfu\'' | 'Manshub' | 'Majrur' | 'Majzum' | 'Mabni Fathah' | 'Mabni Dhommah' | 'Mabni Kasrah' | 'Mabni Sukun';
  tandaIrob: string; // e.g. 'Dhommah zhahirah', 'Alif', 'Wawu', 'Sukun'
  jabatan: string; // e.g. 'Fa\'il (Pelaku)', 'Mubtada\'', 'Khabar', 'Maf\'ul Bih (Objek)', 'Majrur bi Harf Jar', 'Shilah'
  makna: string;
  confidence: 'Tinggi (Kaidah Pasti)' | 'Sedang' | 'Perlu Verifikasi';
  qaidatyReference: string;
  explanation: string;
}

export interface BedahSentenceResult {
  sentence: string;
  tokens: BedahKalimahAnalysis[];
  overallSummary: string;
  aiExplanation?: string;
  confidenceScore: number;
  timestamp: string;
}

export interface QuizQuestion {
  id: string;
  lessonId: string;
  type: 'multiple_choice' | 'true_false' | 'word_classification' | 'irob_selection' | 'wazan_matching' | 'fill_blank' | 'arrange_sentence';
  question: string;
  arabicPrompt?: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  qaidatyCitation: string;
}

export interface QuizResult {
  quizId: string;
  lessonId: string;
  score: number;
  totalQuestions: number;
  correctCount: number;
  weakTopics: string[];
  completedAt: string;
  answers: Record<string, { userAnswer: string | string[]; isCorrect: boolean }>;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  sourceReference?: string;
  sourceCitation?: string;
  relatedLessonId?: string;
  timestamp: string;
  isStreaming?: boolean;
}

export interface TeacherLessonPlan {
  lessonId: string;
  title: string;
  jilid: number;
  babNumber: number;
  estimatedDuration: string;
  tujuanPembelajaran: string[];
  poinPenting: string[];
  materiInti: string[];
  contohArab: { arabic: string; makna: string }[];
  pertanyaanPemantik: string[];
  aktivitasKelas: string[];
  latihan: string[];
  kesalahanUmum: string[];
  evaluasi: string[];
}

export interface Classroom {
  id: string;
  name: string;
  gradeOrLevel: string;
  code: string;
  teacherName: string;
  studentCount: number;
  students: Array<{
    id: string;
    name: string;
    progressPercent: number;
    lastActive: string;
    averageQuizScore: number;
    needsRemedial: boolean;
    weakTopic?: string;
  }>;
  assignedLessonIds: string[];
  createdAt: string;
}

export interface StudentProgressData {
  completedLessonIds: string[];
  currentLessonId: string;
  overallPercent: number;
  minutesSpent: number;
  quizzesTaken: number;
  averageScore: number;
  bedahKalimahCount: number;
  aiQuestionsCount: number;
  weakTopics: string[];
  strongTopics: string[];
  achievements: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
    unlockedAt?: string;
    progress: number;
    maxProgress: number;
  }>;
}

export interface BookmarkItem {
  id: string;
  type: 'lesson' | 'example' | 'bedah' | 'ai_answer';
  title: string;
  arabicContent?: string;
  description: string;
  linkId: string;
  createdAt: string;
}

export interface QaidatyChunk {
  id: string;
  lessonId: string;
  babNumber: number;
  title: string;
  arabicTitle: string;
  pageReference: string;
  content: string;
}
