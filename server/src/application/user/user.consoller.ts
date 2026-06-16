import { Controller, Get, HttpCode, HttpStatus, NotImplementedException, Post, Request, UseGuards } from '@nestjs/common';
import { GetUsers } from '../../core/usecases/get-users';
import { AuthGuard } from '../auth/auth.guard';
import { UserMapper } from '../../core/mappers/user.mapper';
import { User } from '../../core/entities/users.entity';

@Controller('users')
export class UserController {

    constructor(private readonly getUsers: GetUsers) {}

    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @Get('me')
    getUserInfo(@Request() request) {
        return UserMapper.toDTO(request.user);
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @Get('')
    async getAllUsers(@Request() request) {
        const users = await this.getUsers.getAllUsersButMe(request.user.id);

        return users.map(
            (user: User) => UserMapper.toDTO(user)
        );
    }
}
