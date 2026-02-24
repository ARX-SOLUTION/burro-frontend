import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/base/buttons/button';
import { usePageMetadata } from '@/libs/usePageMetadata';

export const ArabTiliBotMain = () => {
  usePageMetadata({ title: 'Burro' });

  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/arab-tili/lessons');
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <div className="flex flex-1 items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-[30px] leading-[36px] font-bold text-[#111827]">Burro</h1>
          <p className="mx-auto mt-4 w-[254px] text-[18px] leading-[28px] text-[#6b7280]">
            Arab tilini noldan boshlab, oson va qiziqarli o&apos;rganing.
          </p>
        </div>
      </div>

      <div className="sticky bottom-0 z-20 w-full bg-transparent py-6">
        <div className="mx-auto max-w-[448px] px-4">
          <Button
            className="w-full rounded-[12px] bg-[#0D9488] py-4 font-semibold text-white shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]"
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
