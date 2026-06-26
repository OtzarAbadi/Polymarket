'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchMarkets } from '@/lib/api';
import { StatsCards } from '@/components/StatsCards';
import { MarketsList } from '@/components/MarketsList';
import { LoadingSpinner, ErrorBoundary } from '@/components/Loading';
import { getCurrentUser } from '@/services/authService';
import { getDashboardSummary } from '@/services/dashboardService';
import { AuthResponseDto } from '@/types/api';
import { Activity, Briefcase, Target, TrendingUp, Wallet, Zap } from 'lucide-react';

function toNumber(value: number | string | null | undefined): number {
  if (value === null || value === undefined) return 0;
  const parsed = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatMoney(value: number | string): string {
  return `$${toNumber(value).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  })}`;
}

export default function DashboardPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<AuthResponseDto | null>(null);

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      router.replace('/login');
      return;
    }
    setCurrentUser(user);
  }, [router]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['markets'],
    queryFn: () => fetchMarkets(1, 100),
    staleTime: 5000,
    refetchInterval: 5000,
  });

  const dashboardSummaryQuery = useQuery({
    queryKey: ['dashboard-summary'],
    queryFn: getDashboardSummary,
    enabled: Boolean(currentUser),
    staleTime: 5000,
    refetchInterval: 5000,
  });

  if (!currentUser) return <LoadingSpinner />;

  if (error || dashboardSummaryQuery.error) {
    return <ErrorBoundary error={(error || dashboardSummaryQuery.error) as Error} />;
  }

  const markets = data?.markets || [];
  const dashboardSummary = dashboardSummaryQuery.data;
  const topGainers = [...markets]
    .sort((a, b) => b.yesPrice - a.yesPrice)
    .slice(0, 3);

  const stats = [
    {
      label: 'Total Markets',
      value: dashboardSummary?.totalMarkets ?? 0,
      icon: <Target className="w-6 h-6" />,
    },
    {
      label: 'Open Markets',
      value: dashboardSummary?.openMarkets ?? 0,
      icon: <Activity className="w-6 h-6" />,
    },
    {
      label: 'Wallet Balance',
      value: formatMoney(dashboardSummary?.walletBalance ?? 0),
      icon: <Wallet className="w-6 h-6" />,
    },
    {
      label: 'Portfolio Value',
      value: formatMoney(dashboardSummary?.portfolioValue ?? 0),
      icon: <Briefcase className="w-6 h-6" />,
    },
    {
      label: 'Total Trades',
      value: dashboardSummary?.totalTrades ?? 0,
      icon: <Zap className="w-6 h-6" />,
    },
    {
      label: 'Open Positions',
      value: dashboardSummary?.openPositions ?? 0,
      icon: <TrendingUp className="w-6 h-6" />,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          Polymarket Dashboard
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Real-time visualization of prediction markets
        </p>
      </div>

      {/* Stats Cards */}
      {dashboardSummaryQuery.isLoading ? (
        <LoadingSpinner />
      ) : (
        <StatsCards stats={stats} />
      )}

      {/* Top Gainers */}
      {topGainers.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Top Gainers (Highest YES Price)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topGainers.map((market) => (
              <div
                key={market.id}
                className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:shadow-md dark:hover:shadow-slate-900 transition-shadow"
              >
                <h3 className="font-semibold text-slate-900 dark:text-white truncate">
                  {market.title}
                </h3>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-green-600">
                    ${market.yesPrice.toFixed(4)}
                  </span>
                  <span className="text-xs text-slate-600 dark:text-slate-400">
                    YES
                  </span>
                </div>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-sm font-medium text-red-600">
                    ${market.noPrice.toFixed(4)}
                  </span>
                  <span className="text-xs text-slate-600 dark:text-slate-400">
                    NO
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Markets List */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          All Markets
        </h2>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <MarketsList markets={markets} isLoading={isLoading} />
        )}
      </div>
    </div>
  );
}
