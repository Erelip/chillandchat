import { ConversationParticipant } from "../entities/conversation-participant.entity";

export abstract class ConversationParticipantRepository {
  abstract save(participant: ConversationParticipant): Promise<void>;

  abstract saveMany(participants: ConversationParticipant[]): Promise<void>;

  abstract findAll(): Promise<ConversationParticipant[]>;

  abstract findById(id: string): Promise<ConversationParticipant | null>;

  abstract findByParticipantId(participantId: string): Promise<ConversationParticipant[]>;
}