import { useCallback, useMemo, useState } from 'react';

import { mapLeaderboardToView } from '@/modules/arabtilibot/libs/mappers';
import { useLeaderboard } from '@/modules/arabtilibot/services/useLeaderboard';
import type { LeaderboardPeriod } from '@/modules/arabtilibot/types/api';
import BottomNav from '@/modules/arabtilibot/ui/BottomNav';
import Leaderboard from '@/modules/arabtilibot/ui/Leaderboard';
import { getErrorMessage } from '@/modules/common';

import { usePageMetadata } from '@/libs/usePageMetadata';

export const BurroLeaderboardPage = () => {
  usePageMetadata({ title: 'Reyting' });
  const [period, setPeriod] = useState<LeaderboardPeriod>('weekly');
  const leaderboardQuery = useLeaderboard(period);

  const data = useMemo(
    () => (leaderboardQuery.data ? mapLeaderboardToView(leaderboardQuery.data) : undefined),
    [leaderboardQuery.data],
  );

  const { refetch } = leaderboardQuery;

  const errorMessage = useMemo(
    () =>
      leaderboardQuery.error
        ? getErrorMessage(leaderboardQuery.error, 'Reytingni yuklab bo‘lmadi')
        : null,
    [leaderboardQuery.error],
  );

  const handlePeriodChange = useCallback((selectedPeriod: LeaderboardPeriod) => {
    setPeriod(selectedPeriod);
  }, []);

  const handleRetry = useCallback(() => {
    void refetch();
  }, [refetch]);

  return (
    <>
      <div className="pb-28">
        <Leaderboard
          data={data}
          period={period}
          onPeriodChange={handlePeriodChange}
          isLoading={leaderboardQuery.isLoading}
          errorMessage={errorMessage}
          onRetry={handleRetry}
        />
      </div>
      <BottomNav />
    </>
  );
};

export default BurroLeaderboardPage;
