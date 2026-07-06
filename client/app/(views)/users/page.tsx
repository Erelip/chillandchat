'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ConversationService } from '@/app/services/conversation.service';
import { UserService } from '@/app/services/user.service';
import { User } from '@/app/dto/conversation';

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
    router.push(`/chats/${conversation.data.id}`);
    
  }

  return (
    <div className="p-3 space-y-3">
      {users.map((user: User) => (
        <div
          key={user.id}
          onClick={() => toggleUser(user.id)}
          className={`
            flex items-center gap-4 rounded-lg border p-4 cursor-pointer transition-colors
            ${
              selectedUsers.includes(user.id)
                ? 'border-primary'
                : 'border-gray-200 hover:bg-gray-50'
            }
          `}
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-200">
            {user.avatar ? (
              <img
                src={`${user.avatar}`}
                alt={`${user.firstname} ${user.lastname}`}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-lg font-semibold text-gray-700">
                {user.firstname.charAt(0).toUpperCase()}
              </span>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="truncate font-semibold text-gray-900">
              {user.firstname} {user.lastname}
            </h2>

            <p className="truncate text-sm text-gray-500">
              {user.email}
            </p>

            <p className="truncate text-sm text-gray-500">
              {user.phoneNumber}
            </p>
          </div>

          {selectedUsers.includes(user.id) && (
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
              ✓
            </div>
          )}
        </div>
      ))}
      <div className="fixed bottom-0 left-0 right-0 p-4 flex justify-end">
        <button
          onClick={create}
          disabled={selectedUsers.length === 0}
          className="bg-primary text-white px-6 py-3 rounded-lg disabled:opacity-50"
        >
          {selectedUsers.length > 1 ? `Créer un groupe (${selectedUsers.length})` : "Envoyer un message"}
        </button>
      </div>
    </div>
  );
}