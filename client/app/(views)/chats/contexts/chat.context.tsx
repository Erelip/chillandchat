'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Conversation, Participant } from '@/app/dto/conversation';
import { ConversationService } from '@/app/services/conversation.service';

const conversationService = new ConversationService();

interface ChatsContextValue {
  conversations: Conversation[];
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
  updateConversation: (conversation: Conversation) => void;
  updateParticipants: (conversationId: string, participant: Participant) => void;
}

const ChatsContext = createContext<ChatsContextValue | null>(null);

export function ChatsProvider({ children }: { children: React.ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    conversationService.getConversations().then((res) => {
      setConversations(res.data);
    });
  }, []);

  function updateConversation(updatedConversation: Conversation) {
    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === updatedConversation.id
          ? updatedConversation
          : conversation,
      ),
    );
  }

  function updateParticipants(conversationId: string, participant: Participant) {
    setConversations((prev) =>
      prev.map((conversation) => {
        if (conversation.id !== conversationId) {
          return conversation;
        }

        const alreadyExists = conversation.participants.some(
          (p) => p.user.id === participant.user.id,
        );

        if (alreadyExists) {
          return conversation;
        }

        return {
          ...conversation,
          participants: [...conversation.participants, participant],
        };
      }),
    );
  }

  return (
    <ChatsContext.Provider
      value={{
        conversations,
        setConversations,
        updateConversation,
        updateParticipants,
      }}
    >
      {children}
    </ChatsContext.Provider>
  );
}

export function useChats() {
  const context = useContext(ChatsContext);

  if (!context) {
    throw new Error('useChats must be used inside ChatsProvider');
  }

  return context;
}