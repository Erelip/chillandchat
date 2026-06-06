import { ConversationType, Message } from "../generated/browser";
import { ConversationParticipant } from "./conversation-participant.prisma.entity";

export class Conversation {
  constructor(
    readonly id: string,
    readonly participants: ConversationParticipant[],
    readonly messages: Message[] = [],
    readonly createdAt: Date,
    readonly type: ConversationType = ConversationType.DIRECT,
  ) {}

  // hasParticipant(userId: string): boolean {
  //   return this.participants.some((p) => p.userId === userId);
  // }
}