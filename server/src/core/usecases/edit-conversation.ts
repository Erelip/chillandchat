import { ConversationRepository } from "../interfaces/conversation.repository.interface";
import { MessageRepository } from "../interfaces/message.repository.interface";
import { Conversation } from "../entities/conversation.entity";
import { ConversationParticipant } from "../entities/conversation-participant.entity";
import { ConversationParticipantRepository } from "../interfaces/conversation-participant.repository.interface";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { EditConversationDto } from "../../application/dto/edit-conversation.dto";

export class EditConversations {
  constructor(
    private conversationRepository: ConversationRepository,
    private participantRepository: ConversationParticipantRepository
  ) {}

  async editConversation(
    conversationId: string,
    dto: EditConversationDto,
  ): Promise<Conversation> {

    const conversation = await this.conversationRepository.findById(conversationId);
    if (!conversation) throw new NotFoundException("Conversation not found");

    const hasName = dto.name !== undefined && dto.name.trim() !== '';
    const hasParticipantsToRemove = dto.participantIdsToRemove?.length;

    if (!hasName && !hasParticipantsToRemove) {
      throw new BadRequestException('Nothing to update');
    }

    if (hasName) {
      conversation.name = dto.name!;
      conversation.updatedAt = new Date();

      await this.conversationRepository.update(conversation);
    }

    if (hasParticipantsToRemove) {
      await this.removeParticipants(dto.participantIdsToRemove!);
    }

    return conversation;
  }

  private async removeParticipants(participantIds: string[]) {
    await Promise.all(
      participantIds.map((id) =>
        this.participantRepository.removeById(id),
      ),
    );
  }

  async editName(conversation: Conversation, name: string) {
    conversation.name = name;
    conversation.updatedAt = new Date();
    await this.conversationRepository.update(conversation);
    return conversation;
  }

}
