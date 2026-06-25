'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Conversation } from '@/app/dto/conversation';
import { ConversationService } from '@/app/services/conversation.service';

const conversationService = new ConversationService();

interface ChatsContextValue {
  conversations: Conversation[];
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
  updateConversation: (conversation: Conversation) => void;
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

  return (
    <ChatsContext.Provider
      value={{
        conversations,
        setConversations,
        updateConversation,
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