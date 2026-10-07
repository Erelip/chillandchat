'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserService } from '@/app/services/user.service';
import { environment } from '@/app/environments/environment.dev';

const userService = new UserService();

export default function LoginPage() {
  
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
      await userService.login(username, password);
      router.push('/chats');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
    <div className="flex justify-center">
      <div className="flex flex-col items-center justify-center min-h-screen px-4 w-full max-w-[400px]">
        <img
          src="/cc_c.png"
          alt="Logo"
          className="mb-4 w-32 h-auto"
        />

        <h4 className="font-bold text-3xl mb-6">
          Bienvenue
        </h4>

        <a href={`${environment.BACKEND_PROTOCOL}://${environment.BACKEND_HOST}:${environment.BACKEND_PORT}/auth/google`} className="w-full">
          <button className="flex w-full justify-center rounded border border-[#dedede] bg-white px-[10px] py-[10px] pr-[15px] text-base font-normal text-black shadow-[0_4px_4px_#00000030]">
            <img src="https://logos-marques.com/wp-content/uploads/2021/03/Nouveau-logo-Google.png" alt="Google Logo" className="w-[43px] h-[27px]"/>
            <span>Se connecter avec Google</span>
          </button>
          <div className="flex items-center my-4">
            <hr className="flex-1" />
            <span className="px-2 text-sm text-gray-500">
              ou
            </span>
            <hr className="flex-1" />
          </div>
        </a>

        <form
          onSubmit={onSubmit}
          className="w-full max-w-sm"
        >
          <div className="mb-4">
            <input
              placeholder="Identifiant"
              type="text"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="mb-4">
            <input
              placeholder="Mot de passe"
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full border p-2 rounded"
            />
          </div>
          <button
            type="submit"
            disabled={isInvalid}
            className="w-full bg-primary text-white p-2 rounded disabled:opacity-50 hover:bg-hover"
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
    </div>
    </>
  );
}