import Welcome from '@/modules/arabtilibot/ui/Welcome';

import { usePageMetadata } from '@burro/shared/libs/usePageMetadata';

export const HomePage = () => {
  usePageMetadata({
    title: 'Burro — Xush kelibsiz',
    description: 'Arab tilini Burro bilan qisqa va qiziqarli darslar orqali boshlang.',
  });

  return <Welcome />;
};
