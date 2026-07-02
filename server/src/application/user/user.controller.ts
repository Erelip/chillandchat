import { Controller, Get, HttpCode, HttpStatus, NotImplementedException, Patch, Post, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { GetUsers } from '../../core/usecases/get-users';
import { AuthGuard } from '../auth/auth.guard';
import { User } from '../../core/entities/users.entity';
import { UserMapper } from '../mappers/user.mapper';
import { CreateUsers } from '../../core/usecases/create-user';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateUsers } from '../../core/usecases/update-user';
import { File } from '../dto/file.dto';

@Controller('users')
export class UserController {

    constructor(
        private readonly getUsers: GetUsers,
        private readonly updateUsers: UpdateUsers
    ) {}

    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @Get('me')
    getUserInfo(@Request() request) {
        return UserMapper.toDTO(request.user);
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @Get('')
    async getAllUsersButMe(@Request() request) {
        const users = await this.getUsers.getAllUsersButMe(request.user.id);
        return users.map((u: User) => UserMapper.toDTO(u));
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('avatar'))
    @Patch('me/avatar')
    async updateAvatar(@Request() request, @UploadedFile() file: File) {
        const avatarUrl = await this.updateUsers.updateAvatar(request.user.id, file);
        return avatarUrl;
    }
}
