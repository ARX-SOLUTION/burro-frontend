import Profile from '@/modules/arabtilibot/ui/Profile';

import { usePageMetadata } from '@/libs/usePageMetadata';

export const BurroProfilePage = () => {
  usePageMetadata({ title: 'Profil' });
  return <Profile />;
};

export default BurroProfilePage;
