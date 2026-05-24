import { memo, useCallback, useState } from 'react';

import type { StudentLanguage, UpdateStudentProfileRequest } from '@/modules/arabtilibot/types/api';
import type { BurroProfileData } from '@/modules/arabtilibot/types/view';

type ProfileProps = {
  profile?: BurroProfileData;
  isLoading?: boolean;
  isSaving?: boolean;
  errorMessage?: string | null;
  onRetry?: () => void;
  onSave?: (data: UpdateStudentProfileRequest) => void;
  onLogout?: () => void;
};

const LANGUAGE_OPTIONS: Array<{ id: StudentLanguage; label: string }> = [
  { id: 'uz', label: "O'zbek" },
  { id: 'en', label: 'English' },
  { id: 'ru', label: 'Русский' },
];

const BOTTOM_SHEET_OPTIONS: Array<{ id: StudentLanguage; label: string }> = [
  { id: 'uz', label: "O'zbekcha" },
  { id: 'ru', label: 'Русский' },
  { id: 'en', label: 'English' },
];

const SkeletonProfile = memo(() => {
  return (
    <div className="px-4 pt-4">
      <div className="flex h-[72px] items-center gap-3 rounded-full bg-white px-4 shadow-card">
        <div className="size-11 animate-pulse rounded-full bg-gray-100" />
        <div className="space-y-2">
          <div className="h-4 w-32 animate-pulse rounded-full bg-gray-100" />
          <div className="h-3 w-20 animate-pulse rounded-full bg-gray-100" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-14 animate-pulse rounded-[20px] bg-white" />
        ))}
      </div>
    </div>
  );
});
SkeletonProfile.displayName = 'SkeletonProfile';

export default function Profile({
  profile,
  isLoading = false,
  errorMessage,
  onRetry,
  onSave,
  onLogout,
}: ProfileProps) {
  const [showLanguageSheet, setShowLanguageSheet] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const currentLanguage = profile?.language ?? 'uz';
  const currentNotifications = profile?.notificationsEnabled ?? false;

  const currentLanguageLabel = LANGUAGE_OPTIONS.find((opt) => opt.id === currentLanguage)?.label;

  const handleLanguageSelect = useCallback(
    (language: StudentLanguage) => {
      setShowLanguageSheet(false);
      if (language !== profile?.language && onSave) {
        onSave({ language });
      }
    },
    [onSave, profile?.language],
  );

  const handleToggleNotifications = useCallback(() => {
    if (onSave) {
      onSave({ notifications_enabled: !currentNotifications });
    }
  }, [currentNotifications, onSave]);

  if (isLoading) return <SkeletonProfile />;

  if (errorMessage) {
    return (
      <div className="p-4">
        <div className="rounded-[20px] bg-white p-4 text-sm text-red-600 shadow-sm">
          <p>{errorMessage}</p>
          {onRetry && (
            <button type="button" onClick={onRetry} className="mt-3 font-semibold text-teal-600">
              Qayta urinish
            </button>
          )}
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="p-4">
        <div className="rounded-[20px] bg-white p-4 text-sm text-gray-500 shadow-sm">
          Profil ma&apos;lumotlari topilmadi.
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pt-4 pb-8">
      <div className="flex h-[72px] items-center justify-between overflow-hidden rounded-full border border-white/20 bg-gradient-to-b from-gray-25 via-white to-gray-200 px-3 pr-4 shadow-card">
        <div className="flex items-center gap-3">
          <div className="relative size-11 shrink-0 rounded-full border-2 border-white bg-gradient-to-br from-warning-100 via-gray-50 to-success-100 shadow-sm" />
          <div>
            <p className="text-sm leading-5 font-bold text-gray-900">{profile.fullName}</p>
            <p className="text-xs text-gray-500">{profile.idDisplay}</p>
          </div>
        </div>
        <div className="inline-flex items-center gap-1 rounded-full bg-warning-100 px-2 py-1 text-xs font-bold text-warning-700">
          <span aria-hidden="true">🔥</span>
          <span>{profile.currentStreak} kun</span>
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-[20px] bg-white shadow-card">
        <div className="flex h-14 cursor-pointer items-center justify-between border-b border-gray-100 px-4">
          <span className="text-sm text-gray-700">Statistika</span>
          <span className="text-sm font-semibold text-teal-600">Batafsil</span>
        </div>

        <div
          className="flex h-14 cursor-pointer items-center justify-between border-b border-gray-100 px-4"
          onClick={() => setShowLanguageSheet(true)}
        >
          <span className="text-sm text-gray-700">Ilova tili</span>
          <span className="text-sm text-gray-500">{currentLanguageLabel}</span>
        </div>

        <div className="flex h-14 items-center justify-between border-b border-gray-100 px-4">
          <span className="text-sm text-gray-700">Eslatmalar</span>
          <button
            type="button"
            role="switch"
            aria-checked={currentNotifications}
            onClick={handleToggleNotifications}
            className={`relative h-7 w-12 rounded-full transition-colors ${
              currentNotifications ? 'bg-teal-500' : 'bg-gray-200'
            }`}
          >
            <span
              className={`absolute top-1 size-5 rounded-full bg-white shadow transition-transform ${
                currentNotifications ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div
          className="flex h-14 cursor-pointer items-center justify-between px-4"
          onClick={() => setShowLogoutModal(true)}
        >
          <span className="text-sm text-error-500">Chiqish</span>
        </div>
      </div>

      {showLanguageSheet && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50"
          onClick={() => setShowLanguageSheet(false)}
        >
          <div
            className="w-full max-w-md rounded-t-[20px] bg-white px-4 pt-4 pb-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-gray-300" />
            <p className="mb-4 text-center text-base font-bold text-gray-900">Til tanlash</p>
            {BOTTOM_SHEET_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleLanguageSelect(opt.id)}
                className={`w-full rounded-[20px] px-4 py-3 text-left text-sm transition-colors ${
                  currentLanguage === opt.id
                    ? 'bg-teal-50 font-bold text-teal-600'
                    : 'text-gray-700'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {showLogoutModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={() => setShowLogoutModal(false)}
        >
          <div
            className="max-w-sm rounded-[20px] bg-white px-6 py-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex justify-center">
              <span className="text-4xl" aria-hidden="true">
                ⚠️
              </span>
            </div>
            <p className="mb-2 text-center text-lg font-bold text-gray-900">
              Ehtiyot bo&apos;ling!
            </p>
            <p className="mb-1 text-center text-sm text-gray-700">
              Haqiqatdan ilovadan chiqishni xohlaysizmi?
            </p>
            <p className="mb-6 text-center text-xs text-gray-500">
              Haqiqatdan ham ilovadan chiqishni xohlasangiz &apos;Ha, chiqish&apos; ni bosib
              tasdiqlang.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 rounded-[28px] border border-gray-200 py-3 text-sm font-bold text-gray-700"
              >
                Yo&apos;q
              </button>
              <button
                type="button"
                onClick={onLogout}
                className="flex-1 rounded-[28px] bg-error-500 py-3 text-sm font-bold text-white"
              >
                Ha, chiqish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
