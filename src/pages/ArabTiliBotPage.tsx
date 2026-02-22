import { ArabTiliBotMain } from '@/modules/arabtilibot/ui/ArabTiliBotMain';

import { usePageMetadata } from '@/libs/usePageMetadata';

export const ArabTiliBotPage = () => {
  usePageMetadata({ title: 'Arabic Language Bot' });

  return <ArabTiliBotMain />;
};

export default ArabTiliBotPage;
