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
      setAvatarPreview(user.avatar ? user.avatar : null);
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
        avatarUrl = avatarRes.data.avatarUrl;
      }

      const res = await userService.updateMe({
        firstname,
        lastname,
        phoneNumber,
      });

      setMe(res.data);
      setAvatarFile(null);
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
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Paramètres
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Modifiez vos informations personnelles.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <div className="bg-primary px-6 py-8 text-white">
          <div className="flex flex-col items-center">
            <div className="relative">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Avatar"
                  className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-md"
                />
              ) : (
                <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-white/20 text-4xl font-bold text-white shadow-md">
                  {firstname.charAt(0).toUpperCase()}
                </div>
              )}

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-white shadow hover:bg-gray-800"
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

            <h2 className="mt-4 text-xl font-semibold">
              {me.firstname} {me.lastname}
            </h2>

            <p className="text-sm text-white/80">
              Cliquez sur l’icône pour changer votre avatar
            </p>
          </div>
        </div>

        <div className="space-y-5 p-6">
          <Input label="Prénom" value={firstname} onChange={setFirstname} />
          <Input label="Nom" value={lastname} onChange={setLastname} />
          <Input label="Téléphone" value={phoneNumber} onChange={setPhoneNumber} />

          <div className="flex justify-end pt-4">
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
            </button>
          </div>
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
      <label className="mb-1.5 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}