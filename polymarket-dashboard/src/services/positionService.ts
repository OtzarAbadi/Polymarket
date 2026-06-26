import { apiClient, authRequestConfig } from './http';
import { PositionResponseDto } from '@/types/api';

export async function getPositionsByUserId(userId: number): Promise<PositionResponseDto[]> {
  const { data } = await apiClient.get<PositionResponseDto[]>(`/api/positions/user/${userId}`);
  return data;
}

export async function getMyPositions(): Promise<PositionResponseDto[]> {
  const { data } = await apiClient.get<PositionResponseDto[]>('/api/positions/me', authRequestConfig());
  return data;
}
