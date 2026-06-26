'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CheckCircle, Shield, Wrench } from 'lucide-react';
import { createMarket, getMarkets, resolveMarket } from '@/services/marketService';
import { Market, TradeOutcomeName } from '@/types/api';
import { ErrorBoundary, LoadingSpinner } from '@/components/Loading';
import { useAuth } from '@/contexts/AuthContext';

type MarketFormState = {
  title: string;
  description: string;
  category: string;
  tradingCloseDate: string;
  resolutionDate: string;
  resolutionSource: string;
};

const emptyForm: MarketFormState = {
  title: '',
  description: '',
  category: '',
  tradingCloseDate: '',
  resolutionDate: '',
  resolutionSource: '',
};

function formatMoney(value: number): string {
  return `$${value.toFixed(4)}`;
}

function formatDateTime(value?: string): string {
  if (!value) return 'Not set';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
}

function getErrorMessage(error: unknown, fallback: string): string {
  const axiosError = error as AxiosError<{ message?: string }>;
  return axiosError.response?.data?.message || axiosError.message || fallback;
}

function isResolvable(market: Market, now: number): boolean {
  if (market.status !== 'OPEN' || !market.resolutionDate) return false;
  const resolutionTime = new Date(market.resolutionDate).getTime();
  return Number.isFinite(resolutionTime) && resolutionTime <= now;
}

