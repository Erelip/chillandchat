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
      <div className="flex h-screen items-center justify-center text-gray-500">
        Loading messages...
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      {/* Header */}
      <div className="border-b bg-white px-6 py-4 shadow-sm">
        <h1 className="text-lg font-semibold text-gray-900">
          Conversation
        </h1>
        <p className="text-sm text-gray-500">
          {messages.length} message{messages.length > 1 ? 's' : ''}
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="rounded-full bg-white px-4 py-2 text-sm text-gray-500 shadow-sm">
              No messages yet. Start the conversation 👋
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className="max-w-[70%] rounded-2xl bg-white px-4 py-2 text-sm text-gray-800 shadow-sm"
              >
                {msg._content}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t bg-white px-4 py-3">
        <div className="flex items-center gap-3 rounded-full border bg-gray-50 px-4 py-2 focus-within:ring-2 focus-within:ring-black/10">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Écrivez un message..."
            onKeyDown={(e) => {
              if (e.key === 'Enter') sendMessage();
            }}
            className="flex-1 bg-transparent px-2 py-2 text-sm outline-none placeholder:text-gray-400"
          />

          <button
            onClick={sendMessage}
            disabled={!newMessage.trim()}
            className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            Envoyer
          </button>
        </div>
      </div>
    </div>
  );
}
