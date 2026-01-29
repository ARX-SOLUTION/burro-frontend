import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import { RHFPinInput } from '@/components/base/_rhf/rhf-pin-input';
import { Button } from '@/components/base/buttons/button';
import { useAuth } from '@/hooks/use-auth';
import { type VerifyEmailFormData, verifyEmailSchema } from '@/libs/validators';

import { AUTH_SEARCH_PARAMS, DEFAULT_AUTH_REDIRECT } from '../constants';
import { useLogoutMutation } from '../services/useLogoutMutation';
import { useResendVerificationMutation } from '../services/useResendVerificationMutation';
import { useVerifyEmailMutation } from '../services/useVerifyEmailMutation';

const RESEND_COOLDOWN_SECONDS = 60;

export const VerifyEmailForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tokenFromUrl = searchParams.get('token');
  const redirectUrl = searchParams.get(AUTH_SEARCH_PARAMS.REDIRECT) || DEFAULT_AUTH_REDIRECT;
  const { user } = useAuth();

  useEffect(() => {
    if (user?.emailVerified) {
      navigate(redirectUrl, { replace: true });
    }
  }, [user?.emailVerified, redirectUrl, navigate]);

  const [countdown, setCountdown] = useState(RESEND_COOLDOWN_SECONDS);
  const [hasSentInitial, setHasSentInitial] = useState(false);

  const { mutate: verifyEmail, isPending: isVerifying } = useVerifyEmailMutation();
  const { mutate: resendVerification, isPending: isResending } = useResendVerificationMutation();
  const { mutate: logout, isPending: isLoggingOut } = useLogoutMutation();

  const { control, handleSubmit, setValue } = useForm<VerifyEmailFormData>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      token: '',
    },
  });

  const startCountdown = useCallback(() => {
    setCountdown(RESEND_COOLDOWN_SECONDS);
  }, []);

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  useEffect(() => {
    if (user?.email && !hasSentInitial && !tokenFromUrl) {
      resendVerification(user.email);
      setHasSentInitial(true);
      startCountdown();
    }
  }, [user?.email, hasSentInitial, tokenFromUrl, resendVerification, startCountdown]);

  useEffect(() => {
    if (tokenFromUrl) {
      setValue('token', tokenFromUrl);
      verifyEmail({ token: tokenFromUrl });
    }
  }, [tokenFromUrl, setValue, verifyEmail]);

  const onSubmit = (data: VerifyEmailFormData) => {
    verifyEmail(data);
  };

  const handleComplete = (value: string) => {
    verifyEmail({ token: value });
  };

  const handleResend = () => {
    if (user?.email && countdown <= 0) {
      resendVerification(user.email);
      startCountdown();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <p className="text-center text-md text-tertiary">
        Please enter the verification code sent to your email address
        {user?.email && <span className="font-medium text-secondary"> ({user.email})</span>}.
      </p>

      <RHFPinInput
        name="token"
        control={control}
        maxLength={6}
        size="md"
        containerClassName="justify-center"
        onComplete={handleComplete}
      />

      <Button type="submit" color="primary" size="lg" isLoading={isVerifying} className="w-full">
        Verify email
      </Button>

      <div className="flex flex-col items-center gap-2 text-sm text-tertiary">
        {countdown > 0 ? (
          <div className="flex items-center gap-2">
            <span>Didn&apos;t receive a code?</span>
            <span className="font-medium">
              Resend code in{' '}
              <span className="font-medium text-secondary">{formatTime(countdown)}</span>
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span>Didn&apos;t receive a code?</span>
            <Button color="link-gray" size="sm" onClick={handleResend} isDisabled={isResending}>
              Resend code
            </Button>
          </div>
        )}
        <div className="flex items-center gap-2">
          <span>Need to login instead?</span>
          <Button
            color="link-color"
            size="sm"
            href="/auth/login"
            onClick={() => logout()}
            isDisabled={isLoggingOut}
          >
            Login
          </Button>
        </div>
      </div>
    </form>
  );
};
