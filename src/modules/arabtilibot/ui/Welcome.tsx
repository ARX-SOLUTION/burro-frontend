import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/base/buttons/button';

type Variant = 'default' | 'figma-3-50';

export default function Welcome({ variant = 'default' }: { variant?: Variant }) {
  const navigate = useNavigate();

  if (variant === 'figma-3-50') {
    return (
      <div className="mx-auto max-w-sm p-4" style={{ width: 390 }}>
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <div className="flex h-40 w-40 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-300 to-rose-300 shadow-lg">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white text-3xl">
                🐫
              </div>
            </div>
            <svg
              className="absolute -top-2 -right-2"
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="8" cy="8" r="6" fill="#FFD166" />
              <circle cx="36" cy="12" r="4" fill="#06D6A0" />
              <circle cx="30" cy="36" r="5" fill="#118AB2" />
            </svg>
          </div>
        </div>

        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold">Xush kelibsiz</h1>
          <p className="mt-2 text-sm text-gray-600">
            Arab tilini o&apos;rganishni hoziroq boshlang — qisqa darslar bilan.
          </p>
        </div>

        <div className="space-y-3">
          <Button onClick={() => navigate('/burro')} className="w-full">
            Boshlash
          </Button>
          <button
            type="button"
            onClick={() => navigate('/burro/profile')}
            className="w-full text-sm text-gray-600"
          >
            Keyinroq
          </button>
        </div>
      </div>
    );
  }

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
