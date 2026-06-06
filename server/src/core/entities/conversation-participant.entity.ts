export class ConversationParticipant {

  private _id: string;
  private _conversationId: string;
  private _userId: string;
  private _joinedAt: Date;

  constructor(
    id: string,
    conversationId: string,
    userId: string,
    joinedAt: Date,
  ) {
    this._id = id;
    this._conversationId = conversationId;
    this._userId = userId;
    this._joinedAt = joinedAt;
  }

  get id(): string {
    return this._id;
  }

  get conversationId(): string {
    return this._conversationId;
  }

  get userId(): string {
    return this._userId;
  }

  get joinedAt(): Date {
    return this._joinedAt;
  }

  set id(id: string) {
    this._id = id;
  }

  set conversationId(conversationId: string) {
    this._conversationId = conversationId;
  }

  set userId(userId: string) {
    this._userId = userId;
  }

  set joinedAt(joinedAt: Date) {
    this._joinedAt = joinedAt;
  }

}