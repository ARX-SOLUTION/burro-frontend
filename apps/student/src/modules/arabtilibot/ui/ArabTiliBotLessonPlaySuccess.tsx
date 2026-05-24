import React, { useEffect, useState } from 'react';

import { Button } from '@burro/shared/components/base/buttons/button';

export const ArabTiliBotLessonPlaySuccess: React.FC<{ onContinue?: () => void; xp?: number }> = ({
  onContinue,
  xp = 10,
}) => {
  const [pop, setPop] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setPop(true), 20);
    return () => clearTimeout(t);
  }, []);

  const emojiClass = `mb-2 text-4xl font-bold text-teal-600 transform transition-transform duration-300 ${
    pop ? 'scale-100' : 'scale-90'
  }`;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-end justify-center">
      <div className="pointer-events-auto mb-28 w-full max-w-[640px] p-4">
        <div className="overflow-hidden rounded-t-lg bg-white shadow-lg">
          <div className="p-6 text-center">
            <div className={emojiClass}>🎉</div>
            <div className="mb-2 text-lg font-semibold text-[#0f766e]">To&apos;g&apos;ri!</div>
            <div className="mb-4 text-sm text-gray-600">+{xp} XP</div>

            <div className="pointer-events-none absolute top-0 left-0 h-full w-full">
              {/* decorative confetti dots (non-interactive) */}
              <div className="relative h-full w-full">
                <span className="absolute top-6 left-8 h-2 w-2 animate-bounce rounded-full bg-pink-400 opacity-90" />
                <span className="absolute top-10 left-20 h-2 w-2 animate-bounce rounded-full bg-yellow-400 opacity-90" />
                <span className="absolute top-8 right-16 h-2 w-2 animate-bounce rounded-full bg-emerald-400 opacity-90" />
              </div>
            </div>

            <div className="flex justify-center">
              <Button onClick={onContinue} className="px-6 py-3" color="primary">
                Keyingi
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArabTiliBotLessonPlaySuccess;
