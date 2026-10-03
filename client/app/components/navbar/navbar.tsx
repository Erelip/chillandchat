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

export default function Navbar() {
  const pathname = usePathname();

  if (pathname.includes('auth')) return null;

  return (
    <aside
      className="
        fixed bottom-0 left-0 z-50
        flex w-full flex-row
        bg-primary text-white

        min-[450px]:static
        min-[450px]:w-24
        min-[450px]:flex-col
      "
    >
      {/* Logo */}
      <div
        className="
          hidden
          min-[450px]:flex
          min-[450px]:h-24
          min-[450px]:items-center
          min-[450px]:justify-center
        "
      >
        <Image
          src="/cc_c.png"
          alt="Chillandchat"
          width={64}
          height={64}
          className="object-contain"
          priority
        />
      </div>

      {/* Navigation */}
      <nav
        className="
          flex flex-1 items-center justify-around
          px-2

          min-[450px]:block
          min-[450px]:space-y-1
          min-[450px]:p-4
        "
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              className={`
                flex items-center justify-center rounded
                text-white transition-colors

                ${
                  isActive
                    ? 'bg-carbon font-medium'
                    : 'hover:bg-hover-icon hover:text-black'
                }

                min-[450px]:w-full
              `}
            >
              <div className="flex items-center justify-center p-3">
                <Icon className="h-5 w-5" />
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Copyright */}
      <div
        className="
          hidden
          min-[450px]:block
          min-[450px]:border-t
          min-[450px]:border-black
          min-[450px]:p-4
          min-[450px]:text-xs
          min-[450px]:text-black
        "
      >
        © 2026 Chillandchat
      </div>
    </aside>
  );
}