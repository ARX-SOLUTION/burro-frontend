import { useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import type { FinishAttemptResponse } from '@/modules/arabtilibot/types/api';
import BottomNav from '@/modules/arabtilibot/ui/BottomNav';

import { usePageMetadata } from '@/libs/usePageMetadata';

export const ResultsPage = () => {
  usePageMetadata({ title: 'Natija' });

  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state as FinishAttemptResponse | null;

  const wrongQuestions = useMemo(() => result?.wrong_questions ?? [], [result]);

  const handleGoHome = useCallback(() => navigate('/burro'), [navigate]);
  const handleGoModules = useCallback(() => navigate('/burro/modules'), [navigate]);

  if (!result) {
    return (
      <div className="p-4">
        <div className="rounded-lg bg-white p-4 text-sm text-gray-500 shadow-sm">
          Natija maʼlumoti topilmadi.
        </div>
        <button
          type="button"
          onClick={handleGoHome}
          className="mt-4 w-full rounded-[28px] bg-teal-600 py-4 font-bold text-white"
        >
          Bosh sahifaga qaytish
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-teal-600 to-teal-800">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col px-4 pt-12 pb-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex size-20 items-center justify-center rounded-full bg-white/20 text-4xl">
            {result.accuracy_pct >= 80 ? '🎉' : result.accuracy_pct >= 50 ? '👍' : '💪'}
          </div>
          <h1 className="mt-4 text-2xl font-bold text-white">{result.module_title}</h1>
          <p className="mt-1 text-sm text-white/70">Natijalaringiz</p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-white/15 p-4 text-center">
            <p className="text-xs text-white/60">Aniqlik</p>
            <p className="mt-1 text-xl font-bold text-white">{result.accuracy_pct}%</p>
          </div>
          <div className="rounded-2xl bg-white/15 p-4 text-center">
            <p className="text-xs text-white/60">XP</p>
            <p className="mt-1 text-xl font-bold text-warning-300">+{result.xp_earned}</p>
          </div>
          <div className="rounded-2xl bg-white/15 p-4 text-center">
            <p className="text-xs text-white/60">Toʻgʻri</p>
            <p className="mt-1 text-xl font-bold text-success-300">{result.correct_count}</p>
          </div>
          <div className="rounded-2xl bg-white/15 p-4 text-center">
            <p className="text-xs text-white/60">Xato</p>
            <p className="mt-1 text-xl font-bold text-error-300">{result.wrong_count}</p>
          </div>
        </div>

        {wrongQuestions.length > 0 && (
          <div className="mt-6">
            <p className="mb-3 text-sm font-semibold text-white/80">Xato savollar</p>
            <div className="space-y-2">
              {wrongQuestions.slice(0, 5).map((q) => (
                <div key={q.question_id} className="rounded-xl bg-white/10 p-3">
                  <p className="text-xs text-white/50">{q.type}</p>
                  {q.arabic_letter && (
                    <p className="mt-1 text-lg font-bold text-white">{q.arabic_letter}</p>
                  )}
                  <div className="mt-1 flex gap-2 text-xs">
                    <span className="text-error-300">Siz: {q.given_answer}</span>
                    <span className="text-success-300">Toʻgʻri: {q.correct_answer}</span>
                  </div>
                  {q.tip && <p className="mt-1 text-xs text-white/50">{q.tip}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-auto space-y-3 pt-8">
          <button
            type="button"
            onClick={handleGoHome}
            className="w-full rounded-[28px] bg-white py-4 font-bold text-teal-700"
          >
            Bosh sahifaga qaytish
          </button>
          <button
            type="button"
            onClick={handleGoModules}
            className="w-full rounded-[28px] border border-white/30 py-4 font-bold text-white"
          >
            Boshqa modulni tanlash
          </button>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default ResultsPage;
