import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Request, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CreateConversations } from '../../core/usecases/create-conversations';
import { SendMessage } from '../../core/usecases/send-messages';
import { Message } from '../../core/entities/message.entity';
import { GetConversations } from '../../core/usecases/get-conversations';
import { GetMessages } from '../../core/usecases/get-messages';
import { MessageMapper } from '../mappers/message.mapper';
import { ConversationMapper } from '../mappers/conversation.mapper';
import { Conversation } from '../../core/entities/conversation.entity';
import { EditConversations } from '../../core/usecases/edit-conversation';
import { EditConversationDto } from '../dto/edit-conversation.dto';
import { ConversationParticipationMapper } from '../mappers/conversation-participation.mapper';
import { FileInterceptor } from '@nestjs/platform-express';
import { File } from '../../core/models/file';
import { environment } from '../../../environments/environment.dev';
import { UpdateConversationAvatarCommand, UpdateConversationInfoCommand } from '../../core/models/update-conversation.command';
import { extname } from 'path';

@Controller('conversations')
export class ConversationController {

	constructor(
		private readonly createConversations: CreateConversations,
		private readonly getConversations: GetConversations,
		private readonly editConversations: EditConversations,
		private readonly getMessages: GetMessages,
		private readonly sendMessage: SendMessage
	) {}

	@HttpCode(HttpStatus.OK)
	@UseGuards(AuthGuard)
	@Post('/')
	async createConversation(@Body() input: { participantIds: string[] }, @Request() request) {
		const conversation = await this.createConversations.createConversations(request.user.id, input.participantIds);

		return ConversationMapper.toDTO(conversation);
	}

	@HttpCode(HttpStatus.OK)
	@UseGuards(AuthGuard)
	@Get('/')
	async getConversationsByUserId(@Request() request) {
		const conversations = await this.getConversations.getConversationsByUserId(request.user.id);

		return conversations.map((c: Conversation) => ConversationMapper.toDTO(c))
	}

	@HttpCode(HttpStatus.OK)
	@UseGuards(AuthGuard)
	@Post('/:conversationId/messages')
	createMessage(@Request() request, @Param('conversationId') conversationId: string, @Body() body: { content: string }) {
		return this.sendMessage.sendMessage(conversationId, request.user.id, body.content);
	}

	@HttpCode(HttpStatus.OK)
	@UseGuards(AuthGuard)
	@Get('/:conversationId/messages')
	async getMessagesByConversationId(@Request() request, @Param('conversationId') conversationId: string) {
		const messages = await this.getMessages.getMessagesByConversationId(request.user.id, conversationId);

		return messages.map((m : Message) => MessageMapper.toDTO(m));
	}

	@HttpCode(HttpStatus.OK)
	@UseGuards(AuthGuard)
	@Get('/:conversationId')
	async getConversationById(@Request() request, @Param('conversationId') conversationId: string) {
		const conversation = await this.getConversations.getConversationById(request.user.id, conversationId);
		if (conversation == null) throw new UnauthorizedException("Not found");

		return ConversationMapper.toDTO(conversation);
	}

	@HttpCode(HttpStatus.OK)
	@UseGuards(AuthGuard)
	@Patch('/:conversationId')
	async editNameConversationById(@Request() request, @Param('conversationId') conversationId: string, @Body() body: EditConversationDto) {
		const command = new UpdateConversationInfoCommand(
			conversationId,
			body.name,
			body.participantIdsToRemove
		)
		const conversation = await this.editConversations.editConversation(
			request.user.id,
			conversationId,
			command,
		);

		return ConversationMapper.toDTO(conversation);
	}

	@HttpCode(HttpStatus.OK)
	@UseGuards(AuthGuard)
	@Post('/:conversationId/participants')
	async addParticipantsToConversation(@Request() request, @Param('conversationId') conversationId: string, @Body() body: { participantsToAdd: string}) {
		const participant = await this.editConversations.addParticipants(
			request.user.id,
			conversationId,
			body.participantsToAdd,
		);

		return ConversationParticipationMapper.toDTO(participant);
	}
			
	@HttpCode(HttpStatus.OK)
	@UseGuards(AuthGuard)
	@UseInterceptors(FileInterceptor('avatar'))
	@Patch('/:conversationId/avatar')
	async updateAvatar(@Param('conversationId') conversationId: string ,@UploadedFile() file: File) {
		const command = new UpdateConversationAvatarCommand(conversationId, file);
		const extension = extname(file.originalname).toLowerCase();
		file.extention = extension;

		const avatarUrl = await this.editConversations.updateAvatar(command);

		return `${environment.APP_URL}/${avatarUrl}`;
	}
}
