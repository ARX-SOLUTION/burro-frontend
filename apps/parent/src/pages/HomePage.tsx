import { usePageMetadata } from '@burro/shared/libs/usePageMetadata';

export const HomePage = () => {
  usePageMetadata({
    title: 'Burro — Xush kelibsiz',
    description: 'Arab tilini Burro bilan qisqa va qiziqarli darslar orqali boshlang.',
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Burro</h1>
        <p className="mt-2 text-gray-500">Arab tilini o'rganing</p>
      </div>
    </div>
  );
};
