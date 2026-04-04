import { useMemo } from 'react';

import { mapProfileToView } from '@/modules/arabtilibot/libs/mappers';
import { useStudentProfile } from '@/modules/arabtilibot/services/useStudentProfile';
import { useStudentStatistics } from '@/modules/arabtilibot/services/useStudentStatistics';
import BottomNav from '@/modules/arabtilibot/ui/BottomNav';
import Profile from '@/modules/arabtilibot/ui/Profile';
import { getErrorMessage } from '@/modules/common';

import { usePageMetadata } from '@/libs/usePageMetadata';

export const BurroProfilePage = () => {
  usePageMetadata({ title: 'Profil' });
  const profileQuery = useStudentProfile();
  const statisticsQuery = useStudentStatistics();

  const profileData = useMemo(() => {
    if (!profileQuery.data || !statisticsQuery.data) return undefined;
    return mapProfileToView(profileQuery.data, statisticsQuery.data);
  }, [profileQuery.data, statisticsQuery.data]);

  const error =
    profileQuery.error || statisticsQuery.error
      ? getErrorMessage(profileQuery.error || statisticsQuery.error, 'Profilni yuklab bo‘lmadi')
      : null;

  return (
    <>
      <div className="pb-28">
        <Profile
          profile={profileData}
          isLoading={profileQuery.isLoading || statisticsQuery.isLoading}
          errorMessage={error}
          onRetry={() => {
            void profileQuery.refetch();
            void statisticsQuery.refetch();
          }}
        />
      </div>
      <BottomNav />
    </>
  );
};

export default BurroProfilePage;
