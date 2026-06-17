import { UserDTO } from "./user.dto";

export class ConversationParticipantDTO {
  id: string;
  user: UserDTO
  joinedAt: Date;

  constructor(
    id: string,
    user: UserDTO,
    joinedAt: Date) {
    this.id = id;
    this.user = user;
    this.joinedAt = joinedAt;
  }
}