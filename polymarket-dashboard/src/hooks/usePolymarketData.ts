import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchMarkets, fetchMarketDetail, Market, MarketDetail } from '@/lib/api';

export function usePolymarketMarkets(page: number = 1, limit: number = 20) {
  return useQuery({
    queryKey: ['markets', page, limit],
    queryFn: () => fetchMarkets(page, limit),
    staleTime: 5000, // 5 seconds
    refetchInterval: 5000, // Refetch every 5 seconds
  });
}

export function usePolymarketMarketDetail(id: string) {
  return useQuery({
    queryKey: ['market', id],
    queryFn: () => fetchMarketDetail(id),
    staleTime: 5000,
    refetchInterval: 5000,
    enabled: !!id,
  });
}

export function usePriceColor(price: number) {
  const [color, setColor] = useState('text-slate-600');
  const [lastPrice, setLastPrice] = useState(price);

  useEffect(() => {
    if (price > lastPrice) {
      setColor('text-green-600');
    } else if (price < lastPrice) {
      setColor('text-red-600');
    }
    setLastPrice(price);

    const timer = setTimeout(() => {
      setColor('text-slate-600');
    }, 500);

    return () => clearTimeout(timer);
  }, [price, lastPrice]);

  return color;
}
