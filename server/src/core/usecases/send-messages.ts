import { Injectable } from "@nestjs/common";
import { UserRepository } from "../interfaces/user.repository.interface";
import { ConversationRepository } from "../interfaces/conversation.repository.interface";
import { ConversationType } from "../enum/conversation.enum";
import { ConversationParticipantRepository } from "../interfaces/conversation-participant.repository.interface";
import { ConversationParticipant } from "../entities/conversation-participant.entity";
import { User } from "../entities/users.entity";
import { MessageRepository } from "../interfaces/message.repository.interface";
import { ChatGateway } from "../../adapters/websocket/chat.gateway";

@Injectable()
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
  
    const createdMessage = await this.messageRepository.save(conversationId, senderId, content);
    conversation.updatedAt = new Date();
    await this.conversationRepository.update(conversation);
    this.chatGateway.server
        .to(conversationId)
            .emit('messageCreated', {
                id: createdMessage.id,
                content: createdMessage.content,
                senderId: createdMessage.senderId,
            });
    return createdMessage;
  }

}
