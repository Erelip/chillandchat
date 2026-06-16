import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { RegisterInput, LoginInput } from '../dto/auth.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() input: LoginInput) {
        return this.authService.authenticate(input);
    }

    @HttpCode(HttpStatus.OK)
    @Post('register')
    register(@Body() input: RegisterInput) {
        return this.authService.register(input);
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @Get('me')
    getUserInfo(@Request() request) {
        return request.user;
    }
}
