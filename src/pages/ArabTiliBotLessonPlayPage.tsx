import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Heart, HelpCircle, X } from '@untitledui/icons';

import { getLessonById } from '@/modules/arabtilibot/data/lessons';

import { Button } from '@/components/base/buttons/button';
import { usePageMetadata } from '@/libs/usePageMetadata';

const FALLBACK_QUESTION = {
  prompt: "Qaysi tovush to'g'ri keladi?",
  letter: 'ج',
  options: [
    { key: 'a', label: 'Ja' },
    { key: 'b', label: 'Ha' },
    { key: 'c', label: 'Kha' },
  ],
};

export const ArabTiliBotLessonPlayPage = () => {
  usePageMetadata({ title: 'Darsni boshlash' });

  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const lesson = getLessonById(id || 'sa');

  const question = useMemo(() => {
    return lesson?.questions?.[0] || FALLBACK_QUESTION;
  }, [lesson]);

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answered] = useState(false);

  const canCheck = !!selectedOption && !answered;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto min-h-screen w-full max-w-[448px] bg-gray-50 shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]">
        <div className="sticky top-0 z-20 bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex size-6 items-center justify-center text-[#6b7280]"
              aria-label="Yopish"
            >
              <X className="size-6" />
            </button>

            <div className="flex-1 px-4">
              <div className="h-3 overflow-hidden rounded-full bg-[#e5e7eb]">
                <div className="h-full bg-[#0D9488]" style={{ width: '33.33%' }} />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-[#ef4444]">
                <Heart className="size-5 fill-current" />
                <span className="text-[16px] leading-[24px] font-bold">3</span>
              </div>
              <span className="text-[14px] leading-[20px] font-bold text-[#fbbf24]">+0 XP</span>
            </div>
          </div>
          <div className="h-px bg-[#e5e7eb]" />
        </div>

        <div className="px-6 pt-24 pb-36">
          <h1 className="text-center text-[20px] leading-[28px] font-semibold text-[#374151]">
            {question.prompt || FALLBACK_QUESTION.prompt}
          </h1>

          <div className="py-[61px] text-center">
            <p className="text-[128px] leading-[128px] font-bold text-[#0D9488]">
              {question.letter}
            </p>
          </div>

          <div className="space-y-3">
            {question.options.slice(0, 3).map((option) => {
              const isSelected = selectedOption === option.key;
              return (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => setSelectedOption(option.key)}
                  className={`w-full rounded-xl border py-[18px] text-[20px] leading-[28px] font-bold transition-colors ${
                    isSelected
                      ? 'border-[#0D9488] bg-[#0D9488] text-white'
                      : 'border-[#e5e7eb] bg-white text-[#374151]'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="fixed right-0 bottom-0 left-0 z-30 flex justify-center">
          <div className="w-full max-w-[448px] border-t border-[#e5e7eb] bg-white px-4 pt-4 pb-4">
            <div className="mb-2">
              <button
                type="button"
                className="flex size-10 items-center justify-center rounded-lg text-[#9ca3af]"
                aria-label="Yordam"
              >
                <HelpCircle className="size-6" />
              </button>
            </div>
            <Button
              isDisabled={!canCheck}
              className={`w-full rounded-xl py-[14px] text-[18px] leading-[28px] font-bold ${
                canCheck ? 'bg-[#0D9488] text-white' : 'bg-[#e5e7eb] text-[#9ca3af]'
              }`}
            >
              Tekshirish
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArabTiliBotLessonPlayPage;
