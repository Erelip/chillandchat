import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { MessageRepository } from '../../../core/interfaces/message.repository.interface';
import { Message } from '../../../core/entities/message.entity';

@Injectable()
export class MessagePrismaRepository
  implements MessageRepository {

  constructor(
    private readonly prisma: PrismaService,
  ) {}

	async save(conversationId: string, senderId: string, content: string): Promise<Message> {
		const createdMessage = await this.prisma.message.create({
				data: {
					conversationId,
					senderId,
					content,
				},
		});
		return new Message(
      createdMessage.id,
      createdMessage.conversationId,
      createdMessage.senderId,
      createdMessage.content,
      createdMessage.createdAt
    );
	}

  // async findAll(): Promise<Message[]> {
  //   const createdMessage = await this.prisma.message.findMany();
  //   return createdMessage.map((message) => new Message(
  //     message.id,
  //     message.conversationId,
  //     message.senderId,
  //     message.content,
  //   ));
  // }

  // async findById(id: string): Promise<Message | null> {
  //   const createdMessage = await this.prisma.message.findUnique({
  //     where: {
  //       id,
  //     },
  //   });
  //   if (!createdMessage) return null;

  //   return new Message(
  //     createdMessage.id,
  //     createdMessage.conversationId,
  //     createdMessage.senderId,
  //     createdMessage.content);
  // }

  async findByConversationId(conversationId: string): Promise<Message[]> {
    const createdMessage = await this.prisma.message.findMany({
      where: {
        conversationId,
      },
    });
    return createdMessage.map((message) => new Message(
      message.id,
      message.conversationId,
      message.senderId,
      message.content,
      message.createdAt
    ));
  }

  // async findByUserIdAndConversationId(userId: string, conversationId: string): Promise<Message[]> {
  //   const createdMessage = await this.prisma.message.findMany({
  //     where: {
  //       senderId: userId,
  //       conversationId,
  //     },
  //   });
  //   return createdMessage.map((message) => new Message(
  //     message.id,
  //     message.conversationId,
  //     message.senderId,
  //     message.content,
  //   ));
  // }
}