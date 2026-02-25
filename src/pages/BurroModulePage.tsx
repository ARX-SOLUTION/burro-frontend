import ModulesList from '@/modules/arabtilibot/ui/ModulesList';

import { usePageMetadata } from '@/libs/usePageMetadata';

export const BurroModulePage = () => {
  usePageMetadata({ title: 'Modullar' });
  return (
    <div className="p-4 pb-28">
      <h1 className="mb-4 text-xl font-semibold">Modullar</h1>
      <ModulesList />
    </div>
  );
};

export default BurroModulePage;
