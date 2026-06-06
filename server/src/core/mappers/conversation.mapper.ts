import { Conversation } from '../entities/conversation.entity';
import { ConversationParticipant } from '../entities/conversation-participant.entity';
import { Message } from '../entities/message.entity';
import { ConversationDTO } from '../../application/dto/conversation.dto';
import { ConversationType } from '../enum/conversation.enum';

export class ConversationMapper {
  static toDomain(id: string, conversationParticipant: ConversationParticipant[], messages: Message[], createdAt: Date, type : ConversationType): Conversation {
    return new Conversation(
      id,
      conversationParticipant,
      messages,
      createdAt,
      type
    );
  }

  static toPersistence(conversation: Conversation) {
    return {
      id: conversation.id,
      participants: conversation.participants,
      type: conversation.type,
    };
  }

  static toDTO(conversation: Conversation): ConversationDTO {
    return {
      id: conversation.id,
      participants: conversation.participants,
      type: conversation.type
    };
  }
}