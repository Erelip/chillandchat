import { Module } from '@nestjs/common';
import { CreateConversations } from '../../core/usecases/create-conversations';
import { UsersModule } from '../user/user.module';
import { ConversationController } from './conversation.controller';
import { ConversationRepository } from '../../core/interfaces/conversation.repository.interface';
import { ConversationPrismaRepository } from '../../adapters/prisma/repositories/conversation.prisma.repository';
import { ConversationParticipantRepository } from '../../core/interfaces/conversation-participant.repository.interface';
import { ConversationParticipantPrismaRepository } from '../../adapters/prisma/repositories/conversation-participant.prisma.repository';
import { MessageRepository } from '../../core/interfaces/message.repository.interface';
import { MessagePrismaRepository } from '../../adapters/prisma/repositories/message.prisma.repository';
import { SendMessage } from '../../core/usecases/send-messages';
import { ChatGateway } from '../../adapters/websocket/chat.gateway';

@Module({
  imports: [
    UsersModule,
  ],
  controllers: [ConversationController],
  providers: [
    CreateConversations,
    SendMessage,
    ChatGateway,
    {
      provide: ConversationRepository,
      useClass: ConversationPrismaRepository,
    },
    {
      provide: ConversationParticipantRepository,
      useClass: ConversationParticipantPrismaRepository,
    },
    {
      provide: MessageRepository,
      useClass: MessagePrismaRepository,
    },

  ],
})
export class ConversationModule {}