import axios from 'axios';
import { environment } from '../environments/environment.dev';

export const api = axios.create({
  baseURL: `${environment.BACKEND_PROTOCOL}://${environment.BACKEND_HOST}:${environment.BACKEND_PORT}`,
  withCredentials: true,
});