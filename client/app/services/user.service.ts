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

    return response.data;
  }

  async logout() {
    return await api.post('/auth/logout');
  }

  async getUser() {
    return await api.get('/users/me');
  }

  async getAllUsersButMe() {
    return await api.get('/users');
  }

  async uploadAvatar(formData: FormData) {
    return await api.patch('/users/me/avatar', formData);
  }

  async updateMe(data: {
    firstname: string;
    lastname: string;
    phoneNumber: string;
  }) {
    return await api.patch('/users/me', data);
  }
}