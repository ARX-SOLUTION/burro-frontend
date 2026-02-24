import { Button } from '@/components/base/buttons/button';
import { usePageMetadata } from '@/libs/usePageMetadata';
import { useNavigate, useParams } from 'react-router-dom';

export const ArabTiliBotLessonPage = () => {
  usePageMetadata({ title: 'Dars' });
  const navigate = useNavigate();
  const params = useParams();
  const id = (params as any).id || 'lesson';

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-[640px]">
        <div className="mb-6">
          <Button onClick={() => navigate(-1)} className="mb-4">Orqaga</Button>
          <h1 className="text-2xl font-bold">Boshlash — {id}</h1>
          <p className="mt-2 text-sm text-gray-600">Bu sahifa darsni boshlash uchun joy ajratilgan.</p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-700">Dars kontenti (placeholder). Implement lesson content or player here.</p>
          <div className="mt-4">
            <Button className="bg-[#0D9488] text-white" onClick={() => navigate(`/arab-tili/lesson/${id}/play`)}>
              Boshlash
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArabTiliBotLessonPage;
