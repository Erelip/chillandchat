import { ConversationRepository } from "../interfaces/conversation.repository.interface";
import { MessageRepository } from "../interfaces/message.repository.interface";
import { Conversation } from "../entities/conversation.entity";
import { NotFoundException, UnauthorizedException } from "@nestjs/common";
import { isUserInConversation } from "../utils/permissions";

export class GetConversations {
  constructor(
    private conversationRepository: ConversationRepository,
    private messageRepository: MessageRepository,
  ) {}

  async getConversationsByUserId(userId: string) {
    const conversations = await this.conversationRepository.findByParticipantId(userId);

    return conversations.map((c: Conversation) => {
        c.participants = c.participants.filter((p) => p.user.id !== userId)
        return c;
    })
  }

  async getConversationById(userId: string, conversationId: string) {
    const conversation = await this.conversationRepository.findById(conversationId);

    if (conversation == null) throw new NotFoundException("Conversation not found.")

    if (isUserInConversation(conversation, userId) == false) throw new UnauthorizedException("Not allowed.");

    return conversation;
  }

  async getMessagesByConversationId(conversationId: string) {
    return await this.messageRepository.findByConversationId(conversationId);
  }

  async getConversations() {
    return await this.conversationRepository.findAll();
  }

}
