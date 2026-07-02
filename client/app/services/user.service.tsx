import { api } from '../lib/api';

export class UserService {

  async register(username: string, email: string, password: string, firstname: string, lastname: string, phoneNumber: string) {
    const response = await api.post(
      '/auth/register',
      {
        username: username,
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname,
        phoneNumber: phoneNumber
      },
    );

    localStorage.setItem('token', response.data.accessToken,);

    return response.data;
  }

  async login(username: string, password: string) {
    const response = await api.post(
      '/auth/login',
      {
        username: username,
        password: password,
      },
    );

    localStorage.setItem('token', response.data.accessToken);

    return response.data;
  }

  public logout() {
    localStorage.removeItem('token');
  }

  async getUser() {
    return await api.get('/users/me');
  }

  async getAllUsersButMe() {
    return await api.get('/users');
  }
}