import { ConversationRepository } from "../interfaces/conversation.repository.interface";
import { Conversation } from "../entities/conversation.entity";
import { ConversationParticipant } from "../entities/conversation-participant.entity";
import { ConversationParticipantRepository } from "../interfaces/conversation-participant.repository.interface";
import { Generator } from "../interfaces/generator.interface";
import { UserRepository } from "../interfaces/user.repository.interface";
import { FileStorage } from "../interfaces/file-storage.interface";
import { UpdateConversationAvatarCommand, UpdateConversationInfoCommand } from "../models/update-conversation.command";
import { isUserInConversation } from "../utils/permissions";
import { BadRequestException, NotFoundException } from "../exceptions";

export class EditConversations {
	constructor(
		private conversationRepository: ConversationRepository,
		private participantRepository: ConversationParticipantRepository,
		private userRepository: UserRepository,
		private fileStorage: FileStorage,
		private generator: Generator
	) {}

	async editConversation(userId: string, conversationId: string, command: UpdateConversationInfoCommand): Promise<Conversation> {

		const conversation = await this.conversationRepository.findById(conversationId);

		isUserInConversation(conversation, userId);

		const hasName = command.name !== undefined && command.name.trim() !== '';
		const hasParticipantsToRemove = command.participantIdsToRemove?.length;

		if (!hasName && !hasParticipantsToRemove) {
			throw new BadRequestException('Nothing to update');
		}

		if (hasName) {
			conversation.name = command.name!;
			conversation.updatedAt = new Date();

			await this.conversationRepository.update(conversation);
		}

		if (hasParticipantsToRemove) {
			await this.removeParticipants(command.participantIdsToRemove!);
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

	public async addParticipants(userId: string, conversationId: string, participantIds: string): Promise<ConversationParticipant> {
		const conversation = await this.conversationRepository.findById(conversationId);
		const user = await this.userRepository.findById(participantIds);

		if (!user) throw new NotFoundException("User not found");

		isUserInConversation(conversation, userId);

		const participant = new ConversationParticipant(
			this.generator.generateUUID(), conversationId, user, new Date()
		)
		conversation.updatedAt = new Date();

		await this.participantRepository.save(participant);
		await this.conversationRepository.update(conversation);

		return participant;
	}

	public async updateAvatar(command: UpdateConversationAvatarCommand): Promise<string|null> {
		const conversation = await this.conversationRepository.findById(command.conversationId);
		if (!conversation) return null;

		const id = `${this.generator.generateInt(10000000, 99999999)}`
		const avatarUrl = await this.fileStorage.storeFile(command.file, id);

		conversation.avatar = id;
		conversation.updatedAt = new Date();

		this.conversationRepository.update(conversation)

		return avatarUrl;
	}

}
