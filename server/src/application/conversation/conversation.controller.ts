import { Body, Controller, Get, HttpCode, HttpStatus, NotImplementedException, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CreateConversations } from '../../core/usecases/create-conversations';
import { SendMessage } from '../../core/usecases/send-messages';

@Controller('conversations')
export class ConversationController {

    constructor(
        private readonly createConversations: CreateConversations,
        private readonly sendMessage: SendMessage
    ) {}

    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @Post('/')
    createConversation(@Body() input: { participantIds: string[] }, @Request() request) {
        return this.createConversations.createConversations(request.user.id, input.participantIds);
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
    createMessage(@Request() request, @Param('conversationId') conversationId: string, @Body() body: { content: string }) {
        return this.sendMessage.sendMessage(conversationId, request.user.id, body.content);
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @Get('/:conversationId/messages')
    getMessagesByConversationId(@Param('conversationId') conversationId: string) {
        return this.createConversations.getMessagesByConversationId(conversationId);
    }


    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @Get('/:conversationId')
    getConversationById(@Request() request, @Param('conversationId') conversationId: string) {
        return this.createConversations.getConversationById(conversationId);
    }
}
