import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from '@untitledui/icons';

import { RHFInput } from '@/components/base/_rhf/rhf-input';
import { Button } from '@/components/base/buttons/button';
import { type ForgotPasswordFormData, forgotPasswordSchema } from '@/libs/validators';

import { useForgotPasswordMutation } from '../services/useForgotPasswordMutation';

export const ForgotPasswordForm = () => {
  const { mutate: forgotPassword, isPending, isSuccess } = useForgotPasswordMutation();

  const { control, handleSubmit } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
    forgotPassword(data);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col gap-6 text-center">
        <p className="text-md text-tertiary">
          If an account with that email exists, we&apos;ve sent you a password reset link. Please
          check your inbox.
        </p>
        <Link
          to="/auth/login"
          className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-brand-secondary hover:text-brand-secondary_hover"
        >
          <ArrowLeft className="size-5" />
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <RHFInput
        name="email"
        control={control}
        label="Email"
        placeholder="Enter your email"
        type="email"
        autoComplete="email"
      />

      <Button type="submit" color="primary" size="lg" isLoading={isPending} className="w-full">
        Reset password
      </Button>

      <Link
        to="/auth/login"
        className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-brand-secondary hover:text-brand-secondary_hover"
      >
        <ArrowLeft className="size-5" />
        Back to sign in
      </Link>
    </form>
  );
};
