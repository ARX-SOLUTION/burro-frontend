import { usePageMetadata } from '@burro/shared/libs/usePageMetadata';

export const BurroAddChildPage = () => {
  usePageMetadata({ title: "Farzand qo'shish" });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <p className="text-gray-500">Farzand qo'shish formasi</p>
    </div>
  );
};

export default BurroAddChildPage;
