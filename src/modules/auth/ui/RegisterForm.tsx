import { useForm } from 'react-hook-form';
import { Link, useSearchParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import { RHFInput } from '@/components/base/_rhf/rhf-input';
import { RHFPasswordInput } from '@/components/base/_rhf/rhf-password-input';
import { Button } from '@/components/base/buttons/button';
import { type SignupFormData, signupSchema } from '@/libs/validators';

import { AUTH_SEARCH_PARAMS, buildAuthPathWithRedirect } from '../constants';
import { useSignupMutation } from '../services/useSignupMutation';

export const RegisterForm = () => {
  const { mutate: signup, isPending } = useSignupMutation();
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get(AUTH_SEARCH_PARAMS.REDIRECT);

  const { control, handleSubmit } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: SignupFormData) => {
    signup({
      fullName: data.fullName,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <RHFInput
        name="fullName"
        control={control}
        label="Full name"
        placeholder="Enter your full name"
        autoComplete="given-name"
      />

      <RHFInput
        name="email"
        control={control}
        label="Email"
        placeholder="Enter your email"
        type="email"
        autoComplete="email"
      />

      <RHFPasswordInput
        name="password"
        control={control}
        label="Password"
        placeholder="Create a password"
        autoComplete="new-password"
      />

      <RHFPasswordInput
        name="confirmPassword"
        control={control}
        label="Confirm password"
        placeholder="Confirm your password"
        autoComplete="new-password"
      />

      <Button type="submit" color="primary" size="lg" isLoading={isPending} className="w-full">
        Create account
      </Button>

      <p className="text-center text-sm text-tertiary">
        Already have an account?{' '}
        <Link
          to={buildAuthPathWithRedirect('/auth/login', redirectUrl)}
          className="font-semibold text-brand-secondary hover:text-brand-secondary_hover"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
};
