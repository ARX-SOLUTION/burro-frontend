export type LessonOption = { key: string; label: string; correct?: boolean };
export type LessonQuestion = {
  id: string;
  letter: string;
  prompt?: string;
  options: LessonOption[];
};
export type Lesson = { id: string; title: string; questions: LessonQuestion[] };

export const lessons: Lesson[] = [
  {
    id: 'sa',
    title: 'Sa',
    questions: [
      {
        id: 'q1',
        letter: 'ج',
        prompt: "Qaysi tovush to'g'ri keladi?",
        options: [
          { key: 'a', label: 'Ja', correct: true },
          { key: 'b', label: 'Ha', correct: false },
          { key: 'c', label: 'Kha', correct: false },
        ],
      },
      {
        id: 'q2',
        letter: 'س',
        prompt: "Qaysi tovush to'g'ri keladi?",
        options: [
          { key: 'a', label: 'Sa', correct: true },
          { key: 'b', label: 'Sh', correct: false },
          { key: 'c', label: 'Za', correct: false },
        ],
      },
    ],
  },
  {
    id: 'alif',
    title: 'Alif',
    questions: [
      {
        id: 'q1',
        letter: 'ا',
        options: [
          { key: 'a', label: 'Alif', correct: true },
          { key: 'b', label: 'Ba', correct: false },
        ],
      },
    ],
  },
];

export function getLessonById(id: string) {
  return lessons.find((l) => l.id === id) || lessons[0];
}
