import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { RHFPasswordInput } from '@/components/base/_rhf/rhf-password-input';
import { Button } from '@/components/base/buttons/button';
import { type ChangePasswordFormData, changePasswordSchema } from '@/libs/validators';

import { useChangePassword } from '../services/useChangePassword';

export const ChangePasswordForm = () => {
  const { mutate: changePassword, isPending } = useChangePassword();

  const { control, handleSubmit, reset } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: ChangePasswordFormData) => {
    changePassword(
      { currentPassword: data.currentPassword, newPassword: data.newPassword },
      { onSuccess: () => reset() },
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <RHFPasswordInput
        name="currentPassword"
        control={control}
        label="Current password"
        placeholder="Enter your current password"
        autoComplete="current-password"
      />

      <RHFPasswordInput
        name="newPassword"
        control={control}
        label="New password"
        placeholder="Enter your new password"
        autoComplete="new-password"
      />

      <RHFPasswordInput
        name="confirmPassword"
        control={control}
        label="Confirm new password"
        placeholder="Confirm your new password"
        autoComplete="new-password"
      />

      <div className="flex justify-end">
        <Button type="submit" color="primary" isLoading={isPending}>
          Change password
        </Button>
      </div>
    </form>
  );
};
