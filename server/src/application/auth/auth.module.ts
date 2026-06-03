import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GetUsers } from '../../core/usecases/getUsers';
import { JwtModule } from '@nestjs/jwt';
import { CreateUsers } from '../../core/usecases/createUser';

@Module({
  providers: [AuthService, GetUsers, CreateUsers, JwtModule],
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      global: true,
      secret: 'secret-key',
      signOptions: { expiresIn: '1d' },
    }),
  ],
})
export class AuthModule {}
