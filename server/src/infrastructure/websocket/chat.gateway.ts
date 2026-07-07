import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { environment } from '../../../environments/environment.dev';
import { ChatEvents } from '../../core/interfaces/chat-events.interface';

@WebSocketGateway({
  cors: {
    origin: environment.CORS_ORIGIN,
  },
})
export class ChatGateway implements ChatEvents{
  @WebSocketServer()
  private server!: Server;

  @SubscribeMessage('joinConversation')
  joinConversation(
    @MessageBody() conversationId: string,
    @ConnectedSocket() client: Socket,
  ) {
    if (!conversationId) return;
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
    @MessageBody() data: { conversationId: string; userId: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.to(`conversation:${data.conversationId}`).emit('userTyping', {
      conversationId: data.conversationId,
      userId: data.userId,
    });
  }

  @SubscribeMessage('stopTyping')
  stopTyping(
    @MessageBody() data: { conversationId: string; userId: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.to(`conversation:${data.conversationId}`).emit('userStopTyping', {
      conversationId: data.conversationId,
      userId: data.userId,
    });
  }

  emitMessageCreated(conversationId: string, message: unknown) {
    this.server
      .to(`conversation:${conversationId}`)
      .emit('messageCreated', message);
  }
}