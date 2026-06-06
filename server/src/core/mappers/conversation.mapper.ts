import { Conversation } from '../../adapters/prisma/entities/conversation.prisma.entity';
import { ConversationDTO } from '../../application/dto/conversation.dto';
import { ConversationType } from '../enum/conversation.enum';

export class ConversationMapper {
  static toDomain(conversation : Conversation): Conversation {
    return new Conversation(
      conversation.id,
      conversation.participants,
      conversation.messages,
      conversation.createdAt,
      conversation.type
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
      type: conversation.type === 'DIRECT' ? ConversationType.DIRECT : ConversationType.GROUP,
    };
  }
}