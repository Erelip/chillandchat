import { useEffect, useRef, useState } from 'react';
import { ConversationService } from '@/app/services/conversation.service';
import { UserService } from '@/app/services/user.service';
import { socketService } from '@/app/services/socket.service';
import { Message } from '@/app/dto/conversation';
import { User } from '@/app/dto/conversation';

const conversationService = new ConversationService();
const userService = new UserService();

export function useConversationMessages(conversationId?: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [me, setMe] = useState<User>();
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    userService.getUser().then((res) => setMe(res.data));
  }, []);

  useEffect(() => {
    if (!conversationId) return;

    setLoading(true);

    conversationService
      .getMessages(conversationId)
      .then((res) => setMessages(res.data))
      .finally(() => setLoading(false));
  }, [conversationId]);

  useEffect(() => {
    socketService.connect();

    return () => {
      socketService.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!conversationId) return;

    const socket = socketService.getSocket();

    socket.emit('joinConversation', conversationId);

    const onMessageCreated = (message: Message) => {
      setMessages((prev) =>
        prev.some((m) => m.id === message.id)
          ? prev
          : [...prev, message],
      );
    };

    const onUserTyping = ({ userId }: { userId: string }) => {
      if (userId === me?.id) return;

      setTypingUsers((prev) =>
        prev.includes(userId) ? prev : [...prev, userId],
      );
    };

    const onUserStopTyping = ({ userId }: { userId: string }) => {
      setTypingUsers((prev) => prev.filter((id) => id !== userId));
    };

    socket.on('messageCreated', onMessageCreated);
    socket.on('userTyping', onUserTyping);
    socket.on('userStopTyping', onUserStopTyping);

    return () => {
      socket.emit('leaveConversation', conversationId);
      socket.off('messageCreated', onMessageCreated);
      socket.off('userTyping', onUserTyping);
      socket.off('userStopTyping', onUserStopTyping);
    };
  }, [conversationId, me?.id]);

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

  return {
    messages,
    newMessage,
    loading,
    me,
    typingUsers,
    handleTyping,
    sendMessage,
  };
}