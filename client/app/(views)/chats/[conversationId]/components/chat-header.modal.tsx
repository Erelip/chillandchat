import { Conversation, User } from '@/app/dto/conversation';
import { ConversationService } from '@/app/services/conversation.service';
import { Camera, SquarePen, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import {
  getConversationDisplayName,
  getConversationSubtitle,
} from '@/app/helpers/conversation.helper';

const conversationService = new ConversationService();

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
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const displayName = getConversationDisplayName(conversation, me);
  const subtitle = getConversationSubtitle(conversation, me);
  const avatarLetter = displayName.charAt(0).toUpperCase();

  useEffect(() => {
    if (isOpen) {
      setName(displayName);
      setIsEditing(false);
    }
  }, [isOpen, displayName]);

  function handleClose() {
    setIsEditing(false);
    onClose();
  }

  async function handleSave() {
    try {
      setIsSaving(true);

      await conversationService.editConversation(conversation.id, {
        name,
        participantIdsToRemove: [],
      });

      onConversationUpdated({
        ...conversation,
        name,
      });

      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={handleClose}
    >
      <div
        className="flex h-[350px] w-full max-w-md flex-col rounded-xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            {isEditing ? 'Modification' : 'Info'}
          </h2>

          <button
            type="button"
            onClick={() => setIsEditing((value) => !value)}
            className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            {isEditing ? (
              <X className="h-5 w-5" />
            ) : (
              <SquarePen className="h-5 w-5" />
            )}
          </button>
        </div>

        {!isEditing ? (
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <Avatar letter={avatarLetter} />

            <div className="mt-4 font-medium text-gray-900">
              {displayName}
            </div>

            <div className="mt-1 text-sm text-gray-500">
              {subtitle}
            </div>
          </div>
        ) : (
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
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Nom
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="rounded-md px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
              >
                Annuler
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className="rounded-md bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-800 disabled:opacity-50"
              >
                {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Avatar({ letter }: { letter: string }) {
  return (
    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-xl font-semibold text-gray-700">
      {letter}
    </div>
  );
}