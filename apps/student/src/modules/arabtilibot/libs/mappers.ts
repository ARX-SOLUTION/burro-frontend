import type {
  AttemptQuestionsResponse,
  FinishAttemptResponse,
  LeaderboardResponse,
  ModulesResponse,
  StudentHomeResponse,
  StudentProfileResponse,
  StudentStatisticsResponse,
} from '../types/api';
import type { HomeDashboardData } from '../types/module';
import type {
  BurroLeaderboardData,
  BurroModuleListItem,
  BurroPracticeQuestion,
  BurroProfileData,
} from '../types/view';

const LANGUAGE_LABELS = {
  uz: "O'zbekcha",
  en: 'English',
  ru: 'Russkiy',
} as const;

const STATUS_LABELS: Record<BurroModuleListItem['status'], string> = {
  locked: 'Yopiq',
  open: 'Boshlashga tayyor',
  in_progress: 'Davom etmoqda',
  completed: 'Tamomlangan',
};

const CTA_LABELS: Record<BurroModuleListItem['status'], string> = {
  locked: 'Yopiq',
  open: 'Boshlash',
  in_progress: 'Davom etish',
  completed: 'Qayta boshlash',
};

const formatDuration = (minutes: number) => `${minutes} daqiqa`;

const getPracticePrompt = (
  type: AttemptQuestionsResponse['questions'][number]['type'],
  soundHint: string | null,
) => {
  if (type === 'listen_find_letter') {
    return 'Audioni tinglang va to‘g‘ri harfni tanlang';
  }

  if (type === 'listen_find_sound') {
    return 'Audioni tinglang va to‘g‘ri javobni tanlang';
  }

  if (soundHint) {
    return soundHint;
  }

  return type === 'find_letter' ? 'To‘g‘ri harfni tanlang' : 'To‘g‘ri javobni tanlang';
};

const getModuleProgressPercent = (
  status: BurroModuleListItem['status'],
  accuracyPct: number | null | undefined,
) => {
  if (status === 'completed') return 100;
  if (status === 'in_progress') return accuracyPct ?? 50;
  return 0;
};

export const mapStudentHomeToDashboardData = (data: StudentHomeResponse): HomeDashboardData => {
  const fallbackModule = data.recent_modules[0] ?? null;
  const continueModule = data.continue_module?.module ?? fallbackModule;
  const answeredCount = data.continue_module
    ? data.continue_module.correctCount + data.continue_module.wrongCount
    : 0;
  const totalQuestions =
    data.continue_module?.totalQuestions ?? continueModule?.totalQuestions ?? 0;
  const progressPercent =
    totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  return {
    greeting: 'Bugungi darsga tayyormisiz?',
    streak: `${data.streak} kun`,
    languageChip: LANGUAGE_LABELS[data.language] ?? LANGUAGE_LABELS.uz,
    continueTitle: data.continue_module ? 'Davom etish' : 'Darsni boshlash',
    continueLesson: continueModule?.titleUz ?? 'Hozircha modul mavjud emas',
    continueCurrentStep: answeredCount,
    continueTotalSteps: totalQuestions,
    continueEta: continueModule ? formatDuration(continueModule.estimatedMin) : 'Tayyorlanmoqda',
    continueProgressPercent: progressPercent,
    continueLessonId: continueModule?.id ?? '',
    dailyTaskTitle: 'Kunlik topshiriq',
    dailyTaskValue: `${data.daily_task.progress}/${data.daily_task.target}`,
    dailyTaskReward: `+${data.daily_task.xp_reward} XP`,
    todayTitle: 'Bugungi natija',
    todayActionLabel: data.daily_task.completed ? 'Bajarildi' : 'Davom eting',
    todayStats: [
      { label: 'Vaqt', value: `${data.today_stats.time_spent_min} daqiqa` },
      { label: 'XP', value: `+${data.today_stats.xp_earned}` },
    ],
    modulesTitle: 'So‘nggi modullar',
    modulesActionLabel: 'Barchasi',
    modules: data.recent_modules.map((module) => ({
      id: module.id,
      title: module.titleUz,
      description: module.descriptionUz ?? `${module.totalQuestions} savol`,
      statusLabel: formatDuration(module.estimatedMin),
      status: 'duration',
      lessonId: module.id,
    })),
  };
};

export const mapModulesToListItems = (data: ModulesResponse): BurroModuleListItem[] => {
  return data.modules.map((module) => ({
    id: module.id,
    title: module.title,
    description: `${module.total_questions} savol`,
    meta: `${formatDuration(module.estimated_min)} • +${module.xp_reward} XP`,
    progressPercent: getModuleProgressPercent(module.status, module.best_attempt?.accuracy_pct),
    status: module.status,
    statusLabel: STATUS_LABELS[module.status],
    ctaLabel: CTA_LABELS[module.status],
    canStart: module.status !== 'locked',
  }));
};

export const mapProfileToView = (
  profile: StudentProfileResponse,
  statistics: StudentStatisticsResponse,
): BurroProfileData => {
  return {
    fullName: profile.full_name,
    idDisplay: profile.id_display,
    xpTotal: profile.xp_total,
    currentStreak: profile.streak.current,
    longestStreak: profile.streak.longest,
    completedModules: statistics.modules_completed,
    accuracyPct: statistics.accuracy_pct,
    language: profile.language,
    notificationsEnabled: profile.notifications_enabled,
    telegramLinked: profile.telegram_linked,
    createdAtLabel: new Date(profile.created_at).toLocaleDateString('uz-UZ'),
    weakLetters: statistics.weak_letters.map((letter) => ({
      arabic: letter.arabic,
      sound: letter.sound,
      errorCount: letter.error_count,
    })),
  };
};

export const mapLeaderboardToView = (data: LeaderboardResponse): BurroLeaderboardData => {
  const entries = [...data.top3, ...data.others].map((entry) => ({
    rank: entry.rank,
    fullName: entry.full_name,
    xp: entry.xp,
    avatarUrl: entry.avatar_url,
    isCurrentUser:
      entry.rank === data.my_position.rank && entry.full_name === data.my_position.full_name,
  }));

  return {
    period: data.period,
    generatedAtLabel: new Date(data.generated_at).toLocaleString('uz-UZ'),
    entries,
    myPosition: {
      rank: data.my_position.rank,
      fullName: data.my_position.full_name,
      xp: data.my_position.xp,
    },
  };
};

export const mapAttemptQuestionsToView = (
  data: AttemptQuestionsResponse,
): BurroPracticeQuestion[] => {
  return data.questions.map((question) => ({
    id: question.id,
    type: question.type.startsWith('listen_') ? 'audio' : 'mc',
    letter: question.type.startsWith('listen_') ? undefined : (question.arabic_letter ?? undefined),
    prompt: getPracticePrompt(question.type, question.sound_hint),
    audioUrl: question.audio_url,
    options: question.options,
    isAnswered: question.is_answered,
  }));
};

export const mapFinishAttemptSummary = (result: FinishAttemptResponse) => {
  return {
    title: result.module_title,
    accuracyPct: result.accuracy_pct,
    correctCount: result.correct_count,
    wrongCount: result.wrong_count,
    totalQuestions: result.total_questions,
    xpEarned: result.xp_earned,
    timeSpentLabel: `${result.time_spent_sec} soniya`,
  };
};
