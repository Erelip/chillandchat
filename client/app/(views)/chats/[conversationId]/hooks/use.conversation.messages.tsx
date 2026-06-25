import { useEffect, useRef, useState } from 'react';
import { ConversationService } from '@/app/services/conversation.service';
import { UserService } from '@/app/services/user.service';
import { socketService } from '@/app/services/socket.service';
import { Conversation, Message, Participant } from '@/app/dto/conversation';
import { User } from '@/app/dto/conversation';

const conversationService = new ConversationService();
const userService = new UserService();

export function useConversationMessages(conversationId?: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [me, setMe] = useState<User>();
  const [conversation, setConversation] = useState<Conversation>();
  const [typingUsers, setTypingUsers] = useState<string[]>([]);

  useEffect(() => {
    if (!conversationId) return;

    Promise.all([
      userService.getUser(),
      conversationService.getConversation(conversationId),
    ]).then(([userRes, convRes]) => {
      const me = userRes.data;
      const conversation = convRes.data;

      setMe(me);
      setConversation(conversation);
    });
  }, [conversationId]);

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

  return {
    conversation,
    setConversation,
    messages,
    loading,
    me,
    typingUsers
  };
}