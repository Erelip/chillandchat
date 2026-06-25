import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
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
import { ConversationParticipant } from '../../core/entities/conversation-participant.entity';
import { EditConversationDto } from '../dto/edit-conversation.dto';

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
    async getMessagesByConversationId(@Param('conversationId') conversationId: string) {
        const messages = await this.getMessages.getMessagesByConversationId(conversationId);

        return messages.map((m : Message) => MessageMapper.toDTO(m));
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @Get('/:conversationId')
    async getConversationById(@Request() request, @Param('conversationId') conversationId: string) {
        const conversation = await this.getConversations.getConversationById(conversationId);
        if (conversation == null) throw new UnauthorizedException("Not found");

        return ConversationMapper.toDTO(conversation);
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @Patch('/:conversationId')
    async editNameConversationById(@Request() request, @Param('conversationId') conversationId: string, @Body() body: EditConversationDto) {
        const conversation = await this.editConversations.editConversation(
            conversationId,
            body,
        );

        return ConversationMapper.toDTO(conversation);
    }
}
