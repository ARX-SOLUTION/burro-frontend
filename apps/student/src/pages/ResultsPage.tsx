import { useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import type { FinishAttemptResponse } from '@/modules/arabtilibot/types/api';
import BottomNav from '@/modules/arabtilibot/ui/BottomNav';

import { usePageMetadata } from '@burro/shared/libs/usePageMetadata';

type ResultsState = FinishAttemptResponse & { moduleId?: string };

function CircularProgress({ pct }: { pct: number }) {
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="relative flex size-32 items-center justify-center">
      <svg className="-rotate-90" width="128" height="128" viewBox="0 0 128 128">
        <circle
          cx="64" cy="64" r={radius}
          fill="none"
          stroke="white"
          strokeOpacity="0.15"
          strokeWidth="8"
        />
        <circle
          cx="64" cy="64" r={radius}
          fill="none"
          stroke={pct >= 80 ? '#34d399' : pct >= 50 ? '#fbbf24' : '#f87171'}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute text-2xl font-bold text-white">{pct}%</span>
    </div>
  );
}

function Confetti() {
  const particles = useMemo(() =>
    Array.from({ length: 24 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 0.8}s`,
      duration: `${1 + Math.random() * 1.5}s`,
      color: ['#34d399', '#fbbf24', '#f87171', '#60a5fa', '#a78bfa', '#f472b6'][i % 6],
      size: 6 + Math.random() * 8,
    })), []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-bounce rounded-sm"
          style={{
            left: p.left,
            top: '-10px',
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animation: `confetti-fall ${p.duration} ease-in ${p.delay} infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes confetti-fall {
          0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

function formatTime(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export const ResultsPage = () => {
  usePageMetadata({ title: 'Natija' });

  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as ResultsState | null;
  const moduleId = state?.moduleId;

  const wrongQuestions = useMemo(() => state?.wrong_questions ?? [], [state]);

  const encouragement = useMemo(() => {
    if (!state) return '';
    if (state.accuracy_pct === 100) return "Ajoyib!";
    if (state.accuracy_pct >= 80) return "Zo'r!";
    if (state.accuracy_pct >= 50) return "Yaxshi!";
    return 'Yana urinib ko\'ring';
  }, [state]);

  const showConfetti = state?.accuracy_pct === 100;

  const handleGoHome = useCallback(() => navigate('/burro'), [navigate]);
  const handleGoModules = useCallback(
    () => navigate(moduleId ? `/burro/modules/${moduleId}` : '/burro/modules'),
    [navigate, moduleId],
  );
  const handleRetry = useCallback(() => {
    if (moduleId) navigate(`/burro/practice/${moduleId}`);
  }, [navigate, moduleId]);

  if (!state) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
        <p className="text-gray-500">Natija maʼlumoti topilmadi.</p>
        <button
          type="button"
          onClick={handleGoHome}
          className="mt-4 rounded-[28px] bg-teal-600 px-8 py-4 font-bold text-white"
        >
          Bosh sahifaga qaytish
        </button>
        <BottomNav />
      </div>
    );
  }

  return (
    <>
      {showConfetti && <Confetti />}
      <div className="flex min-h-screen flex-col bg-gradient-to-b from-teal-600 to-teal-800">
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col px-4 pt-12 pb-8">
          <div className="flex flex-col items-center text-center">
            <CircularProgress pct={state.accuracy_pct} />
            <h1 className="mt-4 text-2xl font-bold text-white">{state.module_title}</h1>
            <p className="mt-1 text-lg font-semibold text-white/80">{encouragement}</p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white/15 p-4 text-center">
              <p className="text-xs text-white/60">XP</p>
              <p className="mt-1 text-xl font-bold text-warning-300">+{state.xp_earned}</p>
            </div>
            <div className="rounded-2xl bg-white/15 p-4 text-center">
              <p className="text-xs text-white/60">Vaqt</p>
              <p className="mt-1 text-xl font-bold text-white">{formatTime(state.time_spent_sec)}</p>
            </div>
            <div className="rounded-2xl bg-white/15 p-4 text-center">
              <p className="text-xs text-white/60">Toʻgʻri</p>
              <p className="mt-1 text-xl font-bold text-success-300">{state.correct_count}</p>
            </div>
            <div className="rounded-2xl bg-white/15 p-4 text-center">
              <p className="text-xs text-white/60">Xato</p>
              <p className="mt-1 text-xl font-bold text-error-300">{state.wrong_count}</p>
            </div>
          </div>

          {wrongQuestions.length > 0 && (
            <div className="mt-6 flex-1 overflow-y-auto">
              <p className="mb-3 text-sm font-semibold text-white/80">
                Xato savollar ({wrongQuestions.length})
              </p>
              <div className="space-y-2">
                {wrongQuestions.map((q) => (
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
            {moduleId && (
              <button
                type="button"
                onClick={handleRetry}
                className="w-full rounded-[28px] bg-amber-500 py-4 font-bold text-white"
              >
                Qayta urinish
              </button>
            )}
            <button
              type="button"
              onClick={handleGoModules}
              className="w-full rounded-[28px] border border-white/30 py-4 font-bold text-white"
            >
              Modulga qaytish
            </button>
            <button
              type="button"
              onClick={handleGoHome}
              className="w-full rounded-[28px] bg-white py-4 font-bold text-teal-700"
            >
              Bosh sahifaga qaytish
            </button>
          </div>
        </div>
        <BottomNav />
      </div>
    </>
  );
};

export default ResultsPage;