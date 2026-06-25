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
  token: string;
}

export type TradeType = 'BUY' | 'SELL';
export type TradeOutcomeName = 'YES' | 'NO';

export interface WalletResponseDto {
  walletId: number;
  userId: number;
  username: string;
  balance: number | string;
}

export interface WalletTransactionResponseDto {
  transactionId: number;
  userId: number;
  username: string;
  type: string;
  amount: number | string;
  balanceAfter: number | string;
  description?: string | null;
  createdAt: string;
}

export interface PositionResponseDto {
  positionId: number;
  userId: number;
  marketId: number;
  marketTitle: string;
  outcomeId: number;
  outcomeName: string;
  quantity: number | string;
  currentPrice: number | string;
  currentValue: number | string;
  unrealizedPnL: number | string;
}

export interface TradeRequestDto {
  userId: number;
  marketId: number;
  outcomeId: number;
  quantity: number | string;
  type: TradeType;
}

export interface TradeResponseDto {
  tradeId: number;
  userId: number;
  marketId: number;
  outcomeId: number;
  type: TradeType;
  quantity: number | string;
  price: number | string;
  totalCost: number | string;
  walletBalanceAfterTrade: number | string;
  positionQuantityAfterTrade: number | string;
}

export interface CreateMarketRequestDto {
  adminUserId: number;
  title: string;
  description?: string;
  category: string;
  tradingCloseDate: string;
  resolutionDate: string;
  resolutionSource?: string;
}

export interface ResolutionRequestDto {
  adminUserId: number;
  marketId: number;
  winningOutcomeId: number;
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
