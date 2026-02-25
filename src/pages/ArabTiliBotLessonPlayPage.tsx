import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { HelpCircle } from '@untitledui/icons';

import {
  ARAB_TILI_LESSON_PLAY_FALLBACK_QUESTION,
  ARAB_TILI_LESSON_PLAY_UI_MOCK_DATA,
} from '@/modules/arabtilibot/constants/mock-data';
import { getLessonById } from '@/modules/arabtilibot/data/lessons';
import type { LessonPlayQuestion } from '@/modules/arabtilibot/types/question';
import { LessonPlayHeader } from '@/modules/arabtilibot/ui/play/LessonPlayHeader';
import { McqQuestion } from '@/modules/arabtilibot/ui/play/McqQuestion';

import { Button } from '@/components/base/buttons/button';
import { usePageMetadata } from '@/libs/usePageMetadata';

export const ArabTiliBotLessonPlayPage = () => {
  usePageMetadata({ title: 'Darsni boshlash' });

  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const lesson = getLessonById(id || 'sa');

  const question: LessonPlayQuestion = useMemo(() => {
    const firstQuestion = lesson?.questions?.[0];

    if (!firstQuestion) {
      return ARAB_TILI_LESSON_PLAY_FALLBACK_QUESTION;
    }

    return {
      id: firstQuestion.id,
      letter: firstQuestion.letter,
      prompt: firstQuestion.prompt || ARAB_TILI_LESSON_PLAY_FALLBACK_QUESTION.prompt,
      options: firstQuestion.options.slice(0, 3).map((option) => ({
        key: option.key,
        label: option.label,
        correct: option.correct,
      })),
    };
  }, [lesson]);

  const [selectedOptionKey, setSelectedOptionKey] = useState<string | null>(
    question.options[0]?.key ?? null,
  );
  const [answered] = useState(false);

  const canCheck = Boolean(selectedOptionKey) && !answered;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto min-h-screen w-full max-w-[448px] bg-gray-50 shadow-2xl">
        <LessonPlayHeader
          progressPercent={ARAB_TILI_LESSON_PLAY_UI_MOCK_DATA.progressPercent}
          hearts={ARAB_TILI_LESSON_PLAY_UI_MOCK_DATA.hearts}
          xpText={ARAB_TILI_LESSON_PLAY_UI_MOCK_DATA.xpText}
          closeAriaLabel={ARAB_TILI_LESSON_PLAY_UI_MOCK_DATA.closeAriaLabel}
          onClose={() => navigate(-1)}
        />

        <McqQuestion
          question={question}
          selectedOptionKey={selectedOptionKey}
          onSelectOption={setSelectedOptionKey}
        />

        <div className="fixed inset-x-0 bottom-0 z-30 flex justify-center">
          <div className="w-full max-w-[448px] border-t border-gray-200 bg-white px-4 pt-4 pb-4">
            <div className="mb-2">
              <button
                type="button"
                className="flex size-10 items-center justify-center rounded-lg text-gray-400"
                aria-label={ARAB_TILI_LESSON_PLAY_UI_MOCK_DATA.helpAriaLabel}
              >
                <HelpCircle className="size-6" />
              </button>
            </div>

            <Button
              isDisabled={!canCheck}
              className={`w-full rounded-xl py-[14px] text-[18px] leading-7 font-bold ${
                canCheck
                  ? 'bg-teal-600 text-white hover:bg-teal-700 hover:text-white'
                  : 'bg-gray-200 text-gray-400 hover:bg-gray-200 hover:text-gray-400'
              }`}
            >
              {ARAB_TILI_LESSON_PLAY_UI_MOCK_DATA.checkLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArabTiliBotLessonPlayPage;
