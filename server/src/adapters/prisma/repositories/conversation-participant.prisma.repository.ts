import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ConversationParticipant } from '../../../core/entities/conversation-participant.entity';
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
			createdParticipant.id,
			createdParticipant.conversationId,
			createdParticipant.userId,
			createdParticipant.joinedAt,
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
      p.id,
      p.conversationId,
      p.userId,
      p.joinedAt,
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
      participant.id,
      participant.conversationId,
      participant.userId,
      participant.joinedAt,
    );
  }

  async findByParticipantId(participantId: string): Promise<ConversationParticipant[]> {
    const participants = await this.prisma.conversationParticipant.findMany({
      where: {
        userId: participantId,
      },
    });
    return participants.map((p) => new ConversationParticipant(
      p.id,
      p.conversationId,
      p.userId,
      p.joinedAt,
    ));
  }
}