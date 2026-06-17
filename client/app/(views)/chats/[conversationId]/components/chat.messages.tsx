import { Message } from '@/app/dto/conversation';
import { User } from '@/app/dto/user';

export function ChatMessages({
  messages,
  me,
}: {
  messages: Message[];
  me?: User;
}) {
  if (messages.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="rounded-full bg-white px-4 py-2 text-sm text-gray-500 shadow-sm">
          No messages yet. Start the conversation 👋
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {messages.map((msg) => {
        const isMine = msg.senderId === me?.id;

        return (
          <div
            key={msg.id}
            className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-2xl px-4 py-2 shadow-sm ${
                isMine
                  ? 'rounded-br-md bg-blue-500 text-white'
                  : 'rounded-bl-md bg-white text-gray-800'
              }`}
            >
              {msg.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}