export type DashboardStat = {
  label: string;
  value: string;
};

export type HomeModule = {
  id: string;
  title: string;
  description: string;
  note: string;
  lessonId: string;
  isLocked: boolean;
};

export type HomeDashboardData = {
  greeting: string;
  streak: string;
  languageChip: string;
  continueTitle: string;
  continueLesson: string;
  continueCurrentStep: number;
  continueTotalSteps: number;
  continueEta: string;
  continueProgressPercent: number;
  continueLessonId: string;
  dailyTaskTitle: string;
  dailyTaskValue: string;
  dailyTaskReward: string;
  todayTitle: string;
  todayActionLabel: string;
  todayStats: DashboardStat[];
  modulesTitle: string;
  modulesActionLabel: string;
  modules: HomeModule[];
};
