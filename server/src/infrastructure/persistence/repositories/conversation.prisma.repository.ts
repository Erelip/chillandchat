import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ConversationRepository } from '../../../core/interfaces/conversation.repository.interface';
import { Conversation } from '../../../core/entities/conversation.entity';
import { ConversationPrismaMapper } from '../mappers/conversation.prisma.mapper';

@Injectable()
export class ConversationPrismaRepository
	implements ConversationRepository {

	constructor(
		private readonly prisma: PrismaService,
	) {}

	async save(conversation: Conversation): Promise<void> {
		const conversationEntity = ConversationPrismaMapper.toPersistence(conversation);
		const participants =
			conversation.participants.map((participant) => ({
				...(participant.id ? { id: participant.id } : {}),
				joinedAt: participant.joinedAt,
				user: {
					connect: {
						id: participant.user.id,
					},
				},
			}));

		await this.prisma.conversation.create({
			data: {
				id: conversationEntity.id,
				createdAt: conversationEntity.createdAt,
				updatedAt: conversationEntity.updatedAt,
				name: conversationEntity.name,
				participants: {
					create: participants
				},
				type: conversationEntity.type,
				avatar: conversationEntity.avatar
			},
		});
	}

	async update(conversation: Conversation): Promise<void> {
		const entity = ConversationPrismaMapper.toPersistence(conversation);

		await this.prisma.conversation.update({
			where: {
				id: conversation.id!,
			},
			data: {
				name: entity.name,
				updatedAt: entity.updatedAt,
				avatar: entity.avatar
			},
		});
	}

	async findAll(): Promise<Conversation[]> {
		const conversations = await this.prisma.conversation.findMany({
			include: {
				participants: {
					include: {
						user: true
					}
				},
				messages: true,
			},
		});

		return conversations.map((c) => ConversationPrismaMapper.toDomain(c))
	}

	async findById(id: string): Promise<Conversation | null> {
		const conversation = await this.prisma.conversation.findUnique({
			where: {
				id,
			},
			include: {
				participants: {
					include: {
						user: true
					}
				},
				messages: true,
			},
		});
		if (!conversation) return null;

		return ConversationPrismaMapper.toDomain(conversation);
	}

	async findByParticipantId(participantId: string): Promise<Conversation[]> {
		const conversations = await this.prisma.conversation.findMany({
			where: {
				participants: {
					some: {
						userId: participantId,
					},
				},
			},
			include: {
				participants: {
					include : {
						user: true
					}
				},
				messages: {
					orderBy: {
						createdAt: 'desc',
					},
					take: 1,
				},
			},
			orderBy: {
				updatedAt: 'desc'
			}
		});

		return conversations.map((c) => ConversationPrismaMapper.toDomain(c))
	}
}