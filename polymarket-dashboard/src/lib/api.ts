import { getMarketById, getMarkets } from '@/services/marketService';
import { Market, MarketDetail, MarketsResult, PriceHistory } from '@/types/api';

export type { Market, MarketDetail, MarketsResult, PriceHistory };

export async function fetchMarkets(
  _page: number = 1,
  _limit: number = 20
): Promise<MarketsResult> {
  return getMarkets();
}

export async function fetchMarketDetail(id: string): Promise<MarketDetail> {
  return getMarketById(id);
}

export async function fetchHealth() {
  return { ok: true };
}
