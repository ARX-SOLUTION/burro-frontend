import { useForm } from 'react-hook-form';
import { Link, useSearchParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from '@untitledui/icons';

import { RHFPasswordInput } from '@/components/base/_rhf/rhf-password-input';
import { Button } from '@/components/base/buttons/button';
import { type ResetPasswordFormData, resetPasswordSchema } from '@/libs/validators';

import { AUTH_SEARCH_PARAMS, buildAuthPathWithRedirect } from '../constants';
import { useResetPasswordMutation } from '../services/useResetPasswordMutation';

export const ResetPasswordForm = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const redirectUrl = searchParams.get(AUTH_SEARCH_PARAMS.REDIRECT);

  const { mutate: resetPassword, isPending } = useResetPasswordMutation();

  const { control, handleSubmit } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: ResetPasswordFormData) => {
    if (!token) return;
    resetPassword({
      token,
      password: data.password,
    });
  };

  if (!token) {
    return (
      <div className="flex flex-col gap-6 text-center">
        <p className="text-md text-error-primary">
          Invalid or missing reset token. Please request a new password reset link.
        </p>
        <Link
          to={buildAuthPathWithRedirect('/auth/forgot-password', redirectUrl)}
          className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-brand-secondary hover:text-brand-secondary_hover"
        >
          Request new link
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <RHFPasswordInput
        name="password"
        control={control}
        label="New password"
        placeholder="Enter your new password"
        autoComplete="new-password"
      />

      <RHFPasswordInput
        name="confirmPassword"
        control={control}
        label="Confirm password"
        placeholder="Confirm your new password"
        autoComplete="new-password"
      />

      <Button type="submit" color="primary" size="lg" isLoading={isPending} className="w-full">
        Reset password
      </Button>

      <Link
        to={buildAuthPathWithRedirect('/auth/login', redirectUrl)}
        className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-brand-secondary hover:text-brand-secondary_hover"
      >
        <ArrowLeft className="size-5" />
        Back to sign in
      </Link>
    </form>
  );
};
