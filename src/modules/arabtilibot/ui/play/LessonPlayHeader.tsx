import { Heart, X } from '@untitledui/icons';

type LessonPlayHeaderProps = {
  progressPercent: number;
  hearts: number;
  xpText: string;
  closeAriaLabel: string;
  onClose: () => void;
};

export const LessonPlayHeader = ({
  progressPercent,
  hearts,
  xpText,
  closeAriaLabel,
  onClose,
}: LessonPlayHeaderProps) => {
  return (
    <div className="sticky top-0 z-20 border-b border-gray-200 bg-white shadow-xs">
      <div className="flex items-center justify-between px-4 py-3">
        <button
          type="button"
          onClick={onClose}
          className="flex size-6 items-center justify-center text-gray-500"
          aria-label={closeAriaLabel}
        >
          <X className="size-6" />
        </button>

        <div className="flex-1 px-4">
          <div className="h-3 overflow-hidden rounded-full bg-gray-200">
            <div className="h-full bg-teal-500" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-error-500">
            <Heart className="size-5 fill-current" />
            <span className="text-[16px] leading-6 font-bold">{hearts}</span>
          </div>
          <span className="text-sm leading-5 font-bold text-warning-400">{xpText}</span>
        </div>
      </div>
    </div>
  );
};

export default LessonPlayHeader;
