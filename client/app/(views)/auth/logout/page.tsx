'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserService } from '@/app/services/user.service';

const userService = new UserService();

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    async function logout() {
      await userService.logout();
      router.replace('/auth/login');
      router.refresh();
    }

    logout();
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center text-gray-500">
      Déconnexion...
    </div>
  );
}