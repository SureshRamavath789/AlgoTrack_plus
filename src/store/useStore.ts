'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProgress, ProblemStatus, Language, Approach } from '@/types';

interface AppState {
  progress: UserProgress;
  selectedLanguage: Language;
  theme: 'dark' | 'light';
  setLanguage: (lang: Language) => void;
  toggleTheme: () => void;
  markProblem: (problemId: string, status: ProblemStatus, language?: Language, approach?: Approach) => void;
  addDailyActivity: (date: string) => void;
  setCurrentTrack: (trackId: string | null) => void;
  getStreak: () => number;
  resetProgress: () => void;
}

const initialProgress: UserProgress = {
  odayStreak: 0,
  totalSolved: 0,
  easySolved: 0,
  mediumSolved: 0,
  hardSolved: 0,
  solvedProblems: {},
  dailyActivity: {},
  currentTrack: null,
  trackProgress: {}
};

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      progress: initialProgress,
      selectedLanguage: 'javascript',
      theme: 'dark',

      setLanguage: (lang) => set({ selectedLanguage: lang }),

      toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),

      markProblem: (problemId, status, language, approach) => set((state) => {
        const prev = state.progress.solvedProblems[problemId];
        const wasSolved = prev?.status === 'solved';
        const isSolved = status === 'solved';

        let easySolved = state.progress.easySolved;
        let mediumSolved = state.progress.mediumSolved;
        let hardSolved = state.progress.hardSolved;
        let totalSolved = state.progress.totalSolved;

        if (!wasSolved && isSolved) {
          totalSolved++;
        } else if (wasSolved && !isSolved) {
          totalSolved--;
        }

        const today = new Date().toISOString().split('T')[0];
        const dailyActivity = { ...state.progress.dailyActivity };
        if (isSolved && !wasSolved) {
          dailyActivity[today] = (dailyActivity[today] || 0) + 1;
        }

        return {
          progress: {
            ...state.progress,
            totalSolved,
            easySolved,
            mediumSolved,
            hardSolved,
            dailyActivity,
            solvedProblems: {
              ...state.progress.solvedProblems,
              [problemId]: {
                status,
                solvedAt: isSolved ? new Date().toISOString() : undefined,
                language,
                approach
              }
            }
          }
        };
      }),

      addDailyActivity: (date) => set((state) => ({
        progress: {
          ...state.progress,
          dailyActivity: {
            ...state.progress.dailyActivity,
            [date]: (state.progress.dailyActivity[date] || 0) + 1
          }
        }
      })),

      setCurrentTrack: (trackId) => set((state) => ({
        progress: {
          ...state.progress,
          currentTrack: trackId
        }
      })),

      getStreak: () => {
        const { dailyActivity } = get().progress;
        const today = new Date();
        let streak = 0;
        const current = new Date(today);

        while (true) {
          const key = current.toISOString().split('T')[0];
          if (dailyActivity[key] && dailyActivity[key] > 0) {
            streak++;
            current.setDate(current.getDate() - 1);
          } else {
            break;
          }
        }
        return streak;
      },

      resetProgress: () => set({ progress: initialProgress })
    }),
    {
      name: 'tuf-premium-storage'
    }
  )
);
