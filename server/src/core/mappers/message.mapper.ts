import { Message } from '../entities/message.entity';
import { MessageDTO } from '../../application/dto/message.dto';

export class MessageMapper {
  static toDTO(message: Message): MessageDTO {
    return new MessageDTO(
      message.id,
      message.conversationId,
      message.content,
      message.createdAt
    );
  }
}