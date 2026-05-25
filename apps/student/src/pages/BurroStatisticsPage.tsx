import { memo, useCallback, useMemo, useState } from 'react';

import { useStatisticsChart } from '@/modules/arabtilibot/services/useStatisticsChart';
import { useStudentStatistics } from '@/modules/arabtilibot/services/useStudentStatistics';
import type { StatisticsChartPeriod } from '@/modules/arabtilibot/types/api';
import BottomNav from '@/modules/arabtilibot/ui/BottomNav';

import { usePageMetadata } from '@burro/shared/libs/usePageMetadata';

const PERIOD_OPTIONS: Array<{ id: StatisticsChartPeriod; label: string }> = [
  { id: '7d', label: '7 kun' },
  { id: '30d', label: '30 kun' },
];

const XpBarChart = memo(({ labels, xpData }: { labels: string[]; xpData: number[] }) => {
  const max = Math.max(...xpData, 1);
  const BAR_H = 120;

  return (
    <div className="flex items-end justify-between gap-1" style={{ height: BAR_H + 32 }}>
      {labels.map((label, i) => {
        const pct = (xpData[i] ?? 0) / max;
        const barPx = Math.max(4, Math.round(pct * BAR_H));
        return (
          <div key={label} className="flex flex-1 flex-col items-center gap-1">
            <span className="text-[9px] font-semibold text-teal-300">
              {xpData[i] ? xpData[i] : ''}
            </span>
            <div
              className="w-full rounded-t-[6px] bg-gradient-to-b from-teal-400 to-blue-600"
              style={{ height: barPx }}
            />
            <span className="text-[9px] text-white/50">{label}</span>
          </div>
        );
      })}
    </div>
  );
});
XpBarChart.displayName = 'XpBarChart';

export default function BurroStatisticsPage() {
  usePageMetadata({ title: 'Statistika' });
  const [period, setPeriod] = useState<StatisticsChartPeriod>('7d');

  const statsQuery = useStudentStatistics();
  const chartQuery = useStatisticsChart(period);
  const { refetch: refetchStats } = statsQuery;

  const stats = statsQuery.data;
  const chart = chartQuery.data;

  const summaryCards = useMemo(
    () =>
      stats
        ? [
            { label: 'Jami XP', value: String(stats.total_xp), unit: 'XP' },
            { label: 'Aniqlik', value: String(stats.accuracy_pct), unit: '%' },
            { label: 'Tamomlangan modullar', value: String(stats.modules_completed), unit: 'ta' },
            { label: 'Streak', value: String(stats.current_streak), unit: 'kun' },
          ]
        : [],
    [stats],
  );

  const handlePeriodChange = useCallback((period: StatisticsChartPeriod) => {
    setPeriod(period);
  }, []);

  const handleRetryStats = useCallback(() => void refetchStats(), [refetchStats]);

  return (
    <>
      <div className="min-h-screen pb-32" style={{ background: 'rgb(14,26,69)' }}>
        <div className="px-4 pt-6">
          <h1 className="text-xl font-bold text-white">Statistika</h1>
        </div>

        {/* Summary cards */}
        <div className="mt-4 grid grid-cols-2 gap-3 px-4">
          {statsQuery.isLoading
            ? [0, 1, 2, 3].map((i) => (
                <div key={i} className="h-[72px] animate-pulse rounded-[20px] bg-white/10" />
              ))
            : summaryCards.map((card) => (
                <div
                  key={card.label}
                  className="flex flex-col justify-center rounded-[20px] bg-white/10 px-4 py-3"
                >
                  <p className="text-xs text-white/60">{card.label}</p>
                  <p
                    className="text-2xl font-bold text-white"
                    style={{ fontFamily: 'Tahoma, "Segoe UI", sans-serif' }}
                  >
                    {card.value}
                    <span className="ml-1 text-sm font-semibold text-teal-300">{card.unit}</span>
                  </p>
                </div>
              ))}
        </div>

        {/* XP chart */}
        <div className="mt-6 px-4">
          <div className="rounded-[20px] bg-white/10 p-4">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-bold text-white">XP tarixi</p>
              <div className="flex gap-2">
                {PERIOD_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handlePeriodChange(opt.id)}
                    className={`rounded-full px-3 py-1 text-xs font-bold transition-colors ${
                      period === opt.id ? 'bg-teal-500 text-white' : 'bg-white/10 text-white/60'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {chartQuery.isLoading ? (
              <div className="h-[152px] animate-pulse rounded-lg bg-white/10" />
            ) : chartQuery.error ? (
              <p className="py-8 text-center text-xs text-red-400">Grafik yuklanmadi</p>
            ) : chart && chart.labels.length > 0 ? (
              <XpBarChart labels={chart.labels} xpData={chart.xp_data} />
            ) : (
              <p className="py-8 text-center text-xs text-white/40">
                Hozircha ma&apos;lumot yo&apos;q
              </p>
            )}
          </div>
        </div>

        {/* Recommendation card */}
        {stats && (
          <div className="mt-6 px-4">
            <div className="rounded-[20px] bg-white/10 p-4">
              {stats.weak_letters.length > 0 ? (
                <>
                  <p className="text-sm font-bold text-teal-300">📚 Tavsiya</p>
                  <p className="mt-1 text-xs text-white/60">
                    Kuchsiz harflaringizni mustahkamlash uchun quyidagilarni takrorlang:
                  </p>
                  <div className="mt-3 space-y-3">
                    {stats.weak_letters.map((letter) => (
                      <div
                        key={`${letter.arabic}-${letter.sound}`}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-arabic text-3xl font-bold text-white" dir="rtl">
                            {letter.arabic}
                          </span>
                          <span className="text-sm text-white/60">{letter.sound}</span>
                        </div>
                        <span className="text-sm font-semibold text-red-400">
                          {letter.error_count} xato
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <p className="text-sm font-bold text-teal-300">🎉 Ajoyib!</p>
                  <p className="mt-1 text-xs text-white/60">
                    Barcha harflarni muvaffaqiyatli o&apos;zlashtirgansiz. Yangi modullarni
                    o&apos;rganishda davom eting!
                  </p>
                </>
              )}
            </div>
          </div>
        )}

        {statsQuery.error && (
          <div className="mt-4 px-4">
            <div className="rounded-[20px] bg-red-900/40 p-4 text-sm text-red-300">
              Statistika yuklanmadi.{' '}
              <button
                type="button"
                onClick={handleRetryStats}
                className="font-semibold text-white underline"
              >
                Qayta urinish
              </button>
            </div>
          </div>
        )}
      </div>
      <BottomNav />
    </>
  );
}
