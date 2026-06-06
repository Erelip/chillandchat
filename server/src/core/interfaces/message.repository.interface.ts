import { Message } from "../entities/message.entity";

export abstract class MessageRepository {
  abstract save(conversationId: string, senderId: string, content: string): Promise<Message>;

  // abstract findAll(): Promise<Message[]>;

  // abstract findById(id: string): Promise<Message | null>;

  abstract findByConversationId(conversationId: string): Promise<Message[]>;

  // abstract findByUserIdAndConversationId(userId: string, conversationId: string): Promise<Message[]>;
}