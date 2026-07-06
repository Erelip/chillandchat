import { ConversationModalType, ConversationType, Message, Participant } from '@/app/dto/conversation';
import { User } from '@/app/dto/conversation';
import { MessageGroup, MessageDirect } from './display-message';

export function ChatMessages({
  messages,
  type,
  me,
  participants = []
}: {
  messages: Message[];
  type?: ConversationType
  me?: User;
  participants?: Participant[]
}) {
  if (messages.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="rounded-full bg-white px-4 py-2 text-sm text-gray-500 shadow-sm">
          Début de la conversation 👋
        </p>
      </div>
    );
  }

  if (type == ConversationType.DIRECT) {
    return (
    <div className="flex flex-col gap-3">
      {messages.map((message) => {
        return (
          <MessageDirect
            key={message.id}
            message={message}
            me={me}
          />
        )
      })}
    </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {messages.map((message) => {
        const participantsByUserId = new Map(
          participants.map((p) => [p.user.id, p])
        );
        const participant = participantsByUserId.get(message.senderId);

        return (
          <MessageGroup
            key={message.id}
            message={message}
            me={me}
            sender={participant}
          />
        )
      })}
    </div>
  );
}