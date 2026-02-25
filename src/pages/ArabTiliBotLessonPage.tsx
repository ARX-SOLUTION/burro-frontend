import { useNavigate, useParams } from 'react-router-dom';

import { getLessonById, lessons } from '@/modules/arabtilibot/data/lessons';

import { Button } from '@/components/base/buttons/button';
import { usePageMetadata } from '@/libs/usePageMetadata';

export const ArabTiliBotLessonPage = () => {
  usePageMetadata({ title: 'Dars' });
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();

  const lesson = id ? getLessonById(id) : lessons[0];

  if (!lesson) {
    return <div className="p-6">Dars topilmadi</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-[640px]">
        <div className="mb-6">
          <Button onClick={() => navigate(-1)} className="mb-4">
            Orqaga
          </Button>
          <h1 className="text-2xl font-bold">Boshlash — {lesson.id}</h1>
          <p className="mt-2 text-sm text-gray-600">{lesson.title}</p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-700">{lesson.questions?.[0]?.prompt}</p>
          <div className="mt-4">
            <Button
              className="bg-[#0D9488] text-white"
              onClick={() => navigate(`/arab-tili/lesson/${lesson.id}/play`)}
            >
              Boshlash
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArabTiliBotLessonPage;
