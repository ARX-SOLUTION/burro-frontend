import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Share01 } from '@untitledui/icons';

import BottomNav from '@/modules/arabtilibot/ui/BottomNav';

import { usePageMetadata } from '@burro/shared/libs/usePageMetadata';

type ModuleCompletedState = {
  moduleTitle: string;
  xpEarned: number;
  accuracyPct: number;
  nextModuleId?: string;
};

function handleTelegramShare(title: string, accuracyPct: number, xpEarned: number) {
  const text = `Men Burro'da "${title}" modulini tugatdim!\nAniqlik: ${accuracyPct}%\nXP: +${xpEarned}\n\n@BurroArabicBot orqali arab tilini o'rganing!`;

  if (window.Telegram?.WebApp?.openTelegramLink) {
    window.Telegram.WebApp.openTelegramLink(
      `https://t.me/share/url?url=https://t.me/BurroArabicBot&text=${encodeURIComponent(text)}`,
    );
  } else {
    window.open(
      `https://t.me/share/url?url=https://t.me/BurroArabicBot&text=${encodeURIComponent(text)}`,
      '_blank',
    );
  }
}

export const ModuleCompletedPage = () => {
  usePageMetadata({ title: 'Modul tugadi' });

  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as ModuleCompletedState | null;

  const handleGoHome = useCallback(() => navigate('/burro'), [navigate]);
  const handleNextModule = useCallback(() => {
    if (state?.nextModuleId) navigate(`/burro/practice/${state.nextModuleId}`);
  }, [navigate, state?.nextModuleId]);
  const handleShare = useCallback(() => {
    if (state) handleTelegramShare(state.moduleTitle, state.accuracyPct, state.xpEarned);
  }, [state]);

  if (!state) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <p className="text-gray-500">Maʼlumot topilmadi.</p>
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
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-success-500 to-teal-700">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col items-center px-4 pt-16 pb-8 text-center">
        <div className="flex size-24 items-center justify-center rounded-full bg-white/20 text-5xl">
          🎉
        </div>

        {state.nextModuleId && (
          <div className="mt-4 inline-flex items-center gap-1 rounded-full bg-amber-400/30 px-3 py-1 text-xs text-amber-200">
            Yangi modul ochildi!
          </div>
        )}

        <h1 className="mt-4 text-2xl font-bold text-white">Tabriklaymiz!</h1>
        <p className="mt-2 text-lg text-white/80">{state.moduleTitle}</p>
        <p className="mt-1 text-sm text-white/60">Modul muvaffaqiyatli tugatildi</p>

        <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-white/20 px-4 py-2 text-xl font-bold text-white">
          +{state.xpEarned} XP
        </div>

        <div className="mt-8 w-full rounded-2xl bg-white/15 p-4">
          <div className="flex items-center justify-between text-sm text-white">
            <span>Aniqlik</span>
            <span className="font-semibold">{state.accuracyPct}%</span>
          </div>
        </div>

        <div className="mt-auto w-full space-y-3 pt-8">
          <button
            type="button"
            onClick={handleShare}
            className="flex w-full items-center justify-center gap-2 rounded-[28px] bg-white/20 py-4 font-bold text-white"
          >
            <Share01 className="size-5" />
            Telegram'da ulashish
          </button>
          {state.nextModuleId && (
            <button
              type="button"
              onClick={handleNextModule}
              className="flex w-full items-center justify-center gap-2 rounded-[28px] bg-white py-4 font-bold text-teal-700"
            >
              Keyingi modul
              <ArrowRight className="size-5" />
            </button>
          )}
          <button
            type="button"
            onClick={handleGoHome}
            className="w-full rounded-[28px] border border-white/30 py-4 font-bold text-white"
          >
            Bosh sahifaga qaytish
          </button>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default ModuleCompletedPage;
