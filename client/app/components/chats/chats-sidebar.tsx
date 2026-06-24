'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ConversationService } from '@/app/services/conversation.service';
import { Conversation, ConversationType } from '@/app/dto/conversation';

export default function ChatsSidebar() {
  const router = useRouter();
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const conversationService = new ConversationService();
        const res = await conversationService.getConversations();
        setConversations(res.data);
      } catch (err) {
        console.error('Failed to load conversations:', err);
      }
    }

    load();
  }, []);

  function formatParticipantsName(conversation: Conversation) {
    if (conversation.name != null) return conversation.name;

    const names = conversation.participants.map(
      (p) => `${p.user.firstname} ${p.user.lastname}`,
    );

    if (names.length <= 2) {
      return names.join(', ');
    }

    return `${names[0]}, ${names[1]} +${names.length - 2}`;
  }

  return (
    <>
      <aside className="w-80 border-r bg-white flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">
            Conversations
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => router.push(`/chats/${conv.id}`)}
              className="
                flex items-center gap-3
                px-4 py-3
                cursor-pointer
                border-b
                hover:bg-gray-100
                transition-colors
              "
            >
              <div
                className="
                  w-12 h-12
                  rounded-full
                  bg-gray-300
                  flex items-center justify-center
                  text-sm font-semibold
                "
              >
                {formatParticipantsName(conv)
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">
                  {formatParticipantsName(conv)}
                </p>

                <p className="text-sm text-gray-500 truncate">
                  {conv.message?.content ??
                    ''}
                </p>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}