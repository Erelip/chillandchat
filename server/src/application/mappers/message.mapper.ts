import { Message } from '../../core/entities/message.entity';
import { MessageDTO } from '../../application/dto/message.dto';

export class MessageMapper {
  static toDTO(message: Message): MessageDTO {
    return new MessageDTO(
      message.id,
      message.senderId,
      message.content,
      message.createdAt
    );
  }
}