import { apiClient, authRequestConfig } from './http';
import { TradeRequestDto, TradeResponseDto } from '@/types/api';

export async function executeTrade(request: TradeRequestDto): Promise<TradeResponseDto> {
  const { data } = await apiClient.post<TradeResponseDto>('/api/trades', request);
  return data;
}

export async function getTradesByMarket(marketId: number): Promise<TradeResponseDto[]> {
  const { data } = await apiClient.get<TradeResponseDto[]>(`/api/trades/by-market/${marketId}`);
  return data;
}

export async function getTradesByUser(userId: number): Promise<TradeResponseDto[]> {
  const { data } = await apiClient.get<TradeResponseDto[]>(
    `/api/trades/by-user/${userId}`
  );
  return data;
}

export async function getMyTrades(): Promise<TradeResponseDto[]> {
  const { data } = await apiClient.get<TradeResponseDto[]>('/api/trades/me', authRequestConfig());
  return data;
}
