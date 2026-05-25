import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, LogOut01 } from '@untitledui/icons';

import { useAuth } from '@burro/shared/hooks/use-auth';
import { usePageMetadata } from '@burro/shared/libs/usePageMetadata';
import { tokenStorage } from '@burro/shared/libs/storage';

export const BurroProfilePage = () => {
  usePageMetadata({ title: 'Profil' });
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleLogout = useCallback(() => {
    tokenStorage.clear();
    navigate('/auth/login');
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      <div className="bg-gradient-to-b from-teal-600 to-teal-700 px-4 pt-12 pb-6">
        <button
          type="button"
          onClick={handleBack}
          className="mb-4 flex items-center gap-1 text-sm text-teal-100"
        >
          <ArrowLeft className="size-4" />
          Orqaga
        </button>
        <div className="flex items-center gap-4">
          <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-white/20 text-2xl font-bold text-white">
            {user?.fullName?.[0] ?? '?'}
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">{user?.fullName}</h1>
            <p className="mt-1 text-sm text-teal-100">
              {user?.role === 'parent' ? 'Ota-ona' : 'Foydalanuvchi'}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3 px-4 pt-4">
        {user?.phone && (
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-xs text-gray-500">Telefon</p>
            <p className="mt-0.5 text-sm font-medium text-gray-900">{user.phone}</p>
          </div>
        )}

        {user?.email && (
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-xs text-gray-500">Email</p>
            <p className="mt-0.5 text-sm font-medium text-gray-900">{user.email}</p>
          </div>
        )}

        {user?.telegramUsername && (
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-xs text-gray-500">Telegram</p>
            <p className="mt-0.5 text-sm font-medium text-gray-900">@{user.telegramUsername}</p>
          </div>
        )}

        <div className="rounded-xl bg-white p-4 shadow-sm">
          <p className="text-xs text-gray-500">Til</p>
          <p className="mt-0.5 text-sm font-medium text-gray-900">
            {user?.language === 'uz' ? "O'zbekcha" : user?.language === 'ru' ? 'Русский' : 'English'}
          </p>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 py-3 text-sm font-medium text-red-600"
        >
          <LogOut01 className="size-4" />
          Chiqish
        </button>
      </div>
    </div>
  );
};

export default BurroProfilePage;
