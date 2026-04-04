type AnswerOptionTileProps = {
  label: string;
  isSelected: boolean;
  onSelect: () => void;
};

export const AnswerOptionTile = ({ label, isSelected, onSelect }: AnswerOptionTileProps) => {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`h-24 w-full rounded-xl border text-[20px] leading-7 font-bold transition-colors ${
        isSelected
          ? 'border-teal-500 bg-teal-50 text-teal-700'
          : 'border-gray-200 bg-white text-gray-700'
      }`}
    >
      {label}
    </button>
  );
};

export default AnswerOptionTile;
