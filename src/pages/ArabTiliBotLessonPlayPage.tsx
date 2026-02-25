import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { HelpCircle } from '@untitledui/icons';

import {
  ARAB_TILI_LESSON_PLAY_FALLBACK_QUESTION,
  ARAB_TILI_LESSON_PLAY_UI_MOCK_DATA,
} from '@/modules/arabtilibot/constants/mock-data';
import { getLessonById } from '@/modules/arabtilibot/data/lessons';
import type { LessonPlayQuestion } from '@/modules/arabtilibot/types/question';
import { AudioQuestion } from '@/modules/arabtilibot/ui/play/AudioQuestion';
import { LessonPlayHeader } from '@/modules/arabtilibot/ui/play/LessonPlayHeader';

import { Button } from '@/components/base/buttons/button';
import { usePageMetadata } from '@/libs/usePageMetadata';

const ARABIC_OPTION_LABEL_MAP: Record<string, string> = {
  Ja: 'ج',
  Ha: 'ح',
  Kha: 'خ',
  Alif: 'ا',
  Ba: 'ب',
  Sa: 'س',
  Sh: 'ش',
  Za: 'ز',
};

const AUDIO_FALLBACK_OPTIONS = [
  { key: 'option-ha', label: 'ح', correct: true },
  { key: 'option-ja', label: 'ج', correct: false },
  { key: 'option-kha', label: 'خ', correct: false },
  { key: 'option-haa', label: 'ه', correct: false },
];

export const ArabTiliBotLessonPlayPage = () => {
  usePageMetadata({ title: 'Darsni boshlash' });

  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const lesson = getLessonById(id || 'sa');

  const question: LessonPlayQuestion = useMemo(() => {
    const firstQuestion = lesson?.questions?.[0];

    if (!firstQuestion) {
      return {
        ...ARAB_TILI_LESSON_PLAY_FALLBACK_QUESTION,
        prompt: 'Ushbu tovushni topin',
        options: AUDIO_FALLBACK_OPTIONS,
      };
    }

    const mappedOptions = firstQuestion.options.slice(0, 4).map((option) => ({
      key: option.key,
      label: ARABIC_OPTION_LABEL_MAP[option.label] ?? option.label,
      correct: option.correct,
    }));

    const usedLabels = new Set(mappedOptions.map((option) => option.label));
    const usedKeys = new Set(mappedOptions.map((option) => option.key));

    for (const fallbackOption of AUDIO_FALLBACK_OPTIONS) {
      if (mappedOptions.length >= 4) {
        break;
      }

      if (usedKeys.has(fallbackOption.key) || usedLabels.has(fallbackOption.label)) {
        continue;
      }

      mappedOptions.push(fallbackOption);
      usedKeys.add(fallbackOption.key);
      usedLabels.add(fallbackOption.label);
    }

    return {
      id: firstQuestion.id,
      letter: firstQuestion.letter,
      prompt: 'Ushbu tovushni topin',
      options: mappedOptions,
    };
  }, [lesson]);

  const [selectedOptionKey, setSelectedOptionKey] = useState<string | null>(null);
  const answered = false;

  const canCheck = Boolean(selectedOptionKey) && !answered;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto min-h-screen w-full max-w-[448px] bg-gray-50 shadow-2xl">
        <LessonPlayHeader
          progressPercent={66.67}
          hearts={ARAB_TILI_LESSON_PLAY_UI_MOCK_DATA.hearts}
          xpText="+10 XP"
          closeAriaLabel={ARAB_TILI_LESSON_PLAY_UI_MOCK_DATA.closeAriaLabel}
          onClose={() => navigate(-1)}
        />

        <AudioQuestion
          question={question}
          selectedOptionKey={selectedOptionKey}
          onReplay={() => {}}
          onSelectOption={(optionKey) => {
            if (answered) {
              return;
            }

            setSelectedOptionKey(optionKey);
          }}
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
              onClick={() => {}}
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
