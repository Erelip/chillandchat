import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Request, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '../auth/auth.service';
import { RegisterInput, LoginInput } from '../dto/auth.dto';
import { CreateUserCommand } from '../../core/models/create-user.command';
import { environment } from '../../../environments/environment.dev';

@Controller('auth')
export class AuthController {

	constructor(
		private readonly authService: AuthService
	) {}

	@HttpCode(HttpStatus.OK)
	@Post('login')
	async login(
		@Body() input: LoginInput,
		@Res({ passthrough: true }) res: Response
	) {
		const { accessToken, refreshToken } = await this.authService.authenticate(input);

		this.setAccessToken(res, accessToken);
		this.setRefreshToken(res, refreshToken);

		return { success: true };

	}

	@HttpCode(HttpStatus.CREATED)
	@Post('register')
	async register(
		@Body() input: RegisterInput,
		@Res({ passthrough: true }) res: Response
	) {
		const { accessToken, refreshToken } = await this.authService.register(
			new CreateUserCommand(
				input.username,
				input.email,
				input.password,
				input.firstname,
				input.lastname,
				input.phoneNumber
			)
		);

		this.setAccessToken(res, accessToken);
		this.setRefreshToken(res, refreshToken);

		return { success: true };

	}

	@Post('logout')
	@HttpCode(HttpStatus.NO_CONTENT)
	logout(@Res({ passthrough: true }) res: Response) {
		res.clearCookie('token', { path: '/' });
		res.clearCookie('refreshToken', { path: '/' });
		return { success: true };
	}

	@Post('refresh')
	@HttpCode(HttpStatus.OK)
	async refresh(
		@Req() req,
		@Res({ passthrough: true }) res: Response,
	) {
		const refreshToken = req.cookies.refreshToken;

		const token = await this.authService.refreshToken(refreshToken);

		this.setAccessToken(res, token);

		return { success: true };
	}

	private setAccessToken(res: Response, accessToken: string) {
		res.cookie('token', accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			path: '/',
			maxAge: environment.ACCESS_TOKEN_MAX_AGE * 1000,
		});
	}

	private setRefreshToken(res: Response, refreshToken: string) {
		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			secure: false,
			sameSite: 'lax',
			path: '/',
			maxAge: environment.REFRESH_TOKEN_MAX_AGE * 1000,
		});
	}

}
