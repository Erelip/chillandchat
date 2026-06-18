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