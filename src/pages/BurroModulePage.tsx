import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { mapModulesToListItems } from '@/modules/arabtilibot/libs/mappers';
import { useBurroModules } from '@/modules/arabtilibot/services/useBurroModules';
import type { ModuleFilter } from '@/modules/arabtilibot/types/api';
import BottomNav from '@/modules/arabtilibot/ui/BottomNav';
import ModulesList from '@/modules/arabtilibot/ui/ModulesList';
import { getErrorMessage } from '@/modules/common';

import { usePageMetadata } from '@/libs/usePageMetadata';

export const BurroModulePage = () => {
  usePageMetadata({ title: 'Modullar' });
  const navigate = useNavigate();
  const [filter, setFilter] = useState<ModuleFilter>('all');
  const { data, isLoading, error, refetch } = useBurroModules(filter);

  const modules = useMemo(() => (data ? mapModulesToListItems(data) : []), [data]);

  return (
    <>
      <div className="p-4 pb-28">
        <h1 className="mb-4 text-xl font-semibold">Modullar</h1>
        <div className="mb-4 flex gap-2">
          {(
            [
              ['all', 'Barchasi'],
              ['open', 'Ochiq'],
              ['completed', 'Tamomlangan'],
            ] as Array<[ModuleFilter, string]>
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              className={`rounded-full px-3 py-2 text-sm font-semibold ${filter === value ? 'bg-teal-600 text-white' : 'bg-white text-gray-600'}`}
            >
              {label}
            </button>
          ))}
        </div>
        <ModulesList
          modules={modules}
          isLoading={isLoading}
          errorMessage={error ? getErrorMessage(error, 'Modullarni yuklab bo‘lmadi') : null}
          onRetry={() => refetch()}
          onStart={(id) => navigate(`/burro/practice/${id}`)}
        />
      </div>
      <BottomNav />
    </>
  );
};

export default BurroModulePage;
