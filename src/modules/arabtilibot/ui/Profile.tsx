import { memo, useCallback, useMemo, useState } from 'react';

import type { StudentLanguage, UpdateStudentProfileRequest } from '@/modules/arabtilibot/types/api';
import type { BurroProfileData } from '@/modules/arabtilibot/types/view';

type ProfileProps = {
  profile?: BurroProfileData;
  isLoading?: boolean;
  isSaving?: boolean;
  errorMessage?: string | null;
  onRetry?: () => void;
  onSave?: (data: UpdateStudentProfileRequest) => void;
};

const LANGUAGE_OPTIONS: Array<{ id: StudentLanguage; label: string }> = [
  { id: 'uz', label: "O'zbek" },
  { id: 'en', label: 'English' },
  { id: 'ru', label: 'Русский' },
];

const SkeletonProfile = memo(() => {
  return (
    <div className="px-4 pt-4">
      <div className="flex h-[72px] items-center gap-3 rounded-full bg-white px-4 shadow-[0_2px_0_0_rgb(172,173,176),inset_0_0_6px_0_rgba(255,255,255,0.63)]">
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
  isSaving = false,
  errorMessage,
  onRetry,
  onSave,
}: ProfileProps) {
  const [editLanguage, setEditLanguage] = useState<StudentLanguage | null>(null);
  const [editNotifications, setEditNotifications] = useState<boolean | null>(null);

  const currentLanguage = editLanguage ?? profile?.language ?? 'uz';
  const currentNotifications = editNotifications ?? profile?.notificationsEnabled ?? false;

  const isDirty = useMemo(
    () =>
      !!profile &&
      ((editLanguage !== null && editLanguage !== profile.language) ||
        (editNotifications !== null && editNotifications !== profile.notificationsEnabled)),
    [editLanguage, editNotifications, profile],
  );

  const infoRows = useMemo(
    () =>
      profile
        ? [
            { label: 'Jami XP', value: `${profile.xpTotal} XP` },
            { label: 'Streak', value: `${profile.currentStreak} kun ketma-ket` },
            { label: 'Eng uzun streak', value: `${profile.longestStreak} kun` },
            { label: 'Tamomlangan modullar', value: `${profile.completedModules} ta` },
            { label: 'Umumiy aniqlik', value: `${profile.accuracyPct}%` },
            { label: 'Telegram', value: profile.telegramLinked ? 'Ulangan' : 'Ulanmagan' },
          ]
        : [],
    [profile],
  );

  const handleLanguageSelect = useCallback((language: StudentLanguage) => {
    setEditLanguage(language);
  }, []);

  const handleToggleNotifications = useCallback(() => {
    setEditNotifications((prev) => (prev !== null ? !prev : !currentNotifications));
  }, [currentNotifications]);

  const handleSave = useCallback(() => {
    if (!onSave || !profile) return;

    const payload: UpdateStudentProfileRequest = {
      ...(editLanguage !== null && editLanguage !== profile.language
        ? { language: editLanguage }
        : {}),
      ...(editNotifications !== null && editNotifications !== profile.notificationsEnabled
        ? { notifications_enabled: editNotifications }
        : {}),
    };

    if (Object.keys(payload).length > 0) {
      onSave(payload);
    }
  }, [editLanguage, editNotifications, onSave, profile]);

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
      {/* GreetingCard */}
      <div className="flex h-[72px] items-center justify-between overflow-hidden rounded-full border border-white/20 bg-gradient-to-b from-gray-25 via-white to-gray-200 px-3 pr-4 shadow-[0_2px_0_0_rgb(172,173,176),inset_0_0_6px_0_rgba(255,255,255,0.63)]">
        <div className="flex items-center gap-3">
          {/* Avatar placeholder */}
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

      {/* Info rows */}
      <div className="mt-4 overflow-hidden rounded-[20px] bg-white shadow-[0_2px_0_0_rgb(172,173,176),inset_0_0_6px_0_rgba(255,255,255,0.63)]">
        {infoRows.map((row, i) => (
          <div
            key={row.label}
            className={`flex h-14 items-center justify-between px-4 ${
              i < infoRows.length - 1 ? 'border-b border-gray-100' : ''
            }`}
          >
            <span className="text-sm text-gray-700">{row.label}</span>
            <span className="text-sm font-semibold text-gray-900">{row.value}</span>
          </div>
        ))}
      </div>

      {/* Editable settings */}
      <div className="mt-4 overflow-hidden rounded-[20px] bg-white shadow-[0_2px_0_0_rgb(172,173,176),inset_0_0_6px_0_rgba(255,255,255,0.63)]">
        <div className="border-b border-gray-100 px-4 py-3">
          <p className="mb-2 text-sm text-gray-700">Ilova tili</p>
          <div className="flex gap-2">
            {LANGUAGE_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleLanguageSelect(opt.id)}
                className={`rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${
                  currentLanguage === opt.id
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex h-14 items-center justify-between px-4">
          <span className="text-sm text-gray-700">Bildirishnomalar</span>
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
      </div>

      {isDirty && onSave && (
        <button
          type="button"
          disabled={isSaving}
          onClick={handleSave}
          className="mt-3 w-full rounded-[28px] bg-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_4px_0_0_rgba(15,118,110,1)] disabled:opacity-60"
        >
          {isSaving ? 'Saqlanmoqda…' : 'Sozlamalarni saqlash'}
        </button>
      )}

      {/* Weak letters */}
      {profile.weakLetters.length > 0 && (
        <div className="mt-4 overflow-hidden rounded-[20px] bg-white p-4 shadow-[0_2px_0_0_rgb(172,173,176),inset_0_0_6px_0_rgba(255,255,255,0.63)]">
          <p className="text-sm font-bold text-gray-900">
            Ko&apos;proq mashq kerak bo&apos;lgan harflar
          </p>
          <div className="mt-3 space-y-2">
            {profile.weakLetters.map((letter) => (
              <div
                key={`${letter.arabic}-${letter.sound}`}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="text-2xl font-bold text-gray-900"
                    dir="rtl"
                    style={{ fontFamily: '"Scheherazade New", serif' }}
                  >
                    {letter.arabic}
                  </span>
                  <span className="text-sm text-gray-500">{letter.sound}</span>
                </div>
                <span className="text-xs font-semibold text-error-500">
                  {letter.errorCount} xato
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <button
        type="button"
        className="mt-6 w-full rounded-[28px] bg-gradient-to-r from-blue-600 to-teal-400 py-4 text-base font-bold text-white shadow-[0_4px_0_0_rgb(11,79,164),0_8px_24px_-4px_rgba(18,183,229,0.44)]"
      >
        Ota-ona rejimiga o&apos;tish
      </button>
    </div>
  );
}
