import { Button } from '@/components/base/buttons/button';

type ModuleCompletedCardProps = {
  xp: number;
  accuracy: number;
  onNextModule: () => void;
  onGoHome: () => void;
};

export const ModuleCompletedCard = ({
  xp,
  accuracy,
  onNextModule,
  onGoHome,
}: ModuleCompletedCardProps) => {
  return (
    <div className="h-[480px] w-full max-w-[384px] rounded-3xl bg-white px-8 pt-8 pb-6 shadow-xl">
      <div className="text-center">
        <p className="text-[60px] leading-[60px]">🎉</p>
        <h1 className="mt-6 text-[24px] leading-8 font-bold text-primary">Modul Yakunlandi!</h1>
        <p className="mt-4 text-[16px] leading-6 text-tertiary">
          Barakalla! Siz ajoyib natij ko&apos;rsatdingiz.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="rounded-xl bg-warning-50 p-4 text-center">
          <p className="text-[20px] leading-7 font-bold text-warning-500">+{xp}</p>
          <p className="mt-1 text-sm leading-5 text-tertiary">XP</p>
        </div>
        <div className="rounded-xl bg-success-50 p-4 text-center">
          <p className="text-[20px] leading-7 font-bold text-success-500">{accuracy}%</p>
          <p className="mt-1 text-sm leading-5 text-tertiary">Aniqlik</p>
        </div>
      </div>

      <div className="mt-8">
        <Button
          onClick={onNextModule}
          className="w-full rounded-xl bg-teal-600 py-4 text-[16px] leading-6 font-bold text-white shadow-md hover:bg-teal-700 hover:text-white"
        >
          Keyingi Modul
        </Button>
      </div>

      <button
        type="button"
        onClick={onGoHome}
        className="mt-3 w-full py-3 text-[16px] leading-6 font-semibold text-tertiary"
      >
        Bosh sahifa
      </button>
    </div>
  );
};

export default ModuleCompletedCard;
