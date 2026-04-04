import { useNavigate } from 'react-router-dom';

import { ARAB_TILI_HOME_DASHBOARD_MOCK_DATA } from '@/modules/arabtilibot/constants/mock-data';
import { ARAB_TILI_ROUTES } from '@/modules/arabtilibot/constants/routes';
import { HomeScreen } from '@/modules/arabtilibot/ui/screens/HomeScreen';

import { usePageMetadata } from '@/libs/usePageMetadata';

export const ArabTiliBotHomePage = () => {
  usePageMetadata({ title: 'Arab tili — Home' });

  const navigate = useNavigate();

  return (
    <HomeScreen
      data={ARAB_TILI_HOME_DASHBOARD_MOCK_DATA}
      onOpenModulesList={() => navigate(ARAB_TILI_ROUTES.LESSON)}
      onStartLesson={(lessonId) => navigate(ARAB_TILI_ROUTES.LESSON_PLAY(lessonId))}
    />
  );
};

export default ArabTiliBotHomePage;
