import { Message } from '../../../core/entities/message.entity';
import { Prisma } from '../generated/client';

export type MessageithRelations =
  Prisma.MessageGetPayload<{}>;

export class MessagePrismaMapper {
  static toDomain(message : MessageithRelations): Message {
    return new Message(
      message.id,
      message.conversationId,
      message.senderId,
      message.content,
      message.createdAt
    );
  }

}