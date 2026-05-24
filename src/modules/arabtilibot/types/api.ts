export type StudentLanguage = 'uz' | 'en' | 'ru';
export type StatisticsChartPeriod = '7d' | '30d';

export type UpdateStudentProfileRequest = {
  full_name?: string;
  language?: StudentLanguage;
  notifications_enabled?: boolean;
};

export type StatisticsChartResponse = {
  period: string;
  labels: string[];
  xp_data: number[];
};

export type StudentHomeResponse = {
  streak: number;
  language: StudentLanguage;
  continue_module: {
    id: string;
    moduleId: string;
    totalQuestions: number;
    correctCount: number;
    wrongCount: number;
    module: {
      id: string;
      titleUz: string;
      titleEn: string;
      titleRu: string;
      estimatedMin: number;
      totalQuestions: number;
    };
  } | null;
  daily_task: {
    description: string;
    xp_reward: number;
    completed: boolean;
    progress: number;
    target: number;
  };
  today_stats: {
    time_spent_min: number;
    xp_earned: number;
  };
  recent_modules: Array<{
    id: string;
    titleUz: string;
    titleEn: string;
    titleRu: string;
    estimatedMin: number;
    totalQuestions: number;
    descriptionUz?: string | null;
  }>;
};

export type StudentProfileResponse = {
  id: string;
  full_name: string;
  phone: string;
  id_display: string;
  language: StudentLanguage;
  avatar_url: string | null;
  xp_total: number;
  streak: {
    current: number;
    longest: number;
  };
  notifications_enabled: boolean;
  telegram_linked: boolean;
  created_at: string;
};

export type StudentStatisticsResponse = {
  total_xp: number;
  accuracy_pct: number;
  modules_completed: number;
  current_streak: number;
  longest_streak: number;
  weak_letters: Array<{
    arabic: string;
    sound: string;
    error_count: number;
  }>;
};

export type ModuleFilter = 'all' | 'open' | 'completed';
export type ModuleStatus = 'locked' | 'open' | 'in_progress' | 'completed';

export type ModuleDetailResponse = {
  id: string;
  title: string;
  icon_letter: string;
  icon_color: string;
  order_index: number;
  xp_reward: number;
  estimated_min: number;
  total_questions: number;
  is_free: boolean;
  status: ModuleStatus;
  description: string | null;
  attempts_count: number;
  best_attempt: {
    accuracy_pct: number | null;
    wrong_count: number;
    time_spent_sec: number | null;
    xp_earned: number;
  } | null;
};

export type ModulesResponse = {
  modules: Array<{
    id: string;
    title: string;
    icon_letter: string;
    icon_color: string;
    order_index: number;
    xp_reward: number;
    estimated_min: number;
    total_questions: number;
    is_free: boolean;
    status: ModuleStatus;
    best_attempt: {
      accuracy_pct: number | null;
      wrong_count: number;
      time_spent_sec: number | null;
      xp_earned: number;
    } | null;
  }>;
};

export type StartAttemptResponse = {
  attempt_id: string;
  lives: number;
  total_questions: number;
  is_resumed: boolean;
};

export type AttemptQuestionsResponse = {
  attempt_id: string;
  lives_remaining: number;
  total_questions: number;
  questions: Array<{
    id: string;
    order_index: number;
    type: 'find_sound' | 'find_letter' | 'listen_find_letter' | 'listen_find_sound';
    arabic_letter: string | null;
    sound_hint: string | null;
    audio_url: string | null;
    options: string[];
    is_answered: boolean;
  }>;
};

export type SubmitAnswerRequest = {
  question_id: string;
  given_answer: string;
};

export type SubmitAnswerResponse = {
  is_correct: boolean;
  correct_answer: string;
  tip: string | null;
  lives_remaining: number;
  attempt_status: 'in_progress' | 'failed';
  all_answered: boolean;
};

export type FinishAttemptResponse = {
  attempt_id: string;
  module_title: string;
  status: 'completed';
  accuracy_pct: number;
  correct_count: number;
  wrong_count: number;
  total_questions: number;
  xp_earned: number;
  time_spent_sec: number;
  wrong_questions: Array<{
    question_id: string;
    type: string;
    arabic_letter: string | null;
    given_answer: string;
    correct_answer: string;
    tip: string | null;
  }>;
};

export type LeaderboardPeriod = 'weekly' | 'monthly' | 'all';

export type LeaderboardResponse = {
  period: LeaderboardPeriod;
  generated_at: string;
  top3: Array<{
    rank: number;
    user_id: string;
    full_name: string;
    avatar_url: string | null;
    xp: number;
  }>;
  others: Array<{
    rank: number;
    user_id: string;
    full_name: string;
    avatar_url: string | null;
    xp: number;
  }>;
  my_position: {
    rank: number;
    full_name: string;
    xp: number;
  };
};
