'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserService } from '@/app/services/user.service';

export default function LoginPage() {
  
  const userService = new UserService();
  const router = useRouter();

  userService.logout();
  
  router.push('/auth/login');

  return;
}