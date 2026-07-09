import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '../auth/auth.service';
import { RegisterInput, LoginInput } from '../dto/auth.dto';
import { CreateUserCommand } from '../../core/models/create-user.command';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(
        @Body() input: LoginInput,
        @Res({ passthrough: true }) res: Response
    ) {
        const token = await this.authService.authenticate(input);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
        });

        return { success: true };

    }

    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    async register(
        @Body() input: RegisterInput,
        @Res({ passthrough: true }) res: Response
    ) {
        const token = await this.authService.register(
            new CreateUserCommand(
                input.username,
                input.email,
                input.password,
                input.firstname,
                input.lastname,
                input.password
            )
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
        });

        return { success: true };

    }

}
