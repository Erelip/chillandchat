import { Conversation } from '../entities/conversation.entity';
import { ConversationParticipant } from '../entities/conversation-participant.entity';

export class ConversationParticipationMapper {
  static toDomain(id: string, conversationId: string, userId: string, joinedAt: Date): ConversationParticipant {
    return new ConversationParticipant(
      id,
      conversationId,
      userId,
      joinedAt
    );
  }

  static toDTO(conversationParticipant: ConversationParticipant): ConversationParticipant {
    return new ConversationParticipant(
      conversationParticipant.id,
      conversationParticipant.conversationId,
      conversationParticipant.userId,
      conversationParticipant.joinedAt
    )
  }
}