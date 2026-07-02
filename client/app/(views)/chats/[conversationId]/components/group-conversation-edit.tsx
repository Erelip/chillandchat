import { Conversation, ConversationModalType, User } from '@/app/dto/conversation';
import { Camera, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Avatar, getConversationDisplayName, getConversationSubtitle } from '@/app/helpers/conversation.helper';

interface GroupConversationEditProps {
  conversation: Conversation;
  me: User;
  onEdit: (modalType: ConversationModalType) => void;
  onConversationUpdated: (conversation: Conversation) => void;
}

export function GroupConversationEdit({
  conversation,
  me,
  onEdit,
}: GroupConversationEditProps) {
  const [name, setName] = useState('');
  const displayName = getConversationDisplayName(conversation, me);
  const avatarLetter = displayName.charAt(0).toUpperCase();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setName(displayName);
  }, [displayName]);

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
            Modification
        </h2>
        <button
            type="button"
            onClick={() => onEdit(ConversationModalType.INFO)}
            className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        >
            <X className="h-5 w-5" />
        </button>
      </div>
      <div className="flex flex-1 flex-col justify-between pt-6">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <Avatar letter={avatarLetter} />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border border-white bg-gray-900 text-white shadow hover:bg-gray-800"
            >
              <Camera className="h-4 w-4" />
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
            />
          </div>

          <div className="w-full">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900"
            />
          </div>
        </div>
      </div>
    </>
  );
}
