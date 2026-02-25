import Leaderboard from '@/modules/arabtilibot/ui/Leaderboard';

import { usePageMetadata } from '@/libs/usePageMetadata';

export const BurroLeaderboardPage = () => {
  usePageMetadata({ title: 'Reyting' });
  return <Leaderboard />;
};

export default BurroLeaderboardPage;
