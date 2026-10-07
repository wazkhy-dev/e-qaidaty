import React, { useState, useEffect } from 'react';
import { UserProfile, UserLearningState, ActiveTab } from './types';
import { Sidebar } from './components/Sidebar';
import { MobileNav } from './components/MobileNav';
import { LandingView } from './components/LandingView';
import { DashboardView } from './components/DashboardView';
import { MateriListView } from './components/MateriListView';
import { LessonDetailView } from './components/LessonDetailView';
import { BedahKalimahStudio } from './components/BedahKalimahStudio';
import { AITutorView } from './components/AITutorView';
import { QuizView } from './components/QuizView';
import { TeacherRangkumanView } from './components/TeacherRangkumanView';
import { ProgressAnalyticsView } from './components/ProgressAnalyticsView';
import { BookmarksNotesView } from './components/BookmarksNotesView';
import { SettingsAuthModal } from './components/SettingsAuthModal';
import { ProfileSetupModal } from './components/ProfileSetupModal';
import {
  runLegacyDataMigration,
  loadUserProfile,
  saveUserProfile,
  loadLearningState,
  saveLearningState,
  calculateProgress,
} from './services/userStore';

export function App() {
  // 1. One-time migration to clear legacy dummy data
  useEffect(() => {
    runLegacyDataMigration();
  }, []);

  // 2. Load persistent user profile & learning state
  const [user, setUser] = useState<UserProfile>(() => loadUserProfile());
  const [learningState, setLearningState] = useState<UserLearningState>(() =>
    loadLearningState(user.id)
  );

  const [activeTab, setActiveTab] = useState<ActiveTab>('landing');
  const [selectedLessonId, setSelectedLessonId] = useState<string>('bab-01');
  const [bedahSentence, setBedahSentence] = useState<string>('قَامَ مُحَمَّدٌ فِي الفَصْلِ');
  const [aiPrompt, setAiPrompt] = useState<string>('');
  const [aiLessonContextId, setAiLessonContextId] = useState<string>('');
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isProfileSetupOpen, setIsProfileSetupOpen] = useState<boolean>(false);
  const [pendingTargetTab, setPendingTargetTab] = useState<ActiveTab>('dashboard');
  const [teacherSelectedLessonId, setTeacherSelectedLessonId] = useState<string>('bab-01');

  // Sync state whenever user.id changes
  useEffect(() => {
    saveUserProfile(user);
  }, [user]);

  useEffect(() => {
    saveLearningState(user.id, learningState);
  }, [user.id, learningState]);

  // Keep user profile completedLessons / bookmarks / xp / level / streak in sync with learningState
  useEffect(() => {
    setUser((prev) => {
      const prevCompleted = prev?.completedLessons || [];
      const prevBookmarks = prev?.bookmarkedLessons || [];
      const nextCompleted = learningState?.completedLessons || [];
      const nextBookmarks = learningState?.bookmarkedLessons || [];

      if (
        prevCompleted.length !== nextCompleted.length ||
        prevBookmarks.length !== nextBookmarks.length ||
        (prev?.xp ?? 0) !== (learningState?.xp ?? 0) ||
        (prev?.level ?? 1) !== (learningState?.level ?? 1) ||
        (prev?.streakDays ?? 0) !== (learningState?.streakDays ?? 0) ||
        prev?.currentLessonId !== learningState?.currentLessonId
      ) {
        return {
          ...prev,
          completedLessons: nextCompleted,
          bookmarkedLessons: nextBookmarks,
          xp: learningState?.xp ?? 0,
          level: learningState?.level ?? 1,
          streakDays: learningState?.streakDays ?? 0,
          currentLessonId: learningState?.currentLessonId || 'bab-01',
        };
      }
      return prev;
    });
  }, [learningState]);

  const handleUpdateUser = (updated: Partial<UserProfile>) => {
    setUser((prev) => {
      const next = { ...prev, ...updated };
      saveUserProfile(next);
      return next;
    });
  };

  const handleStartFromLanding = (target: ActiveTab = 'dashboard') => {
    if (!user.profileCompleted || !user.name.trim()) {
      setPendingTargetTab(target);
      setIsProfileSetupOpen(true);
    } else {
      setActiveTab(target);
    }
  };

  const handleSaveProfileSetup = (data: { name: string; role: 'santri' | 'guru' }) => {
    const updated: Partial<UserProfile> = {
      name: data.name.trim(),
      role: data.role,
      profileCompleted: true,
    };
    handleUpdateUser(updated);
    setIsProfileSetupOpen(false);
    setActiveTab(pendingTargetTab);
  };

  const handleOpenLesson = (lessonId: string) => {
    setSelectedLessonId(lessonId);
    setLearningState((prev) => {
      const inProgress = prev.inProgressLessons || [];
      const updatedInProgress = inProgress.includes(lessonId)
        ? inProgress
        : [...inProgress, lessonId];

      const next = {
        ...prev,
        currentLessonId: lessonId,
        inProgressLessons: updatedInProgress,
        lastActiveDate: new Date().toISOString().split('T')[0],
      };
      saveLearningState(user.id, next);
      return next;
    });
    setActiveTab('materi-detail');
  };

  const handleToggleComplete = (lessonId: string) => {
    setLearningState((prev) => {
      const isAlready = prev.completedLessons.includes(lessonId);
      const newCompleted = isAlready
        ? prev.completedLessons.filter((id) => id !== lessonId)
        : [...prev.completedLessons, lessonId];

      const newInProgress = prev.inProgressLessons.filter((id) => id !== lessonId);
      const xpDelta = isAlready ? -50 : 50;
      const newXp = Math.max(0, prev.xp + xpDelta);
      const newLevel = Math.floor(newXp / 500) + 1;

      const next: UserLearningState = {
        ...prev,
        completedLessons: newCompleted,
        inProgressLessons: newInProgress,
        xp: newXp,
        level: newLevel,
        lastActiveDate: new Date().toISOString().split('T')[0],
      };
      saveLearningState(user.id, next);
      return next;
    });
  };

  const handleToggleBookmark = (lessonId: string) => {
    setLearningState((prev) => {
      const isBookmarked = prev.bookmarkedLessons.includes(lessonId);
      const newBookmarks = isBookmarked
        ? prev.bookmarkedLessons.filter((id) => id !== lessonId)
        : [...prev.bookmarkedLessons, lessonId];

      const next: UserLearningState = {
        ...prev,
        bookmarkedLessons: newBookmarks,
      };
      saveLearningState(user.id, next);
      return next;
    });
  };

  const handleAddNote = (lessonId: string, content: string) => {
    if (!content.trim()) return;
    setLearningState((prev) => {
      const newNote = {
        id: `note-${Date.now()}`,
        lessonId,
        content: content.trim(),
        createdAt: new Date().toISOString(),
      };
      const next: UserLearningState = {
        ...prev,
        notes: [newNote, ...(prev.notes || [])],
      };
      saveLearningState(user.id, next);
      return next;
    });
  };

  const handleDeleteNote = (noteId: string) => {
    setLearningState((prev) => {
      const next: UserLearningState = {
        ...prev,
        notes: (prev.notes || []).filter((n) => n.id !== noteId),
      };
      saveLearningState(user.id, next);
      return next;
    });
  };

  const handleAddXp = (amount: number) => {
    setLearningState((prev) => {
      const newXp = prev.xp + amount;
      const newLevel = Math.floor(newXp / 500) + 1;
      const next: UserLearningState = {
        ...prev,
        xp: newXp,
        level: newLevel,
      };
      saveLearningState(user.id, next);
      return next;
    });
  };

  const handleQuizComplete = (result: { score: number; total: number; percentage: number }) => {
    setLearningState((prev) => {
      const currentScores = prev.quizScores || [];
      const updatedScores = [...currentScores, result.percentage];
      const xpEarned = result.score * 25;
      const newXp = prev.xp + xpEarned;
      const newLevel = Math.floor(newXp / 500) + 1;

      const next: UserLearningState = {
        ...prev,
        quizScores: updatedScores,
        xp: newXp,
        level: newLevel,
      };
      saveLearningState(user.id, next);
      return next;
    });
  };

  const handleNavigate = (tab: string, lessonId?: string) => {
    if (!user.profileCompleted && tab !== 'landing') {
      setPendingTargetTab(tab as ActiveTab);
      setIsProfileSetupOpen(true);
      return;
    }

    if (tab === 'materi' && lessonId) {
      handleOpenLesson(lessonId);
    } else {
      setActiveTab(tab as ActiveTab);
    }
  };

  const handleQuickBedah = (text: string) => {
    if (!user.profileCompleted) {
      setPendingTargetTab('bedah');
      setIsProfileSetupOpen(true);
      return;
    }
    setBedahSentence(text);
    setActiveTab('bedah');
  };

  const handleQuickAskAi = (prompt: string, lessonId?: string) => {
    if (!user.profileCompleted) {
      setPendingTargetTab('ai-tutor');
      setIsProfileSetupOpen(true);
      return;
    }
    setAiPrompt(prompt);
    setAiLessonContextId(lessonId || '');
    setActiveTab('ai-tutor');
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F7FAFF] font-sans text-slate-800 antialiased selection:bg-blue-600 selection:text-white">
      {/* Dynamic Navigation for In-App Views */}
      {activeTab !== 'landing' && (
        <Sidebar
          activeTab={activeTab}
          onNavigate={(tab) => handleNavigate(tab)}
          user={user}
          completedLessons={learningState.completedLessons}
          onToggleRole={() =>
            handleUpdateUser({
              role: user.role === 'guru' ? 'santri' : 'guru',
            })
          }
          onOpenSettings={() => setIsSettingsOpen(true)}
        />
      )}

      {/* Main Screen Content */}
      <main className="flex-1 flex flex-col min-w-0 h-full relative overflow-hidden pb-16 md:pb-0">
        {activeTab === 'landing' && (
          <LandingView
            onStartLearning={() => handleStartFromLanding('dashboard')}
            onDirectBedah={() => handleStartFromLanding('bedah')}
            onDirectAiTutor={() => handleStartFromLanding('ai-tutor')}
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardView
            user={user}
            onNavigate={handleNavigate}
            onQuickBedah={handleQuickBedah}
            onQuickAskAi={handleQuickAskAi}
          />
        )}

        {activeTab === 'materi' && (
          <MateriListView
            onSelectLesson={handleOpenLesson}
            completedLessons={learningState.completedLessons}
            inProgressLessons={learningState.inProgressLessons}
            bookmarkedLessons={learningState.bookmarkedLessons}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {activeTab === 'materi-detail' && (
          <LessonDetailView
            lessonId={selectedLessonId}
            onBack={() => setActiveTab('materi')}
            onSelectLesson={handleOpenLesson}
            isCompleted={learningState.completedLessons.includes(selectedLessonId)}
            isBookmarked={learningState.bookmarkedLessons.includes(selectedLessonId)}
            onToggleComplete={handleToggleComplete}
            onToggleBookmark={handleToggleBookmark}
            onAskAi={handleQuickAskAi}
            onOpenBedahWithText={handleQuickBedah}
          />
        )}

        {activeTab === 'bedah' && (
          <BedahKalimahStudio
            initialSentence={bedahSentence}
            onAskAiTutor={handleQuickAskAi}
          />
        )}

        {activeTab === 'ai-tutor' && (
          <AITutorView
            initialPrompt={aiPrompt}
            initialLessonContextId={aiLessonContextId}
            onOpenLesson={handleOpenLesson}
            onOpenBedahWithText={handleQuickBedah}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizView
            onOpenLesson={handleOpenLesson}
            onAddXp={handleAddXp}
            onQuizComplete={handleQuizComplete}
          />
        )}

        {activeTab === 'rangkuman-guru' && (
          <TeacherRangkumanView
            initialLessonId={teacherSelectedLessonId}
            onOpenLesson={handleOpenLesson}
          />
        )}

        {activeTab === 'progress' && (
          <ProgressAnalyticsView
            user={user}
            learningState={learningState}
            onOpenLesson={handleOpenLesson}
          />
        )}

        {activeTab === 'bookmarks' && (
          <BookmarksNotesView
            bookmarkedLessonIds={learningState.bookmarkedLessons}
            notes={learningState.notes}
            onOpenLesson={handleOpenLesson}
            onRemoveBookmark={handleToggleBookmark}
            onAddNote={handleAddNote}
            onDeleteNote={handleDeleteNote}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      {activeTab !== 'landing' && (
        <MobileNav
          activeTab={activeTab}
          onNavigate={(tab) => handleNavigate(tab)}
          user={user}
        />
      )}

      {/* Settings & Role Switcher Modal */}
      <SettingsAuthModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        user={user}
        onUpdateUser={handleUpdateUser}
      />

      {/* First-time Profile Setup Modal */}
      <ProfileSetupModal
        isOpen={isProfileSetupOpen}
        initialName={user.name}
        initialRole={user.role}
        onSave={handleSaveProfileSetup}
      />
    </div>
  );
}

export default App;
