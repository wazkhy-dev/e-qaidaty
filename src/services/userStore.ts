import { UserProfile, UserLearningState, ChapterStatus } from '../types';

export const TOTAL_LESSONS = 23;
export const DATA_VERSION = '2.0';

export const INITIAL_USER_PROFILE: UserProfile = {
  id: 'usr-default',
  name: '',
  role: 'santri',
  profileCompleted: false,
  completedLessons: [],
  bookmarkedLessons: [],
  xp: 0,
  level: 1,
  streakDays: 0,
  currentLessonId: 'bab-01',
};

export const INITIAL_LEARNING_STATE: UserLearningState = {
  completedLessons: [],
  inProgressLessons: [],
  bookmarkedLessons: [],
  notes: [],
  quizAttempts: [],
  quizScores: [],
  chatHistory: [],
  xp: 0,
  level: 1,
  streakDays: 0,
  lastActivity: null,
};

/**
 * Calculate progress percentage strictly based on completed chapters / 23.
 * Always returns an integer between 0 and 100.
 */
export function calculateProgress(completedLessons: string[] = []): number {
  if (!Array.isArray(completedLessons)) return 0;
  const count = completedLessons.length;
  const pct = Math.round((count / TOTAL_LESSONS) * 100);
  return Math.min(100, Math.max(0, isNaN(pct) ? 0 : pct));
}

/**
 * Determine chapter status: NOT_STARTED, IN_PROGRESS, or COMPLETED.
 */
export function getChapterStatus(
  lessonId: string,
  completedLessons: string[] = [],
  inProgressLessons: string[] = []
): ChapterStatus {
  if (Array.isArray(completedLessons) && completedLessons.includes(lessonId)) {
    return 'COMPLETED';
  }
  if (Array.isArray(inProgressLessons) && inProgressLessons.includes(lessonId)) {
    return 'IN_PROGRESS';
  }
  return 'NOT_STARTED';
}

/**
 * One-time legacy migration check to clean up previous dummy data.
 */
export function runLegacyDataMigration(): void {
  try {
    const currentVersion = localStorage.getItem('qaidaty_data_version');
    if (currentVersion === DATA_VERSION) {
      return;
    }

    // Check if legacy data exists with dummy completed bab / dummy bookmarks / dummy name
    const legacyUserStr = localStorage.getItem('qaidaty_user');
    let needsReset = true;

    if (legacyUserStr) {
      try {
        const parsed = JSON.parse(legacyUserStr);
        // If the profile had real completed status and non-dummy name, we can keep the identity
        const isDummyName = !parsed.name || parsed.name === 'Ahmad Mujahid' || parsed.name.toLowerCase() === 'isi nama antum di sini';
        
        if (!isDummyName && parsed.profileCompleted) {
          const cleanProfile: UserProfile = {
            id: parsed.id || 'usr-default',
            name: parsed.name,
            role: parsed.role === 'guru' ? 'guru' : 'santri',
            profileCompleted: true,
          };
          localStorage.setItem(`qaidaty_user_${cleanProfile.id}_profile`, JSON.stringify(cleanProfile));
          localStorage.setItem('qaidaty_active_user_id', cleanProfile.id);
        }
      } catch {
        // Ignore parse error
      }
    }

    // Always reset learning state to clean zero for legacy dummy wipe
    const activeUserId = localStorage.getItem('qaidaty_active_user_id') || 'usr-default';
    const cleanLearning: UserLearningState = {
      completedLessons: [],
      inProgressLessons: [],
      bookmarkedLessons: [],
      notes: [],
      quizAttempts: [],
      quizScores: [],
      chatHistory: [],
      xp: 0,
      level: 1,
      streakDays: 0,
      lastActivity: null,
    };

    localStorage.setItem(`qaidaty_user_${activeUserId}_learning`, JSON.stringify(cleanLearning));
    localStorage.removeItem('qaidaty_user'); // remove old unified legacy key
    localStorage.setItem('qaidaty_data_version', DATA_VERSION);
  } catch (err) {
    console.warn('[Qaidaty Store] Migration notice:', err);
  }
}

/**
 * Load user profile from storage.
 */
export function loadUserProfile(userId = 'usr-default'): UserProfile {
  try {
    runLegacyDataMigration();
    const stored = localStorage.getItem(`qaidaty_user_${userId}_profile`);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed && typeof parsed === 'object') {
        const isDummyName = !parsed.name || parsed.name === 'Ahmad Mujahid' || parsed.name.toLowerCase() === 'isi nama antum di sini';
        return {
          id: parsed.id || userId,
          name: isDummyName ? '' : (parsed.name || ''),
          role: parsed.role === 'guru' ? 'guru' : 'santri',
          profileCompleted: isDummyName ? false : Boolean(parsed.profileCompleted),
          completedLessons: Array.isArray(parsed.completedLessons) ? parsed.completedLessons : [],
          bookmarkedLessons: Array.isArray(parsed.bookmarkedLessons) ? parsed.bookmarkedLessons : [],
          xp: typeof parsed.xp === 'number' ? parsed.xp : 0,
          level: typeof parsed.level === 'number' ? parsed.level : 1,
          streakDays: typeof parsed.streakDays === 'number' ? parsed.streakDays : 0,
          currentLessonId: parsed.currentLessonId || 'bab-01',
        };
      }
    }
  } catch (e) {
    console.error('Error loading profile:', e);
  }
  return { ...INITIAL_USER_PROFILE, id: userId };
}

/**
 * Save user profile to storage.
 */
export function saveUserProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(`qaidaty_user_${profile.id}_profile`, JSON.stringify(profile));
    localStorage.setItem('qaidaty_active_user_id', profile.id);
  } catch (e) {
    console.error('Error saving profile:', e);
  }
}

/**
 * Load learning state for a specific user.
 */
export function loadLearningState(userId = 'usr-default'): UserLearningState {
  try {
    runLegacyDataMigration();
    const stored = localStorage.getItem(`qaidaty_user_${userId}_learning`);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed && typeof parsed === 'object') {
        return {
          completedLessons: Array.isArray(parsed.completedLessons) ? parsed.completedLessons : [],
          inProgressLessons: Array.isArray(parsed.inProgressLessons) ? parsed.inProgressLessons : [],
          bookmarkedLessons: Array.isArray(parsed.bookmarkedLessons) ? parsed.bookmarkedLessons : [],
          notes: Array.isArray(parsed.notes) ? parsed.notes : [],
          quizAttempts: Array.isArray(parsed.quizAttempts) ? parsed.quizAttempts : [],
          quizScores: Array.isArray(parsed.quizScores) ? parsed.quizScores : [],
          chatHistory: Array.isArray(parsed.chatHistory) ? parsed.chatHistory : [],
          xp: typeof parsed.xp === 'number' ? parsed.xp : 0,
          level: typeof parsed.level === 'number' ? parsed.level : 1,
          streakDays: typeof parsed.streakDays === 'number' ? parsed.streakDays : 0,
          lastActivity: parsed.lastActivity || null,
        };
      }
    }
  } catch (e) {
    console.error('Error loading learning state:', e);
  }
  return { ...INITIAL_LEARNING_STATE };
}

/**
 * Save learning state for a specific user.
 */
export function saveLearningState(userId: string, state: UserLearningState): void {
  try {
    localStorage.setItem(`qaidaty_user_${userId}_learning`, JSON.stringify(state));
  } catch (e) {
    console.error('Error saving learning state:', e);
  }
}
