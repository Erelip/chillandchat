import { Conversation, ConversationType, Message, Participant, User } from '@/app/dto/conversation';

export function ChatHeader({ me, conversation }: { me: User|undefined, conversation: Conversation|undefined }) {
  
  function formatParticipantsName(participants: Participant[]) {
    const names = participants.map(
      (p) => `${p.user.firstname} ${p.user.lastname}`,
    );

    if (names.length <= 2) {
      return names.join(', ');
    }

    return `${names[0]}, ${names[1]} +${names.length - 2}`;
  }

  function getHeaderName() {
    if (!conversation) return;
    if (!me) return;

      const user = conversation.participants.filter(p => p.user.id != me.id);

      if (conversation.type == ConversationType.DIRECT) {
      return `${user[0].user.firstname} ${user[0].user.lastname}`
    }

    if (conversation.type == ConversationType.GROUP) {
      if (conversation.name) return conversation.name;
      
      return formatParticipantsName(user)
    }
  }

  return (
    <div className="border-b bg-white px-6 py-4 shadow-sm">
      <h1 className="text-lg font-semibold text-gray-900">
        {getHeaderName()}
      </h1>
      <p className="text-sm text-gray-500">
      </p>
    </div>
  );
}