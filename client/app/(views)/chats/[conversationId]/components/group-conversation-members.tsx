import { Conversation, ConversationModalType, User } from '@/app/dto/conversation';
import { Plus, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getConversationDisplayName, MemberRow } from '@/app/helpers/conversation.helper';
import { UserService } from '@/app/services/user.service';
import { ConversationService } from '@/app/services/conversation.service';

const userService = new UserService();
const conversationService = new ConversationService();

interface GroupConversationMembersProps {
  conversation: Conversation;
  me: User;
  onEdit: (modalType: ConversationModalType) => void;
  onConversationUpdated: (conversation: Conversation) => void;
}

export function GroupConversationMembers({
  conversation,
  me,
  onEdit,
}: GroupConversationMembersProps) {
  const displayName = getConversationDisplayName(conversation, me);
  const [users, setUsers] = useState<User[]>([]);
  const [isAddingMembers, setIsAddingMembers] = useState(false);

  async function addMembers(userId: string) {
    setIsAddingMembers((value) => !value);

    const res = await conversationService.addParticipants(userId, conversation.id);
    setUsers(res.data);
  }

  async function handleToggleAddMembers() {
    setIsAddingMembers((value) => !value);

    if (users.length === 0) {
      const res = await userService.getAllUsersButMe();
      setUsers(res.data);
    }
  }

  useEffect(() => {
    handleToggleAddMembers()
  }, [displayName]);

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
            Membres
        </h2>
        <div className="flex items-center justify-between">
          <div className="relative">
            <button
              type="button"
              onClick={handleToggleAddMembers}
              className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              <Plus className="h-5 w-5" />
            </button>

            {isAddingMembers && (
              <div className="absolute right-0 top-full z-10 mt-2 w-72 max-h-48 overflow-y-auto rounded-md border bg-white shadow-lg">
                {users.map((user) => (
                  <button
                    key={user.id}
                    type="button"
                    onClick={() => addMembers(user.id)}
                    className="flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-gray-100"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 font-semibold">
                      {user.firstname.charAt(0).toUpperCase()}
                    </div>

                    <div className="flex-1">
                      <p className="font-medium">
                        {user.firstname} {user.lastname}
                      </p>

                      <p className="text-sm text-gray-500">
                        {user.phoneNumber}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
            <button
                type="button"
                onClick={() => onEdit(ConversationModalType.INFO)}
                className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
                <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-4 max-h-64 overflow-y-auto space-y-2 pr-2">
        <MemberRow
          firstname={me.firstname}
          lastname={me.lastname}
          phoneNumber={me.phoneNumber}
          isMe
        />

        {conversation.participants.map((participant) => {
          if (participant.user.id == me.id) return '';
          return (
            <MemberRow
              key={participant.id}
              firstname={participant.user.firstname}
              lastname={participant.user.lastname}
              phoneNumber={participant.user.phoneNumber}
            />
          )
        })}
      </div>
    </>
  );
}
