import Welcome from '@/modules/arabtilibot/ui/Welcome';

import { usePageMetadata } from '@/libs/usePageMetadata';

export const BurroWelcomePage = () => {
  usePageMetadata({ title: 'Welcome' });
  return <Welcome />;
};

export default BurroWelcomePage;
