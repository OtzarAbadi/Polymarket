'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchMarkets } from '@/lib/api';
import { StatsCards } from '@/components/StatsCards';
import { MarketsList } from '@/components/MarketsList';
import { LoadingSpinner, ErrorBoundary } from '@/components/Loading';
import { TrendingUp, Activity, Zap, Target } from 'lucide-react';

export default function DashboardPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['markets'],
    queryFn: () => fetchMarkets(1, 100),
    staleTime: 5000,
    refetchInterval: 5000,
  });

  if (error) {
    return <ErrorBoundary error={error as Error} />;
  }

  const markets = data?.markets || [];
  const totalMarkets = data?.total || 0;
  const activeMarkets = markets.filter((m) => m.state === 'active').length;
  const totalVolume = markets.reduce((sum, m) => sum + (m.volume24h || 0), 0);
  const topGainers = [...markets]
    .sort((a, b) => b.yesPrice - a.yesPrice)
    .slice(0, 3);

  const stats = [
    {
      label: 'Total Markets',
      value: totalMarkets,
      icon: <Target className="w-6 h-6" />,
    },
    {
      label: 'Active Markets',
      value: activeMarkets,
      icon: <Activity className="w-6 h-6" />,
    },
    {
      label: '24h Volume',
      value: `$${(totalVolume / 1000000).toFixed(2)}M`,
      icon: <TrendingUp className="w-6 h-6" />,
    },
    {
      label: 'Avg. Price',
      value: (
        markets.reduce((sum, m) => sum + m.yesPrice, 0) / markets.length || 0
      ).toFixed(2),
      icon: <Zap className="w-6 h-6" />,
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
      <StatsCards stats={stats} />

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
