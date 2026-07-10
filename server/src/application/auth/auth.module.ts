import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersModule } from '../user/user.module';
import { environment } from '../../../environments/environment.dev';
import { SharedModule } from '../modules/shared.module';
import { GetUsers } from '../../core/usecases/get-users';
import { CreateUsers } from '../../core/usecases/create-user';
import { PasswordHasher } from '../../core/interfaces/password-hasher.interface';

@Module({
	imports: [
		SharedModule,
		UsersModule,
		JwtModule.register({
			global: true,
			secret: environment.SECRET_KEY,
		}),
	],
	controllers: [AuthController],
	providers: [
		{
			provide: AuthService,
			useFactory: (
				getUsers: GetUsers,
				createUsers: CreateUsers,
				jwtService: JwtService,
				passwordHasher: PasswordHasher
			) => {
				return new AuthService(getUsers, createUsers, jwtService, passwordHasher)
			},
			inject: [GetUsers, CreateUsers, JwtService, PasswordHasher]
		}
	],
	exports: [AuthService],
})
export class AuthModule {}