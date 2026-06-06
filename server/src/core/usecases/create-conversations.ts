import { Injectable } from "@nestjs/common";
import { UserRepository } from "../interfaces/user.repository.interface";
import { ConversationRepository } from "../interfaces/conversation.repository.interface";
import { ConversationType } from "../enum/conversation.enum";
import { ConversationParticipantRepository } from "../interfaces/conversation-participant.repository.interface";
import { ConversationParticipant } from "../../adapters/prisma/entities/conversation-participant.prisma.entity";
import { User } from "../entities/users.entity";
import { MessageRepository } from "../interfaces/message.repository.interface";

@Injectable()
export class CreateConversations {
  constructor(
    private userRepository: UserRepository,
    private conversationRepository: ConversationRepository,
    private conversationParticipantRepository: ConversationParticipantRepository,
    private messageRepository: MessageRepository,
  ) {}

  async createConversations(me: string, ids: string[]): Promise<void> {
    const participantIds = [me, ...ids];

    if (participantIds.length < 2) {
        throw new Error("At least two user IDs are required to create a conversation.");
    }

    const users = await Promise.all(participantIds.map(id => this.userRepository.findById(id)));
    
    const conversation = await this.conversationRepository.save(participantIds.length > 2 ? ConversationType.GROUP : ConversationType.DIRECT);
    this.addParticipants(conversation.id, users as User[]);
  }

  async addParticipants(conversationId: string, users: User[]): Promise<void> {
    const conversationParticipants = users.map((user) => (new ConversationParticipant(
        conversationId,
        user.id!,
        new Date()
    )));

    await this.conversationParticipantRepository.saveMany(conversationParticipants);
  }

  async getConversationsByUserId(userId: string) {
    return await this.conversationRepository.findByParticipantId(userId);
  }

  async getConversationById(conversationId: string) {
    return await this.conversationRepository.findById(conversationId);
  }

  async getConversations() {
    return await this.conversationRepository.findAll();
  }

  async sendMessage(conversationId: string, senderId: string, content: string) {
    const conversation = await this.conversationRepository.findById(conversationId);
    const user = await this.userRepository.findById(senderId);

    if (!conversation) throw new Error("Conversation not found.");
    if (!user) throw new Error("User not found.");
  
    return await this.messageRepository.save(conversationId, senderId, content);

  }

}
