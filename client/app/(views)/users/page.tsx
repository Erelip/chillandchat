'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ConversationService } from '@/app/services/conversation.service';
import { UserService } from '@/app/services/user.service';
import { User } from '@/app/dto/user';

export default function UsersPage() {
  const router = useRouter();
  const conversationService = new ConversationService();
  const userService = new UserService();

  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  useEffect(() => {
    async function load() {
      const res = await userService.getAllUsersButMe();
      setUsers(res.data);
    }
    load();
  }, []);
  
  function toggleUser(userId: string) {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  }

  async function create() {
    const conversation = await conversationService.createConversations(selectedUsers);
    router.push(`/chats/${conversation.id}`);
    
  }

  return (
  <div className="p-3 space-y-3">
    {users.map((user: User) => (
      <div
        onClick={() => toggleUser(user.id)}
        className={`
          p-4 rounded border cursor-pointer
          ${
            selectedUsers.includes(user.id)
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200'
          }
        `}
        key={user.id}
      >
        <h2 className="font-semibold">
          {user.firstname} {user.lastname}
        </h2>

        <p className="text-gray-600">
          {user.email}
        </p>

        <p className="text-gray-600">
          {user.phoneNumber}
        </p>
      </div>
    ))}
      <div className="fixed bottom-0 left-0 right-0 p-4 flex justify-end">
        <button
          onClick={create}
          disabled={selectedUsers.length === 0}
          className="bg-black text-white px-6 py-3 rounded-lg disabled:opacity-50"
        >
          {selectedUsers.length > 1 ? `Créer un groupe (${selectedUsers.length})` : "Envoyer un message"}
        </button>
      </div>
    </div>
  );
}