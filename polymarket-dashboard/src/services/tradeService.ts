import { apiClient } from './http';
import { TradeRequestDto, TradeResponseDto } from '@/types/api';

export async function executeTrade(request: TradeRequestDto): Promise<TradeResponseDto> {
  const { data } = await apiClient.post<TradeResponseDto>('/api/trades', request);
  return data;
}

export async function getTradesByMarket(marketId: number): Promise<TradeResponseDto[]> {
  const { data } = await apiClient.get<TradeResponseDto[]>(`/api/trades/by-market/${marketId}`);
  return data;
}
