import { MessageRepository } from "../interfaces/message.repository.interface";

export class GetMessages {
  constructor(
    private messageRepository: MessageRepository,
  ) {}

  async getMessagesByConversationId(conversationId: string) {
    return await this.messageRepository.findByConversationId(conversationId);
  }

}
