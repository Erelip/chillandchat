import { User } from "@/app/dto/conversation";
import { ConversationService } from "@/app/services/conversation.service";
import { useRef, useState } from "react";
import { socketService } from '@/app/services/socket.service';

export function ChatInput({
  conversationId,
  me,
  typingUsersCount,
}: {
  conversationId: string;
  me: User|undefined;
  typingUsersCount: number;
}) {

  const conversationService = new ConversationService();
  const [newMessage, setNewMessage] = useState('');
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  function handleTyping(value: string) {
    setNewMessage(value);

    if (!conversationId || !me?.id) return;

    const socket = socketService.getSocket();

    socket.emit('typing', {
      conversationId,
      userId: me.id,
    });

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit('stopTyping', {
        conversationId,
        userId: me.id,
      });
    }, 1000);
  }

  async function sendMessage() {
    if (!conversationId || !newMessage.trim()) return;

    await conversationService.sendMessage(conversationId, newMessage);
    setNewMessage('');
  }

  return (
    <>
      {typingUsersCount > 0 && (
        <div className="px-4 py-1 text-sm text-gray-500">
          Someone is typing...
        </div>
      )}

      <div className="border-t bg-background px-4 py-3">
        <div className="flex items-center gap-3 rounded-full border bg-[#fffbf5] px-4 py-2 focus-within:ring-2 focus-within:ring-black/10">
          <input
            value={newMessage}
            onChange={(e) => handleTyping(e.target.value)}
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
    </>
  );
}