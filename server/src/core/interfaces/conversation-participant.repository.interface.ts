import { ConversationParticipant } from "../../core/entities/conversation-participant.entity";

export abstract class ConversationParticipantRepository {
  abstract save(participant: ConversationParticipant): Promise<ConversationParticipant>;

  abstract saveMany(participants: ConversationParticipant[]): Promise<void>;

  abstract findAll(): Promise<ConversationParticipant[]>;

  abstract findById(id: string): Promise<ConversationParticipant | null>;

  abstract findByParticipantId(participantId: string): Promise<ConversationParticipant[]>;
}