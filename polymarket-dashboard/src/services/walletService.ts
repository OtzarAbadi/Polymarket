import { apiClient } from './http';
import { WalletResponseDto, WalletTransactionResponseDto } from '@/types/api';

export async function getWalletByUserId(userId: number): Promise<WalletResponseDto> {
  const { data } = await apiClient.get<WalletResponseDto>(`/api/wallets/user/${userId}`);
  return data;
}

export async function getWalletTransactionsByUserId(userId: number): Promise<WalletTransactionResponseDto[]> {
  const { data } = await apiClient.get<WalletTransactionResponseDto[]>(`/api/wallets/user/${userId}/transactions`);
  return data;
}

export async function getMyWallet(): Promise<WalletResponseDto> {
  const { data } = await apiClient.get<WalletResponseDto>('/api/wallets/me');
  return data;
}

export async function getMyWalletTransactions(): Promise<WalletTransactionResponseDto[]> {
  const { data } = await apiClient.get<WalletTransactionResponseDto[]>('/api/wallets/me/transactions');
  return data;
}
