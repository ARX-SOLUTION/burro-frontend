import { RefreshCcw01, Speaker03 } from '@untitledui/icons';

import type { LessonPlayQuestion } from '@/modules/arabtilibot/types/question';
import { AnswerOptionTile } from '@/modules/arabtilibot/ui/play/AnswerOptionTile';

type AudioQuestionProps = {
  question: LessonPlayQuestion;
  selectedOptionKey: string | null;
  feedbackCorrectKey?: string | null;
  isAnswered?: boolean;
  onReplay: () => void;
  onSelectOption: (optionKey: string) => void;
};

export const AudioQuestion = ({
  question,
  selectedOptionKey,
  feedbackCorrectKey,
  isAnswered,
  onReplay,
  onSelectOption,
}: AudioQuestionProps) => {
  return (
    <div className="px-6 pt-24 pb-36">
      <h1 className="text-center text-[20px] leading-7 font-semibold text-gray-700">
        {question.prompt}
      </h1>

      <div className="py-8">
        <div className="flex flex-col items-center justify-center">
          <button
            type="button"
            onClick={onReplay}
            className="flex size-32 items-center justify-center rounded-3xl bg-teal-600 text-white shadow-lg"
            aria-label="Audio eshitish"
          >
            <Speaker03 className="size-12" />
          </button>

          <button
            type="button"
            onClick={onReplay}
            className="mt-4 inline-flex items-center rounded-full bg-teal-50 px-3 py-1.5 text-sm leading-5 font-semibold text-teal-700"
          >
            <RefreshCcw01 className="mr-1 size-3.5" />
            Qayta eshitish
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {question.options.slice(0, 4).map((option) => (
          <AnswerOptionTile
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
            onSelect={() => onSelectOption(option.key)}
          />
        ))}
      </div>
    </div>
  );
};

export default AudioQuestion;
