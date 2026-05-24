import PracticePlayer from '@/modules/arabtilibot/ui/PracticePlayer';

import { usePageMetadata } from '@burro/shared/libs/usePageMetadata';

export const BurroPracticePage = () => {
  usePageMetadata({ title: 'Amaliyot' });
  return <PracticePlayer />;
};

export default BurroPracticePage;
