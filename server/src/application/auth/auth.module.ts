import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GetUsers } from '../../core/usecases/get-users';
import { JwtModule } from '@nestjs/jwt';
import { CreateUsers } from '../../core/usecases/create-user';
import { UsersModule } from '../user/user.module';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: 'secret-key',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}