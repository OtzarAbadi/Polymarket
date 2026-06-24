import axios from 'axios';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8080';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
