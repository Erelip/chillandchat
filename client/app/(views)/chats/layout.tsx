// app/(views)/chats/layout.tsx

import ChatsSidebar from '../../components/chats/chats-sidebar';

export default function ChatsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ChatsSidebar />
      <main className="flex-1">{children}</main>
    </>
  );
}