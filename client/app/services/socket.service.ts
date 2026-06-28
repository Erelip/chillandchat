import { io, Socket } from 'socket.io-client';
import { environment } from '../environments/environment.dev';

class SocketService {
  private socket!: Socket;

  connect() {
    this.socket = io(
      `${environment.BACKEND_PROTOCOL}://${environment.BACKEND_HOST}:${environment.BACKEND_PORT}`,
    );
  }

  getSocket() {
    return this.socket;
  }

  disconnect() {
    return this.socket.disconnect();
  }
}

export const socketService =
  new SocketService();