import { ArabTiliBotLessons } from '@/modules/arabtilibot/ui/ArabTiliBotLessons';

import { usePageMetadata } from '@/libs/usePageMetadata';

export const ArabTiliBotLessonsPage = () => {
  usePageMetadata({ title: 'Arab tili — Darslar' });

  return <ArabTiliBotLessons />;
};

export default ArabTiliBotLessonsPage;
