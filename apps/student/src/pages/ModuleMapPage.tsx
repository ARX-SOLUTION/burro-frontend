import { useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from '@untitledui/icons';

import { useModuleDetail } from '@/modules/arabtilibot/services/useModuleDetail';
import { getErrorMessage } from '@burro/shared/modules/common';

import { usePageMetadata } from '@burro/shared/libs/usePageMetadata';

export const ModuleMapPage = () => {
  usePageMetadata({ title: 'Modul' });

  const { moduleId } = useParams() as { moduleId?: string };
  const navigate = useNavigate();
  const { data, isLoading, error, refetch } = useModuleDetail(moduleId ?? '');

  const statusLabel = useMemo(() => {
    if (!data) return '';
    switch (data.status) {
      case 'locked':
        return 'Yopiq';
      case 'open':
        return 'Boshlashga tayyor';
      case 'in_progress':
        return 'Davom etmoqda';
      case 'completed':
        return 'Tamomlangan';
      default:
        return '';
    }
  }, [data]);

  const handleStart = useCallback(() => {
    if (moduleId) navigate(`/burro/practice/${moduleId}`);
  }, [moduleId, navigate]);

  const handleBack = useCallback(() => {
    navigate('/burro/modules');
  }, [navigate]);

  if (!moduleId) {
    return (
      <div className="p-4">
        <div className="rounded-lg bg-white p-4 text-sm text-gray-500 shadow-sm">
          Modul aniqlanmadi.
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="h-6 w-32 animate-pulse rounded-full bg-gray-200" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="rounded-lg bg-white p-4 text-sm text-red-600 shadow-sm">
          <p>{getErrorMessage(error, 'Modul maʼlumotini yuklab bo‘lmadi')}</p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-3 font-semibold text-teal-600"
          >
            Qayta urinish
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-4">
        <div className="rounded-lg bg-white p-4 text-sm text-gray-500 shadow-sm">
          Modul topilmadi.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-blue-900 via-gray-blue-950 to-gray-blue-950">
      <div className="mx-auto w-full max-w-[402px] px-4 pt-4">
        <button
          type="button"
          onClick={handleBack}
          aria-label="Orqaga"
          className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white"
        >
          <ArrowLeft className="size-5" />
        </button>

        <div className="mt-8 flex flex-col items-center text-center">
          <div
            className="flex size-24 items-center justify-center rounded-full text-4xl font-bold shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${data.icon_color}, ${data.icon_color}88)`,
            }}
          >
            <span className="text-white">{data.icon_letter}</span>
          </div>

          <h1 className="mt-6 text-2xl font-bold text-white">{data.title}</h1>
          {data.description && (
            <p className="mt-2 text-sm leading-5 text-white/70">{data.description}</p>
          )}

          <span className="mt-4 inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">
            {statusLabel}
          </span>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-white/10 p-4 text-center">
            <p className="text-xs text-white/60">Savollar</p>
            <p className="mt-1 text-lg font-semibold text-white">{data.total_questions}</p>
          </div>
          <div className="rounded-2xl bg-white/10 p-4 text-center">
            <p className="text-xs text-white/60">Vaqt</p>
            <p className="mt-1 text-lg font-semibold text-white">{data.estimated_min} daqiqa</p>
          </div>
          <div className="rounded-2xl bg-white/10 p-4 text-center">
            <p className="text-xs text-white/60">XP</p>
            <p className="mt-1 text-lg font-semibold text-white">+{data.xp_reward}</p>
          </div>
          <div className="rounded-2xl bg-white/10 p-4 text-center">
            <p className="text-xs text-white/60">Urinishlar</p>
            <p className="mt-1 text-lg font-semibold text-white">{data.attempts_count}</p>
          </div>
        </div>

        {data.best_attempt && (
          <div className="mt-6 rounded-2xl bg-white/10 p-4">
            <p className="text-xs font-semibold text-white/60">Eng yaxshi natija</p>
            <div className="mt-2 flex items-center justify-between text-sm text-white">
              <span>Aniqlik</span>
              <span className="font-semibold">{data.best_attempt.accuracy_pct ?? 0}%</span>
            </div>
            <div className="mt-1 flex items-center justify-between text-sm text-white">
              <span>XP</span>
              <span className="font-semibold">+{data.best_attempt.xp_earned}</span>
            </div>
          </div>
        )}

        {data.status !== 'locked' && (
          <button
            type="button"
            onClick={handleStart}
            className="mt-8 w-full rounded-[28px] bg-gradient-to-r from-blue-600 to-teal-400 py-4 text-base font-bold text-white shadow-button"
          >
            {data.status === 'completed'
              ? 'Qayta boshlash'
              : data.status === 'in_progress'
                ? 'Davom etish'
                : 'Boshlash'}
          </button>
        )}
      </div>
    </div>
  );
};

export default ModuleMapPage;
