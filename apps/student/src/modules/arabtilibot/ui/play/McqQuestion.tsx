import { memo, useMemo } from 'react';

import type { LessonPlayQuestion } from '@/modules/arabtilibot/types/question';
import { AnswerOptionButton } from '@/modules/arabtilibot/ui/play/AnswerOptionButton';

type McqQuestionProps = {
  question: LessonPlayQuestion;
  selectedOptionKey: string | null;
  feedbackCorrectKey?: string | null;
  isAnswered?: boolean;
  onSelectOption: (optionKey: string) => void;
};

export const McqQuestion = memo(
  ({
    question,
    selectedOptionKey,
    feedbackCorrectKey,
    isAnswered,
    onSelectOption,
  }: McqQuestionProps) => {
    const optionHandlers = useMemo(
      () => question.options.map((option) => () => onSelectOption(option.key)),
      [onSelectOption, question.options],
    );

    return (
      <div className="px-6 pt-24 pb-36">
        <h1 className="text-center text-[20px] leading-7 font-semibold text-gray-700">
          {question.prompt}
        </h1>

        <div className="py-[61.2px] text-center">
          <p className="text-[128px] leading-[128px] font-bold text-gray-900">{question.letter}</p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {question.options.slice(0, 4).map((option, optionIndex) => (
            <AnswerOptionButton
              key={option.key}
              label={option.label}
              isSelected={selectedOptionKey === option.key && !feedbackCorrectKey}
              isCorrect={!!feedbackCorrectKey && option.key === feedbackCorrectKey}
              isWrong={
                !!feedbackCorrectKey &&
                selectedOptionKey === option.key &&
                option.key !== feedbackCorrectKey
              }
              isDisabled={!!isAnswered}
              onSelect={optionHandlers[optionIndex]}
            />
          ))}
        </div>
      </div>
    );
  },
);
McqQuestion.displayName = 'McqQuestion';

export default McqQuestion;
