import { Controller, Get, HttpCode, HttpStatus, NotImplementedException, Post, Request, UseGuards } from '@nestjs/common';
import { GetUsers } from '../../core/usecases/get-users';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UserController {

    constructor(private readonly getUsers: GetUsers) {}

    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @Get('me')
    getUserInfo(@Request() request) {
        return request.user;
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @Get('')
    getAllUsers(@Request() request) {
        return this.getUsers.getAllUsersButMe(request.user.id);
    }
}
