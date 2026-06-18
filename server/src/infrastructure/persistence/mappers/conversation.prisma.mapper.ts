import { Conversation } from '../../../core/entities/conversation.entity';
import { Message } from '../../../core/entities/message.entity';
import { ConversationType } from '../../../core/enum/conversation.enum';
import { UserPrismaMapper } from './user.prisma.mapper';
import { ConversationType as ConversationPrismaType} from '../generated/client';
import { ConversationParticipant } from '../../../core/entities/conversation-participant.entity';
import { ConversationTypePrismaMapper } from './conversation-type.prisma.mapper'
import { Prisma } from '../generated/client';

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

export class ConversationPrismaMapper {
  static toDomain(raw: ConversationWithRelations): Conversation {
    return new Conversation(
      raw.id,
      raw.name,
      ConversationTypePrismaMapper.toDomain(raw.type),
      raw.participants.map((p) => new ConversationParticipant(
        p.id, p.conversationId, UserPrismaMapper.toDomain(p.user), p.joinedAt
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
      participants: conversation.participants,
      name: conversation.name,
      type: ConversationTypePrismaMapper.toPersistence(conversation.type),
    };
  }

}