import { apiClient } from './http';
import { LeaderboardResponseDto } from '@/types/api';

export async function getLeaderboard(): Promise<LeaderboardResponseDto[]> {
  const { data } = await apiClient.get<LeaderboardResponseDto[]>('/api/leaderboard');
  return data;
}
