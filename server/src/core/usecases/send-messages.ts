import { UserRepository } from "../interfaces/user.repository.interface";
import { ConversationRepository } from "../interfaces/conversation.repository.interface";
import { MessageRepository } from "../interfaces/message.repository.interface";
import { ChatGateway } from "../../infrastructure/websocket/chat.gateway";

export class SendMessage {
  constructor(
    private userRepository: UserRepository,
    private conversationRepository: ConversationRepository,
    private messageRepository: MessageRepository,
    private chatGateway: ChatGateway
  ) {}

  async sendMessage(conversationId: string, senderId: string, content: string) {
    const conversation = await this.conversationRepository.findById(conversationId);
    const user = await this.userRepository.findById(senderId);

    if (!conversation) throw new Error("Conversation not found.");
    if (!user) throw new Error("User not found.");
  
    const createdMessage = await this.messageRepository.save(conversation.id, senderId, content);
    conversation.updatedAt = new Date();
    await this.conversationRepository.update(conversation);

    this.chatGateway.emitMessageCreated(conversation.id, {
      id: createdMessage.id,
      content: createdMessage.content,
      senderId: createdMessage.senderId,
    })

    return createdMessage;
  }

}
