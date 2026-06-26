import { AuthResponseDto } from '@/types/api';

const AUTH_STORAGE_KEY = 'polymarket.currentUser';
const AUTH_STATE_EVENT = 'polymarket.auth.changed';

function notifyAuthChanged(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(AUTH_STATE_EVENT));
  }
}

export function saveCurrentUser(user: AuthResponseDto): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    notifyAuthChanged();
  }
}

export function getCurrentUser(): AuthResponseDto | null {
  if (typeof window === 'undefined') return null;

  const raw = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) return null;

  try {
    const user = JSON.parse(raw) as AuthResponseDto;
    if (!user.token) {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return null;
    }
    return user;
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
}

export function getAuthToken(): string | null {
  return getCurrentUser()?.token ?? null;
}

export function updateCurrentUser(updates: Partial<AuthResponseDto>): AuthResponseDto | null {
  const currentUser = getCurrentUser();
  if (!currentUser) return null;

  const nextUser = { ...currentUser, ...updates };
  saveCurrentUser(nextUser);
  return nextUser;
}

export function logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    notifyAuthChanged();
  }
}

export { AUTH_STATE_EVENT };
