import { apiClient } from './http';
import { PositionResponseDto } from '@/types/api';

export async function getPositionsByUserId(userId: number): Promise<PositionResponseDto[]> {
  const { data } = await apiClient.get<PositionResponseDto[]>(`/api/positions/user/${userId}`);
  return data;
}
