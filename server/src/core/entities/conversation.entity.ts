import { Message } from "./message.entity";
import { ConversationType } from "../enum/conversation.enum"
import { ConversationParticipant } from "./conversation-participant.entity";

export class Conversation {
  constructor(
    public readonly id: string,
    public readonly name: string | null,
    public readonly type: ConversationType,
    public participants: ConversationParticipant[],
    public readonly messages: Message[],
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}

  public addParticipants(participants : ConversationParticipant[]) {
    this.participants.push(...participants);
    return this.participants;
  }
}