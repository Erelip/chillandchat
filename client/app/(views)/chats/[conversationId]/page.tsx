'use client';

import { useParams } from 'next/navigation';
import { useConversationMessages } from './hooks/use.conversation.messages';
import { ChatHeader } from './components/chat.header';
import { ChatMessages } from './components/chat.messages';
import { ChatInput } from './components/chat.input';

export default function MessagesPage() {
  const { conversationId } = useParams<{ conversationId: string }>();

  const {
    conversation,
    messages,
    newMessage,
    loading,
    me,
    typingUsers,
    handleTyping,
    sendMessage,
  } = useConversationMessages(conversationId);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-500">
        Chargement des messages...
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <ChatHeader me={me} conversation={conversation} />

      <div className="flex-1 overflow-y-auto px-6 py-4">
        <ChatMessages messages={messages} me={me} />
      </div>

      <ChatInput
        value={newMessage}
        typingUsersCount={typingUsers.length}
        onChange={handleTyping}
        onSend={sendMessage}
      />
    </div>
  );
}