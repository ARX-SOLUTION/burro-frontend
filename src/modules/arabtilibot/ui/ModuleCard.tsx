import { Module } from '@/modules/arabtilibot/data/mock';

import { Button } from '@/components/base/buttons/button';

export default function ModuleCard({
  module,
  onStart,
}: {
  module: Module;
  onStart?: (id: string) => void;
}) {
  return (
    <div className="rounded-lg bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-500">Modul</div>
          <div className="text-base font-semibold">{module.title}</div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-400">{module.progress || 0}%</div>
          <div className="mt-2 h-3 w-20 rounded bg-gray-100">
            <div
              className="h-3 rounded bg-teal-600"
              style={{ width: `${module.progress || 0}%` }}
            />
          </div>
        </div>
      </div>
      <div className="mt-3 text-sm text-gray-600">{module.description}</div>
      <div className="mt-4">
        <Button onClick={() => onStart?.(module.id)} className="w-full">
          Boshlash
        </Button>
      </div>
    </div>
  );
}
