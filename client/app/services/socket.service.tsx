import { io, Socket } from 'socket.io-client';

class SocketService {
  private socket!: Socket;

  connect() {
    this.socket = io(
      'http://localhost:3000',
    );
  }

  getSocket() {
    return this.socket;
  }
}

export const socketService =
  new SocketService();