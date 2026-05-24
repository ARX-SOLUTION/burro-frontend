import { Button } from '@burro/shared/components/base/buttons/button';

type WelcomeScreenProps = {
  onStart: () => void;
};

export const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto flex min-h-screen w-full max-w-[448px] flex-col px-6 pt-6">
        <div className="flex flex-1 flex-col items-center justify-center py-[122px] text-center">
          <h1 className="text-[30px] leading-[36px] font-bold text-primary">Burro</h1>
          <p className="mt-4 w-[254px] text-lg leading-7 text-tertiary">
            Arab tilini noldan boshlab, oson va qiziqarli o&apos;rganing.
          </p>
        </div>

        <div className="sticky bottom-0 z-20 bg-gray-50 pb-8">
          <Button
            color="tertiary"
            className="w-full rounded-xl bg-teal-600 py-4 text-lg leading-7 font-bold text-white shadow-md hover:bg-teal-700 hover:text-white"
            onClick={onStart}
          >
            Boshlash
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
