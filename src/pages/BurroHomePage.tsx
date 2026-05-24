import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { mapStudentHomeToDashboardData } from '@/modules/arabtilibot/libs/mappers';
import { useStudentHome } from '@/modules/arabtilibot/services/useStudentHome';
import BottomNav from '@/modules/arabtilibot/ui/BottomNav';
import { HomeScreen } from '@/modules/arabtilibot/ui/screens/HomeScreen';
import { getErrorMessage } from '@/modules/common';

import { LoadingIndicator } from '@/components/application/loading-indicator/loading-indicator';
import { useAuth } from '@/hooks/use-auth';
import { usePageMetadata } from '@/libs/usePageMetadata';

export const BurroHomePage = () => {
  usePageMetadata({ title: 'Burro' });

  const navigate = useNavigate();
  const { user } = useAuth();
  const { data, isLoading, error, refetch } = useStudentHome();

  const dashboardData = useMemo(() => {
    if (!data) return null;

    const mapped = mapStudentHomeToDashboardData(data);
    const firstName = user?.fullName?.split(' ')[0] ?? '';

    return {
      ...mapped,
      greeting: firstName ? `${firstName}, bugungi darsga tayyormisiz?` : mapped.greeting,
    };
  }, [data, user?.fullName]);

  const handleOpenModulesList = useCallback(() => navigate('/burro/modules'), [navigate]);

  const handleStartLesson = useCallback(
    (lessonId: string) => navigate(lessonId ? `/burro/practice/${lessonId}` : '/burro/modules'),
    [navigate],
  );

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50/95 px-4 py-10">
        <div className="w-full max-w-xl overflow-hidden rounded-[32px] border border-slate-200/70 bg-white/90 p-10 shadow-[0_35px_80px_-35px_rgba(15,23,42,0.25)] backdrop-blur-md">
          <div className="flex flex-col items-center gap-8 text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 via-cyan-500 to-sky-500 shadow-[0_20px_60px_rgba(14,165,233,0.25)]">
              <LoadingIndicator type="dot-circle" size="xl" />
            </div>
            <div>
              <p className="text-xs tracking-[0.35em] text-teal-600 uppercase">Burro</p>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">
                Bosh sahifa yuklanmoqda...
              </h1>
              <p className="mt-3 max-w-lg text-sm leading-6 text-slate-500">
                Vaqtinchalik kuting — eng yangi darslar va progress ma&apos;lumotlari tez orada
                yuklanadi.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="rounded-lg bg-white p-4 text-sm text-red-600 shadow-sm">
          <p>{getErrorMessage(error, 'Bosh sahifani yuklab bo‘lmadi')}</p>
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
    return <div className="p-4 text-sm text-gray-500">Bosh sahifa ma&apos;lumoti topilmadi.</div>;
  }

  const hasModules = !!data.continue_module || data.recent_modules.length > 0;

  return (
    <div className="pb-28">
      <HomeScreen
        data={dashboardData!}
        onOpenModulesList={handleOpenModulesList}
        onStartLesson={handleStartLesson}
      />
      {!hasModules && (
        <div className="mx-auto mt-4 max-w-[402px] px-4">
          <div className="rounded-2xl bg-white p-4 text-sm text-gray-500 shadow-sm">
            Hozircha faol modullar yo‘q. Admin yangi modul qo‘shgach shu yerda ko‘rinadi.
          </div>
        </div>
      )}
      <BottomNav />
    </div>
  );
};

export default BurroHomePage;
