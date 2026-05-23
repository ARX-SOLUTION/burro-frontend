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

const TopThreeCard = memo(function TopThreeCard({ entry }: { entry: BurroLeaderboardEntry }) {
  const medal = MEDAL[entry.rank];
  return (
    <div
      className={`flex flex-1 flex-col items-center gap-2 rounded-[20px] bg-white px-4 py-4 shadow-[0_2px_0_0_rgb(172,173,176),inset_0_0_6px_0_rgba(255,255,255,0.63)] ${
        entry.isCurrentUser ? 'ring-2 ring-teal-400' : ''
      }`}
    >
      <span className="text-2xl" aria-label={`${entry.rank}-o'rin`}>
        {medal}
      </span>

      <div className="size-12 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-teal-200 to-blue-300">
        {entry.avatarUrl && (
          <img src={entry.avatarUrl} alt={entry.fullName} className="size-full object-cover" />
        )}
      </div>

      <div className="text-center">
        <p className="truncate text-sm font-bold text-gray-900">
          {entry.fullName}
          {entry.isCurrentUser && (
            <span className="ml-1 text-xs font-normal text-teal-600">(Siz)</span>
          )}
        </p>
        {entry.classInfo && <p className="truncate text-xs text-gray-500">{entry.classInfo}</p>}
      </div>

      <span className="text-sm font-bold" style={{ fontFamily: 'Tahoma, "Segoe UI", sans-serif' }}>
        {entry.xp} XP
      </span>
    </div>
  );
});

const RankedRow = memo(function RankedRow({ entry }: { entry: BurroLeaderboardEntry }) {
  return (
    <div
      className={`flex items-center gap-3 rounded-[20px] bg-white px-4 py-3 shadow-[0_2px_0_0_rgb(172,173,176),inset_0_0_6px_0_rgba(255,255,255,0.63)] ${
        entry.isCurrentUser ? 'ring-2 ring-teal-400' : ''
      }`}
    >
      <span className="w-8 shrink-0 text-center text-sm font-bold text-gray-400">
        #{entry.rank}
      </span>

      <div className="size-10 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-teal-200 to-blue-300">
        {entry.avatarUrl && (
          <img src={entry.avatarUrl} alt={entry.fullName} className="size-full object-cover" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-gray-900">
          {entry.fullName}
          {entry.isCurrentUser && (
            <span className="ml-1 text-xs font-normal text-teal-600">(Siz)</span>
          )}
        </p>
        {entry.classInfo && <p className="truncate text-xs text-gray-500">{entry.classInfo}</p>}
      </div>

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
          {data.entries.length ? (
            <>
              <div className="mb-4 flex gap-3">
                {data.entries.slice(0, 3).map((entry) => (
                  <TopThreeCard key={`top-${entry.rank}`} entry={entry} />
                ))}
              </div>

              {data.entries.length > 3 && (
                <div className="space-y-2">
                  {data.entries.slice(3).map((entry) => (
                    <RankedRow key={`rank-${entry.rank}-${entry.fullName}`} entry={entry} />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center gap-3 py-12 text-center">
              <div className="h-[120px] w-[120px] rounded-[24px] bg-gray-100" />
              <p className="text-sm text-gray-500">Reyting uchun hali ma&apos;lumot yo&apos;q.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
export default memo(Leaderboard);
