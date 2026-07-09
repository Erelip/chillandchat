import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../user/user.module';
import { environment } from '../../../environments/environment.dev';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: environment.SECRET_KEY,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}