type AnswerOptionButtonProps = {
  label: string;
  isSelected: boolean;
  onSelect: () => void;
};

export const AnswerOptionButton = ({ label, isSelected, onSelect }: AnswerOptionButtonProps) => {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full rounded-xl border py-[18px] text-[20px] leading-7 font-bold transition-colors ${
        isSelected
          ? 'border-teal-600 bg-teal-50 text-teal-700'
          : 'border-gray-200 bg-white text-gray-700'
      }`}
    >
      {label}
    </button>
  );
};

export default AnswerOptionButton;
