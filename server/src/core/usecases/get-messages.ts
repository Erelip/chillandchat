import { MessageRepository } from "../interfaces/message.repository.interface";
import { ConversationRepository } from "../interfaces/conversation.repository.interface";
import { isUserInConversation } from "../utils/permissions";

export class GetMessages {
  constructor(
    private messageRepository: MessageRepository,
    private conversationRepository: ConversationRepository
  ) {}

  async getMessagesByConversationId(userId: string, conversationId: string) {
    const conversation = await this.conversationRepository.findById(conversationId);

    isUserInConversation(conversation, userId);

    return await this.messageRepository.findByConversationId(conversationId);
  }

}
