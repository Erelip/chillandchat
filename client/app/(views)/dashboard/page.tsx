'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserService } from '@/app/services/user.service';
import { ConversationService } from '@/app/services/conversation.service';
import { Conversation, ConversationType } from '@/app/dto/conversation';
import { User } from '@/app/dto/user';

export default function DashboardPage() {
  
  const userService = new UserService();
  const conversationService = new ConversationService();
  const router = useRouter();

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [usersResponse, conversationsResponse] =
          await Promise.all([
            conversationService.getAllUsersButMe(),
            conversationService.getConversations(),
          ]);
        setUsers(usersResponse.data);
        setConversations(conversationsResponse.data);
      } catch (err) {
        console.error(err);
      }
    }

    loadData();
  }, []);


  function openConversation(id: string) {
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Conversations
      </h1>

      {conversations.length === 0 && (
        <p>No conversations yet</p>
      )}
{/* 
      <div className="space-y-2">
        {conversations.map((conv : Conversation) => (
          <div
            key={conv._id}
            onClick={() =>
              openConversation(conv._id)
            }
            className="p-3 border rounded cursor-pointer hover:bg-gray-100"
          >
            <p className="font-semibold">
              {conv._type == ConversationType.DIRECT ? 'DIRECT' : 'GROUPE'}
            </p>

            {conv._messages && (
              <p className="text-sm text-gray-500">
                {conv._messages._content}
              </p>
            )}
          </div>
        ))}
      </div> */}
    </div>
  );
}