import { useNavigate } from 'react-router-dom';

import { ARAB_TILI_ROUTES } from '@/modules/arabtilibot/constants/routes';
import { WelcomeScreen } from '@/modules/arabtilibot/ui/screens/WelcomeScreen';

import { usePageMetadata } from '@/libs/usePageMetadata';

export const ArabTiliBotWelcomePage = () => {
  usePageMetadata({ title: 'Burro' });

  const navigate = useNavigate();

  return (
    <WelcomeScreen
      onStart={() => {
        navigate(ARAB_TILI_ROUTES.LESSONS);
      }}
    />
  );
};

export default ArabTiliBotWelcomePage;
