import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from '@untitledui/icons';

import BottomNav from '@/modules/arabtilibot/ui/BottomNav';
import { useParentChildDetail } from '@/modules/parent';

import { usePageMetadata } from '@/libs/usePageMetadata';

const statusLabels: Record<string, string> = {
  completed: 'Yakunlangan',
  in_progress: 'Jarayonda',
  failed: 'Muvaffaqiyatsiz',
};

export const ParentChildDetailPage = () => {
  usePageMetadata({ title: 'Bola tafsilotlari' });
  const { childId } = useParams<{ childId: string }>();
  const navigate = useNavigate();
  const { data: child, isLoading } = useParentChildDetail(childId ?? '');

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="size-8 animate-spin rounded-full border-4 border-teal-500 border-t-transparent" />
      </div>
    );
  }

  if (!child) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
        <p className="text-gray-500">Bola topilmadi</p>
        <button type="button" onClick={handleBack} className="mt-4 text-sm text-teal-600">
          Orqaga qaytish
        </button>
      </div>
    );
  }

  return (
    <>
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
          <div className="flex items-center gap-4">
            <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-white/20 text-2xl font-bold text-white">
              {child.full_name[0]}
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">{child.full_name}</h1>
              <p className="mt-1 text-sm text-teal-100">
                {child.modules_completed}/{child.modules_total} modul
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3 px-4 pt-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-white p-3 text-center shadow-sm">
              <p className="text-2xl font-bold text-teal-600">{child.xp_total}</p>
              <p className="text-xs text-gray-500">XP</p>
            </div>
            <div className="rounded-xl bg-white p-3 text-center shadow-sm">
              <p className="text-2xl font-bold text-orange-500">{child.streak.current}</p>
              <p className="text-xs text-gray-500">Kunlik</p>
            </div>
            <div className="rounded-xl bg-white p-3 text-center shadow-sm">
              <p className="text-2xl font-bold text-blue-600">{child.accuracy_pct}%</p>
              <p className="text-xs text-gray-500">Aniqlik</p>
            </div>
          </div>

          {child.weak_letters.length > 0 && (
            <div className="rounded-xl bg-white p-4 shadow-sm">
              <h2 className="mb-3 text-sm font-semibold text-gray-900">Kuchsiz harflar</h2>
              <div className="flex flex-wrap gap-2">
                {child.weak_letters.map((w, i) => (
                  <div key={i} className="rounded-lg bg-red-50 px-3 py-2 text-center">
                    <p className="font-arabic text-lg">{w.arabic}</p>
                    <p className="text-xs text-gray-500">{w.sound}</p>
                    <p className="text-xs font-semibold text-red-500">{w.error_count} xato</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {child.recent_attempts.length > 0 && (
            <div className="rounded-xl bg-white p-4 shadow-sm">
              <h2 className="mb-3 text-sm font-semibold text-gray-900">Oxirgi urinishlar</h2>
              <div className="space-y-2">
                {child.recent_attempts.map((a, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">{a.module_title}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(a.started_at).toLocaleDateString('uz-UZ')}
                      </p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${
                          a.status === 'completed'
                            ? 'bg-green-100 text-green-700'
                            : a.status === 'in_progress'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {statusLabels[a.status] ?? a.status}
                      </span>
                      {a.accuracy_pct !== null && (
                        <p className="mt-0.5 text-xs text-gray-500">{a.accuracy_pct}%</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <BottomNav />
    </>
  );
};
