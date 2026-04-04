import type { LeaderboardPeriod, ModuleStatus, StudentLanguage } from './api';

export type BurroModuleListItem = {
  id: string;
  title: string;
  description: string;
  meta: string;
  progressPercent: number;
  status: ModuleStatus;
  statusLabel: string;
  ctaLabel: string;
  canStart: boolean;
};

export type BurroProfileData = {
  fullName: string;
  idDisplay: string;
  xpTotal: number;
  currentStreak: number;
  longestStreak: number;
  completedModules: number;
  accuracyPct: number;
  language: StudentLanguage;
  notificationsEnabled: boolean;
  telegramLinked: boolean;
  createdAtLabel: string;
  weakLetters: Array<{
    arabic: string;
    sound: string;
    errorCount: number;
  }>;
};

export type BurroLeaderboardEntry = {
  rank: number;
  fullName: string;
  xp: number;
  avatarUrl: string | null;
  isCurrentUser?: boolean;
};

export type BurroLeaderboardData = {
  period: LeaderboardPeriod;
  generatedAtLabel: string;
  entries: BurroLeaderboardEntry[];
  myPosition: {
    rank: number;
    fullName: string;
    xp: number;
  };
};

export type BurroPracticeQuestion = {
  id: string;
  type: 'mc' | 'audio';
  letter?: string;
  prompt: string;
  audioUrl?: string | null;
  options: string[];
  isAnswered: boolean;
};
