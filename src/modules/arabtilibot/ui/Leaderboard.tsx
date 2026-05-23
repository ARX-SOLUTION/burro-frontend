import { memo, useCallback } from 'react';

import type { LeaderboardPeriod } from '@/modules/arabtilibot/types/api';
import type { BurroLeaderboardData, BurroLeaderboardEntry } from '@/modules/arabtilibot/types/view';

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

const MEDAL: Record<number, string> = { 1: '🥇', 2: '🥈', 3: '🥉' };

const EntryRow = memo(function EntryRow({ entry }: { entry: BurroLeaderboardEntry }) {
  const medal = MEDAL[entry.rank];
  return (
    <div
      className={`flex items-center gap-3 rounded-[20px] bg-white px-4 py-3 shadow-[0_2px_0_0_rgb(172,173,176),inset_0_0_6px_0_rgba(255,255,255,0.63)] ${
        entry.isCurrentUser ? 'ring-2 ring-teal-400' : ''
      }`}
    >
      {/* rank */}
      <div className="w-8 shrink-0 text-center">
        {medal ? (
          <span className="text-xl" aria-label={`${entry.rank}-o'rin`}>
            {medal}
          </span>
        ) : (
          <span className="text-sm font-bold text-gray-400">{entry.rank}</span>
        )}
      </div>

      {/* avatar */}
      <div className="size-10 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-teal-200 to-blue-300">
        {entry.avatarUrl && (
          <img src={entry.avatarUrl} alt={entry.fullName} className="size-full object-cover" />
        )}
      </div>

      {/* name */}
      <p className="flex-1 truncate text-sm font-bold text-gray-900">
        {entry.fullName}
        {entry.isCurrentUser && (
          <span className="ml-1 text-xs font-normal text-teal-600">(Siz)</span>
        )}
      </p>

      {/* xp */}
      <span
        className="shrink-0 text-sm font-bold"
        style={{ fontFamily: 'Tahoma, "Segoe UI", sans-serif' }}
      >
        {entry.xp} XP
      </span>
    </div>
  );
});

function Leaderboard({
  data,
  period,
  onPeriodChange,
  isLoading = false,
  errorMessage,
  onRetry,
}: LeaderboardProps) {
  const handlePeriodChange = useCallback(
    (option: LeaderboardPeriod) => onPeriodChange(option),
    [onPeriodChange],
  );

  return (
    <div className="px-4 pt-4 pb-8">
      {/* Period tabs */}
      <div className="mb-4 flex gap-2">
        {PERIOD_OPTIONS.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => handlePeriodChange(option.id)}
            className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${
              period === option.id ? 'bg-teal-600 text-white shadow-sm' : 'bg-white text-gray-600'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Loading skeleton */}
      {isLoading && (
        <div className="space-y-3">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-3 rounded-[20px] bg-white p-4">
              <div className="h-5 w-6 animate-pulse rounded-full bg-gray-100" />
              <div className="size-10 animate-pulse rounded-full bg-gray-100" />
              <div className="flex-1">
                <div className="h-4 w-28 animate-pulse rounded-full bg-gray-100" />
              </div>
              <div className="h-4 w-14 animate-pulse rounded-full bg-gray-100" />
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {!isLoading && errorMessage && (
        <div className="rounded-[20px] bg-white p-4 text-sm text-red-600 shadow-sm">
          <p>{errorMessage}</p>
          {onRetry && (
            <button type="button" onClick={onRetry} className="mt-3 font-semibold text-teal-600">
              Qayta urinish
            </button>
          )}
        </div>
      )}

      {/* Data */}
      {!isLoading && !errorMessage && data && (
        <>
          {/* Entries list */}
          <div className="space-y-2">
            {data.entries.length ? (
              data.entries.map((entry) => (
                <EntryRow key={`${entry.rank}-${entry.fullName}`} entry={entry} />
              ))
            ) : (
              <div className="flex flex-col items-center gap-3 py-12 text-center">
                <div className="h-[120px] w-[120px] rounded-[24px] bg-gray-100" />
                <p className="text-sm text-gray-500">Reyting uchun hali ma&apos;lumot yo&apos;q.</p>
              </div>
            )}
          </div>

          {/* My position sticky card */}
          <div className="sticky bottom-4 mt-4 rounded-[20px] bg-gradient-to-r from-teal-600 to-blue-600 px-4 py-3 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-white/70">Sizning o&apos;rningiz</p>
                <p className="mt-0.5 text-base font-bold text-white">
                  {data.myPosition.rank}. {data.myPosition.fullName}
                </p>
              </div>
              <span
                className="text-lg font-bold text-white"
                style={{ fontFamily: 'Tahoma, "Segoe UI", sans-serif' }}
              >
                {data.myPosition.xp} XP
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default memo(Leaderboard);
