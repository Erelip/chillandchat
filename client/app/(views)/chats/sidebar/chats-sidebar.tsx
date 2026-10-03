'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ConversationType, User } from '@/app/dto/conversation';
import { getConversationDisplayName } from '@/app/helpers/conversation.helper';
import { UserService } from '@/app/services/user.service';
import { useChats } from '../contexts/chat.context';

const userService = new UserService();

export default function ChatsSidebar() {
  const { conversations } = useChats();
  const router = useRouter();
  const { conversationId } = useParams<{
    conversationId?: string;
  }>();

  const [me, setMe] = useState<User>();

  useEffect(() => {
    async function load() {
      try {
        const response = await userService.getUser();
        setMe(response.data);
      } catch (err) {
        console.error('Failed to load user:', err);
      }
    }

    load();
  }, []);

  const hasSelectedConversation = Boolean(conversationId);

  return (
    <aside
      className={`
        shrink-0 flex-col border-l border-r bg-background
        ${
          hasSelectedConversation
            ? 'hidden min-[700px]:flex min-[700px]:w-80'
            : 'flex w-full min-[700px]:w-80'
        }
      `}
    >
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Conversations
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {conversations.map((conversation) => {
          const name = me
            ? getConversationDisplayName(conversation, me)
            : '';

          const otherUser =
            conversation.participants.find(
              (p) => p.user.id !== me?.id,
            )?.user;

          const avatarUrl =
            conversation.avatar ??
            (conversation.type === ConversationType.DIRECT
              ? otherUser?.avatar
              : undefined);

          const isActive = conversation.id === conversationId;

          return (
            <button
              key={conversation.id}
              type="button"
              onClick={() =>
                router.push(`/chats/${conversation.id}`)
              }
              className={`
                flex w-full items-center gap-3 px-4 py-3 text-left
                transition-colors
                ${
                  isActive
                    ? 'bg-primary'
                    : 'hover:bg-hover'
                }
              `}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-200">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-sm font-semibold text-gray-700">
                    {name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-gray-900">
                  {name}
                </p>

                <p
                  className={`
                    truncate text-sm
                    ${isActive ? 'text-white' : 'text-gray-500'}
                  `}
                >
                  {conversation.message?.content ?? ''}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}