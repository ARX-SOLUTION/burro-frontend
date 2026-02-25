import { Question } from '@/modules/arabtilibot/data/mock';

export default function QuestionCard({ q }: { q: Question }) {
  return (
    <div className="text-center">
      {q.letter ? (
        <div className="text-[96px] leading-none font-bold text-teal-600">{q.letter}</div>
      ) : (
        <div className="text-lg font-semibold">{q.prompt}</div>
      )}
    </div>
  );
}
