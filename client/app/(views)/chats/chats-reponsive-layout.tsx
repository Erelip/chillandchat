'use client';

import { useParams } from 'next/navigation';

export default function ChatsResponsiveLayout({
  sidebar,
  children,
}: {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}) {
  const { conversationId } = useParams<{
    conversationId?: string;
  }>();

  const hasSelectedConversation = Boolean(conversationId);

  return (
    <div className="flex h-full w-full overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`
          shrink-0
          ${
            hasSelectedConversation
              ? 'hidden min-[700px]:flex min-[700px]:w-80'
              : 'flex w-full min-[700px]:w-80'
          }
        `}
      >
        {sidebar}
      </aside>

      {/* Main */}
      <main
        className={`
          min-w-0 flex-1
          ${
            hasSelectedConversation
              ? 'flex'
              : 'hidden min-[700px]:flex'
          }
        `}
      >
        {children}
      </main>
    </div>
  );
}