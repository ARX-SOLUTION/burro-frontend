import { memo } from 'react';

import type { BurroModuleListItem } from '@/modules/arabtilibot/types/view';

import ModuleCard from './ModuleCard';

type ModulesListProps = {
  modules: BurroModuleListItem[];
  isLoading?: boolean;
  errorMessage?: string | null;
  onRetry?: () => void;
  onStart: (id: string) => void;
};

function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 rounded-[20px] bg-white p-4">
      <div className="h-14 w-16 shrink-0 animate-pulse rounded-2xl bg-gray-100" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-3/5 animate-pulse rounded-full bg-gray-100" />
        <div className="h-3 w-2/5 animate-pulse rounded-full bg-gray-100" />
      </div>
      <div className="h-3 w-8 animate-pulse rounded-full bg-gray-100" />
    </div>
  );
}

const ModulesList = memo(function ModulesList({
  modules,
  isLoading = false,
  errorMessage,
  onRetry,
  onStart,
}: ModulesListProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[0, 1, 2, 3].map((i) => (
          <SkeletonRow key={i} />
        ))}
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="rounded-[20px] bg-white p-4 text-sm text-red-600 shadow-sm">
        <p>{errorMessage}</p>
        {onRetry && (
          <button type="button" onClick={onRetry} className="mt-3 font-semibold text-teal-600">
            Qayta urinish
          </button>
        )}
      </div>
    );
  }

  if (!modules.length) {
    return (
      <div className="flex flex-col items-center gap-3 py-12 text-center">
        <div className="h-[120px] w-[120px] rounded-[24px] bg-gray-100" />
        <p className="text-sm text-gray-500">Hozircha siz uchun modullar topilmadi.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {modules.map((m) => (
        <ModuleCard key={m.id} module={m} onStart={onStart} />
      ))}
    </div>
  );
});

export default ModulesList;
