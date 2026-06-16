import { Conversation } from '../entities/conversation.entity';
import { Message } from '../entities/message.entity';
import { ConversationDTO } from '../../application/dto/conversation.dto';
import { ConversationType } from '../enum/conversation.enum';
import { User } from '../entities/users.entity';
import { UserMapper } from './user.mapper';
import { MessageMapper } from './message.mapper';

export class ConversationMapper {
  static toDomain(id: string, conversationParticipant: User[], name: string | null, messages: Message[], createdAt: Date, type : ConversationType): Conversation {
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
    const message = conversation.messages.length > 0 ? MessageMapper.toDTO(conversation.messages[conversation.messages.length - 1]) : null;

    return new ConversationDTO(
      conversation.id,
      conversation.participants.map((p) => UserMapper.toDTO(p)),
      conversation.name,
      message,
      conversation.createdAt,
      conversation.type
    );
  }
}