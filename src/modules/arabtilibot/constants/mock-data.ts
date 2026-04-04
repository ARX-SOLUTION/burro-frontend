import type { HomeDashboardData } from '@/modules/arabtilibot/types/module';
import type { LessonPlayQuestion, LessonPlayUiState } from '@/modules/arabtilibot/types/question';

export const ARAB_TILI_HOME_DASHBOARD_MOCK_DATA: HomeDashboardData = {
  greeting: 'Salom, Azizbek!',
  streak: '5 day streak',
  languageChip: 'UZ',
  continueTitle: 'Davom etish',
  continueLesson: 'Sa, jim, ha',
  continueCurrentStep: 4,
  continueTotalSteps: 10,
  continueEta: '6 min',
  continueProgressPercent: 40,
  continueLessonId: 'sa',
  dailyTaskTitle: 'Kunlik vazifa',
  dailyTaskValue: '10 ta savol yechin',
  dailyTaskReward: '+20 XP',
  todayTitle: 'Bugungi natij',
  todayActionLabel: 'Batafsil',
  todayStats: [
    { label: 'Kunlik vazifa', value: '180 min' },
    { label: 'XP', value: '200' },
  ],
  modulesTitle: 'Modullar',
  modulesActionLabel: 'Barchasi',
  modules: [
    {
      id: 'module-alif',
      title: 'Alif, ba, ta',
      description: "3 ta harf bo'yicha mashg'ulotlar",
      statusLabel: 'Tugallangan',
      status: 'completed',
      lessonId: 'alif',
    },
    {
      id: 'module-sa',
      title: 'Sa, jim, ha',
      description: "3 ta harf bo'yicha mashg'ulotlar",
      statusLabel: '6 min',
      status: 'duration',
      lessonId: 'sa',
    },
    {
      id: 'module-dal',
      title: 'Dal, Zal, Ro',
      description: "3 ta harf bo'yicha mashg'ulotlar",
      statusLabel: '6 min',
      status: 'duration',
      lessonId: 'dal',
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
