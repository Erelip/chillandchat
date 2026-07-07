export interface ChatMessageEvent {
    id: string;
    content: string;
    senderId: string;
}

export abstract class ChatEvents {
    abstract emitMessageCreated(
        conversationId: string,
        message: ChatMessageEvent
    ): void;
}