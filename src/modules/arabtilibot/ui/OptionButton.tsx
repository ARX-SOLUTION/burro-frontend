import React from 'react';

export default function OptionButton({
  children,
  onClick,
  selected,
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  selected?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      data-selected={selected ? 'true' : undefined}
      disabled={disabled}
      className={`w-full transform rounded-lg py-3 text-center font-semibold transition-transform duration-150 ${
        selected
          ? 'bg-teal-600 text-white shadow'
          : 'border border-gray-200 bg-white text-gray-800 hover:scale-[1.02]'
      }`}
    >
      {children}
    </button>
  );
}
