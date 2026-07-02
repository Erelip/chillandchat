'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ConversationService } from '@/app/services/conversation.service';
import { Conversation } from '@/app/dto/conversation';
import { getConversationDisplayName } from '@/app/helpers/conversation.helper';
import { UserService } from '@/app/services/user.service';
import { User } from '@/app/dto/conversation';
import { useChats } from '../contexts/chat.context';

const userService = new UserService();

export default function ChatsSidebar() {
  const { conversations } = useChats();
  const router = useRouter();
  const { conversationId } = useParams<{ conversationId?: string }>();
  const [me, setMe] = useState<User>();

  useEffect(() => {
    async function load() {
      try {
        const response = await userService.getUser();
        setMe(response.data);
      } catch (err) {
        console.error('Failed to load conversations:', err);
      }
    }

    load();
  }, []);

  return (
    <aside className="flex w-80 shrink-0 flex-col border-r bg-white">
      <div className="border-b p-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Conversations
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {conversations.map((conversation) => {
          const name = me
            ? getConversationDisplayName(conversation, me)
            : '';

          const isActive = conversation.id === conversationId;

          return (
            <button
              key={conversation.id}
              type="button"
              onClick={() => router.push(`/chats/${conversation.id}`)}
              className={`
                flex w-full items-center gap-3 border-b px-4 py-3 text-left
                transition-colors
                ${isActive ? 'bg-gray-100' : 'hover:bg-gray-50'}
              `}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-700">
                {name.charAt(0).toUpperCase()}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-gray-900">
                  {name}
                </p>

                <p className="truncate text-sm text-gray-500">
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