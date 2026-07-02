import { Conversation, Participant, User } from '@/app/dto/conversation';
import { CircleEllipsis } from 'lucide-react';
import { useState } from 'react';
import { ChatHeaderModal } from './chat-header.modal';
import { getConversationDisplayName } from '@/app/helpers/conversation.helper';

interface ChatHeaderProps {
  me?: User;
  conversation?: Conversation;
  onConversationUpdated: (conversation: Conversation) => void;
  onParticipantUpdated: (conversationId: string, participant: Participant) => void;
}

export function ChatHeader({
  me,
  conversation,
  onConversationUpdated,
  onParticipantUpdated,
}: ChatHeaderProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  if (!conversation || !me) return null;

  return (
    <>
      <div className="border-b bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">
            {getConversationDisplayName(conversation, me)}
          </h1>

          <button
            type="button"
            onClick={() => setIsEditOpen(true)}
            className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <CircleEllipsis className="h-5 w-5" />
          </button>
        </div>
      </div>

      <ChatHeaderModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        me={me}
        conversation={conversation}
        onConversationUpdated={onConversationUpdated}
        onParticipantUpdated={onParticipantUpdated}
      />
    </>
  );
}