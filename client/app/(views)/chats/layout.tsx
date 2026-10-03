import ChatsSidebar from './sidebar/chats-sidebar';
import { ChatsProvider } from './contexts/chat.context';
import ChatsResponsiveLayout from './chats-reponsive-layout';

export default function ChatsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ChatsProvider>
      <ChatsResponsiveLayout
        sidebar={<ChatsSidebar />}
      >
        {children}
      </ChatsResponsiveLayout>
    </ChatsProvider>
  );
}