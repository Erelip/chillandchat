'use client';

import { MessageCircleMore, Users, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/chats', label: 'Conversations', icon: MessageCircleMore },
  { href: '/users', label: 'Utilisateurs', icon: Users },
  { href: '/auth/logout', label: 'Déconnexion', icon: LogOut },
];

export default function Sidebar() {
  const pathname = usePathname();

  if (pathname.includes('auth')) return null;

  return (
    <div className="h-screen w-32 bg-gray-900 text-white flex flex-col">
      <div className="p-6 text-xl font-bold border-b border-gray-700">
        C&C
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex justify-center items-center
                ${isActive
                  ? 'bg-gray-700 text-white font-medium'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
            >
              <div className="flex justify-center items-center">
                <div className="p-3">
                <Icon className="w-5 h-5">
                </Icon>
                </div>
              </div>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-gray-700 text-sm text-gray-500">
        © 2026 Chillandchat
      </div>
    </div>
  );
}
