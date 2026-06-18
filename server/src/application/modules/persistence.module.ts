import { Module } from "@nestjs/common";
import { UserRepository } from "../../core/interfaces/user.repository.interface";
import { PrismaUserRepository } from "../../infrastructure/persistence/repositories/user.prisma.repository";
import { ConversationRepository } from "../../core/interfaces/conversation.repository.interface";
import { ConversationPrismaRepository } from "../../infrastructure/persistence/repositories/conversation.prisma.repository";
import { MessageRepository } from "../../core/interfaces/message.repository.interface";
import { MessagePrismaRepository } from "../../infrastructure/persistence/repositories/message.prisma.repository";
import { ConversationParticipantRepository } from "../../core/interfaces/conversation-participant.repository.interface";
import { ConversationParticipantPrismaRepository } from "../../infrastructure/persistence/repositories/conversation-participant.prisma.repository";
import { PrismaModule } from "../../infrastructure/persistence/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: ConversationRepository,
      useClass: ConversationPrismaRepository,
    },
    {
      provide: ConversationParticipantRepository,
      useClass: ConversationParticipantPrismaRepository
    },
    {
      provide: MessageRepository,
      useClass: MessagePrismaRepository,
    },
  ],
  exports: [
    UserRepository,
    ConversationRepository,
    ConversationParticipantRepository,
    MessageRepository,
  ],
})
export class PersistenceModule {}