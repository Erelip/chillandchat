import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './adapters/prisma/prisma.module';
import { AuthModule } from './application/auth/auth.module';
import { UsersModule } from './application/user/user.module';
import { ConversationModule } from './application/conversation/conversation.module';

@Module({
  imports: [PrismaModule, AuthModule, UsersModule, ConversationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
