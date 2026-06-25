import { apiClient } from './http';
import { getAuthToken, getCurrentUser, logout, saveCurrentUser } from './authStorage';
import { AuthResponseDto, LoginRequestDto, RegisterRequestDto } from '@/types/api';

export async function register(request: RegisterRequestDto): Promise<AuthResponseDto> {
  const { data } = await apiClient.post<AuthResponseDto>('/api/auth/register', request);
  saveCurrentUser(data);
  return data;
}

export async function login(request: LoginRequestDto): Promise<AuthResponseDto> {
  const { data } = await apiClient.post<AuthResponseDto>('/api/auth/login', request);
  saveCurrentUser(data);
  return data;
}

export { getAuthToken, getCurrentUser, logout, saveCurrentUser };