export default function AdminPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { currentUser, isAuthInitialized } = useAuth();
  const [form, setForm] = useState<MarketFormState>(emptyForm);
  const [message, setMessage] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [resolveError, setResolveError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthInitialized) return;

    if (!currentUser) {
      router.replace('/login');
      return;
    }

    if (currentUser.role !== 'ADMIN') {
      router.replace('/markets');
    }
  }, [currentUser, isAuthInitialized, router]);

  const marketsQuery = useQuery({
    queryKey: ['admin-markets'],
    queryFn: getMarkets,
    enabled: isAuthInitialized && currentUser?.role === 'ADMIN',
  });

  const createMarketMutation = useMutation({
    mutationFn: () => {
      if (!currentUser) throw new Error('Admin session is required.');

      return createMarket({
        adminUserId: currentUser.userId,
        title: form.title.trim(),
        description: form.description.trim() || undefined,
        category: form.category.trim(),
        tradingCloseDate: form.tradingCloseDate,
        resolutionDate: form.resolutionDate,
        resolutionSource: form.resolutionSource.trim() || undefined,
      });
    },
    onSuccess: async () => {
      setForm(emptyForm);
      setFormError(null);
      setMessage('Market created successfully.');
      await queryClient.invalidateQueries({ queryKey: ['admin-markets'] });
    },
    onError: (error) => {
      setMessage(null);
      setFormError(getErrorMessage(error, 'Unable to create market.'));
    },
  });

  const resolveMarketMutation = useMutation({
    mutationFn: ({ market, outcome }: { market: Market; outcome: TradeOutcomeName }) => {
      if (!currentUser) throw new Error('Admin session is required.');

      const winningOutcomeId = outcome === 'YES' ? market.yesOutcomeId : market.noOutcomeId;
      if (!winningOutcomeId) throw new Error(`${outcome} outcome id is missing for this market.`);

      return resolveMarket({
        adminUserId: currentUser.userId,
        marketId: market.marketId,
        winningOutcomeId,
      });
    },
    onSuccess: async () => {
      setResolveError(null);
      setMessage('Market resolved successfully.');
      await queryClient.invalidateQueries({ queryKey: ['admin-markets'] });
    },
    onError: (error) => {
      setMessage(null);
      setResolveError(getErrorMessage(error, 'Unable to resolve market.'));
    },
  });

  const markets = marketsQuery.data?.markets ?? [];
  const now = useMemo(() => Date.now(), [marketsQuery.dataUpdatedAt]);

  const handleFormChange = (field: keyof MarketFormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleCreateMarket = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);
    setFormError(null);
    createMarketMutation.mutate();
  };

  const handleResolve = (market: Market) => {
    const winningOutcome = window.prompt('Which outcome won? Enter YES or NO.');
    const normalizedOutcome = winningOutcome?.trim().toUpperCase();

    if (normalizedOutcome !== 'YES' && normalizedOutcome !== 'NO') {
      setResolveError('Resolution cancelled. Enter YES or NO to resolve a market.');
      return;
    }

    setMessage(null);
    setResolveError(null);
    resolveMarketMutation.mutate({ market, outcome: normalizedOutcome });
  };

  if (!isAuthInitialized) return <LoadingSpinner />;

  if (!currentUser || currentUser.role !== 'ADMIN') {
    return (
      <div className="rounded-lg border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950 p-4 text-red-700 dark:text-red-300">
        Access denied
      </div>
    );
  }

  if (marketsQuery.error) {
    return <ErrorBoundary error={marketsQuery.error as Error} message="Unable to load markets" />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200">
          <Shield className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
          <p className="mt-1 text-slate-600 dark:text-slate-400">Create and resolve prediction markets</p>
        </div>
      </div>

      {message && (
        <div className="flex items-center gap-2 rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950 p-4 text-sm text-green-700 dark:text-green-300">
          <CheckCircle className="w-4 h-4" />
          {message}
        </div>
      )}

      <section className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6">
        <div className="flex items-center gap-2 mb-5">
          <Wrench className="w-5 h-5 text-slate-500" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Create Market</h2>
        </div>

        <form onSubmit={handleCreateMarket} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(event) => handleFormChange('title', event.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={(event) => handleFormChange('description', event.target.value)}
              className="w-full min-h-24 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Category</label>
            <input
              type="text"
              value={form.category}
              onChange={(event) => handleFormChange('category', event.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Resolution Source</label>
            <input
              type="text"
              value={form.resolutionSource}
              onChange={(event) => handleFormChange('resolutionSource', event.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Trading Close Date</label>
            <input
              type="datetime-local"
              value={form.tradingCloseDate}
              onChange={(event) => handleFormChange('tradingCloseDate', event.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Resolution Date</label>
            <input
              type="datetime-local"
              value={form.resolutionDate}
              onChange={(event) => handleFormChange('resolutionDate', event.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
              required
            />
          </div>

          {formError && (
            <p className="md:col-span-2 text-sm text-red-600 dark:text-red-400">{formError}</p>
          )}

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={createMarketMutation.isPending}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium transition-colors"
            >
              {createMarketMutation.isPending ? 'Creating...' : 'Create Market'}
            </button>
          </div>
        </form>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Markets</h2>

        {resolveError && (
          <div className="mb-4 rounded-lg border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950 p-4 text-sm text-red-700 dark:text-red-300">
            {resolveError}
          </div>
        )}

        {marketsQuery.isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                  <th className="px-4 py-3 text-left font-semibold text-slate-900 dark:text-white">Title</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-900 dark:text-white">Category</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-900 dark:text-white">Status</th>
                  <th className="px-4 py-3 text-right font-semibold text-slate-900 dark:text-white">YES Price</th>
                  <th className="px-4 py-3 text-right font-semibold text-slate-900 dark:text-white">NO Price</th>
                  <th className="px-4 py-3 text-right font-semibold text-slate-900 dark:text-white">Trading Close</th>
                  <th className="px-4 py-3 text-right font-semibold text-slate-900 dark:text-white">Resolution</th>
                  <th className="px-4 py-3 text-right font-semibold text-slate-900 dark:text-white">Action</th>
                </tr>
              </thead>
              <tbody>
                {markets.map((market) => (
                  <tr key={market.marketId} className="border-b border-slate-200 dark:border-slate-700">
                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{market.title}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{market.category}</td>
                    <td className="px-4 py-3">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                        {market.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">{formatMoney(market.yesPrice)}</td>
                    <td className="px-4 py-3 text-right">{formatMoney(market.noPrice)}</td>
                    <td className="px-4 py-3 text-right text-xs text-slate-600 dark:text-slate-400">
                      {formatDateTime(market.tradingCloseDate)}
                    </td>
                    <td className="px-4 py-3 text-right text-xs text-slate-600 dark:text-slate-400">
                      {formatDateTime(market.resolutionDate)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {isResolvable(market, now) ? (
                        <button
                          type="button"
                          onClick={() => handleResolve(market)}
                          disabled={resolveMarketMutation.isPending}
                          className="px-3 py-1.5 rounded-lg bg-green-600 hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium transition-colors"
                        >
                          {resolveMarketMutation.isPending ? 'Resolving...' : 'Resolve'}
                        </button>
                      ) : (
                        <span className="text-xs text-slate-500">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
