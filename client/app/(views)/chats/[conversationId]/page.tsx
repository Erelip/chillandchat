'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ConversationService } from '@/app/services/conversation.service';
import { Message } from '@/app/dto/conversation';
import { socketService } from '@/app/services/socket.service';

export default function MessagesPage() {
  const { conversationId } = useParams();
  const conversationService = new ConversationService();

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res =
          await conversationService.getMessages(
            conversationId as string,
          );

        setMessages(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (conversationId) {
      load();
    }
  }, [conversationId]);

  useEffect(() => {
    socketService.connect();
    const socket = socketService.getSocket();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!conversationId) return;

    const socket =
      socketService.getSocket();

    socket.emit(
      'joinConversation',
      conversationId,
    );

    socket.on(
      'messageCreated',
      (message) => {
        setMessages((prev) => [
          ...prev,
          message,
        ]);
      },
    );

    return () => {
      socket.off('messageCreated');
    };
  }, [conversationId]);

  async function sendMessage() {
    if (!newMessage.trim()) return;

    try {
      const res = await conversationService.sendMessage(conversationId as string, newMessage);
      setNewMessage('');
    } catch (err) {
      console.error(err);
    }
  }
  
  if (loading) {
    return (
      <div className="p-4"> Loading messages... </div>
    );
  }
  
  return (
    <div className="flex flex-col h-screen">
      
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.length === 0 && (
          <p className="text-gray-500">
            No messages yet
          </p>
        )}

        {messages.map((msg) => (
          <div
            key={msg._id}
            className="p-2 rounded bg-gray-100 max-w-md"
          >
            {msg._content}
          </div>
        ))}

        <div />
      </div>

      <div className="border-t p-3 flex gap-2 shrink-0">
        <input
          value={newMessage}
          onChange={(e) =>
            setNewMessage(e.target.value)
          }
          className="flex-1 border rounded px-3 py-2"
          placeholder="Écrivez un message..."
          onKeyDown={(e) => {
            if (e.key === 'Enter') sendMessage();
          }}
        />

        <button
          onClick={sendMessage}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Envoyer
        </button>
      </div>
    </div>
  );
}