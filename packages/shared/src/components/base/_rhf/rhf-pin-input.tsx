import type { ComponentProps } from 'react';
import { type Control, type FieldPath, type FieldValues, useController } from 'react-hook-form';

import { PinInput } from '@burro/shared/components/base/pin-input';

export interface RHFPinInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<ComponentProps<typeof PinInput>, 'name' | 'onChange' | 'onBlur' | 'value'> {
  name: TName;
  control: Control<TFieldValues>;
  label?: string;
  description?: string;
  maxLength?: number;
  size?: 'sm' | 'md' | 'lg';
  width?: number;
  inputClassName?: string;
  containerClassName?: string;
  onComplete?: (value: string) => void;
}

export const RHFPinInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  label,
  description,
  maxLength = 4,
  size = 'md',
  width,
  inputClassName,
  containerClassName,
  onComplete,
  ...props
}: RHFPinInputProps<TFieldValues, TName>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <PinInput size={size} {...props}>
      {label && <PinInput.Label>{label}</PinInput.Label>}
      <PinInput.Group
        maxLength={maxLength}
        value={field.value}
        onChange={field.onChange}
        onBlur={field.onBlur}
        onComplete={onComplete}
        width={width}
        inputClassName={inputClassName}
        containerClassName={containerClassName}
      >
        {Array.from({ length: maxLength }).map((_, index) => (
          <PinInput.Slot key={index} index={index} />
        ))}
      </PinInput.Group>
      {(error?.message || description) && (
        <PinInput.Description className={error?.message ? 'text-error-primary' : ''}>
          {error?.message || description}
        </PinInput.Description>
      )}
    </PinInput>
  );
};

RHFPinInput.displayName = 'RHFPinInput';
