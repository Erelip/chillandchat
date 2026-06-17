import { Message } from "./message.entity";
import { ConversationType } from "../enum/conversation.enum"
import { ConversationParticipant } from "./conversation-participant.entity";

export class Conversation {
  constructor(
    public readonly id: string,
    public readonly name: string | null,
    public readonly type: ConversationType,
    public readonly participant: ConversationParticipant[],
    public readonly messages: Message[],
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}

  public addParticipants(participants : ConversationParticipant[]) {
    this.participant.push(...participants);
    return this.participant;
  }
}