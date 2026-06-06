import { ConversationParticipant } from "../../adapters/prisma/entities/conversation-participant.prisma.entity";
import { ConversationType } from "../../core/enum/conversation.enum";

export class ConversationDTO {
  id: string;
  participants: ConversationParticipant[];
  type: ConversationType;

  constructor(id: string, participants: ConversationParticipant[], type: ConversationType) {
    this.id = id;
    this.participants = participants;
    this.type = type;
  }
}