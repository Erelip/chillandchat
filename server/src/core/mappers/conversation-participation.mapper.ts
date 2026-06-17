import { Conversation } from '../entities/conversation.entity';
import { ConversationParticipant } from '../entities/conversation-participant.entity';
import { User } from '../entities/users.entity';
import { UserMapper } from './user.mapper';
import { ConversationParticipantDTO } from '../../application/dto/conversation-participant.dto';
import { Prisma } from '../../adapters/prisma/generated/client';

export type ConversationParticipantsWithRelations =
  Prisma.ConversationParticipantGetPayload<{
    include: {
      user: true
    };
  }>;

export class ConversationParticipationMapper {
  static toDomain(raw: ConversationParticipantsWithRelations): ConversationParticipant {
    return new ConversationParticipant(
      raw.id,
      raw.conversationId,
      UserMapper.toDomain(raw.user),
      raw.joinedAt
    );
  }

  static toPersistence(participant: ConversationParticipant) {
    return {
      id: participant.id,
      user: {
        create: participant.user.id,
      },
      joinedAt: participant.joinedAt
    }
  }

  static toDTO(participant: ConversationParticipant): ConversationParticipantDTO {
    const user = UserMapper.toDTO(participant.user);
    return new ConversationParticipantDTO(
      participant.id,
      user,
      participant.joinedAt
    )
  }
}