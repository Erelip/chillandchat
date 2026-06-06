export class Message {
  private _id: string;
  private _conversationId: string;
  private _senderId: string;
  private _content: string;

  constructor(id: string, conversationId: string, senderId: string, content: string) {
    this._id = id;
    this._conversationId = conversationId;
    this._senderId = senderId;
    this._content = content;
  }

  get id(): string {
    return this._id;
  }

  get conversationId(): string {
    return this._conversationId;
  }

  get senderId(): string {
    return this._senderId;
  }

  get content(): string {
    return this._content;
  }

  set id(id: string) {
    this._id = id;
  }

  set conversationId(conversationId: string) {
    this._conversationId = conversationId;
  }

  set senderId(senderId: string) {
    this._senderId = senderId;
  }

  set content(content: string) {
    this._content = content;
  }
}