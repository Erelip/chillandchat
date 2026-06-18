import { Conversation } from '../../core/entities/conversation.entity';
import { ConversationDTO } from '../../application/dto/conversation.dto';
import { MessageMapper } from './message.mapper';
import { ConversationParticipationMapper } from './conversation-participation.mapper';

export class ConversationMapper {
  static toDTO(conversation: Conversation) : ConversationDTO {
    const participants = conversation.participants.map((p) => ConversationParticipationMapper.toDTO(p))
    const messages = conversation.messages.map((p) => MessageMapper.toDTO(p))
    return new ConversationDTO(
      conversation.id,
      participants,
      conversation.name,
      messages[0],
      conversation.createdAt,
      conversation.updatedAt,
      conversation.type
    )
  }
}