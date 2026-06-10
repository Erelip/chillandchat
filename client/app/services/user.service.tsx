import { api } from '../lib/api';

export class UserService {

  async register(username: string, email: string, password: string) {
    const response = await api.post(
      '/auth/register',
      {
        username,
        email,
        password,
      },
    );

    localStorage.setItem('token', response.data.accessToken,);

    return response.data;
  }

  async login(username: string, password: string) {
    const response = await api.post(
      '/auth/login',
      {
        username,
        password,
      },
    );

    localStorage.setItem('token', response.data.accessToken);

    return response.data;
  }

  async getUser() {
    return await api.get('/users/me');
  }

  async getAllUsersButMe(id: string) {
    return await api.get('/users');
  }
}