import { useNavigate, useParams } from 'react-router-dom';

import { lessons } from '@/modules/arabtilibot/data/lessons';

import { Button } from '@/components/base/buttons/button';
import { usePageMetadata } from '@/libs/usePageMetadata';

export const ArabTiliBotLessonPage = () => {
  usePageMetadata({ title: 'Dars' });
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const lesson = id ? lessons.find((item) => item.id === id) : undefined;

  if (!id) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-6">
        <div className="mx-auto w-full max-w-[448px]">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-[24px] leading-[32px] font-bold text-[#1f2937]">Modullar</h1>
            <Button
              color="tertiary"
              className="text-[#0D9488]"
              onClick={() => navigate('/arab-tili/lessons')}
            >
              Orqaga
            </Button>
          </div>

          <div className="space-y-3">
            {lessons.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[18px] leading-[28px] font-bold text-[#1f2937]">
                      {item.title}
                    </p>
                    <p className="text-[12px] leading-[16px] text-[#6b7280]">
                      {item.questions.length} ta savol
                    </p>
                  </div>
                  <Button
                    color="tertiary"
                    className="bg-[#0D9488] text-white hover:bg-[#0D9488] hover:text-white"
                    onClick={() => navigate(`/arab-tili/lesson/${item.id}`)}
                  >
                    Ochish
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

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
