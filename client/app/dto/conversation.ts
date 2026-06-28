export enum ConversationType {
    DIRECT,
    GROUP,
}

export interface User {
    id: string;
    email: string;
    phoneNumber: string
    firstname: string;
    lastname: string;
}

export interface Participant {
    id: string;
    user: User;
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

export interface ConversationDTO {
    participantIdsToRemove: string[];
    name: string | null;
}