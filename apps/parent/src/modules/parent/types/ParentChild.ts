export type ParentChildListItem = {
  id: string;
  full_name: string;
  avatar_url: string | null;
  xp_total: number;
  streak: number;
  modules_completed: number;
  last_active: string | null;
};

export type ModuleProgressItem = {
  module_id: string;
  title: string;
  order: number;
  status: string;
  accuracy_pct: number | null;
};

export type ParentChildDetail = {
  id: string;
  full_name: string;
  avatar_url: string | null;
  xp_total: number;
  streak: { current: number; longest: number };
  modules_completed: number;
  modules_total: number;
  accuracy_pct: number;
  weak_letters: { arabic: string; sound: string; error_count: number }[];
  recent_attempts: {
    module_title: string;
    status: string;
    accuracy_pct: number | null;
    started_at: string;
  }[];
  module_progress: ModuleProgressItem[];
};
