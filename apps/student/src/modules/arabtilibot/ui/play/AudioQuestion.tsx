import { memo, useMemo } from 'react';
import { RefreshCcw01, Speaker03 } from '@untitledui/icons';

import type { LessonPlayQuestion } from '@/modules/arabtilibot/types/question';
import { AnswerOptionTile } from '@/modules/arabtilibot/ui/play/AnswerOptionTile';

type AudioQuestionProps = {
  question: LessonPlayQuestion;
  selectedOptionKey: string | null;
  feedbackCorrectKey?: string | null;
  isAnswered?: boolean;
  isPlaying?: boolean;
  onReplay: () => void;
  onSelectOption: (optionKey: string) => void;
};

export const AudioQuestion = memo(
  ({
    question,
    selectedOptionKey,
    feedbackCorrectKey,
    isAnswered,
    isPlaying,
    onReplay,
    onSelectOption,
  }: AudioQuestionProps) => {
    const optionHandlers = useMemo(
      () => question.options.map((option) => () => onSelectOption(option.key)),
      [onSelectOption, question.options],
    );

    return (
      <div className="px-6 pb-36 pt-24">
        <h1 className="text-center text-[20px] font-semibold leading-7 text-gray-700">
          {question.prompt}
        </h1>

        <div className="py-8">
          <div className="flex flex-col items-center justify-center">
            <button
              type="button"
              onClick={onReplay}
              className={`flex size-32 items-center justify-center rounded-3xl bg-teal-600 text-white shadow-lg transition-transform ${
                isPlaying ? 'scale-[1.03] ring-4 ring-teal-100' : ''
              }`}
              aria-label="Audio eshitish"
            >
              <Speaker03 className={`size-12 ${isPlaying ? 'animate-pulse' : ''}`} />
            </button>

            <div className="mt-3 flex h-5 items-end gap-1" aria-hidden="true">
              {[0, 1, 2].map((bar) => (
                <span
                  key={bar}
                  className={`w-1.5 rounded-full bg-teal-500 transition-all ${
                    isPlaying ? (bar === 1 ? 'h-5' : 'h-3') : 'h-1.5 opacity-50'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={onReplay}
              className="mt-3 inline-flex items-center rounded-full bg-teal-50 px-3 py-1.5 text-sm font-semibold leading-5 text-teal-700"
            >
              <RefreshCcw01 className="mr-1 size-3.5" />
              Qayta eshitish
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {question.options.slice(0, 4).map((option, optionIndex) => (
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
              onSelect={optionHandlers[optionIndex]}
            />
          ))}
        </div>
      </div>
    );
  },
);
AudioQuestion.displayName = 'AudioQuestion';

export default AudioQuestion;
