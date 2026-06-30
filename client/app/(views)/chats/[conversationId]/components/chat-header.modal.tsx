import { Conversation, ConversationModalType, ConversationType, User } from '@/app/dto/conversation';
import { useEffect, useState } from 'react';
import { getConversationDisplayName } from '@/app/helpers/conversation.helper';
import { DirectConversationInfo } from './direct-conversation-info';
import { GroupConversationInfo } from './group-conversation-info';
import { GroupConversationEdit } from './group-conversation-edit';
import { GroupConversationMembers } from './group-conversation-members';

interface ChatHeaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  me: User;
  conversation: Conversation;
  onConversationUpdated: (conversation: Conversation) => void;
}

export function ChatHeaderModal({
  isOpen,
  onClose,
  me,
  conversation,
  onConversationUpdated,
}: ChatHeaderModalProps) {
  const [modalType, setModalType] = useState<ConversationModalType>(ConversationModalType.INFO);
  const displayName = getConversationDisplayName(conversation, me);

  useEffect(() => {
    if (isOpen) {
      setModalType(ConversationModalType.INFO);
    }
  }, [isOpen, displayName]);

  function handleClose() {
    onClose();
  }

  function onEdit(modalType: ConversationModalType) {
    setModalType(modalType)
  }

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
        onClick={handleClose}
      >
        <div
            className="flex h-[350px] w-full max-w-md flex-col rounded-xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
        >
          {modalType == ConversationModalType.EDIT ? (
            <GroupConversationEdit
              conversation={conversation}
              me={me}
              onEdit={onEdit}
              onConversationUpdated={onConversationUpdated}
            />
          ) : modalType == ConversationModalType.MEMBERS ? (
            <GroupConversationMembers
              conversation={conversation}
              me={me}
              onEdit={onEdit}
              onConversationUpdated={onConversationUpdated}
            />
          ) : conversation.type === ConversationType.DIRECT ? (
            <DirectConversationInfo
              conversation={conversation}
              me={me}
            />
          ) : (
            <GroupConversationInfo
              conversation={conversation}
              me={me}
              onEdit={onEdit}
              onConversationUpdated={onConversationUpdated}
            />
          )}
        </div>
      </div>
    </>
  );
}