import type { BurroProfileData } from '@/modules/arabtilibot/types/view';

type ProfileProps = {
  profile?: BurroProfileData;
  isLoading?: boolean;
  errorMessage?: string | null;
  onRetry?: () => void;
};

export default function Profile({
  profile,
  isLoading = false,
  errorMessage,
  onRetry,
}: ProfileProps) {
  if (isLoading) {
    return <div className="p-4 text-sm text-gray-500">Profil yuklanmoqda...</div>;
  }

  if (errorMessage) {
    return (
      <div className="p-4">
        <div className="rounded-lg bg-white p-4 text-sm text-red-600 shadow-sm">
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
        <div className="rounded-lg bg-white p-4 text-sm text-gray-500 shadow-sm">
          Profil ma&apos;lumotlari topilmadi.
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-6 text-center">
        <div className="text-xl font-semibold">{profile.fullName}</div>
        <div className="text-sm text-gray-500">
          {profile.xpTotal} XP • {profile.currentStreak} kun ketma-ket
        </div>
        <div className="mt-1 text-xs text-gray-400">{profile.idDisplay}</div>
      </div>

      <div className="space-y-3">
        <div className="rounded-lg bg-white p-4">
          Tamomlangan modullar: {profile.completedModules}
        </div>
        <div className="rounded-lg bg-white p-4">Umumiy XP: {profile.xpTotal}</div>
        <div className="rounded-lg bg-white p-4">Aniqlik: {profile.accuracyPct}%</div>
        <div className="rounded-lg bg-white p-4">Eng uzun streak: {profile.longestStreak} kun</div>
        <div className="rounded-lg bg-white p-4">
          Til: {profile.language.toUpperCase()} • Telegram:{' '}
          {profile.telegramLinked ? 'ulangan' : 'ulanmagan'}
        </div>
        <div className="rounded-lg bg-white p-4">
          Bildirishnomalar: {profile.notificationsEnabled ? 'yoqilgan' : 'o‘chirilgan'}
        </div>
        <div className="rounded-lg bg-white p-4">Qo‘shilgan sana: {profile.createdAtLabel}</div>
        <div className="rounded-lg bg-white p-4">
          <div className="text-sm font-semibold text-gray-900">
            Ko‘proq mashq kerak bo‘lgan harflar
          </div>
          {profile.weakLetters.length ? (
            <div className="mt-3 space-y-2">
              {profile.weakLetters.map((letter) => (
                <div
                  key={`${letter.arabic}-${letter.sound}`}
                  className="flex items-center justify-between text-sm"
                >
                  <span>
                    {letter.arabic} • {letter.sound}
                  </span>
                  <span className="text-gray-500">{letter.errorCount} xato</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-3 text-sm text-gray-500">Hozircha xatolar statistikasi yo‘q.</div>
          )}
        </div>
      </div>
    </div>
  );
}
