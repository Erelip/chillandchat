import { Conversation } from '../../../core/entities/conversation.entity';
import { Message } from '../../../core/entities/message.entity';
import { UserPrismaMapper } from './user.prisma.mapper';
import { ConversationParticipant } from '../../../core/entities/conversation-participant.entity';
import { ConversationTypePrismaMapper } from './conversation-type.prisma.mapper'
import { Prisma } from '../generated/client';
import { MessagePrismaMapper } from './message.prisma.mapper';

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
				(m) => MessagePrismaMapper.toDomain(m)
			),
			raw.createdAt,
			raw.updatedAt,
			raw.avatar
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
			avatar: conversation.avatar
		};
	}

}