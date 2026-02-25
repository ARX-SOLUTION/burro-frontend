import { Link, useNavigate } from 'react-router-dom';

import PlayButton from './PlayButton';

export default function BottomNav() {
  const navigate = useNavigate();
  return (
    <div className="fixed right-0 bottom-4 left-0 z-50 flex items-center justify-center">
      <div className="mx-auto w-full max-w-[640px] px-6">
        <div className="flex items-center justify-between rounded-full bg-white px-6 py-3 shadow-lg">
          <Link to="/burro" className="text-sm">
            Home
          </Link>
          <Link to="/burro/modules" className="text-sm">
            Modullar
          </Link>
          <div className="-mt-8">
            <PlayButton onClick={() => navigate('/burro/practice/m1')} />
          </div>
          <Link to="/burro/leaderboard" className="text-sm">
            Reyting
          </Link>
          <Link to="/burro/profile" className="text-sm">
            Profil
          </Link>
        </div>
      </div>
    </div>
  );
}
