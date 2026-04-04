import type { ComponentProps } from 'react';
import { type Control, type FieldValues, type Path, useController } from 'react-hook-form';

import { Input } from '../input/input';

type InputProps = ComponentProps<typeof Input>;

type RHFInputProps<T extends FieldValues> = Omit<
  InputProps,
  'value' | 'onChange' | 'onBlur' | 'isInvalid'
> & {
  name: Path<T>;
  control: Control<T>;
};

export const RHFInput = <T extends FieldValues>({ name, control, ...props }: RHFInputProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return <Input {...props} {...field} isInvalid={!!error} hint={error?.message} />;
};
