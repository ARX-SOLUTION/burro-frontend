export type LessonOption = { key: string; label: string; correct?: boolean };
export type Question = {
  id: string;
  type: 'mc' | 'audio';
  letter?: string;
  prompt?: string;
  audioUrl?: string;
  options: LessonOption[];
};

export type Module = {
  id: string;
  title: string;
  description?: string;
  progress?: number;
  questions: Question[];
};

export const modules: Module[] = [
  {
    id: 'm1',
    title: 'Alif va Harflar',
    description: "Boshlang'ich harflar",
    progress: 20,
    questions: [
      {
        id: 'm1q1',
        type: 'mc',
        letter: 'ا',
        prompt: "Qaysi tovush to'g'ri?",
        options: [
          { key: 'a', label: 'Alif', correct: true },
          { key: 'b', label: 'Ba' },
          { key: 'c', label: 'Ta' },
        ],
      },
      {
        id: 'm1q2',
        type: 'audio',
        prompt: 'Tovushni eshitib tanlang',
        audioUrl: '',
        options: [
          { key: 'a', label: 'Ja' },
          { key: 'b', label: 'Ha', correct: true },
          { key: 'c', label: 'Kha' },
        ],
      },
    ],
  },
  {
    id: 'm2',
    title: "So'z qurilishi",
    description: "So'zlar bilan mashq",
    progress: 0,
    questions: [
      {
        id: 'm2q1',
        type: 'mc',
        letter: 'س',
        prompt: 'Qaysi tovush?',
        options: [
          { key: 'a', label: 'Sa', correct: true },
          { key: 'b', label: 'Sh' },
        ],
      },
    ],
  },
];

export const leaderboard = [
  { rank: 1, user: 'Amina', score: 320 },
  { rank: 2, user: 'Bek', score: 280 },
  { rank: 3, user: 'Diyor', score: 240 },
];

export const profile = {
  userId: 'u1',
  displayName: 'Siz',
  completedModules: 1,
  streakDays: 3,
  xp: 420,
};

export default { modules, leaderboard, profile };
