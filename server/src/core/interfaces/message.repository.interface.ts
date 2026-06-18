import { Message } from "../entities/message.entity";

export abstract class MessageRepository {
  abstract save(conversationId: string, senderId: string, content: string): Promise<Message>;
  
  abstract findByConversationId(conversationId: string): Promise<Message[]>;
}