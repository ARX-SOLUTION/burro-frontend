import { CheckCircle, XCircle } from '@untitledui/icons';

type ResultBannerProps = {
  variant?: 'success' | 'error';
  title: string;
  descriptionPrefix?: string;
  descriptionValue?: string;
};

export const ResultBanner = ({
  variant = 'success',
  title,
  descriptionPrefix,
  descriptionValue,
}: ResultBannerProps) => {
  const isError = variant === 'error';

  return (
    <div
      className={`rounded-2xl border p-[17.6px] ${
        isError
          ? 'border-error-500 bg-error-50'
          : 'border-utility-success-500 bg-utility-success-50'
      }`}
    >
      <div className="flex items-center gap-3">
        {isError ? (
          <XCircle className="size-6 text-error-500" />
        ) : (
          <CheckCircle className="size-6 text-utility-success-500" />
        )}
        <div className="flex flex-col gap-1">
          <p
            className={`text-[18px] leading-7 font-bold ${
              isError ? 'text-error-500' : 'text-utility-success-500'
            }`}
          >
            {title}
          </p>
          {(descriptionPrefix || descriptionValue) && (
            <p className="text-[16px] leading-6 text-gray-600">
              <span>{descriptionPrefix} </span>
              <span className="font-bold">{descriptionValue}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultBanner;
