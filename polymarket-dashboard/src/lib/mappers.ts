import { BackendMarketResponseDto, BackendMarketStatus, Market, MarketState } from '@/types/api';

const statusToState: Record<BackendMarketStatus, MarketState> = {
  OPEN: 'active',
  CLOSED: 'closed',
  RESOLVED: 'resolved',
  CANCELLED: 'cancelled',
};

function toNumber(value: number | string | null | undefined): number {
  if (value === null || value === undefined) return 0;
  const parsed = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function mapMarketResponse(dto: BackendMarketResponseDto): Market {
  return {
    id: String(dto.marketId),
    marketId: dto.marketId,
    title: dto.title,
    description: dto.description ?? undefined,
    category: dto.category,
    state: statusToState[dto.status] ?? 'closed',
    status: dto.status,
    yesPrice: toNumber(dto.yesPrice),
    noPrice: toNumber(dto.noPrice),
    endDate: dto.tradingCloseDate,
    tradingCloseDate: dto.tradingCloseDate,
    resolutionDate: dto.resolutionDate,
    resolutionSource: dto.resolutionSource ?? undefined,
    yesOutcomeId: dto.yesOutcomeId,
    noOutcomeId: dto.noOutcomeId,
    outcomes: ['YES', 'NO'],
  };
}

export function mapMarketResponses(dtos: BackendMarketResponseDto[]): Market[] {
  return dtos.map(mapMarketResponse);
}
