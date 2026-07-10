import { ConversationParticipant } from '../../../core/entities/conversation-participant.entity';
import { UserPrismaMapper } from './user.prisma.mapper';
import { Prisma } from '../generated/client';

export type ConversationParticipantsWithRelations =
	Prisma.ConversationParticipantGetPayload<{
		include: {
			user: true
		};
	}>;

export class ConversationParticipationPrismaMapper {
	static toDomain(raw: ConversationParticipantsWithRelations): ConversationParticipant {
		return new ConversationParticipant(
			raw.id,
			raw.conversationId,
			UserPrismaMapper.toDomain(raw.user),
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
}