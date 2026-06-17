export enum ConversationType {
    DIRECT,
    GROUP,
}

export interface Participant {
    id: string;
    firstname: string;
    lastname: string;
    joinedAt: Date;
}

export interface Message {
    id: string;
    conversationId: string;
    senderId: string;
    content: string;
    createdAt: Date;
}

export interface Conversation {
    id: string;
    participants: Participant[];
    name: string | null;
    message: Message;
    type: ConversationType;
    createdAt: Date;
    updatedAt: Date;
}