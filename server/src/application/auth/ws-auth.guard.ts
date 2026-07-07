import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';
import { GetUsers } from '../../core/usecases/get-users';

@Injectable()
export class WsAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly getUsers: GetUsers,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient<Socket>();

    if (client.data.userId) return true;

    try {
      const token =
        client.handshake.auth?.token ??
        client.handshake.headers.authorization?.split(' ')[1];

      if (!token) return false;

      const payload = await this.jwtService.verifyAsync(token);
      const user = await this.getUsers.getUserById(payload.sub);
      if (!user) return false;

      client.data.userId = user.id;
      return true;
    } catch {
      return false;
    }
  }
}