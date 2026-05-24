import { type Control, type FieldValues, type Path, useController } from 'react-hook-form';

import { Checkbox, type CheckboxProps } from '../checkbox/checkbox';

type RHFCheckboxProps<T extends FieldValues> = Omit<CheckboxProps, 'isSelected' | 'onChange'> & {
  name: Path<T>;
  control: Control<T>;
};

export const RHFCheckbox = <T extends FieldValues>({
  name,
  control,
  ...props
}: RHFCheckboxProps<T>) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control });

  return (
    <div>
      <Checkbox {...props} isSelected={value} onChange={onChange} />
      {error?.message && <p className="mt-1 text-sm text-error-500">{error.message}</p>}
    </div>
  );
};
