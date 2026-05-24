import { ArrowRight, Monitor02, Moon01, RefreshCw01, Sun, Users01 } from '@untitledui/icons';

import type { AdminOverviewResponse, AdminXpRankingEntry } from '@/modules/admin';
import { useAdminOverview, useAdminXpRanking } from '@/modules/admin';
import { Role, ROLE_LABELS } from '@burro/shared/modules/auth';
import { getErrorMessage } from '@burro/shared/modules/common';

import { Badge } from '@burro/shared/components/base/badges/badges';
import { Button } from '@burro/shared/components/base/buttons/button';
import { PageLoading } from '@burro/shared/components/page-loading';
import { useAuth } from '@burro/shared/hooks/use-auth';
import { PageContent, PageHeader, PageWrapper } from '@/layouts/DashboardLayout';
import { usePageMetadata } from '@burro/shared/libs/usePageMetadata';
import { useTheme } from '@/providers/theme-provider';

const ThemeIcons = {
  system: Monitor02,
  light: Sun,
  dark: Moon01,
};

export const DashboardPage = () => {
  usePageMetadata({ title: 'Dashboard' });
  const { user, isLoading: isAuthLoading } = useAuth();
  const { theme, cycleTheme } = useTheme();

  const isAdmin = user?.role === Role.Admin || user?.role === Role.Superadmin;
  const overviewQuery = useAdminOverview(isAdmin);
  const rankingQuery = useAdminXpRanking('weekly', isAdmin);

  if (isAuthLoading) {
    return <PageLoading />;
  }

  if (!isAdmin) {
    return (
      <PageWrapper>
        <PageHeader className="justify-end">
          <Button
            color="secondary"
            onClick={cycleTheme}
            iconLeading={ThemeIcons[theme]}
            aria-label="Change theme"
          />
        </PageHeader>
        <PageContent>
          <div className="mx-auto max-w-2xl rounded-3xl border border-warning-200 bg-warning-50 p-6 shadow-sm">
            <Badge color="warning" size="sm">
              Access limited
            </Badge>
            <h2 className="mt-4 text-2xl font-semibold text-primary">Admin dashboard only</h2>
            <p className="mt-2 text-sm text-tertiary">
              Your account is signed in as{' '}
              <span className="font-medium text-secondary">
                {ROLE_LABELS[user?.role ?? Role.Student]}
              </span>
              . The analytics dashboard is available to admins and superadmins only.
            </p>
            <div className="mt-5">
              <Button href="/burro" color="primary" iconTrailing={ArrowRight}>
                Go to Burro
              </Button>
            </div>
          </div>
        </PageContent>
      </PageWrapper>
    );
  }

  const isLoading = overviewQuery.isLoading || rankingQuery.isLoading;
  const errorMessage = overviewQuery.error
    ? getErrorMessage(overviewQuery.error, 'Could not load admin dashboard')
    : rankingQuery.error
      ? getErrorMessage(rankingQuery.error, 'Could not load admin leaderboard')
      : null;

  return (
    <PageWrapper>
      <PageHeader className="justify-between gap-3">
        <div>
          <p className="text-sm text-tertiary">Welcome back</p>
          <h1 className="text-2xl font-semibold text-primary">{user?.fullName}</h1>
        </div>
        <Button
          color="secondary"
          onClick={cycleTheme}
          iconLeading={ThemeIcons[theme]}
          aria-label="Change theme"
        />
      </PageHeader>
      <PageContent>
        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-3">
            <div className="h-28 animate-pulse rounded-2xl bg-gray-100" />
            <div className="h-28 animate-pulse rounded-2xl bg-gray-100" />
            <div className="h-28 animate-pulse rounded-2xl bg-gray-100" />
          </div>
        ) : errorMessage ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
            <p>{errorMessage}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button
                color="secondary"
                onClick={() => {
                  void overviewQuery.refetch();
                  void rankingQuery.refetch();
                }}
                iconLeading={RefreshCw01}
              >
                Retry
              </Button>
              <Button href="/dashboard/users" color="primary" iconTrailing={ArrowRight}>
                Open users
              </Button>
            </div>
          </div>
        ) : (
          <DashboardContent
            overview={overviewQuery.data}
            ranking={rankingQuery.data?.ranking ?? []}
            period={rankingQuery.data?.period ?? 'weekly'}
          />
        )}
      </PageContent>
    </PageWrapper>
  );
};

const DashboardContent = ({
  overview,
  ranking,
  period,
}: {
  overview?: AdminOverviewResponse;
  ranking: AdminXpRankingEntry[];
  period: 'daily' | 'weekly' | 'monthly' | 'all';
}) => {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-3">
        <MetricCard label="Active students" value={overview?.total_students ?? 0} />
        <MetricCard label="Active today" value={overview?.active_today ?? 0} />
        <MetricCard label="Published modules" value={overview?.total_modules ?? 0} />
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.3fr_0.9fr]">
        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-primary">Top XP ranking</h2>
              <p className="text-sm text-tertiary">Weekly admin overview</p>
            </div>
            <Badge color="success" size="sm">
              {period}
            </Badge>
          </div>

          {ranking.length ? (
            <ol className="mt-5 space-y-3">
              {ranking.map((entry) => (
                <li
                  key={`${entry.rank}-${entry.full_name}`}
                  className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-full bg-teal-600 text-sm font-semibold text-white">
                      {entry.rank}
                    </div>
                    <div>
                      <p className="font-medium text-primary">{entry.full_name}</p>
                      <p className="text-xs text-tertiary">Rank #{entry.rank}</p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-primary">{entry.xp} XP</p>
                </li>
              ))}
            </ol>
          ) : (
            <div className="mt-5 rounded-2xl border border-dashed border-gray-200 p-5 text-sm text-tertiary">
              No ranking data yet.
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-primary">Published modules</h2>
          {overview?.modules_stats.length ? (
            <ul className="mt-4 space-y-3">
              {overview.modules_stats.map((module) => (
                <li
                  key={module.id}
                  className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3"
                >
                  <span className="text-sm font-medium text-primary">{module.titleUz}</span>
                  <Users01 className="size-4 text-gray-400" />
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-4 rounded-2xl border border-dashed border-gray-200 p-5 text-sm text-tertiary">
              No published modules found.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

const MetricCard = ({ label, value }: { label: string; value: number }) => {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-tertiary">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-primary">{value}</p>
    </div>
  );
};

export default DashboardPage;
