import { ROUTE_PATH } from '@shared/router/path';
import axios, { AxiosError } from 'axios';

import { ApiError } from './api-error';
import { getAccessToken, removeAccessToken } from './token';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    const status = error.response?.status ?? 0;
    const message =
      error.response?.data?.message ?? '알 수 없는 오류가 발생했어요.';

    if (status === 401) {
      removeAccessToken();
      if (window.location.pathname !== ROUTE_PATH.LOGIN) {
        window.location.href = ROUTE_PATH.LOGIN;
      }
    }

    return Promise.reject(new ApiError(message, status));
  },
);

export default instance;
