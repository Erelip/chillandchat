import { User } from "./users.entity";

export class ConversationParticipant {
  constructor(
    public readonly id: string,
    public readonly conversationId: string,
    public readonly user: User,
    public readonly joinedAt: Date,
  ) {}
}