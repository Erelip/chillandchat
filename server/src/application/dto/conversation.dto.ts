import { ConversationParticipant } from "../../core/entities/conversation-participant.entity";
import { Message } from "../../core/entities/message.entity";
import { ConversationType } from "../../core/enum/conversation.enum";

export class ConversationDTO {
  id: string;
  participants: ConversationParticipant[];
  name: string | null;
  messages: Message[];
  type: ConversationType;

  constructor(id: string, participants: ConversationParticipant[], name: string | null, messages: Message[], type: ConversationType) {
    this.id = id;
    this.participants = participants;
    this.name = name;
    this.messages = messages;
    this.type = type;
  }
}