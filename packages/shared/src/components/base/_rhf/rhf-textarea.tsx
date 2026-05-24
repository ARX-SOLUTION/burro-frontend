import { type Control, type FieldValues, type Path, useController } from 'react-hook-form';

import { TextArea, type TextAreaProps } from '../textarea/textarea';

type RHFTextareaProps<T extends FieldValues> = Omit<
  TextAreaProps,
  'value' | 'onChange' | 'onBlur'
> & {
  name: Path<T>;
  control: Control<T>;
};

export const RHFTextarea = <T extends FieldValues>({
  name,
  control,
  ...props
}: RHFTextareaProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return <TextArea {...props} {...field} hint={error?.message} isInvalid={!!error} />;
};
