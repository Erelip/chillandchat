import { ConversationParticipant } from "../../core/entities/conversation-participant.entity";
import { Message } from "../../core/entities/message.entity";
import { User } from "../../core/entities/users.entity";
import { ConversationType } from "../../core/enum/conversation.enum";
import { UserDTO } from "./user.dto";

export class ConversationDTO {
  id: string;
  participants: UserDTO[];
  name: string | null;
  message: Message | null;
  createdAt: Date;
  type: ConversationType;

  constructor(id: string, participants: UserDTO[], name: string | null, message: Message | null, createdAt: Date, type: ConversationType) {
    this.id = id;
    this.participants = participants;
    this.name = name;
    this.message = message;
    this.createdAt = createdAt;
    this.type = type;
  }
}