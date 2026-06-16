'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserService } from '@/app/services/user.service';

export default function LoginPage() {
  
  const userService = new UserService();
  const router = useRouter();

  useEffect(() => {
    userService.logout();
    router.push('/auth/login');
  })

  return;
}