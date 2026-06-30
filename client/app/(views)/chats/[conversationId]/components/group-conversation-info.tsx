import { Conversation, ConversationModalType, User } from '@/app/dto/conversation';
import { SquarePen } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getConversationDisplayName, getConversationSubtitle, MemberRow } from '@/app/helpers/conversation.helper';

interface GroupConversationInfoProps {
  conversation: Conversation;
  me: User;
  onEdit: (modalType: ConversationModalType) => void;
  onConversationUpdated: (conversation: Conversation) => void;
}

export function GroupConversationInfo({
  conversation,
  me,
  onEdit,
}: GroupConversationInfoProps) {
  const [name, setName] = useState('');
  const displayName = getConversationDisplayName(conversation, me);
  const avatarLetter = displayName.charAt(0).toUpperCase();
  const subtitle = getConversationSubtitle(conversation, me);

  useEffect(() => {
    setName(displayName);
  }, [displayName]);

  function handleClose() {
    onEdit(ConversationModalType.CLOSE);
  }

  return (
    <>
        <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
                Info
            </h2>
            <button
                type="button"
                onClick={() => onEdit(ConversationModalType.EDIT)}
                className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
                <SquarePen className="h-5 w-5" />
            </button>
        </div>

        <div className="flex flex-1 flex-col justify-between pt-6">
            <div className="flex flex-col items-center gap-4">
                <div className="flex flex-1 flex-col items-center justify-center text-center">
                    <Avatar letter={avatarLetter} />
                    
                    <div className="mt-4 font-bold text-gray-900">
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            {name}
                        </label>
                    </div>

                    <div className="mt-1 text-sm text-gray-500">
                        Groupe・<span onClick={() => onEdit(ConversationModalType.MEMBERS)} className="font-bold text-blue-500">{subtitle}</span>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
}

function Avatar({ letter }: { letter: string }) {
  return (
    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-xl font-semibold text-gray-700">
      {letter}
    </div>
  );
}