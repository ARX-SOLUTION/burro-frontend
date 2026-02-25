import type { LessonPlayQuestion } from '@/modules/arabtilibot/types/question';
import { AnswerOptionButton } from '@/modules/arabtilibot/ui/play/AnswerOptionButton';

type McqQuestionProps = {
  question: LessonPlayQuestion;
  selectedOptionKey: string | null;
  onSelectOption: (optionKey: string) => void;
};

export const McqQuestion = ({ question, selectedOptionKey, onSelectOption }: McqQuestionProps) => {
  return (
    <div className="px-6 pt-24 pb-36">
      <h1 className="text-center text-[20px] leading-7 font-semibold text-gray-700">
        {question.prompt}
      </h1>

      <div className="py-[61.2px] text-center">
        <p className="text-[128px] leading-[128px] font-bold text-teal-600">{question.letter}</p>
      </div>

      <div className="space-y-3">
        {question.options.slice(0, 3).map((option) => (
          <AnswerOptionButton
            key={option.key}
            label={option.label}
            isSelected={selectedOptionKey === option.key}
            onSelect={() => onSelectOption(option.key)}
          />
        ))}
      </div>
    </div>
  );
};

export default McqQuestion;
