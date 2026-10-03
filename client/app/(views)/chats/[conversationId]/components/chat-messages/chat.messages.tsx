import { ConversationModalType, ConversationType, Message, Participant } from '@/app/dto/conversation';
import { User } from '@/app/dto/conversation';
import { MessageGroup, MessageDirect } from './display-message';
import { useEffect, useRef } from 'react';

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

  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (messages.length === 0) return;

    bottomRef.current?.scrollIntoView({
      behavior: "auto",
      block: "end",
    });
  }, [messages]);


  if (messages.length === 0) {
    return (
      <div className="flex h-full items-center justify-center min-h-0 flex-1 overflow-y-auto">
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
      <div ref={bottomRef} />
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
      <div ref={bottomRef} />
    </div>
  );
}