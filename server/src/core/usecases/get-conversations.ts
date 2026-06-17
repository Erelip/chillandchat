import { Injectable } from "@nestjs/common";
import { UserRepository } from "../interfaces/user.repository.interface";
import { ConversationRepository } from "../interfaces/conversation.repository.interface";
import { ConversationType } from "../enum/conversation.enum";
import { ConversationParticipantRepository } from "../interfaces/conversation-participant.repository.interface";
import { ConversationParticipant } from "../entities/conversation-participant.entity";
import { User } from "../entities/users.entity";
import { MessageRepository } from "../interfaces/message.repository.interface";
import { Conversation } from "../entities/conversation.entity";
import { ConversationMapper } from "../mappers/conversation.mapper";
import { UserDTO } from "../../application/dto/user.dto";
import { ConversationParticipantDTO } from "../../application/dto/conversation-participant.dto";
import { ConversationParticipationMapper } from "../mappers/conversation-participation.mapper";

@Injectable()
export class GetConversations {
  constructor(
    private userRepository: UserRepository,
    private conversationRepository: ConversationRepository,
    private conversationParticipantRepository: ConversationParticipantRepository,
    private messageRepository: MessageRepository,
  ) {}

  async getConversationsByUserId(userId: string) {
    const conversations = await this.conversationRepository.findByParticipantId(userId);

    return conversations.map((c: Conversation) => {
        const dto = ConversationMapper.toDTO(c);
        dto.participants = dto.participants.filter((p: ConversationParticipantDTO) => p.user.id !== userId)
        return dto;
    })
  }

  async getConversationById(conversationId: string) {
    return await this.conversationRepository.findById(conversationId);
  }

  async getMessagesByConversationId(conversationId: string) {
    return await this.messageRepository.findByConversationId(conversationId);
  }

  async getConversations() {
    return await this.conversationRepository.findAll();
  }

}
