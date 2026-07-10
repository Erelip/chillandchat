import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GetUsers } from '../../core/usecases/get-users';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(
		private readonly jwtService: JwtService,
		private readonly getUser: GetUsers
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const token = request.cookies?.token;

		if (!token) {
			throw new UnauthorizedException('Invalid token format');
		}

		try {
			const tokenPayload = await this.jwtService.verify(token);
			const user = await this.getUser.getUserById(tokenPayload.sub);

			if (!user) throw new UnauthorizedException('Invalid token');
			request.user = user;

			return true;
		} catch (error) {
			throw new UnauthorizedException('Invalid token');
		}
	}
}