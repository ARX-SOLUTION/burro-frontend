export type LessonPlayOption = {
  key: string;
  label: string;
  correct?: boolean;
};

export type LessonPlayQuestion = {
  id: string;
  letter: string;
  prompt: string;
  options: LessonPlayOption[];
};

export type LessonPlayUiState = {
  progressPercent: number;
  hearts: number;
  xpText: string;
  closeAriaLabel: string;
  helpAriaLabel: string;
  checkLabel: string;
};
