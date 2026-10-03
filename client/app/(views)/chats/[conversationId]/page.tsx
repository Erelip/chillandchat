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
    typingUsers,
  } = useConversationMessages(conversationId);

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center text-center text-gray-500">
        Chargement des messages...
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 w-full min-w-0 flex-col bg-gray-50">
      {/* Header */}
      <div className="shrink-0 fixed w-full">
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
                : prev,
            );

            updateParticipants(conversationId, participant);
          }}
        />
      </div>

      {/* Messages - ONLY THIS SCROLLS */}
      <div
        className="min-h-0 flex-1 overflow-y-auto bg-repeat px-5 pb-4 max-[450px]:pb-[calc(var(--spacing-input)+20px)] pt-[calc(var(--spacing-header)+20px)]"
        style={{
          backgroundImage: "url('/chat-bg.png')",
          backgroundSize: '420px',
        }}
      >
        <ChatMessages
          messages={messages}
          type={conversation?.type}
          me={me}
          participants={conversation?.participants}
        />
      </div>

      {/* Input */}
      <div className="shrink-0 max-[449px]:pb-nav max-[449px]:fixed max-[449px]:w-full max-[449px]:bottom-0 max-[449px]:left-0">
        <ChatInput
          conversationId={conversationId}
          me={me}
          typingUsersCount={typingUsers.length}
        />
      </div>
    </div>
  );
}