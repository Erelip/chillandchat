import { Message } from '../entities/message.entity';
import { MessageDTO } from '../../application/dto/message.dto';

export class MessageMapper {
  static toDomain(message : {
    id: string,
    senderId: string,
    content: string,
    createdAt: Date,
    conversationId: string
  }): Message {
    return new Message(
      message.id,
      message.conversationId,
      message.senderId,
      message.content,
      message.createdAt
    );
  }

  static toDTO(message: Message): MessageDTO {
    return new MessageDTO(
      message.id,
      message.senderId,
      message.content,
      message.createdAt
    );
  }
}