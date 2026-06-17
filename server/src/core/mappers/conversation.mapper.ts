import { Conversation } from '../entities/conversation.entity';
import { Message } from '../entities/message.entity';
import { ConversationDTO } from '../../application/dto/conversation.dto';
import { ConversationType } from '../enum/conversation.enum';
import { UserMapper } from './user.mapper';
import { MessageMapper } from './message.mapper';
import { ConversationType as ConversationPrismaType} from '../../adapters/prisma/generated/client';
import { ConversationParticipant } from '../entities/conversation-participant.entity';
import { ConversationParticipationMapper } from './conversation-participation.mapper';
import { ConversationTypeMapper } from './conversation-type.mapper';
import { Prisma } from '../../adapters/prisma/generated/client';
import { User } from '../entities/users.entity';

export type ConversationWithRelations =
  Prisma.ConversationGetPayload<{
    include: {
      participants: {
        include: {
          user: true
        }
      };
      messages: true;
    };
  }>;

export class ConversationMapper {
  static toDomain(raw: ConversationWithRelations): Conversation {
    return new Conversation(
      raw.id,
      raw.name,
      raw.type == ConversationPrismaType.DIRECT ? ConversationType.DIRECT : ConversationType.GROUP,
      raw.participants.map((p) => new ConversationParticipant(
        p.id, p.conversationId, UserMapper.toDomain(p.user), p.joinedAt
      )),
      raw.messages.map(
        (m) =>
          new Message(
            m.id,
            m.conversationId,
            m.senderId,
            m.content,
            m.createdAt,
          ),
      ),
      raw.createdAt,
      raw.updatedAt,
    );
  }

  static toPersistence(conversation: Conversation) {
    return {
      id: conversation.id,
      createdAt: conversation.createdAt,
      updatedAt: conversation.updatedAt,
      participants: {
        create: conversation.participant.map((p : ConversationParticipant) => {
          return {
            userId : p.user.id
          }
        }),
      },
      name: conversation.name,
      type: ConversationTypeMapper.toPersistence(conversation.type),
    };
  }

  static toDTO(conversation: Conversation) : ConversationDTO {
    const participants = conversation.participant.map((p) => ConversationParticipationMapper.toDTO(p))
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