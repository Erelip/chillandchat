import { io, Socket } from 'socket.io-client';
import { environment } from '../environments/environment.dev';

class SocketService {
  private socket!: Socket;

  connect() {
    const token = localStorage.getItem('token');
    if (!token) return;

    this.socket = io(
      `${environment.BACKEND_PROTOCOL}://${environment.BACKEND_HOST}:${environment.BACKEND_PORT}`,
      {
        auth: { token },
      },
    );
  }

  getSocket() {
    return this.socket;
  }

  disconnect() {
    return this.socket.disconnect();
  }
}

export const socketService = new SocketService();