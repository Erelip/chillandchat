import { ConversationParticipant } from "../../core/entities/conversation-participant.entity";
import { Message } from "../../core/entities/message.entity";
import { ConversationType } from "../../core/enum/conversation.enum";

export class ConversationDTO {
  id: string;
  participants: ConversationParticipant[];
  messages: Message[];
  type: ConversationType;

  constructor(id: string, participants: ConversationParticipant[], messages: Message[], type: ConversationType) {
    this.id = id;
    this.participants = participants;
    this.messages = messages;
    this.type = type;
  }
}