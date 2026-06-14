'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ConversationService } from '@/app/services/conversation.service';
import { Conversation } from '@/app/dto/conversation';

export default function ChatsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const conversationService = new ConversationService();

  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    async function load() {
      const res =
        await conversationService.getConversations();
      setConversations(res.data);
    }

    load();
  }, []);

  return (
    <>
      <aside className="w-72 border-r p-3">
        <h2 className="font-bold mb-3">
          Conversations
        </h2>

        {conversations.map((conv: Conversation) => (
          <div
            key={conv._id}
            onClick={() =>
              router.push(`/chats/${conv._id}`)
            }
            className="p-2 rounded hover:bg-gray-100 cursor-pointer"
          >
            {conv._messages.length == 0 ? '...' : conv._messages[conv._messages.length - 1]._content}
          </div>
        ))}
      </aside>

      <main className="flex-1">
        {children}
      </main>
    </>
  );
}