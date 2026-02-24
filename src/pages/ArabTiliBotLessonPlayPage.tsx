import { Button } from '@/components/base/buttons/button';
import { usePageMetadata } from '@/libs/usePageMetadata';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const ArabTiliBotLessonPlayPage = () => {
  usePageMetadata({ title: 'Darsni boshlash' });
  const navigate = useNavigate();
  const params = useParams();
  const id = (params as any).id || 'lesson';

  const questions = [
    {
      id: 'q1',
      letter: 'س',
      translit: 'Sa',
      prompt: "Topshiriq: harfni o'qish va to'g'ri tovushni tanlash.",
      options: [
        { key: 'a', label: "Sa — /s/", correct: true },
        { key: 'b', label: "Ja — /ʤ/", correct: false },
        { key: 'c', label: "Ha — /h/", correct: false },
      ],
    },
    {
      id: 'q2',
      letter: 'ب',
      translit: 'Ba',
      prompt: 'Topshiriq: tovushni tanlang.',
      options: [
        { key: 'a', label: 'Ba — /b/', correct: true },
        { key: 'b', label: 'Ta — /t/', correct: false },
        { key: 'c', label: "Pa — /p/", correct: false },
      ],
    },
  ];

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [answered, setAnswered] = useState(false);

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
    setAnswered(true);
  }

  function handleNext() {
    if (!answered) return;
    if (index < questions.length - 1) {
      setIndex((i) => i + 1);
    } else {
      // lesson finished — navigate back to lessons overview
      navigate('/arab-tili/lessons');
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 pb-28">
      <div className="mx-auto max-w-[640px]">
        {/* Header */}
        <div className="flex items-center justify-between py-4">
          <Button onClick={() => navigate(-1)} className="px-3 py-2">Orqaga</Button>
          <div className="text-center">
            <div className="text-sm text-gray-500">Dars</div>
            <div className="text-base font-semibold">{id.toString().toUpperCase()}</div>
          </div>
          <div />
        </div>

        {/* Progress / meta */}
        <div className="mb-4 rounded-xl bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">{index + 1} / {questions.length} savol</div>
            <div className="text-sm text-gray-600">~{Math.max(1, Math.ceil((questions.length - index) * 0.6))} min</div>
          </div>
          <div className="mt-3 h-2 w-full rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-[#0D9488] transition-all"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Question card */}
        <div className="mb-4 rounded-2xl bg-white p-6 shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.08)]">
          <div className="text-center">
            <div className="text-6xl font-extrabold leading-none text-slate-900">{q.letter}</div>
            <div className="mt-3 text-lg font-semibold">{q.translit}</div>
            <div className="mt-2 text-sm text-gray-500">{q.prompt}</div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3">
            {q.options.map((opt) => {
              const isSelected = selected === opt.key;
              const bg = answered ? (opt.correct ? 'bg-green-50' : isSelected ? 'bg-red-50' : 'bg-white') : 'bg-white';
              const border = isSelected ? 'border-teal-500' : 'border-gray-100';
              return (
                <Button
                  key={opt.key}
                  onClick={() => handleSelect(opt.key)}
                  className={`w-full rounded-lg border ${border} ${bg} p-4 text-left justify-start`}
                  aria-pressed={isSelected}
                >
                  <div className="flex w-full items-center justify-between">
                    <div className="text-sm font-medium">{opt.label}</div>
                    {answered && opt.correct && <div className="text-sm font-semibold text-teal-600">To'g'ri</div>}
                    {answered && isSelected && !opt.correct && <div className="text-sm font-semibold text-red-600">Noto'g'ri</div>}
                  </div>
                </Button>
              );
            })}
          </div>

          {showHint && (
            <div className="mt-4 rounded-md bg-yellow-50 p-3 text-sm text-yellow-800">HINT: Harfni yuqoridagi tovush bilan solishtiring.</div>
          )}
        </div>

        {/* Controls */}
        <div className="mb-6 flex items-center justify-between">
          <Button onClick={() => setShowHint((s) => !s)} className="px-4 py-2">Ko'rsatma</Button>
          <div className="flex items-center gap-3">
            <Button onClick={() => { /* replay audio placeholder */ }} className="px-3 py-2">🔁</Button>
            <Button onClick={() => { if (index < questions.length - 1) setIndex(i => i + 1); else navigate('/arab-tili/lessons'); }} className="px-3 py-2">⏭</Button>
          </div>
        </div>
      </div>

      {/* Sticky bottom next action */}
      <div className="fixed bottom-4 left-0 right-0 z-30">
        <div className="mx-auto max-w-[640px] px-4">
          <Button
            disabled={!answered}
            className={`w-full rounded-[12px] py-4 font-semibold text-white shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1)] ${answered ? 'bg-[#0D9488]' : 'bg-gray-300'}`}
            onClick={handleNext}
            aria-disabled={!answered}
          >
            {index < questions.length - 1 ? 'Keyingi savol' : 'Darsni yakunlash'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ArabTiliBotLessonPlayPage;
