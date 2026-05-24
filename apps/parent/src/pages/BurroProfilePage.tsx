import { usePageMetadata } from '@burro/shared/libs/usePageMetadata';

export const BurroProfilePage = () => {
  usePageMetadata({ title: 'Profil' });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <p className="text-gray-500">Profil</p>
    </div>
  );
};

export default BurroProfilePage;
