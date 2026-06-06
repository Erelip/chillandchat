import { Conversation } from "../../adapters/prisma/entities/conversation.prisma.entity";
import { ConversationParticipant } from "../../adapters/prisma/entities/conversation-participant.prisma.entity";
import { Message } from "../../adapters/prisma/entities/message.prisma.entity";
import { ConversationType } from "../enum/conversation.enum";

export abstract class ConversationParticipantRepository {
  abstract save(participant: ConversationParticipant): Promise<ConversationParticipant>;

  abstract saveMany(participants: ConversationParticipant[]): Promise<void>;

  abstract findAll(): Promise<ConversationParticipant[]>;

  abstract findById(id: string): Promise<ConversationParticipant | null>;

  abstract findByParticipantId(participantId: string): Promise<ConversationParticipant[]>;
}