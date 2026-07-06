import { ConversationRepository } from "../interfaces/conversation.repository.interface";
import { Conversation } from "../entities/conversation.entity";
import { ConversationParticipant } from "../entities/conversation-participant.entity";
import { ConversationParticipantRepository } from "../interfaces/conversation-participant.repository.interface";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { EditConversationDto } from "../../application/dto/edit-conversation.dto";
import { Generator } from "../interfaces/generator.interface";
import { UserRepository } from "../interfaces/user.repository.interface";
import { File } from "../../application/dto/file.dto";
import { FileStorage } from "../interfaces/file-storage.interface";

export class EditConversations {
  constructor(
    private conversationRepository: ConversationRepository,
    private participantRepository: ConversationParticipantRepository,
    private userRepository: UserRepository,
    private fileStorage: FileStorage,
    private generator: Generator
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

  public async addParticipants(conversationId: string, participantIds: string): Promise<ConversationParticipant> {

    const conversation = await this.conversationRepository.findById(conversationId);
    const user = await this.userRepository.findById(participantIds);
    if (!conversation) throw new NotFoundException("Conversation not found");
    if (!user) throw new NotFoundException("User not found");

    const participant = new ConversationParticipant(
      this.generator.generateUUID(), conversationId, user, new Date()
    )
    conversation.updatedAt = new Date();
    await this.participantRepository.save(participant);
    await this.conversationRepository.update(conversation);

    return participant;
  }

  public async updateAvatar(conversationId: string, file: File): Promise<string|null> {
    const conversation = await this.conversationRepository.findById(conversationId);
    if (!conversation) return null;

    const id = `${this.generator.generateInt(10000000, 99999999)}`
    const avatarUrl = await this.fileStorage.storeFile(file, id);

    conversation.avatar = id;
    conversation.updatedAt = new Date();

    this.conversationRepository.update(conversation)

    return avatarUrl;
  }

}
