import { Conversation } from "../../adapters/prisma/entities/conversation.prisma.entity";
import { ConversationParticipant } from "../../adapters/prisma/entities/conversation-participant.prisma.entity";
import { Message } from "../../adapters/prisma/entities/message.prisma.entity";
import { ConversationType } from "../enum/conversation.enum";

export abstract class ConversationRepository {
  abstract save(type: ConversationType): Promise<Conversation>;

  abstract findAll(): Promise<Conversation[]>;

  abstract findById(id: string): Promise<Conversation | null>;

  abstract findByParticipantId(participantId: string): Promise<Conversation[]>;
}