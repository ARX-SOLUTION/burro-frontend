import { memo, useCallback, useEffect } from 'react';

import { cx } from '@burro/shared/utils/cx';

type GenderBottomSheetProps = {
  isOpen: boolean;
  selected?: 'male' | 'female' | null;
  onSelect: (gender: 'male' | 'female') => void;
  onClose: () => void;
};

const CloseIcon = memo(() => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
));
CloseIcon.displayName = 'CloseIcon';

const MaleIcon = memo(() => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="10" cy="14" r="4" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M14 10L20 4M17 4H20V7"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
));
MaleIcon.displayName = 'MaleIcon';

const FemaleIcon = memo(() => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="10" r="4" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 14V20M9 17H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
));
FemaleIcon.displayName = 'FemaleIcon';

export default function GenderBottomSheet({
  isOpen,
  selected,
  onSelect,
  onClose,
}: GenderBottomSheetProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  const handleSelectMale = useCallback(() => onSelect('male'), [onSelect]);
  const handleSelectFemale = useCallback(() => onSelect('female'), [onSelect]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50" onClick={onClose}>
      <div
        className="w-full max-w-md rounded-t-[20px] bg-white pt-2 pb-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-gray-300" />

        <div className="flex items-center justify-between px-4">
          <p className="text-base font-bold text-gray-900">Farzand jinsini tanlash</p>
          <button type="button" onClick={onClose} className="text-gray-500" aria-label="Yopish">
            <CloseIcon />
          </button>
        </div>

        <div className="mt-4 space-y-2 px-4">
          <button
            type="button"
            onClick={handleSelectMale}
            className={cx(
              'flex w-full items-center gap-3 rounded-[20px] px-4 py-3 text-left text-sm transition-colors',
              selected === 'male' ? 'bg-teal-50 font-bold text-teal-600' : 'text-gray-700',
            )}
          >
            <MaleIcon />
            O&apos;g&apos;il bola
          </button>

          <button
            type="button"
            onClick={handleSelectFemale}
            className={cx(
              'flex w-full items-center gap-3 rounded-[20px] px-4 py-3 text-left text-sm transition-colors',
              selected === 'female' ? 'bg-teal-50 font-bold text-teal-600' : 'text-gray-700',
            )}
          >
            <FemaleIcon />
            Qiz bola
          </button>
        </div>
      </div>
    </div>
  );
}
