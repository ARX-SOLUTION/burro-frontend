import { useForm } from 'react-hook-form';
import { Link, useSearchParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import { RHFInput } from '@/components/base/_rhf/rhf-input';
import { RHFPasswordInput } from '@/components/base/_rhf/rhf-password-input';
import { Button } from '@/components/base/buttons/button';
import { type SigninFormData, signinSchema } from '@/libs/validators';

import { AUTH_SEARCH_PARAMS, buildAuthPathWithRedirect } from '../constants';
import { useSigninMutation } from '../services/useSigninMutation';

export const LoginForm = () => {
  const { mutate: signin, isPending } = useSigninMutation();
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get(AUTH_SEARCH_PARAMS.REDIRECT);

  const { control, handleSubmit } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: SigninFormData) => {
    signin(data);
  };

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

      <RHFPasswordInput
        name="password"
        control={control}
        label="Password"
        placeholder="Enter your password"
        autoComplete="current-password"
      />

      <div className="flex justify-end">
        <Link
          to={buildAuthPathWithRedirect('/auth/forgot-password', redirectUrl)}
          className="text-sm font-semibold text-brand-secondary hover:text-brand-secondary_hover"
        >
          Forgot password?
        </Link>
      </div>

      <Button type="submit" color="primary" size="lg" isLoading={isPending} className="w-full">
        Sign in
      </Button>

      <p className="text-center text-sm text-tertiary">
        Don&apos;t have an account?{' '}
        <Link
          to={buildAuthPathWithRedirect('/auth/register', redirectUrl)}
          className="font-semibold text-brand-secondary hover:text-brand-secondary_hover"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
};
