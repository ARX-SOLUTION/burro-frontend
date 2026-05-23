import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { mapStudentHomeToDashboardData } from '@/modules/arabtilibot/libs/mappers';
import { useStudentHome } from '@/modules/arabtilibot/services/useStudentHome';
import BottomNav from '@/modules/arabtilibot/ui/BottomNav';
import { HomeScreen } from '@/modules/arabtilibot/ui/screens/HomeScreen';
import { getErrorMessage } from '@/modules/common';

import { usePageMetadata } from '@/libs/usePageMetadata';

export const BurroHomePage = () => {
  usePageMetadata({ title: 'Burro' });

  const navigate = useNavigate();
  const { data, isLoading, error, refetch } = useStudentHome();

  const dashboardData = useMemo(() => (data ? mapStudentHomeToDashboardData(data) : null), [data]);

  const handleOpenModulesList = useCallback(() => navigate('/burro/modules'), [navigate]);

  const handleStartLesson = useCallback(
    (lessonId: string) => navigate(lessonId ? `/burro/practice/${lessonId}` : '/burro/modules'),
    [navigate],
  );

  if (isLoading) {
    return <div className="p-4 text-sm text-gray-500">Bosh sahifa yuklanmoqda...</div>;
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
