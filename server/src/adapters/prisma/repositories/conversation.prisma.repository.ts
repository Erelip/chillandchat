import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ConversationRepository } from '../../../core/interfaces/conversation.repository.interface';
import { ConversationParticipant } from '../../../core/entities/conversation-participant.entity';
import { Conversation } from '../../../core/entities/conversation.entity';
import { ConversationMapper } from '../../../core/mappers/conversation.mapper';
import { ConversationType } from '../../../core/enum/conversation.enum';
import { ConversationType as ConversationPrismaType } from '../generated/enums';
import { Message } from '../../../core/entities/message.entity';

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
        messages: true
      },
    });
		return ConversationMapper.toDomain(
      createdConversation.id,
      createdConversation.participants.map(
        (p) => new ConversationParticipant(p.id, p.conversationId, p.userId, p.joinedAt)),
      createdConversation.messages.map(
        (p) => new Message(p.id, p.conversationId, p.senderId, p.content)
      ),
      createdConversation.createdAt,
      createdConversation.type == ConversationPrismaType.GROUP ? ConversationType.GROUP : ConversationType.DIRECT
    );
	}

  async findAll(): Promise<Conversation[]> {
    const conversations = await this.prisma.conversation.findMany({
      include: {
        participants: true,
        messages: true,
      },
    });

    return conversations.map((conversation) => ConversationMapper.toDomain(
      conversation.id,
      conversation.participants.map(
        (p) => new ConversationParticipant(p.id, p.conversationId, p.userId, p.joinedAt)),
      conversation.messages.map(
        (p) => new Message(p.id, p.conversationId, p.senderId, p.content)
      ),
      conversation.createdAt,
      conversation.type == ConversationPrismaType.GROUP ? ConversationType.GROUP : ConversationType.DIRECT
    ));
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

    return ConversationMapper.toDomain(
      conversation.id,
      conversation.participants.map(
        (p) => new ConversationParticipant(p.id, p.conversationId, p.userId, p.joinedAt)),
      conversation.messages.map(
        (p) => new Message(p.id, p.conversationId, p.senderId, p.content)
      ),
      conversation.createdAt,
      conversation.type == ConversationPrismaType.GROUP ? ConversationType.GROUP : ConversationType.DIRECT
    );
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

    return conversations.map((conversation) => ConversationMapper.toDomain(
      conversation.id,
      conversation.participants.map(
        (p) => new ConversationParticipant(p.id, p.conversationId, p.userId, p.joinedAt)),
      conversation.messages.map(
        (p) => new Message(p.id, p.conversationId, p.senderId, p.content)
      ),
      conversation.createdAt,
      conversation.type == ConversationPrismaType.GROUP ? ConversationType.GROUP : ConversationType.DIRECT
    ));
  }
}