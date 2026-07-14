import { Body, Controller, Get, HttpCode, HttpStatus, Patch, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { GetUsers } from '../../core/usecases/get-users';
import { AuthGuard } from '../auth/auth.guard';
import { User } from '../../core/entities/users.entity';
import { UserMapper } from '../mappers/user.mapper';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateUsers } from '../../core/usecases/update-user';
import { File } from '../../core/models/file';
import { UpdateUserAvatarCommand, UpdateUserInfoCommand } from '../../core/models/update-user.command';
import { extname } from 'path';

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
		const extension = extname(file.originalname).toLowerCase();
		file.extention = extension;

		const command = new UpdateUserAvatarCommand(request.user.id, file)
		const avatarUrl = await this.updateUsers.updateAvatar(command);

		return avatarUrl;
	}

	@HttpCode(HttpStatus.OK)
	@UseGuards(AuthGuard)
	@Patch('me')
	async updateMe(@Request() request, @Body() body : { firstname: string, lastname: string, phoneNumber: string}) {
		const command = new UpdateUserInfoCommand(request.user.id, body.firstname, body.lastname, body.phoneNumber);
		const user = await this.updateUsers.updateUser(command);

		return UserMapper.toDTO(user);
	}
}
