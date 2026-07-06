'use client';

import { useParams } from 'next/navigation';
import { useConversationMessages } from './hooks/use.conversation.messages';
import { ChatHeader } from './components/chat-header/chat.header';
import { ChatMessages } from './components/chat-messages/chat.messages';
import { ChatInput } from './components/chat.input';
import { useChats } from '../contexts/chat.context';

export default function MessagesPage() {
  const { conversationId } = useParams<{ conversationId: string }>();
  const { updateConversation, updateParticipants } = useChats();
  const {
    conversation,
    setConversation,
    messages,
    loading,
    me,
    typingUsers
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
      <ChatHeader
        me={me}
        conversation={conversation}
        onConversationUpdated={(updatedConversation) => {
          setConversation(updatedConversation);
          updateConversation(updatedConversation);
        }}
        onParticipantUpdated={(conversationId, participant) => {
          setConversation((prev) =>
            prev
              ? {
                  ...prev,
                  participants: [...prev.participants, participant],
                }
              : prev
          );
          updateParticipants(conversationId, participant);
        }}
      />

      <div className="flex-1 overflow-y-auto px-6 py-4">
        <ChatMessages
          messages={messages}
          type={conversation?.type}
          me={me}
          participants={conversation?.participants}
        />
      </div>

      <ChatInput
        conversationId={conversationId}
        me={me}
        typingUsersCount={typingUsers.length}
      />
    </div>
  );
}