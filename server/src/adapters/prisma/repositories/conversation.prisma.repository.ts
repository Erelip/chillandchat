import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ConversationRepository } from '../../../core/interfaces/conversation.repository.interface';
import { Conversation } from '../entities/conversation.prisma.entity';
import { ConversationParticipant } from '../entities/conversation-participant.prisma.entity';
import { ConversationMapper } from '../../../core/mappers/conversation.mapper';
import { ConversationType } from '../../../core/enum/conversation.enum';
import { ConversationType as ConversationPrismaType } from '../generated/enums';

@Injectable()
export class ConversationPrismaRepository
  implements ConversationRepository {

  constructor(
    private readonly prisma: PrismaService,
  ) {}

	async save(type: ConversationType): Promise<Conversation> {
		const createdConversation = await this.prisma.conversation.create({
    data: {
        type: type === ConversationType.GROUP ? ConversationPrismaType.GROUP : ConversationPrismaType.DIRECT,
      },
      include: {
        participants: true,
      },
    });
		return ConversationMapper.toDomain(new Conversation(
      createdConversation.id,
      createdConversation.participants.map(
        (p) => new ConversationParticipant(p.conversationId, p.userId, p.joinedAt, p.id)),
      new Array(),
      createdConversation.createdAt,
      createdConversation.type
    ));
	}

  async findAll(): Promise<Conversation[]> {
    const conversations = await this.prisma.conversation.findMany({
      include: {
        participants: true,
        messages: true,
      },
    });
    console.log('Found conversations:', conversations);
    return conversations.map((conversation) => ConversationMapper.toDomain({
      id: conversation.id,
      participants: conversation.participants.map(
        (p) => new ConversationParticipant(p.conversationId, p.userId, p.joinedAt, p.id)),
      messages: conversation.messages,
      createdAt: conversation.createdAt,
      type: conversation.type,
    }));
  }

  async findById(id: string): Promise<Conversation | null> {
    const conversation = await this.prisma.conversation.findUnique({
      where: {
        id,
      },
      include: {
        participants: true,
        messages: true,
      },
    });
    if (!conversation) return null;
    return ConversationMapper.toDomain({
      id: conversation.id,
      participants: conversation.participants.map(
        (p) => new ConversationParticipant(p.conversationId, p.userId, p.joinedAt, p.id)),
      messages: conversation.messages,
      createdAt: conversation.createdAt,
      type: conversation.type,
    });
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
        participants: true,
        messages: true,
      },
    });
    return conversations.map((conversation) => ConversationMapper.toDomain({
      id: conversation.id,
      participants: conversation.participants.map(
        (p) => new ConversationParticipant(p.conversationId, p.userId, p.joinedAt, p.id)),
      messages: conversation.messages,
      createdAt: conversation.createdAt,
      type: conversation.type,
    }));
  }
}