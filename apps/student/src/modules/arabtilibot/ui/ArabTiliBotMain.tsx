import { useNavigate } from 'react-router-dom';

import { Button } from '@burro/shared/components/base/buttons/button';
import { usePageMetadata } from '@burro/shared/libs/usePageMetadata';

export const ArabTiliBotMain = () => {
  usePageMetadata({ title: 'Burro' });

  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/arab-tili/lessons');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto flex min-h-screen w-full max-w-[448px] flex-col p-6">
        <div className="flex flex-1 flex-col items-center justify-center py-[122px] text-center">
          <h1 className="text-[30px] leading-[36px] font-bold text-[#111827]">Burro</h1>
          <p className="mt-4 w-[254px] text-[18px] leading-[28px] text-gray-500">
            Arab tilini noldan boshlab, oson va qiziqarli o&apos;rganing.
          </p>
        </div>

        <div className="sticky bottom-0 z-20 bg-gray-50 pb-8">
          <Button
            color="tertiary"
            className="w-full rounded-[12px] bg-teal-600 py-4 text-[18px] leading-[28px] font-bold text-white shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] hover:bg-[#0B7E74] hover:text-white"
            onClick={handleStart}
          >
            Boshlash
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ArabTiliBotMain;
