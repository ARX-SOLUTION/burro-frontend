import BottomNav from '@/modules/arabtilibot/ui/BottomNav';
import Home from '@/modules/arabtilibot/ui/Home';

import { usePageMetadata } from '@/libs/usePageMetadata';

export const BurroHomePage = () => {
  usePageMetadata({ title: 'Burro' });
  return (
    <div className="pb-28">
      <Home />
      <BottomNav />
    </div>
  );
};

export default BurroHomePage;
