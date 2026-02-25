import { useEffect, useMemo, useState } from 'react';
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
  const questions = useMemo(() => lesson.questions || [], [lesson]) as LessonQuestion[];

  const [index, setIndex] = useState<number>(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [answered, setAnswered] = useState<boolean>(false);
  const [hearts, setHearts] = useState<number>(3);
  const [xpGain, setXpGain] = useState<number>(0);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [popLetter, setPopLetter] = useState(false);

  useEffect(() => {
    setSelected(null);
    setShowHint(false);
    setAnswered(false);
  }, [index]);

  useEffect(() => {
    setPopLetter(false);
    const t = setTimeout(() => setPopLetter(true), 40);
    return () => clearTimeout(t);
  }, [index]);

  const q = useMemo(
    () => questions[index] ?? ({ id: '', letter: '', options: [] } as LessonQuestion),
    [questions, index],
  );
  const progressPct = questions.length ? Math.round(((index + 1) / questions.length) * 100) : 0;

  useEffect(() => {
    if (!answered) {
      setShowSuccess(false);
      return;
    }
    const opt = q.options.find((o) => o.key === selected);
    const correct = !!opt && !!opt.correct;
    if (correct) setShowSuccess(true);
  }, [answered, selected, q]);

  if (!questions.length) {
    return (
      <div className="p-6">
        <h2 className="text-lg font-semibold">Dars topilmadi</h2>
        <div className="mt-4">
          <Button onClick={() => navigate('/arab-tili/lessons')}>Orqaga</Button>
        </div>
      </div>
    );
  }

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

  return (
    <>
      <div className="min-h-screen bg-gray-50 px-4 pb-28">
        <div className="mx-auto max-w-[640px]">
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

          <div className="mb-4 bg-white p-6">
            <div className="pt-8 pb-6 text-center">
              <div
                className={`transform text-[128px] leading-none font-bold text-[#0D9488] transition-transform duration-300 ${
                  popLetter ? 'scale-100' : 'scale-95'
                }`}
              >
                {q.letter}
              </div>
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
                      className={`w-full transform rounded-[12px] py-4 text-center font-bold transition-transform duration-150 ${isSelected ? 'scale-100 border-transparent bg-[#0D9488] text-white shadow-lg' : 'border border-[#e5e7eb] bg-white text-[#374151] hover:scale-[1.02]'}`}
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

          <div className="mb-6 flex items-center justify-between">
            <Button onClick={() => setShowHint((s) => !s)} className="px-4 py-2">
              ?
            </Button>
            <div className="flex items-center gap-3">
              <Button onClick={() => {}} className="px-3 py-2">
                🔁
              </Button>
            </div>
          </div>
          {showHint && (
            <div className="mx-auto mb-6 max-w-[640px] px-2 text-sm text-gray-600">
              Bu yordamchi maslahat: katta harfni qattiq talaffuz qiling va to&apos;g&apos;ri
              javobni tanlang.
            </div>
          )}
        </div>

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
