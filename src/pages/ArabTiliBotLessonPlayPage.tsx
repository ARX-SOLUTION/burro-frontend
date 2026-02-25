import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getLessonById, LessonQuestion } from '@/modules/arabtilibot/data/lessons';
import ArabTiliBotLessonPlaySuccess from '@/modules/arabtilibot/ui/ArabTiliBotLessonPlaySuccess';

import { Button } from '@/components/base/buttons/button';
import { usePageMetadata } from '@/libs/usePageMetadata';

export const ArabTiliBotLessonPlayPage = () => {
  usePageMetadata({ title: 'Darsni boshlash' });
  const navigate = useNavigate();
  const { id } = useParams() as { id?: string };
  const lessonId = id || 'sa';

  const lesson = getLessonById(lessonId.toString());
  const questions: LessonQuestion[] = lesson.questions || [];

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [hearts, setHearts] = useState(3);
  const [xpGain, setXpGain] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // reset per-question state
    setSelected(null);
    setShowHint(false);
    setAnswered(false);
  }, [index]);

  const q = questions[index];
  const progressPct = Math.round(((index + 1) / questions.length) * 100);

  function handleSelect(key: string) {
    if (answered) return;
    setSelected(key);
  }

  function handleCheck() {
    if (!selected) return;
    const opt = q.options.find((o) => o.key === selected);
    const correct = !!opt && !!opt.correct;
    setAnswered(true);
    if (correct) {
      setXpGain(10);
    } else {
      setHearts((h) => Math.max(0, h - 1));
      setXpGain(0);
    }
  }

  function handleNext() {
    if (index < questions.length - 1) {
      setIndex((i) => i + 1);
    } else {
      navigate('/arab-tili/lessons');
    }
    setXpGain(0);
  }

  useEffect(() => {
    if (answered) {
      const opt = q.options.find((o) => o.key === selected);
      const correct = !!opt && !!opt.correct;
      if (correct) {
        setShowSuccess(true);
      }
    } else {
      setShowSuccess(false);
    }
  }, [answered, selected, q?.options]);

  return (
    <>
      <div className="min-h-screen bg-gray-50 px-4 pb-28">
        <div className="mx-auto max-w-[640px]">
          {/* Header */}
          <div className="flex items-center justify-between py-4">
            <Button onClick={() => navigate(-1)} className="px-3 py-2">
              Orqaga
            </Button>
            <div className="text-center">
              <div className="text-sm text-gray-500">Dars</div>
              <div className="text-base font-semibold">{lessonId.toString().toUpperCase()}</div>
            </div>
            <div />
          </div>

          {/* Top progress / hearts / xp bar (compact) */}
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Button onClick={() => navigate(-1)} className="px-2 py-1">
                ✕
              </Button>
              <div className="w-full">
                <div className="h-2 w-full rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-[#0D9488] transition-all"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-red-500">❤️ {hearts}</div>
              <div className="text-sm text-yellow-500">+{xpGain} XP</div>
            </div>
          </div>

          {/* Large centered letter + choices (modal-like) */}
          <div className="mb-4 bg-white p-6 shadow-[0px_0px_0px_rgba(0,0,0,0)]">
            <div className="pt-8 pb-6 text-center">
              <div className="text-[128px] leading-none font-bold text-[#0D9488]">{q.letter}</div>
            </div>

            <div className="space-y-4">
              {q.options.map((opt) => {
                const isSelected = selected === opt.key;
                const feedback = answered
                  ? opt.correct
                    ? `To'g'ri`
                    : isSelected
                      ? "Noto'g'ri"
                      : ''
                  : '';
                return (
                  <div key={opt.key}>
                    <Button
                      onClick={() => handleSelect(opt.key)}
                      data-selected={isSelected ? 'true' : undefined}
                      className={`w-full rounded-[12px] py-4 text-center font-bold ${isSelected ? 'border-transparent bg-[#0D9488] text-white' : 'border border-[#e5e7eb] bg-white text-[#374151]'}`}
                      aria-pressed={isSelected}
                    >
                      {opt.label}
                    </Button>
                    {answered && feedback && (
                      <div className="mt-2 text-center text-sm font-semibold text-teal-600">
                        {feedback}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Small controls area (hint / audio) */}
          <div className="mb-6 flex items-center justify-between">
            <Button onClick={() => setShowHint((s) => !s)} className="px-4 py-2">
              ?
            </Button>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => {
                  /* replay audio placeholder */
                }}
                className="px-3 py-2"
              >
                🔁
              </Button>
            </div>
          </div>
          {showHint && (
            <div className="mx-auto mb-6 max-w-[640px] px-2 text-sm text-gray-600">
              Bu yordamchi maslahat: katta harfni qattiq talaffuz qiling va to&#39;g&#39;ri javobni
              tanlang.
            </div>
          )}
        </div>

        {/* Sticky bottom check / next action */}
        <div className="fixed right-0 bottom-0 left-0 z-30 border-t border-[#e5e7eb] bg-white p-4">
          <div className="mx-auto max-w-[640px] px-4">
            {!answered ? (
              <Button
                isDisabled={!selected}
                className={`w-full rounded-[12px] py-4 font-semibold text-white ${selected ? 'bg-[#0D9488]' : 'bg-gray-300'}`}
                onClick={handleCheck}
              >
                Tekshirish
              </Button>
            ) : (
              <Button
                className={`w-full rounded-[12px] bg-[#0D9488] py-4 font-semibold text-white`}
                onClick={handleNext}
              >
                {index < questions.length - 1 ? 'Keyingi' : 'Darsni yakunlash'}
              </Button>
            )}
          </div>
        </div>
      </div>

      {showSuccess && (
        <ArabTiliBotLessonPlaySuccess
          xp={xpGain}
          onContinue={() => {
            setShowSuccess(false);
            handleNext();
          }}
        />
      )}
    </>
  );
};

export default ArabTiliBotLessonPlayPage;
