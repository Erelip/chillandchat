import { Module } from '@nestjs/common';
import { CreateConversations } from '../../core/usecases/create-conversations';
import { UsersModule } from '../user/user.module';
import { ConversationController } from './conversation.controller';
import { SendMessage } from '../../core/usecases/send-messages';
import { ChatGateway } from '../../infrastructure/websocket/chat.gateway';
import { GetConversations } from '../../core/usecases/get-conversations';
import { GetMessages } from '../../core/usecases/get-messages';
import { SharedModule } from '../modules/shared.module';
import { PersistenceModule } from '../modules/persistence.module';
import { ConversationRepository } from '../../core/interfaces/conversation.repository.interface';
import { MessageRepository } from '../../core/interfaces/message.repository.interface';
import { UserRepository } from '../../core/interfaces/user.repository.interface';
import { ConversationParticipantRepository } from '../../core/interfaces/conversation-participant.repository.interface';
import { IdGenerator } from '../../core/interfaces/uuid-generator.interface';
import { ChatModule } from '../../infrastructure/websocket/chat.module';

@Module({
  imports: [SharedModule, UsersModule, PersistenceModule, ChatModule],
  controllers: [ConversationController],
  providers: [
    {
      provide: GetConversations,
      useFactory: (
        conversationRepository: ConversationRepository,
        messageRepository: MessageRepository
      ) => {
        return new GetConversations(conversationRepository, messageRepository);
      },
      inject: [ConversationRepository, MessageRepository],
    },
    {
      provide: CreateConversations,
      useFactory: (
        userRepository: UserRepository,
        conversationRepository: ConversationRepository,
        conversationParticipantRepository: ConversationParticipantRepository,
        generator: IdGenerator,
      ) => {
        return new CreateConversations(userRepository, conversationRepository, conversationParticipantRepository, generator);
      },
      inject: [UserRepository, ConversationRepository, ConversationParticipantRepository, IdGenerator],
    },
    {
      provide: SendMessage,
      useFactory: (
        conversationRepository: ConversationRepository,
        messageRepository: MessageRepository,
        chatGateway: ChatGateway,
      ) => {
        return new SendMessage(conversationRepository, messageRepository, chatGateway);
      },
      inject: [ConversationRepository, MessageRepository, ChatGateway],
    },
    {
      provide: GetMessages,
      useFactory: (
        messageRepository: MessageRepository,
      ) => {
        return new GetMessages(messageRepository);
      },
      inject: [MessageRepository],
    }
  ],
  exports: [GetConversations, CreateConversations, SendMessage, GetMessages],
})  

export class ConversationModule {}