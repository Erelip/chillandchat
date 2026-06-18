import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ConversationParticipant } from '../../../core/entities/conversation-participant.entity';
import { ConversationParticipantRepository } from '../../../core/interfaces/conversation-participant.repository.interface';
import { User } from '../../../core/entities/users.entity';

@Injectable()
export class ConversationParticipantPrismaRepository
  implements ConversationParticipantRepository {

  constructor(
    private readonly prisma: PrismaService,
  ) {}

	async save(participant: ConversationParticipant): Promise<void> {
		await this.prisma.conversationParticipant.create({
			data: {
				conversationId: participant.conversationId,
				userId: participant.user.id,
				joinedAt: participant.joinedAt,
			},
      include: {
        user: true
      }
		});
	}

	async saveMany(participants: ConversationParticipant[]): Promise<void> {
		await this.prisma.conversationParticipant.createMany({
			data: participants.map((p) => ({
				conversationId: p.conversationId,
				userId: p.user.id,
				joinedAt: p.joinedAt,
			})),
		});
	}

  async findAll(): Promise<ConversationParticipant[]> {
    const participants = await this.prisma.conversationParticipant.findMany({
      include: {
        user: true
      }
    });

    return participants.map((p) => new ConversationParticipant(
      p.id,
      p.conversationId,
      new User(
        p.user.id, p.user.username, p.user.email, p.user.password, p.user.firstname, p.user.lastname, p.user.phoneNumber
      ),
      p.joinedAt,
    ));
  }

  async findById(id: string): Promise<ConversationParticipant | null> {
    const participant = await this.prisma.conversationParticipant.findUnique({
      where: {
        id,
      },
      include: {
        user: true
      }
    });
    if (!participant) return null;
    return new ConversationParticipant(
      participant.id,
      participant.conversationId,
      new User(
        participant.user.id, participant.user.username, participant.user.email, participant.user.password, participant.user.firstname, participant.user.lastname, participant.user.phoneNumber
      ),
      participant.joinedAt,
    );
  }

  async findByParticipantId(participantId: string): Promise<ConversationParticipant[]> {
    const participants = await this.prisma.conversationParticipant.findMany({
      where: {
        userId: participantId,
      },
      include: {
        user: true
      }
    });
    return participants.map((p) => new ConversationParticipant(
      p.id,
      p.conversationId,
      new User(
        p.user.id, p.user.username, p.user.email, p.user.password, p.user.firstname, p.user.lastname, p.user.phoneNumber
      ),
      p.joinedAt,
    ));
  }
}