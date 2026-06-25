import ChatsSidebar from './sidebar/chats-sidebar';
import { ChatsProvider } from './contexts/chat.context';

export default function ChatsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ChatsProvider>
        <ChatsSidebar />
        <main className="min-w-0 flex-1">{children}</main>
    </ChatsProvider>
  );
}