'use client';

import { useEffect, useRef, useState } from 'react';
import { Camera } from 'lucide-react';
import { UserService } from '@/app/services/user.service';
import { User } from '@/app/dto/conversation';
import { environment } from '@/app/environments/environment.dev';

const userService = new UserService();

export default function SettingsPage() {

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [me, setMe] = useState<User | null>(null);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const res = await userService.getUser();
      const user = res.data;

      setMe(user);
      setFirstname(user.firstname ?? '');
      setLastname(user.lastname ?? '');
      setPhoneNumber(user.phoneNumber ?? '');
      setAvatarPreview(user.avatar ? `${environment.BACKEND_PROTOCOL}://${environment.BACKEND_HOST}:${environment.BACKEND_PORT}/uploads/avatars/${user.avatar}` : null);
    }

    load();
  }, []);

  function handleAvatarChange(file: File) {
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  }

  async function handleSave() {
    if (!me) return;

    try {
      setIsSaving(true);

      let avatarUrl = me.avatar;

      if (avatarFile) {
        const formData = new FormData();
        formData.append('avatar', avatarFile);

        const avatarRes = await userService.uploadAvatar(formData);
        console.log(avatarRes)
        avatarUrl = avatarRes.data.avatarUrl;
      }

      // const res = await userService.updateMe({
      //   firstname,
      //   lastname,
      //   phoneNumber,
      //   avatarUrl,
      // });

      // setMe(res.data);
      setAvatarFile(null);
    } catch(e) {
      console.log(e)
    } finally {
      setIsSaving(false);
    }
  }

  if (!me) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-500">
        Chargement...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl p-6">
      <h1 className="mb-6 text-2xl font-semibold text-gray-900">
        Paramètres
      </h1>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col items-center">
          <div className="relative">
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="Avatar"
                className="h-24 w-24 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-200 text-3xl font-semibold text-gray-700">
                {firstname.charAt(0).toUpperCase()}
              </div>
            )}

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border border-white bg-gray-900 text-white shadow hover:bg-gray-800"
            >
              <Camera className="h-4 w-4" />
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleAvatarChange(file);
              }}
            />
          </div>

          <p className="mt-3 text-sm text-gray-500">
            Cliquez sur l’icône pour changer votre avatar
          </p>
        </div>

        <div className="space-y-4">
          <Input
            label="Prénom"
            value={firstname}
            onChange={setFirstname}
          />

          <Input
            label="Nom"
            value={lastname}
            onChange={setLastname}
          />

          <Input
            label="Téléphone"
            value={phoneNumber}
            onChange={setPhoneNumber}
          />
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="rounded-md bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-800 disabled:opacity-50"
          >
            {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
          </button>
        </div>
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900"
      />
    </div>
  );
}