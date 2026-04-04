import type { BurroModuleListItem } from '@/modules/arabtilibot/types/view';

import { Button } from '@/components/base/buttons/button';

export default function ModuleCard({
  module,
  onStart,
}: {
  module: BurroModuleListItem;
  onStart?: (id: string) => void;
}) {
  return (
    <div className="rounded-lg bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-500">Modul</div>
          <div className="text-base font-semibold">{module.title}</div>
          <div className="mt-1 text-xs font-medium text-teal-600">{module.statusLabel}</div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-400">{module.progressPercent}%</div>
          <div className="mt-2 h-3 w-20 rounded bg-gray-100">
            <div
              className="h-3 rounded bg-teal-600"
              style={{ width: `${module.progressPercent}%` }}
            />
          </div>
        </div>
      </div>
      <div className="mt-3 text-sm text-gray-600">{module.description}</div>
      <div className="mt-1 text-xs text-gray-500">{module.meta}</div>
      <div className="mt-4">
        <Button
          onClick={() => onStart?.(module.id)}
          className="w-full"
          isDisabled={!module.canStart}
          color={module.canStart ? 'primary' : 'secondary'}
        >
          {module.ctaLabel}
        </Button>
      </div>
    </div>
  );
}
