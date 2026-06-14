'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserService } from '@/app/services/user.service';

export default function LoginPage() {
  
  const userService = new UserService();
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState(false);

  const isInvalid = !username || !password;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);

    if (isInvalid) return;

    try {
      userService.login(username, password).then(() => {
        router.push('/dashboard');
      });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
    <div className="flex flex-col items-center justify-center min-h-screen px-4 w-full">
      <img
        src="/logo.png"
        alt="Logo"
        className="mb-4 w-32 h-auto"
      />

      <h4 className="font-bold text-3xl mb-6">
        Bienvenue
      </h4>

      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm"
      >
        <div className="mb-3">
          <input
            placeholder="Identifiant"
            type="text"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            className="w-full border p-2 rounded mb-1"
          />
        </div>

        <div className="mb-3">
          <input
            placeholder="Mot de passe"
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full border p-2 rounded mb-1"
          />
        </div>

        <button
          type="submit"
          disabled={isInvalid}
          className="w-full bg-black text-white p-2 rounded disabled:opacity-50"
        >
          Se connecter
        </button>

        <div className="flex items-center my-4">
          <hr className="flex-1" />
          <span className="px-2 text-sm text-gray-500">
            ou
          </span>
          <hr className="flex-1" />
        </div>

        {touched && isInvalid && (
          <div className="text-red-500 text-sm mt-3">
            L'identifiant et le mot de passe sont
            obligatoires.
          </div>
        )}
      </form>

      <div className="text-blue-500 text-sm mt-3">
        <p>
          <a href="/auth/register">Se créer un compte</a>
        </p>
      </div>
    </div>
    </>
  );
}