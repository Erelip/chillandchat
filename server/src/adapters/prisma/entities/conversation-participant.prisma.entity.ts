export class ConversationParticipant {
  constructor(
    readonly conversationId: string,
    readonly userId: string,
    readonly joinedAt: Date,
    readonly id?: string,
  ) {}
}