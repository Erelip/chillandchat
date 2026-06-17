import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ConversationRepository } from '../../../core/interfaces/conversation.repository.interface';
import { Conversation } from '../../../core/entities/conversation.entity';
import { ConversationMapper } from '../../../core/mappers/conversation.mapper';

@Injectable()
export class ConversationPrismaRepository
  implements ConversationRepository {

  constructor(
    private readonly prisma: PrismaService,
  ) {}

	async save(conversation: Conversation): Promise<void> {
    const conversationEntity = ConversationMapper.toPersistence(conversation);

    await this.prisma.conversation.create({
      data: conversationEntity
    });
	}

  async update(conversation: Conversation): Promise<void> {
    const entity = ConversationMapper.toPersistence(conversation);
    await this.prisma.conversation.update({
      where: {
        id: conversation.id!,
      },
      data: entity,
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

    return conversations.map((c) => ConversationMapper.toDomain(c))
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

    return ConversationMapper.toDomain(conversation);
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
        messages: true,
      },
      orderBy: {
        updatedAt: 'desc'
      }
    });

    return conversations.map((c) => ConversationMapper.toDomain(c))
  }
}