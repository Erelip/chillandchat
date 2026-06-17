import { Conversation } from "../entities/conversation.entity";
import { ConversationType } from "../enum/conversation.enum";

export abstract class ConversationRepository {
  abstract save(type: ConversationType): Promise<Conversation>;

  abstract update(conversation: Conversation): Promise<void>;

  abstract findAll(): Promise<Conversation[]>;

  abstract findById(id: string): Promise<Conversation | null>;

  abstract findByParticipantId(participantId: string): Promise<Conversation[]>;
}