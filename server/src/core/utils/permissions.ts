import { Conversation } from "../entities/conversation.entity";

export function isUserInConversation(conversation: Conversation, userId: string): boolean {
    const isParticipant = conversation.participants.some(
      (participant) => participant.user.id === userId,
    );

    if (!isParticipant) {
        return false;
    }

    return true;
}