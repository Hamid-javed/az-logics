import axios from 'axios';
import { AUTH_API_URL } from '@/config/api';

const loginApiClient = axios.create({
  baseURL: AUTH_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


loginApiClient.interceptors.request.use((config) => {
  const token =
    typeof localStorage !== 'undefined'
      ? localStorage.getItem('access_token') ?? localStorage.getItem('auth-storage')
      : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default loginApiClient;