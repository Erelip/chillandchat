import {
	WebSocketGateway,
	WebSocketServer,
	SubscribeMessage,
	MessageBody,
	ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { environment } from '../../../environments/environment.dev';
import { ChatEvents, ChatMessageEvent } from '../../core/interfaces/chat-events.interface';
import { ConversationRepository } from '../../core/interfaces/conversation.repository.interface';
import { isUserInConversation } from '../../core/utils/permissions';
import { UseGuards } from '@nestjs/common';
import { WsAuthGuard } from '../../application/auth/ws-auth.guard';

@WebSocketGateway({
	cors: {
		origin: environment.CORS_ORIGIN,
		credentials: true,
	},
})
export class ChatGateway implements ChatEvents{
	@WebSocketServer()
	private server!: Server;

	constructor(
		private readonly conversationRepository: ConversationRepository,
	) {}

	@UseGuards(WsAuthGuard)
	@SubscribeMessage('joinConversation')
	async joinConversation(
		@MessageBody() conversationId: string,
		@ConnectedSocket() client: Socket,
	) {
		const userId = client.data.userId as string | undefined;

		if (!userId || !conversationId) return;

		const conversation = await this.conversationRepository.findById(conversationId);

		try {
			isUserInConversation(conversation, userId);
		} catch {
			return;
		}

		client.join(`conversation:${conversationId}`);
	}

	@SubscribeMessage('leaveConversation')
	leaveConversation(
		@MessageBody() conversationId: string,
		@ConnectedSocket() client: Socket,
	) {
		if (!conversationId) return;
		client.leave(`conversation:${conversationId}`);
	}

	@SubscribeMessage('typing')
	typing(
		@MessageBody() data: { conversationId: string; },
		@ConnectedSocket() client: Socket,
	) {
		const userId = client.data.userId as string | undefined;

		if (!userId || !data.conversationId) return;

		client.to(`conversation:${data.conversationId}`).emit('userTyping', {
			conversationId: data.conversationId,
			userId,
		});
	}

	@SubscribeMessage('stopTyping')
	stopTyping(
		@MessageBody() data: { conversationId: string },
		@ConnectedSocket() client: Socket,
	) {
		const userId = client.data.userId as string | undefined;

		if (!userId || !data.conversationId) return;

		client.to(`conversation:${data.conversationId}`).emit('userStopTyping', {
			conversationId: data.conversationId,
			userId: userId,
		});
	}

	emitMessageCreated(conversationId: string, message: ChatMessageEvent) {
		this.server
			.to(`conversation:${conversationId}`)
			.emit('messageCreated', message);
	}
}