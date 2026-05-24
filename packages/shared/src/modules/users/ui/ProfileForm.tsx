import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { RHFInput } from '@burro/shared/components/base/_rhf/rhf-input';
import { Button } from '@burro/shared/components/base/buttons/button';
import { useAuth } from '@burro/shared/hooks/use-auth';
import { type UpdateProfileFormData, updateProfileSchema } from '@burro/shared/libs/validators';

import { useUpdateProfile } from '../services/useUpdateProfile';

export const ProfileForm = () => {
  const { user } = useAuth();
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const { control, handleSubmit, reset } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      fullName: '',
    },
  });

  useEffect(() => {
    if (user) {
      reset({ fullName: user.fullName });
    }
  }, [user, reset]);

  const onSubmit = (data: UpdateProfileFormData) => {
    updateProfile(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <RHFInput
        name="fullName"
        control={control}
        label="Full name"
        placeholder="Enter your full name"
      />

      <div className="flex justify-end">
        <Button type="submit" color="primary" isLoading={isPending}>
          Save changes
        </Button>
      </div>
    </form>
  );
};
