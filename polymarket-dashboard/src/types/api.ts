export type BackendMarketStatus = 'OPEN' | 'CLOSED' | 'RESOLVED' | 'CANCELLED';
export type MarketState = 'active' | 'closed' | 'resolved' | 'cancelled';
export type UserRole = 'USER' | 'ADMIN';

export interface RegisterRequestDto {
  username: string;
  email: string;
  password: string;
}

export interface LoginRequestDto {
  usernameOrEmail: string;
  password: string;
}

export interface AuthResponseDto {
  userId: number;
  username: string;
  email: string;
  role: UserRole;
  walletBalance: number | string;
}

export interface BackendMarketResponseDto {
  marketId: number;
  title: string;
  description?: string | null;
  category: string;
  status: BackendMarketStatus;
  tradingCloseDate: string;
  resolutionDate: string;
  resolutionSource?: string | null;
  yesOutcomeId: number;
  noOutcomeId: number;
  yesPrice: number | string;
  noPrice: number | string;
}

export interface Market {
  id: string;
  marketId: number;
  title: string;
  description?: string;
  category?: string;
  state: MarketState;
  status: BackendMarketStatus;
  yesPrice: number;
  noPrice: number;
  liquidity?: number;
  volume24h?: number;
  endDate?: string;
  tradingCloseDate?: string;
  resolutionDate?: string;
  resolutionSource?: string;
  yesOutcomeId?: number;
  noOutcomeId?: number;
  outcomes?: string[];
}

export interface PriceHistory {
  timestamp: number;
  yesPrice: number;
  noPrice: number;
}

export interface MarketDetail extends Market {
  priceHistory?: PriceHistory[];
  recentTrades?: Array<{
    id: string;
    outcome: 'yes' | 'no';
    price: number;
    amount: number;
    timestamp: number;
  }>;
  relatedMarkets?: Market[];
}

export interface MarketsResult {
  markets: Market[];
  total: number;
}
