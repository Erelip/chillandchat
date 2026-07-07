import { NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Conversation } from "../entities/conversation.entity";
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

    if (conversation == null) throw new NotFoundException("Conversation not found.")

    if (isUserInConversation(conversation, userId) == false) throw new UnauthorizedException("Not allowed.");

    return await this.messageRepository.findByConversationId(conversationId);
  }

}
