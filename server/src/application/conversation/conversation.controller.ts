import { Body, Controller, Get, HttpCode, HttpStatus, NotImplementedException, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CreateConversations } from '../../core/usecases/create-conversations';

@Controller('conversations')
export class ConversationController {

    constructor(
        private readonly createConversations: CreateConversations,
    ) {}

    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @Post('create')
    createConversation(@Body() input: { participantIds: string[] }, @Request() request) {
        this.createConversations.createConversations(request.user.id, input.participantIds);
        return { message: 'Conversation created successfully' };
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @Get('/')
    getConversationsByUserId(@Request() request) {
        return this.createConversations.getConversationsByUserId(request.user.id);
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @Post('/:conversationId/messages')
    sendMessage(@Request() request, @Param('conversationId') conversationId: string, @Body() body: { content: string }) {
        return this.createConversations.sendMessage(conversationId, request.user.id, body.content);
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @Get('/:conversationId')
    getConversationById(@Request() request, @Param('conversationId') conversationId: string) {
        return this.createConversations.getConversationById(conversationId);
    }
}
