import { Message } from "../../core/entities/message.entity";
import { ConversationType } from "../../core/enum/conversation.enum";
import { UserDTO } from "./user.dto";

export class MessageDTO {
  id: string;
  senderId: string;
  content: string;
  createdAt: Date;

  constructor(id: string, senderId: string, content: string, createdAt: Date) {
    this.id = id;
    this.senderId = senderId;
    this.content = content;
    this.createdAt = createdAt;
  }
}