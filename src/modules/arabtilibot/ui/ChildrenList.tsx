import { memo } from 'react';
import { ArrowLeft, Edit03, Plus } from '@untitledui/icons';

import type { ChildCard } from '@/modules/arabtilibot/types/children';

type ChildrenListProps = {
  childrenData: ChildCard[];
  isLoading?: boolean;
  onBack?: () => void;
  onEdit?: () => void;
  onAddChild?: () => void;
};

const ChildCardComponent = memo(function ChildCardComponent({ child }: { child: ChildCard }) {
  return (
    <div className="rounded-[28px] bg-white p-4 shadow-xl">
      <div className="flex items-center gap-4">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 text-xl font-bold text-white">
          {child.name[0]}
        </div>
        <div className="flex-1">
          <p className="text-lg leading-6 font-semibold text-gray-900">{child.name}</p>
          <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-warning-100 px-2 py-0.5 text-xs font-semibold text-warning-700">
            <span aria-hidden="true">🔥</span>
            <span>{child.className}</span>
          </div>
        </div>
      </div>
    </div>
  );
});
ChildCardComponent.displayName = 'ChildCardComponent';

const SkeletonList = memo(function SkeletonList() {
  return (
    <div className="space-y-3 px-4">
      {[0, 1].map((i) => (
        <div key={i} className="animate-pulse rounded-[28px] bg-white p-4 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="size-14 rounded-full bg-gray-100" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-24 rounded-full bg-gray-100" />
              <div className="h-3 w-20 rounded-full bg-gray-100" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});
SkeletonList.displayName = 'SkeletonList';

export default function ChildrenList({
  childrenData,
  isLoading = false,
  onBack,
  onEdit,
  onAddChild,
}: ChildrenListProps) {
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-blue-900 via-gray-blue-950 to-gray-blue-950">
        <div className="mx-auto min-h-screen w-full max-w-[402px]">
          <div className="px-4 pt-4">
            <div className="h-6 w-32 animate-pulse rounded-full bg-white/20" />
          </div>
          <div className="mt-6">
            <SkeletonList />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-blue-900 via-gray-blue-950 to-gray-blue-950">
      <div className="mx-auto flex min-h-screen w-full max-w-[402px] flex-col">
        <div className="flex items-center justify-between px-4 pt-2 pb-4">
          <button
            type="button"
            onClick={onBack}
            aria-label="Orqaga"
            className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white"
          >
            <ArrowLeft className="size-5" />
          </button>
          <h1 className="text-lg font-bold text-white">Farzandlar</h1>
          <button
            type="button"
            onClick={onEdit}
            aria-label="Tahrirlash"
            className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white"
          >
            <Edit03 className="size-5" />
          </button>
        </div>

        <div className="flex-1 space-y-3 px-4">
          {childrenData.map((child) => (
            <ChildCardComponent key={child.id} child={child} />
          ))}
        </div>

        <div className="px-4 py-6">
          <button
            type="button"
            onClick={onAddChild}
            className="flex w-full items-center justify-center gap-2 rounded-[28px] bg-gradient-to-r from-blue-600 to-teal-400 py-4 text-base font-bold text-white shadow-button"
          >
            <Plus className="size-5" />
            Qo&apos;shish
          </button>
        </div>
      </div>
    </div>
  );
}
