import axios, { AxiosRequestConfig } from 'axios';
import { toast } from 'sonner';
import { getAuthToken } from './authStorage';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8080';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export function authRequestConfig(): AxiosRequestConfig {
  const token = getAuthToken();

  return {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
}

apiClient.interceptors.request.use((config) => {
  const token = getAuthToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'The request could not be completed.';
    const method = error.config?.method?.toUpperCase() || 'REQUEST';
    const url = error.config?.url || 'unknown';
    const status = error.response?.status || 'network';

    toast.error(message, {
      id: `api-error:${method}:${url}:${status}`,
      duration: 4500,
    });

    return Promise.reject(error);
  }
);
