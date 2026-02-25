import { CheckCircle } from '@untitledui/icons';

type ResultBannerProps = {
  title: string;
};

export const ResultBanner = ({ title }: ResultBannerProps) => {
  return (
    <div className="rounded-2xl border border-utility-success-500 bg-utility-success-50 p-[17.6px]">
      <div className="flex items-center gap-3">
        <CheckCircle className="size-6 text-utility-success-500" />
        <p className="text-[18px] leading-7 font-bold text-utility-success-500">{title}</p>
      </div>
    </div>
  );
};

export default ResultBanner;
