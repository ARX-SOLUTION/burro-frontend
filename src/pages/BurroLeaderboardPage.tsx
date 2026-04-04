import { useMemo, useState } from 'react';

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

  return (
    <>
      <div className="pb-28">
        <Leaderboard
          data={data}
          period={period}
          onPeriodChange={setPeriod}
          isLoading={leaderboardQuery.isLoading}
          errorMessage={
            leaderboardQuery.error
              ? getErrorMessage(leaderboardQuery.error, 'Reytingni yuklab bo‘lmadi')
              : null
          }
          onRetry={() => void leaderboardQuery.refetch()}
        />
      </div>
      <BottomNav />
    </>
  );
};

export default BurroLeaderboardPage;
