import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './infrastructure/persistence/prisma.module';
import { AuthModule } from './application/auth/auth.module';
import { ConversationModule } from './application/conversation/conversation.module';
import { ChatModule } from './infrastructure/websocket/chat.module';
import { UsersModule } from './application/user/user.module';

@Module({
  imports: [PrismaModule, AuthModule, UsersModule, ConversationModule, ChatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
