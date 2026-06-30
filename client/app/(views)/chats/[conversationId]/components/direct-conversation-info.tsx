import { Conversation, User } from '@/app/dto/conversation';
import { useEffect, useState } from 'react';
import { getConversationDisplayName } from '@/app/helpers/conversation.helper';

interface DirectConversationInfoProps {
  conversation: Conversation;
  me: User;
}

export function DirectConversationInfo({
  conversation,
  me,
}: DirectConversationInfoProps) {
  const displayName = getConversationDisplayName(conversation, me);
  const avatarLetter = displayName.charAt(0).toUpperCase();

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          Info
        </h2>
      </div>

      <div className="flex flex-1 flex-col justify-between pt-6">
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <Avatar letter={avatarLetter} />
            <div className="mt-4 font-bold text-gray-900">
              {displayName}
            </div>

            <div className="text-gray-900">
              {conversation.participants[0].user.phoneNumber}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Avatar({ letter }: { letter: string }) {
  return (
    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-xl font-semibold text-gray-700">
      {letter}
    </div>
  );
}