import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';
import { GetUsers } from '../../core/usecases/get-users';
import { UnauthorizedException } from '../../core/exceptions';
import { parse } from 'cookie';

@Injectable()
export class WsAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly getUsers: GetUsers,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient<Socket>();
    const cookieHeader = client.handshake.headers.cookie;

    try {
      if (!cookieHeader) throw new UnauthorizedException("Not allowed");

      const cookies = parse(cookieHeader);
      const token = cookies.token;

      if (!token) throw new UnauthorizedException("Not allowed");

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