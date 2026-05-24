import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BottomNav from '@/modules/arabtilibot/ui/BottomNav';
import { Role } from '@/modules/auth';
import { useParentChildren, useParentLink, useParentSwitch } from '@/modules/parent';

import { useAuth } from '@/hooks/use-auth';
import { usePageMetadata } from '@/libs/usePageMetadata';

export const ParentDashboardPage = () => {
  usePageMetadata({ title: 'Ota-ona paneli' });
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: children, isLoading } = useParentChildren();
  const switchMutation = useParentSwitch();
  const linkMutation = useParentLink();
  const [linkInput, setLinkInput] = useState('');
  const [showLinkInput, setShowLinkInput] = useState(false);

  const handleSwitch = useCallback(() => {
    switchMutation.mutate();
  }, [switchMutation]);

  const handleLink = useCallback(() => {
    if (!linkInput.trim()) return;
    linkMutation.mutate(linkInput.trim());
    setLinkInput('');
    setShowLinkInput(false);
  }, [linkInput, linkMutation]);

  const handleChildClick = useCallback(
    (childId: string) => {
      navigate(`/burro/parent/children/${childId}`);
    },
    [navigate],
  );

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="size-8 animate-spin rounded-full border-4 border-teal-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 pb-28">
        <div className="bg-gradient-to-b from-teal-600 to-teal-700 px-4 pt-12 pb-6">
          <h1 className="text-xl font-bold text-white">Ota-ona paneli</h1>
          <p className="mt-1 text-sm text-teal-100">{user?.fullName}</p>
        </div>

        <div className="px-4 pt-4">
          {user?.role !== Role.Parent && (
            <button
              type="button"
              onClick={handleSwitch}
              disabled={switchMutation.isPending}
              className="mb-4 w-full rounded-xl bg-teal-500 py-3 text-sm font-semibold text-white disabled:opacity-50"
            >
              Ota-ona rejimiga o&apos;tish
            </button>
          )}

          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Farzandlar</h2>
            <button
              type="button"
              onClick={() => setShowLinkInput(!showLinkInput)}
              className="rounded-lg bg-teal-50 px-3 py-1.5 text-sm font-semibold text-teal-700"
            >
              + Bog&apos;lash
            </button>
          </div>

          {showLinkInput && (
            <div className="mb-4 rounded-xl bg-white p-4 shadow-sm">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                O&apos;quvchi ID sini kiriting
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={linkInput}
                  onChange={(e) => setLinkInput(e.target.value)}
                  placeholder="Student ID"
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-teal-500"
                />
                <button
                  type="button"
                  onClick={handleLink}
                  disabled={linkMutation.isPending || !linkInput.trim()}
                  className="rounded-lg bg-teal-500 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
                >
                  Qo&apos;shish
                </button>
              </div>
              <p className="mt-2 text-xs text-gray-400">
                ID ni o&apos;quvchi profilining sozlamalar bo&apos;limidan topishingiz mumkin
              </p>
            </div>
          )}

          {children && children.length > 0 ? (
            <div className="flex flex-col gap-3">
              {children.map((child) => (
                <button
                  type="button"
                  key={child.id}
                  onClick={() => handleChildClick(child.id)}
                  className="flex items-center gap-4 rounded-xl bg-white p-4 text-left shadow-sm"
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
              ))}
            </div>
          ) : (
            <div className="rounded-xl bg-white p-8 text-center shadow-sm">
              <p className="text-gray-500">Hali farzand bog&apos;lanmagan</p>
              <p className="mt-1 text-sm text-gray-400">
                Yuqoridagi tugma orqali farzandingizni qo&apos;shing
              </p>
            </div>
          )}
        </div>
      </div>
      <BottomNav />
    </>
  );
};
