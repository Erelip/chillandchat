import axios from 'axios';
import { environment } from '../environments/environment.dev';

export const api = axios.create({
  baseURL: `${environment.BACKEND_PROTOCOL}://${environment.BACKEND_HOST}:${environment.BACKEND_PORT}`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});