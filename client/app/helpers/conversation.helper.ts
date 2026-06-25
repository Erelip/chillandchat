import { Conversation, ConversationType, Participant, User } from '@/app/dto/conversation';

export function getOtherParticipants(conversation?: Conversation, me?: User) {
  if (!conversation || !me) return [];

  return conversation.participants.filter(
    (p) => p.user.id !== me.id
  );
}

export function formatParticipantsName(participants: Participant[]) {
  const names = participants.map(
    (p) => `${p.user.firstname} ${p.user.lastname}`,
  );

  if (names.length <= 2) return names.join(', ');

  return `${names[0]}, ${names[1]} +${names.length - 2}`;
}

export function getConversationDisplayName(
  conversation?: Conversation,
  me?: User,
) {
  if (!conversation || !me) return '';

  const otherParticipants = getOtherParticipants(conversation, me);

  if (conversation.type === ConversationType.DIRECT) {
    const user = otherParticipants[0]?.user;
    return user ? `${user.firstname} ${user.lastname}` : '';
  }

  return conversation.name || formatParticipantsName(otherParticipants);
}

export function getConversationSubtitle(
  conversation?: Conversation,
  me?: User,
) {
  if (!conversation || !me) return '';

  const otherParticipants = getOtherParticipants(conversation, me);

  if (conversation.type === ConversationType.DIRECT) {
    return otherParticipants[0]?.user.phoneNumber ?? '';
  }

  return `Groupe ・ ${conversation.participants.length} membres`;
}