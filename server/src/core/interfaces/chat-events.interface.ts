export abstract class ChatEvents {
    abstract emitMessageCreated(
        conversationId: string,
        message: {
            id: string;
            content: string;
            senderId: string;
        }
    ): void;
}