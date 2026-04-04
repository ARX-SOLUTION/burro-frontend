import type { LeaderboardPeriod } from '@/modules/arabtilibot/types/api';
import type { BurroLeaderboardData } from '@/modules/arabtilibot/types/view';

type LeaderboardProps = {
  data?: BurroLeaderboardData;
  period: LeaderboardPeriod;
  onPeriodChange: (period: LeaderboardPeriod) => void;
  isLoading?: boolean;
  errorMessage?: string | null;
  onRetry?: () => void;
};

const PERIOD_OPTIONS: Array<{ id: LeaderboardPeriod; label: string }> = [
  { id: 'weekly', label: 'Haftalik' },
  { id: 'monthly', label: 'Oylik' },
  { id: 'all', label: 'Umumiy' },
];

export default function Leaderboard({
  data,
  period,
  onPeriodChange,
  isLoading = false,
  errorMessage,
  onRetry,
}: LeaderboardProps) {
  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl font-semibold">Reyting</h2>

      <div className="mb-4 flex gap-2">
        {PERIOD_OPTIONS.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onPeriodChange(option.id)}
            className={`rounded-full px-3 py-2 text-sm font-semibold ${period === option.id ? 'bg-teal-600 text-white' : 'bg-white text-gray-600'}`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {isLoading && (
        <div className="rounded-lg bg-white p-4 text-sm text-gray-500">Reyting yuklanmoqda...</div>
      )}

      {!isLoading && errorMessage && (
        <div className="rounded-lg bg-white p-4 text-sm text-red-600 shadow-sm">
          <p>{errorMessage}</p>
          {onRetry && (
            <button type="button" onClick={onRetry} className="mt-3 font-semibold text-teal-600">
              Qayta urinish
            </button>
          )}
        </div>
      )}

      {!isLoading && !errorMessage && data && (
        <>
          <div className="mb-4 rounded-lg bg-white p-4 shadow-sm">
            <div className="text-sm text-gray-500">Sizning o‘rningiz</div>
            <div className="mt-2 text-lg font-semibold">
              {data.myPosition.rank}. {data.myPosition.fullName}
            </div>
            <div className="text-sm text-gray-500">{data.myPosition.xp} XP</div>
            <div className="mt-2 text-xs text-gray-400">Yangilangan: {data.generatedAtLabel}</div>
          </div>

          <div className="space-y-3">
            {data.entries.length ? (
              data.entries.map((entry) => (
                <div
                  key={`${entry.rank}-${entry.fullName}`}
                  className={`flex items-center justify-between rounded-lg bg-white p-3 ${entry.isCurrentUser ? 'ring-2 ring-teal-500' : ''}`}
                >
                  <div className="font-semibold">
                    {entry.rank}. {entry.fullName}
                  </div>
                  <div className="text-sm text-gray-500">{entry.xp} XP</div>
                </div>
              ))
            ) : (
              <div className="rounded-lg bg-white p-4 text-sm text-gray-500 shadow-sm">
                Reyting uchun hali ma&apos;lumot yo‘q.
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
