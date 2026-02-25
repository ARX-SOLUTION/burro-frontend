import type { HomeDashboardData } from '@/modules/arabtilibot/types/module';
import type { LessonPlayQuestion, LessonPlayUiState } from '@/modules/arabtilibot/types/question';

export const ARAB_TILI_HOME_DASHBOARD_MOCK_DATA: HomeDashboardData = {
  greeting: 'Salom, Azizbek 👋',
  streak: '5 kun streak',
  languageChip: '🇬🇧 EN',
  continueTitle: 'Davom etish',
  continueLesson: 'Sa, Jim, Ha',
  continueCurrentStep: 4,
  continueTotalSteps: 10,
  continueEta: '~6 min',
  continueProgressPercent: 40,
  continueLessonId: 'sa',
  dailyTaskTitle: 'Kunlik vazifa',
  dailyTaskValue: '10 ta savol yechin',
  dailyTaskReward: '+20 XP',
  todayTitle: 'Bugungi natij',
  todayActionLabel: 'Batafsil',
  todayStats: [
    { label: 'Vaqt', value: '180 min' },
    { label: 'XP', value: '1240' },
  ],
  modulesTitle: 'Modullar',
  modulesActionLabel: 'Barchasi',
  modules: [
    {
      id: 'module-alif',
      title: 'Alif',
      description: 'Alif, Ba, Ta',
      note: 'Tugallangan',
      lessonId: 'alif',
      isLocked: false,
    },
    {
      id: 'module-sa',
      title: 'Sa',
      description: 'Sa, Jim, Ha',
      note: '6 min',
      lessonId: 'sa',
      isLocked: false,
    },
    {
      id: 'module-dal',
      title: 'Dal',
      description: 'Dal, Zal, Ro',
      note: '8 min',
      lessonId: 'dal',
      isLocked: false,
    },
    {
      id: 'module-za',
      title: 'Za',
      description: 'Za, Sin, Shin',
      note: '10 min',
      lessonId: 'za',
      isLocked: true,
    },
    {
      id: 'module-sod',
      title: 'Sod',
      description: 'Sod, Dod',
      note: '12 min',
      lessonId: 'sod',
      isLocked: true,
    },
  ],
};

export const ARAB_TILI_LESSON_PLAY_UI_MOCK_DATA: LessonPlayUiState = {
  progressPercent: 33.33,
  hearts: 3,
  xpText: '+0 XP',
  closeAriaLabel: 'Yopish',
  helpAriaLabel: 'Yordam',
  checkLabel: 'Tekshirish',
};

export const ARAB_TILI_LESSON_PLAY_FALLBACK_QUESTION: LessonPlayQuestion = {
  id: 'fallback-question-1',
  prompt: "Qaysi tovush to'g'ri keladi?",
  letter: 'ج',
  options: [
    { key: 'a', label: 'Ja' },
    { key: 'b', label: 'Ha' },
    { key: 'c', label: 'Kha' },
  ],
};
