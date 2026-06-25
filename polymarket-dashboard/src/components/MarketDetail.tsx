'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ArrowLeft, BarChart3 } from 'lucide-react';
import { formatPrice, formatVolume, getStateColor, getStateLabel } from '@/lib/utils';
import { MarketDetail } from '@/lib/api';
import { PriceChart } from './PriceChart';
import { getCurrentUser } from '@/services/authService';
import { updateCurrentUser } from '@/services/authStorage';
import { executeTrade } from '@/services/tradeService';
import { AuthResponseDto, TradeOutcomeName, TradeType } from '@/types/api';

interface MarketDetailProps {
  market: MarketDetail;
  isLoading?: boolean;
}

export function MarketDetailComponent({ market, isLoading }: MarketDetailProps) {
  const queryClient = useQueryClient();
  const [currentUser, setCurrentUser] = useState<AuthResponseDto | null>(null);
  const [tradeType, setTradeType] = useState<TradeType>('BUY');
  const [outcomeName, setOutcomeName] = useState<TradeOutcomeName>('YES');
  const [quantity, setQuantity] = useState('1');
  const [tradeError, setTradeError] = useState<string | null>(null);
  const [tradeSuccess, setTradeSuccess] = useState<string | null>(null);

  useEffect(() => {
    setCurrentUser(getCurrentUser());
  }, []);

  const yesPercentage = (market.yesPrice * 100).toFixed(1);
  const noPercentage = ((1 - market.yesPrice) * 100).toFixed(1);
  const selectedOutcomeId = outcomeName === 'YES' ? market.yesOutcomeId : market.noOutcomeId;
  const selectedPrice = outcomeName === 'YES' ? market.yesPrice : market.noPrice;
  const parsedQuantity = Number(quantity);
  const estimatedCost = useMemo(() => {
    if (!Number.isFinite(parsedQuantity) || parsedQuantity <= 0) return 0;
    return parsedQuantity * selectedPrice;
  }, [parsedQuantity, selectedPrice]);

  const tradeMutation = useMutation({
    mutationFn: () => {
      if (!currentUser) {
        throw new Error('Login is required before trading.');
      }
      if (!selectedOutcomeId) {
        throw new Error('Selected outcome is unavailable.');
      }
      if (!Number.isFinite(parsedQuantity) || parsedQuantity <= 0) {
        throw new Error('Enter a quantity greater than zero.');
      }

      return executeTrade({
        userId: currentUser.userId,
        marketId: market.marketId,
        outcomeId: selectedOutcomeId,
        quantity: parsedQuantity,
        type: tradeType,
      });
    },
    onSuccess: (response) => {
      updateCurrentUser({ walletBalance: response.walletBalanceAfterTrade });
      setCurrentUser(getCurrentUser());
      setTradeError(null);
      setTradeSuccess(`${tradeType} ${outcomeName} trade completed.`);
      queryClient.invalidateQueries({ queryKey: ['market', market.id] });
      queryClient.invalidateQueries({ queryKey: ['wallet', currentUser?.userId] });
      queryClient.invalidateQueries({ queryKey: ['wallet-transactions', currentUser?.userId] });
      queryClient.invalidateQueries({ queryKey: ['positions', currentUser?.userId] });
    },
    onError: (err) => {
      const axiosError = err as AxiosError<{ message?: string }>;
      setTradeSuccess(null);
      setTradeError(
        axiosError.response?.data?.message ||
          (err instanceof Error ? err.message : 'Trade failed. Check your balance and position.')
      );
    },
  });

  const handleTradeSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTradeError(null);
    setTradeSuccess(null);
    tradeMutation.mutate();
  };

  if (isLoading) {
    return <div className="text-center py-12">Loading market details...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <Link
          href="/markets"
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            {market.title}
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            {market.description}
          </p>
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center gap-4 flex-wrap">
        <span className={`px-4 py-2 rounded-full font-medium ${getStateColor(market.state)}`}>
          {getStateLabel(market.state)}
        </span>
        {market.category && (
          <span className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
            {market.category}
          </span>
        )}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Key Stats */}
        <div className="lg:col-span-1 space-y-4">
          <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6">
            <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-4">
              Current Prices
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    YES
                  </span>
                  <span className="text-2xl font-bold text-green-600">
                    ${formatPrice(market.yesPrice)}
                  </span>
                </div>
                <div className="mt-1 w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${market.yesPrice * 100}%` }}
                  />
                </div>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  {yesPercentage}% probability
                </p>
              </div>

              <div>
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    NO
                  </span>
                  <span className="text-2xl font-bold text-red-600">
                    ${formatPrice(market.noPrice)}
                  </span>
                </div>
                <div className="mt-1 w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-red-600 h-2 rounded-full"
                    style={{ width: `${market.noPrice * 100}%` }}
                  />
                </div>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  {noPercentage}% probability
                </p>
              </div>
            </div>
          </div>

          {/* Stats Box */}
          <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6">
            <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-4">
              Market Info
            </h3>
            <div className="space-y-3">
              {market.volume24h && (
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">24h Volume</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">
                    {formatVolume(market.volume24h)}
                  </p>
                </div>
              )}
              {market.liquidity && (
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Liquidity</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">
                    {formatVolume(market.liquidity)}
                  </p>
                </div>
              )}
              {market.endDate && (
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">End Date</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">
                    {new Date(market.endDate).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6">
            <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-4">
              Trade Ticket
            </h3>

            {!currentUser ? (
              <div className="space-y-3">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Login to buy or sell shares in this market.
                </p>
                <Link
                  href="/login"
                  className="block w-full px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-center font-medium transition-colors"
                >
                  Login to trade
                </Link>
              </div>
            ) : (
              <form onSubmit={handleTradeSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  {(['BUY', 'SELL'] as TradeType[]).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setTradeType(type)}
                      className={`px-4 py-2 rounded-lg border font-medium transition-colors ${
                        tradeType === type
                          ? 'border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-200'
                          : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {(['YES', 'NO'] as TradeOutcomeName[]).map((outcome) => (
                    <button
                      key={outcome}
                      type="button"
                      onClick={() => setOutcomeName(outcome)}
                      className={`px-4 py-2 rounded-lg border font-medium transition-colors ${
                        outcomeName === outcome
                          ? outcome === 'YES'
                            ? 'border-green-600 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-200'
                            : 'border-red-600 bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-200'
                          : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {outcome}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="0.0001"
                    step="0.0001"
                    value={quantity}
                    onChange={(event) => setQuantity(event.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
                    required
                  />
                </div>

                <div className="rounded-lg bg-slate-50 dark:bg-slate-950 p-3 text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Price</span>
                    <span className="font-medium text-slate-900 dark:text-white">${formatPrice(selectedPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Estimated value</span>
                    <span className="font-medium text-slate-900 dark:text-white">${formatPrice(estimatedCost)}</span>
                  </div>
                </div>

                {tradeError && <p className="text-sm text-red-600 dark:text-red-400">{tradeError}</p>}
                {tradeSuccess && <p className="text-sm text-green-600 dark:text-green-400">{tradeSuccess}</p>}

                <button
                  type="submit"
                  disabled={tradeMutation.isPending}
                  className="w-full px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium transition-colors"
                >
                  {tradeMutation.isPending ? 'Submitting...' : `${tradeType} ${outcomeName}`}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right Column - Chart */}
        <div className="lg:col-span-2">
          {market.priceHistory && market.priceHistory.length > 0 ? (
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Price History
              </h3>
              <PriceChart data={market.priceHistory} />
            </div>
          ) : (
            <div className="h-96 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                <p className="text-slate-600 dark:text-slate-400">No price history available</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recent Trades */}
      {market.recentTrades && market.recentTrades.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Recent Trades
          </h3>
          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                  <th className="px-4 py-3 text-left font-semibold text-slate-900 dark:text-white">
                    Outcome
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-slate-900 dark:text-white">
                    Price
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-slate-900 dark:text-white">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-slate-900 dark:text-white">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {market.recentTrades.map((trade) => (
                  <tr
                    key={trade.id}
                    className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900"
                  >
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          trade.outcome === 'yes'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}
                      >
                        {trade.outcome.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-medium">
                      ${formatPrice(trade.price)}
                    </td>
                    <td className="px-4 py-3 text-right text-slate-600 dark:text-slate-400">
                      {formatVolume(trade.amount)}
                    </td>
                    <td className="px-4 py-3 text-right text-slate-600 dark:text-slate-400 text-xs">
                      {new Date(trade.timestamp).toLocaleTimeString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Related Markets */}
      {market.relatedMarkets && market.relatedMarkets.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Related Markets
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {market.relatedMarkets.map((relatedMarket) => (
              <Link
                key={relatedMarket.id}
                href={`/market/${relatedMarket.id}`}
                className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-600 dark:hover:border-blue-400 hover:shadow-md dark:hover:shadow-blue-900 transition-all"
              >
                <h4 className="font-medium text-slate-900 dark:text-white truncate">
                  {relatedMarket.title}
                </h4>
                <div className="mt-2 flex items-center gap-4">
                  <div>
                    <p className="text-xs text-slate-600 dark:text-slate-400">YES</p>
                    <p className="font-semibold text-green-600">
                      ${formatPrice(relatedMarket.yesPrice)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 dark:text-slate-400">NO</p>
                    <p className="font-semibold text-red-600">
                      ${formatPrice(relatedMarket.noPrice)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
