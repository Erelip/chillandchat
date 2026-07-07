import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '../auth/auth.guard';
import { RegisterInput, LoginInput } from '../dto/auth.dto';
import { CreateUserCommand } from '../../core/models/create-user.command';

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
        const command = new CreateUserCommand(
            input.username,
            input.email,
            input.password,
            input.firstname,
            input.lastname,
            input.password
        )
        return this.authService.register(command);
    }

}
