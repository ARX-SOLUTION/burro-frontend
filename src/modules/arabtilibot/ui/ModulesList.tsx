import type { BurroModuleListItem } from '@/modules/arabtilibot/types/view';

import ModuleCard from './ModuleCard';

type ModulesListProps = {
  modules: BurroModuleListItem[];
  isLoading?: boolean;
  errorMessage?: string | null;
  onRetry?: () => void;
  onStart: (id: string) => void;
};

export default function ModulesList({
  modules,
  isLoading = false,
  errorMessage,
  onRetry,
  onStart,
}: ModulesListProps) {
  if (isLoading) {
    return (
      <div className="rounded-lg bg-white p-4 text-sm text-gray-500">Modullar yuklanmoqda...</div>
    );
  }

  if (errorMessage) {
    return (
      <div className="rounded-lg bg-white p-4 text-sm text-red-600 shadow-sm">
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
      <div className="rounded-lg bg-white p-4 text-sm text-gray-500 shadow-sm">
        Hozircha siz uchun modullar topilmadi.
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
}
