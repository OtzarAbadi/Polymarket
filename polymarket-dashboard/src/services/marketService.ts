import { apiClient } from './http';
import { mapMarketResponse, mapMarketResponses } from '@/lib/mappers';
import { BackendMarketResponseDto, MarketDetail, MarketsResult } from '@/types/api';

export async function getMarkets(): Promise<MarketsResult> {
  const { data } = await apiClient.get<BackendMarketResponseDto[]>('/api/markets');
  const markets = mapMarketResponses(data);

  return {
    markets,
    total: markets.length,
  };
}

export async function getMarketById(id: string | number): Promise<MarketDetail> {
  const { data } = await apiClient.get<BackendMarketResponseDto>(`/api/markets/${id}`);
  return mapMarketResponse(data);
}
