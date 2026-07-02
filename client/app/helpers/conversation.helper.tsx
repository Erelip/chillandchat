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

export const isUserAlreadyInConversation = (conversation: Conversation, userId: string) =>
  conversation.participants.some(
    (participant) => participant.user.id === userId
  );

export function getConversationSubtitle(
  conversation?: Conversation,
  me?: User,
) {
  if (!conversation || !me) return '';

  const otherParticipants = getOtherParticipants(conversation, me);

  if (conversation.type === ConversationType.DIRECT) {
    return otherParticipants[0]?.user.phoneNumber ?? '';
  }

  return `${conversation.participants.length} membres`;
}

export function Avatar({ letter }: { letter: string }) {
  return (
    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-xl font-semibold text-gray-700">
      {letter}
    </div>
  );
}

export function MemberRow({
  firstname,
  lastname,
  phoneNumber,
  isMe = false,
}: {
  firstname: string;
  lastname: string;
  phoneNumber: string;
  isMe?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border p-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 font-semibold">
        {firstname.charAt(0)}
      </div>

      <div className="flex-1">
        <p className="font-medium">
          {firstname} {lastname}
        </p>

        <p className="text-sm text-gray-500">
          {phoneNumber}
        </p>
      </div>

      {isMe && (
        <span className="text-xs text-gray-400">
          Vous
        </span>
      )}
    </div>
  );
}