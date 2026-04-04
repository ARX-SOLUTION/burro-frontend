import type { ComponentProps, ReactNode } from 'react';
import { useState } from 'react';
import { type Control, type FieldPath, type FieldValues, useController } from 'react-hook-form';
import { Eye, EyeOff } from '@untitledui/icons';

import { Button } from '@/components/base/buttons/button';
import { InputBase } from '@/components/base/input/input';
import { InputGroup } from '@/components/base/input/input-group';

export interface RHFPasswordInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<
  ComponentProps<typeof InputBase>,
  'name' | 'onChange' | 'onBlur' | 'value' | 'isInvalid' | 'type'
> {
  name: TName;
  control: Control<TFieldValues>;
  label?: string;
  hint?: ReactNode;
}

export const RHFPasswordInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  label,
  hint,
  ...props
}: RHFPasswordInputProps<TFieldValues, TName>) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    field,
    fieldState: { error, invalid },
  } = useController({
    name,
    control,
  });

  return (
    <InputGroup
      label={label}
      hint={error?.message || hint}
      isInvalid={invalid}
      trailingAddon={
        <Button
          color="secondary"
          size="sm"
          iconLeading={showPassword ? EyeOff : Eye}
          onClick={() => setShowPassword(!showPassword)}
          type="button"
        />
      }
    >
      <InputBase
        {...props}
        {...field}
        name={name}
        type={showPassword ? 'text' : 'password'}
        isInvalid={invalid}
      />
    </InputGroup>
  );
};

RHFPasswordInput.displayName = 'RHFPasswordInput';
