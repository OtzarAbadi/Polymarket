import { apiClient } from './http';
import { AuthResponseDto, LoginRequestDto, RegisterRequestDto } from '@/types/api';

const AUTH_STORAGE_KEY = 'polymarket.currentUser';

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

export function saveCurrentUser(user: AuthResponseDto): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  }
}

export function getCurrentUser(): AuthResponseDto | null {
  if (typeof window === 'undefined') return null;

  const raw = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as AuthResponseDto;
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
}

export function logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
}
