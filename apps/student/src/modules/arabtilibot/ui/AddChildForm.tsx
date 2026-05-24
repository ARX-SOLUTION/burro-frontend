import { memo, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import GenderBottomSheet from '@/modules/arabtilibot/ui/GenderBottomSheet';

import { cx } from '@burro/shared/utils/cx';

const addChildSchema = z.object({
  name: z.string().min(1, 'Nomni kiriting'),
  className: z.string().min(1, 'Sinfni kiriting'),
  gender: z.enum(['male', 'female']),
});

type AddChildFormData = z.infer<typeof addChildSchema>;

type AddChildFormProps = {
  onBack?: () => void;
  onSave?: (data: AddChildFormData) => void;
  isSaving?: boolean;
};

const BackArrowIcon = memo(() => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M15 18L9 12L15 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
));
BackArrowIcon.displayName = 'BackArrowIcon';

const UserCheckIcon = memo(() => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="9" cy="9" r="4" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M15 17C15 14.7909 12.3137 13 9 13C5.68629 13 3 14.7909 3 17"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M16 11L19 14L22 9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
));
UserCheckIcon.displayName = 'UserCheckIcon';

const BookReaderIcon = memo(() => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 6.5C12 6.5 14 5 17 5C20 5 21 6 21 6V19C21 19 20 18 17 18C14 18 12 19.5 12 19.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M12 6.5C12 6.5 10 5 7 5C4 5 3 6 3 6V19C3 19 4 18 7 18C10 18 12 19.5 12 19.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path d="M12 5V19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
));
BookReaderIcon.displayName = 'BookReaderIcon';

const UserDetailIcon = memo(() => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="10" cy="9" r="4" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M4 18C4 15.7909 6.68629 14 10 14C13.3137 14 16 15.7909 16 18"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path d="M17 12H21M19 10V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
));
UserDetailIcon.displayName = 'UserDetailIcon';

const ChevronDownIcon = memo(() => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M6 9L12 15L18 9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
));
ChevronDownIcon.displayName = 'ChevronDownIcon';

const SaveIcon = memo(() => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M19 21H5C4.44772 21 4 20.5523 4 20V4C4 3.44772 4.44772 3 5 3H15L20 8V20C20 20.5523 19.5523 21 19 21Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 3H14V7H8V3Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="15" r="3" stroke="currentColor" strokeWidth="1.5" />
  </svg>
));
SaveIcon.displayName = 'SaveIcon';

const FlagUzIcon = memo(() => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <rect x="4" y="2" width="18" height="20" rx="2" fill="currentColor" />
    <line x1="7" y1="6" x2="7" y2="18" stroke="white" strokeWidth="1.5" />
  </svg>
));
FlagUzIcon.displayName = 'FlagUzIcon';

const GENDER_LABELS: Record<string, string> = {
  male: "O'g'il bola",
  female: 'Qiz bola',
};

export default function AddChildForm({ onBack, onSave, isSaving = false }: AddChildFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isValid },
  } = useForm<AddChildFormData>({
    resolver: zodResolver(addChildSchema),
    defaultValues: { name: '', className: '', gender: undefined },
    mode: 'onChange',
  });

  const gender = watch('gender');
  const [showGenderSheet, setShowGenderSheet] = useState(false);

  const handleGenderSelect = useCallback(
    (g: 'male' | 'female') => {
      setValue('gender', g, { shouldValidate: true });
      setShowGenderSheet(false);
    },
    [setValue],
  );

  const onSubmit = useCallback(
    (data: AddChildFormData) => {
      onSave?.(data);
    },
    [onSave],
  );

  return (
    <div className="flex min-h-dvh flex-col bg-gray-50">
      <div className="flex items-center gap-3 px-4 pt-2 pb-4">
        <button type="button" onClick={onBack} className="text-gray-900" aria-label="Orqaga">
          <BackArrowIcon />
        </button>
        <p className="text-lg font-bold text-gray-900">Farzand qo&apos;shish</p>
      </div>

      <div className="flex flex-col items-center px-4 pb-6">
        <div className="relative">
          <div className="size-[88px] rounded-full border-2 border-white bg-gray-200 shadow-md" />
          <div className="absolute -right-0.5 -bottom-0.5 flex size-6 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm">
            <FlagUzIcon />
          </div>
        </div>
      </div>

      <div className="flex-1 px-4">
        <div className="mb-4">
          <label className="mb-1.5 block text-sm text-gray-700">Farzand nomi</label>
          <div className="flex items-center gap-3 rounded-[20px] bg-white px-4 py-3.5 shadow-card">
            <UserCheckIcon />
            <input
              type="text"
              {...register('name')}
              placeholder="Nomni kiriting"
              className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="mb-1.5 block text-sm text-gray-700">Sinfi</label>
          <div className="flex items-center gap-3 rounded-[20px] bg-white px-4 py-3.5 shadow-card">
            <BookReaderIcon />
            <input
              type="text"
              {...register('className')}
              placeholder="Kiriting"
              className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="mb-1.5 block text-sm text-gray-700">Jinsi</label>
          <button
            type="button"
            onClick={() => setShowGenderSheet(true)}
            className="flex w-full items-center gap-3 rounded-[20px] bg-white px-4 py-3.5 text-left shadow-card"
          >
            <UserDetailIcon />
            <span className={cx('flex-1 text-sm', gender ? 'text-gray-900' : 'text-gray-400')}>
              {gender ? GENDER_LABELS[gender] : 'Tanlang'}
            </span>
            <ChevronDownIcon />
          </button>
        </div>
      </div>

      <div className="px-4 pt-4 pb-8">
        <button
          type="button"
          disabled={!isValid || isSaving}
          onClick={handleSubmit(onSubmit)}
          className={cx(
            'flex w-full items-center justify-center gap-2 rounded-[28px] py-4 text-base font-bold text-white shadow-button',
            isValid && !isSaving ? 'bg-gradient-to-r from-blue-600 to-teal-400' : 'bg-gray-300',
          )}
        >
          <SaveIcon />
          {isSaving ? 'Saqlanmoqda...' : 'Saqlash'}
        </button>
      </div>

      <GenderBottomSheet
        isOpen={showGenderSheet}
        selected={gender}
        onSelect={handleGenderSelect}
        onClose={() => setShowGenderSheet(false)}
      />
    </div>
  );
}
