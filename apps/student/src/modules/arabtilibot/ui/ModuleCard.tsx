import { memo } from 'react';

import type { BurroModuleListItem } from '@/modules/arabtilibot/types/view';

type ModuleCardProps = {
  module: BurroModuleListItem;
  onStart?: (id: string) => void;
};

const ModuleCard = ({ module, onStart }: ModuleCardProps) => {
  const isLocked = module.status === 'locked';
  const isActive = module.status === 'in_progress';

  return (
    <button
      type="button"
      onClick={() => !isLocked && onStart?.(module.id)}
      disabled={isLocked}
      className={`flex w-full items-center gap-4 rounded-[20px] bg-white p-4 text-left shadow-card transition-transform active:translate-y-px disabled:cursor-not-allowed ${
        isActive ? 'border-l-4 border-l-teal-400' : ''
      }`}
    >
      {/* Thumbnail */}
      <div
        className={`flex h-14 w-16 shrink-0 items-center justify-center rounded-2xl ${
          isLocked ? 'bg-gray-100' : 'bg-gradient-to-br from-teal-500 to-blue-600'
        }`}
      >
        {isLocked ? (
          <svg className="size-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17 9V7A5 5 0 0 0 7 7v2H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V10a1 1 0 0 0-1-1h-2zm-2 0H9V7a3 3 0 1 1 6 0v2z" />
          </svg>
        ) : (
          <span className="font-arabic text-[28px] leading-none font-bold text-white" dir="rtl">
            {module.title.charAt(0)}
          </span>
        )}
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1">
        <p
          className={`truncate text-base leading-5 font-bold ${
            isLocked ? 'text-gray-400' : 'text-gray-900'
          }`}
        >
          {module.title}
        </p>
        <p className={`mt-0.5 text-xs leading-4 ${isLocked ? 'text-gray-300' : 'text-gray-500'}`}>
          {module.description}
        </p>
        {module.progressPercent > 0 && !isLocked && (
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-teal-500"
              style={{ width: `${module.progressPercent}%` }}
            />
          </div>
        )}
      </div>

      {/* Right: progress % or lock */}
      <div className="shrink-0 text-right">
        {isLocked ? (
          <span className="text-xs font-semibold text-gray-300">{module.statusLabel}</span>
        ) : (
          <span className="text-xs font-semibold text-teal-600">
            {module.progressPercent > 0 ? `${module.progressPercent}%` : module.meta}
          </span>
        )}
      </div>
    </button>
  );
};

export default memo(ModuleCard);
