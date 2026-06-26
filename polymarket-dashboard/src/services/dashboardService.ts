import { apiClient } from './http';
import { DashboardSummaryDto } from '@/types/api';

export async function getDashboardSummary(): Promise<DashboardSummaryDto> {
  const { data } = await apiClient.get<DashboardSummaryDto>('/api/dashboard/summary');
  return data;
}
