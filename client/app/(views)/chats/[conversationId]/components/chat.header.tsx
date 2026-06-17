import { Message } from '@/app/dto/conversation';

export function ChatHeader({ messages }: { messages: Message[] }) {
  return (
    <div className="border-b bg-white px-6 py-4 shadow-sm">
      <h1 className="text-lg font-semibold text-gray-900">
        Conversation
      </h1>
      <p className="text-sm text-gray-500">
        {messages.length} message{messages.length > 1 ? 's' : ''}
      </p>
    </div>
  );
}