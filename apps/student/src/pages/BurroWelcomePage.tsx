import { useLocation } from 'react-router-dom';

import Welcome from '@/modules/arabtilibot/ui/Welcome';

import { usePageMetadata } from '@burro/shared/libs/usePageMetadata';

export const BurroWelcomePage = () => {
  usePageMetadata({
    title: 'Burro — Xush kelibsiz',
    description: 'Arab tilini Burro bilan qisqa va qiziqarli darslar orqali boshlang.',
  });
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const rawVariant = params.get('variant');
  const variant =
    rawVariant === 'figma-3-50' || rawVariant === 'figma-3-51' ? rawVariant : 'default';
  return <Welcome variant={variant} />;
};

export default BurroWelcomePage;
