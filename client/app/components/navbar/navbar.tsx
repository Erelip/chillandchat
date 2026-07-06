'use client';

import { MessageCircleMore, Users, LogOut, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const navItems = [
  { href: '/chats', label: 'Conversations', icon: MessageCircleMore },
  { href: '/users', label: 'Utilisateurs', icon: Users },
  { href: '/settings', label: 'Paramètres', icon: Settings },
  { href: '/auth/logout', label: 'Déconnexion', icon: LogOut },
];

export default function Sidebar() {
  const pathname = usePathname();

  if (pathname.includes('auth')) return null;

  return (
    <div className="h-screen w-24 bg-primary text-white flex flex-col">
      <div className="flex h-24 items-center justify-center">
        <Image
          src="/cc_c.png"
          alt="Chillandchat"
          width={64}
          height={64}
          className="object-contain"
          priority
        />
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex justify-center items-center rounded text-white
                ${isActive
                  ? 'bg-carbon font-medium'
                  : 'hover:bg-hover-icon hover:text-black'
                }`}
            >
              <div className="flex justify-center items-center">
                <div className="p-3">
                <Icon className="w-5 h-5"/>
                </div>
              </div>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-black text-xs text-black">
        © 2026 Chillandchat
      </div>
    </div>
  );
}
