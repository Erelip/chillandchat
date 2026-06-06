import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ConversationRepository } from '../../../core/interfaces/conversation.repository.interface';
import { Conversation } from '../entities/conversation.prisma.entity';
import { ConversationParticipant } from '../entities/conversation-participant.prisma.entity';
import { ConversationMapper } from '../../../core/mappers/conversation.mapper';
import { ConversationType } from '../../../core/enum/conversation.enum';
import { ConversationType as ConversationPrismaType } from '../generated/enums';
import { ConversationParticipantRepository } from '../../../core/interfaces/conversation-participant.repository.interface';

@Injectable()
export class ConversationParticipantPrismaRepository
  implements ConversationParticipantRepository {

  constructor(
    private readonly prisma: PrismaService,
  ) {}

	async save(participant: ConversationParticipant): Promise<ConversationParticipant> {
		const createdParticipant = await this.prisma.conversationParticipant.create({
			data: {
				conversationId: participant.conversationId,
				userId: participant.userId,
				joinedAt: participant.joinedAt,
			},
		});
		return new ConversationParticipant(
			createdParticipant.conversationId,
			createdParticipant.userId,
			createdParticipant.joinedAt,
			createdParticipant.id,
		);
	}

	async saveMany(participants: ConversationParticipant[]): Promise<void> {
		await this.prisma.conversationParticipant.createMany({
			data: participants.map((p) => ({
				conversationId: p.conversationId,
				userId: p.userId,
				joinedAt: p.joinedAt,
			})),
		});
	}

  async findAll(): Promise<ConversationParticipant[]> {
    const participants = await this.prisma.conversationParticipant.findMany();
    return participants.map((p) => new ConversationParticipant(
      p.conversationId,
      p.userId,
      p.joinedAt,
      p.id,
    ));
  }

  async findById(id: string): Promise<ConversationParticipant | null> {
    const participant = await this.prisma.conversationParticipant.findUnique({
      where: {
        id,
      },
    });
    if (!participant) return null;
    return new ConversationParticipant(
      participant.conversationId,
      participant.userId,
      participant.joinedAt,
      participant.id,
    );
  }

  async findByParticipantId(participantId: string): Promise<ConversationParticipant[]> {
    const participants = await this.prisma.conversationParticipant.findMany({
      where: {
        userId: participantId,
      },
    });
    return participants.map((p) => new ConversationParticipant(
      p.conversationId,
      p.userId,
      p.joinedAt,
      p.id,
    ));
  }
}