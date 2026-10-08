import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';
import { environment } from '../environments/environment.dev';

declare module 'axios' {
  interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}

export const api = axios.create({
  baseURL: `${environment.BACKEND_PROTOCOL}://${environment.BACKEND_HOST}:${environment.BACKEND_PORT}`,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        await api.post('/auth/refresh');
        return api(originalRequest);
      } catch {
        window.location.href = '/auth/login';
      }
    }

    return Promise.reject(error);
  },
);