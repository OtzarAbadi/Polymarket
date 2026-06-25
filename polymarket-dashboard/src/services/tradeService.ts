import { apiClient } from './http';
import { TradeRequestDto, TradeResponseDto } from '@/types/api';

export async function executeTrade(request: TradeRequestDto): Promise<TradeResponseDto> {
  const { data } = await apiClient.post<TradeResponseDto>('/api/trades', request);
  return data;
}
