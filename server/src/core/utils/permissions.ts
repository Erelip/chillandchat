import { Conversation } from "../entities/conversation.entity";
import { NotFoundException, UnauthorizedException } from "../exceptions";

export function isUserInConversation(conversation: Conversation|null, userId: string): asserts conversation is Conversation {
    if (conversation == null) throw new NotFoundException('Conversation not found.');
 
    const isParticipant = conversation.participants.some(
      (participant) => participant.user.id === userId,
    );

    if (!isParticipant) {
        throw new UnauthorizedException('Not allowed.');
    }
}