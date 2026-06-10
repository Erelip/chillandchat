import { Conversation } from '../entities/conversation.entity';
import { ConversationParticipant } from '../entities/conversation-participant.entity';
import { Message } from '../entities/message.entity';
import { ConversationDTO } from '../../application/dto/conversation.dto';
import { ConversationType } from '../enum/conversation.enum';

export class ConversationMapper {
  static toDomain(id: string, conversationParticipant: ConversationParticipant[], name: string | null, messages: Message[], createdAt: Date, type : ConversationType): Conversation {
    return new Conversation(
      id,
      conversationParticipant,
      name,
      messages,
      createdAt,
      type
    );
  }

  static toPersistence(conversation: Conversation) {
    return {
      id: conversation.id,
      participants: conversation.participants,
      name: conversation.name,
      type: conversation.type,
    };
  }

  static toDTO(conversation: Conversation): ConversationDTO {
    return {
      id: conversation.id,
      participants: conversation.participants,
      name: conversation.name,
      messages: conversation.messages,
      type: conversation.type
    };
  }
}