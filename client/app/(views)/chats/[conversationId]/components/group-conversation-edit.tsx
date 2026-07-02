import { Conversation, ConversationModalType, User } from '@/app/dto/conversation';
import { Camera, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Avatar, getConversationDisplayName, getConversationSubtitle } from '@/app/helpers/conversation.helper';
import { ConversationService } from '@/app/services/conversation.service';

interface GroupConversationEditProps {
  conversation: Conversation;
  me: User;
  onEdit: (modalType: ConversationModalType) => void;
  onConversationUpdated: (conversation: Conversation) => void;
}

const conversationService = new ConversationService();

export function GroupConversationEdit({
  conversation,
  me,
  onEdit,
  onConversationUpdated,
}: GroupConversationEditProps) {
  const [name, setName] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    conversation.avatar ?? null,
  );
  const [isSaving, setIsSaving] = useState(false);

  const displayName = getConversationDisplayName(conversation, me);
  const avatarLetter = displayName.charAt(0).toUpperCase();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setName(displayName);
    setAvatarPreview(conversation.avatar ?? null);
  }, [displayName, conversation.avatar]);

  function handleAvatarChange(file: File) {
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  }

  async function handleSave() {
    try {
      setIsSaving(true);

      let avatar = conversation.avatar;

      if (avatarFile) {
        const formData = new FormData();
        formData.append('avatar', avatarFile);

        const avatarRes = await conversationService.uploadAvatar(
          conversation.id,
          formData,
        );

        avatar = avatarRes.data;
      }

      await conversationService.editConversation(conversation.id, {
        name,
        participantIdsToRemove: [],
      });

      onConversationUpdated({
        ...conversation,
        name,
        avatar,
      });

      setAvatarFile(null);
      onEdit(ConversationModalType.INFO);
    } finally {
      setIsSaving(false);
    }
  }

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
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt={displayName}
                className="h-16 w-16 rounded-full object-cover"
              />
            ) : (
              <Avatar letter={avatarLetter} />
            )}

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
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleAvatarChange(file);
              }}
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

        <div className="flex justify-end gap-2 pt-3">
          <button
            type="button"
            onClick={() => onEdit(ConversationModalType.INFO)}
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
    </>
  );
}