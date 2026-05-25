import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from '@untitledui/icons';

import { useParentChildren } from '@/modules/parent';

import { usePageMetadata } from '@burro/shared/libs/usePageMetadata';

export const BurroChildrenPage = () => {
  usePageMetadata({ title: 'Farzandlar' });
  const navigate = useNavigate();
  const { data: children = [], isLoading } = useParentChildren();

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleChildClick = useCallback(
    (childId: string) => {
      navigate(`/burro/parent/children/${childId}`);
    },
    [navigate],
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      <div className="bg-gradient-to-b from-teal-600 to-teal-700 px-4 pt-12 pb-6">
        <button
          type="button"
          onClick={handleBack}
          className="mb-4 flex items-center gap-1 text-sm text-teal-100"
        >
          <ArrowLeft className="size-4" />
          Orqaga
        </button>
        <h1 className="text-xl font-bold text-white">Farzandlar</h1>
      </div>

      <div className="space-y-3 px-4 pt-4">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="size-8 animate-spin rounded-full border-4 border-teal-500 border-t-transparent" />
          </div>
        ) : children.length === 0 ? (
          <div className="rounded-xl bg-white p-8 text-center shadow-sm">
            <p className="text-gray-500">Hali farzand bog'lanmagan</p>
          </div>
        ) : (
          children.map((child) => (
            <button
              type="button"
              key={child.id}
              onClick={() => handleChildClick(child.id)}
              className="flex w-full items-center gap-4 rounded-xl bg-white p-4 text-left shadow-sm"
            >
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 text-lg font-bold text-white">
                {child.full_name[0]}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{child.full_name}</p>
                <div className="mt-1 flex items-center gap-3 text-xs text-gray-500">
                  <span>XP {child.xp_total}</span>
                  <span>🔥 {child.streak}</span>
                  <span>{child.modules_completed} modul</span>
                </div>
              </div>
              <span className="text-gray-400">&gt;</span>
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default BurroChildrenPage;
