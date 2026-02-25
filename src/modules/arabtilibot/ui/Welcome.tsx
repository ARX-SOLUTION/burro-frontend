import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/base/buttons/button';

export default function Welcome() {
  const navigate = useNavigate();
  return (
    <div className="p-6 text-center">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Xush kelibsiz</h1>
        <p className="mt-2 text-sm text-gray-600">Arab tilini o&apos;rganish oson va qiziqarli</p>
      </div>
      <div>
        <Button onClick={() => navigate('/burro')}>Boshlash</Button>
      </div>
    </div>
  );
}
