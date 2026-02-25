import { useLocation } from 'react-router-dom';

import Welcome from '@/modules/arabtilibot/ui/Welcome';

import { usePageMetadata } from '@/libs/usePageMetadata';

export const BurroWelcomePage = () => {
  usePageMetadata({ title: 'Welcome' });
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const variant = params.get('variant') === 'figma-3-50' ? 'figma-3-50' : 'default';
  return <Welcome variant={variant} />;
};

export default BurroWelcomePage;
