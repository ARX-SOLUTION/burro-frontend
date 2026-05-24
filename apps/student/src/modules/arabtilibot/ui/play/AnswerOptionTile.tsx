import { memo } from 'react';

type AnswerOptionTileProps = {
  label: string;
  isSelected: boolean;
  isCorrect?: boolean;
  isWrong?: boolean;
  isDisabled?: boolean;
  onSelect: () => void;
};

export const AnswerOptionTile = memo(
  ({ label, isSelected, isCorrect, isWrong, isDisabled, onSelect }: AnswerOptionTileProps) => {
    const stateClass = isCorrect
      ? 'border-success-500 bg-success-50 text-success-700'
      : isWrong
        ? 'border-error-500 bg-error-50 text-error-700'
        : isSelected
          ? 'border-teal-500 bg-teal-50 text-teal-700'
          : 'border-gray-200 bg-white text-gray-700';

    return (
      <button
        type="button"
        onClick={onSelect}
        disabled={isDisabled}
        className={`h-24 w-full rounded-xl border text-[20px] leading-7 font-bold transition-colors disabled:cursor-not-allowed ${stateClass}`}
      >
        {label}
      </button>
    );
  },
);
AnswerOptionTile.displayName = 'AnswerOptionTile';

export default AnswerOptionTile;
