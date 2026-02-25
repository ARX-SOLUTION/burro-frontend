import React from 'react';

import { Button } from '@/components/base/buttons/button';

export const ArabTiliBotLessonPlaySuccess: React.FC<{ onContinue?: () => void; xp?: number }> = ({
  onContinue,
  xp = 10,
}) => {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-end justify-center">
      <div className="pointer-events-auto mb-28 w-full max-w-[640px] p-4">
        <div className="overflow-hidden rounded-t-lg bg-white shadow-lg">
          <div className="p-6 text-center">
            <div className="mb-2 text-4xl font-bold text-teal-600">🎉</div>
            <div className="mb-2 text-lg font-semibold text-[#0f766e]">To&#39;g&#39;ri!</div>
            <div className="mb-4 text-sm text-gray-600">+{xp} XP</div>
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
