import { Message } from "./message.entity";
import { ConversationParticipant } from "./conversation-participant.entity";
import { ConversationType } from "../enum/conversation.enum"
import { User } from "./users.entity";

export class Conversation {
  private _id: string;
  private _participants: User[];
  private _name: string | null;
  private _messages: Message[];
  private _createdAt: Date;
  private _type: ConversationType;

  constructor(
    id: string,
    participants: User[],
    name: string | null,
    messages: Message[] = [],
    createdAt: Date,
    type: ConversationType = ConversationType.DIRECT,

  ) {
    this._id = id;
    this._participants = participants;
    this._name = name;
    this._messages = messages;
    this._createdAt = createdAt;
    this._type = type;
  }

  get id(): string {
    return this._id;
  }

  get participants(): User[] {
    return this._participants;
  }

  get name(): string | null {
    return this._name;
  }

  get messages(): Message[] {
    return this._messages;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get type(): ConversationType {
    return this._type;
  }

  set id(id: string) {
    this._id = id;
  }

  set participants(participants: User[]) {
    this._participants = participants;
  }

  set messages(messages: Message[]) {
    this._messages = messages;
  }

  set createdAt(createdAt: Date) {
    this._createdAt = createdAt;
  }

  set type(type: ConversationType) {
    this._type = type;
  }

  hasParticipant(userId: string): boolean {
    return this._participants.some((p) => p.id === userId);
  }
}