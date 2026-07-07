import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway'
import { PersistenceModule } from '../../application/modules/persistence.module';
import { ChatEvents } from '../../core/interfaces/chat-events.interface';
import { UsersModule } from '../../application/user/user.module';
import { WsAuthGuard } from '../../application/auth/ws-auth.guard';

@Module({
  imports: [
    PersistenceModule,
    UsersModule,
  ],
  providers: [
    ChatGateway,
    WsAuthGuard,
    {
      provide: ChatEvents,
      useExisting: ChatGateway,
    },
  ],
  exports: [ChatEvents, UsersModule],
})
export class ChatModule {}