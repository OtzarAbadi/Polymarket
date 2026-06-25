import { apiClient } from './http';
import { mapMarketResponse, mapMarketResponses } from '@/lib/mappers';
import {
  BackendMarketResponseDto,
  CreateMarketRequestDto,
  MarketDetail,
  MarketsResult,
  PriceHistoryDto,
  ResolutionRequestDto,
} from '@/types/api';

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

export async function getMarketPriceHistory(marketId: number): Promise<PriceHistoryDto[]> {
  const { data } = await apiClient.get<PriceHistoryDto[]>(`/api/markets/${marketId}/history`);
  return data;
}

export async function createMarket(request: CreateMarketRequestDto): Promise<MarketDetail> {
  const { data } = await apiClient.post<BackendMarketResponseDto>('/api/markets/admin/markets', request);
  return mapMarketResponse(data);
}

export async function resolveMarket(request: ResolutionRequestDto): Promise<void> {
  await apiClient.post('/api/markets/resolve', request);
}
