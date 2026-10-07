import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, Req, Request, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '../auth/auth.service';
import { RegisterInput, LoginInput } from '../dto/auth.dto';
import { CreateUserCommand } from '../../core/models/create-user.command';
import { environment } from '../../../environments/environment.dev';
import { UnauthorizedException } from '../../core/exceptions';
import { randomBytes } from 'crypto';

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
				input.phoneNumber,
				null
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

	@Get('google')
	async google(@Res() res: Response) {
		const state = randomBytes(32).toString('hex');

		const url =
			await this.authService.getAuthorizationUrlFromIdentityProvider(state);

		res.cookie('oauth_state', state, {
			httpOnly: true,
			secure: true,
			sameSite: 'none',
			path: '/auth/google',
			maxAge: 10 * 60 * 1000,
		})

		return res.redirect(url);
	}

	@Get('google/callback')
	async googleCallback(
		@Query('code') code: string,
		@Query('state') state: string,
		@Req() req,
		@Res() res: Response,
	) {
		const storedState = req.cookies.oauth_state;

		if (!storedState || storedState !== state) {
			throw new UnauthorizedException(
				'Invalid OAuth state',
			);
		}

		res.clearCookie('oauth_state', {
			path: '/auth/google',
		});

		const { accessToken, refreshToken } = await this.authService.authenticateUsingGoogle(code);

		this.setAccessToken(res, accessToken);
		this.setRefreshToken(res, refreshToken);

		return res.redirect(`${environment.CORS_ORIGIN}/auth/login`);
	}

	private setAccessToken(res: Response, accessToken: string) {
		res.cookie('token', accessToken, {
			httpOnly: true,
			secure: true,
			sameSite: 'none',
			path: '/',
			maxAge: environment.ACCESS_TOKEN_MAX_AGE * 1000,
		});
	}

	private setRefreshToken(res: Response, refreshToken: string) {
		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			secure: true,
			sameSite: 'none',
			path: '/',
			maxAge: environment.REFRESH_TOKEN_MAX_AGE * 1000,
		});
	}

}
