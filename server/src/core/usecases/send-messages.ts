import { ConversationRepository } from "../interfaces/conversation.repository.interface";
import { MessageRepository } from "../interfaces/message.repository.interface";
import { ChatEvents } from "../interfaces/chat-events.interface";
import { isUserInConversation } from "../utils/permissions";

export class SendMessage {
  constructor(
    private conversationRepository: ConversationRepository,
    private messageRepository: MessageRepository,
    private chatEvents: ChatEvents
  ) {}

  async sendMessage(conversationId: string, senderId: string, content: string) {
    const conversation = await this.conversationRepository.findById(conversationId);

    isUserInConversation(conversation, senderId);

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

}
