import { useMemo } from 'react';

import { mapProfileToView } from '@/modules/arabtilibot/libs/mappers';
import { useStudentProfile } from '@/modules/arabtilibot/services/useStudentProfile';
import { useStudentStatistics } from '@/modules/arabtilibot/services/useStudentStatistics';
import { useUpdateStudentProfile } from '@/modules/arabtilibot/services/useUpdateStudentProfile';
import BottomNav from '@/modules/arabtilibot/ui/BottomNav';
import Profile from '@/modules/arabtilibot/ui/Profile';
import { getErrorMessage } from '@/modules/common';

import { usePageMetadata } from '@/libs/usePageMetadata';

export const BurroProfilePage = () => {
  usePageMetadata({ title: 'Profil' });
  const profileQuery = useStudentProfile();
  const statisticsQuery = useStudentStatistics();
  const updateMutation = useUpdateStudentProfile();

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
          isSaving={updateMutation.isPending}
          errorMessage={error}
          onSave={(data) => void updateMutation.mutateAsync(data)}
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
