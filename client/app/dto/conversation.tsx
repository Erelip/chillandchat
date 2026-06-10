export enum ConversationType {
    DIRECT,
    GROUP,
}

export interface Participant {
    _id: string;
    _conversationId: string;
    _userId: string;
    _joinedAt: Date;
}

export interface Message {
    _id: string;
    _conversationId: string;
    _senderId: string;
    _content: string;
}

export interface Conversation {
    _id: string;
    _participants: Participant[];
    _messages: Message[];
    _type: ConversationType;
}