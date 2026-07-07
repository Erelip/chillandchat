import { ConversationRepository } from "../interfaces/conversation.repository.interface";
import { MessageRepository } from "../interfaces/message.repository.interface";
import { NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Conversation } from "../entities/conversation.entity";
import { ChatEvents } from "../interfaces/chat-events.interface";

export class SendMessage {
  constructor(
    private conversationRepository: ConversationRepository,
    private messageRepository: MessageRepository,
    private chatEvents: ChatEvents
  ) {}

  async sendMessage(conversationId: string, senderId: string, content: string) {
    const conversation = await this.conversationRepository.findById(conversationId);

    this.checkIfUserIsInConversation(conversation, senderId)
      
    const createdMessage = await this.messageRepository.save(conversation.id, senderId, content);
    conversation.updatedAt = new Date();

    await this.conversationRepository.update(conversation);

    this.chatEvents.emitMessageCreated(conversation.id, {
      id: createdMessage.id,
      content: createdMessage.content,
      senderId: createdMessage.senderId,
    })

    return createdMessage;
  }

  private checkIfUserIsInConversation(conversation: Conversation|null, senderId: string): asserts conversation is Conversation  {
    if (!conversation) throw new NotFoundException("Conversation not found.");

    const isParticipant = conversation.participants.some(
      (participant) => participant.user.id === senderId,
    );

    if (!isParticipant) {
      throw new UnauthorizedException("Not allowed.");
    }
  }

}
