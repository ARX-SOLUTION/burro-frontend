import { useNavigate, useParams } from 'react-router-dom';

import { ARAB_TILI_ROUTES } from '@/modules/arabtilibot/constants/routes';
import { lessons } from '@/modules/arabtilibot/data/lessons';
import { ModuleCompletedCard } from '@/modules/arabtilibot/ui/play/ModuleCompletedCard';

import { usePageMetadata } from '@/libs/usePageMetadata';

export const ArabTiliBotLessonPlayPage = () => {
  usePageMetadata({ title: 'Modul yakunlandi' });

  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const currentLessonId = id || lessons[0]?.id || 'sa';
  const currentLessonIndex = lessons.findIndex((lesson) => lesson.id === currentLessonId);
  const nextLessonId = currentLessonIndex >= 0 ? lessons[currentLessonIndex + 1]?.id : undefined;

  const handleNextModule = () => {
    if (nextLessonId) {
      navigate(ARAB_TILI_ROUTES.LESSON_PLAY(nextLessonId));
      return;
    }

    navigate(ARAB_TILI_ROUTES.LESSONS);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto flex min-h-screen w-full max-w-[448px] items-center justify-center bg-teal-50 px-6 py-[150px] shadow-2xl">
        <ModuleCompletedCard
          xp={20}
          accuracy={67}
          onNextModule={handleNextModule}
          onGoHome={() => navigate(ARAB_TILI_ROUTES.LESSONS)}
        />
      </div>
    </div>
  );
};

export default ArabTiliBotLessonPlayPage;
