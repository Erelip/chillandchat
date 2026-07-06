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
import { Generator } from '../../core/interfaces/generator.interface';
import { ChatModule } from '../../infrastructure/websocket/chat.module';
import { EditConversations } from '../../core/usecases/edit-conversation';
import { FileStorage } from '../../core/interfaces/file-storage.interface';

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
        generator: Generator,
      ) => {
        return new CreateConversations(userRepository, conversationRepository, conversationParticipantRepository, generator);
      },
      inject: [UserRepository, ConversationRepository, ConversationParticipantRepository, Generator],
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
    },
    {
      provide: EditConversations,
      useFactory: (
        conversationRepository: ConversationRepository,
        participantRepository: ConversationParticipantRepository,
        userRepository: UserRepository,
        fileStorage: FileStorage,
        idGenerator: Generator
      ) => {
        return new EditConversations(conversationRepository, participantRepository, userRepository, fileStorage, idGenerator);
      },
      inject: [ConversationRepository, ConversationParticipantRepository, UserRepository, FileStorage, Generator],
    }
  ],
  exports: [GetConversations, CreateConversations, SendMessage, GetMessages],
})  

export class ConversationModule {}