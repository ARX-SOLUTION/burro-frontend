import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle } from '@untitledui/icons';

import { RHFInput } from '@/components/base/_rhf';
import { RHFPasswordInput } from '@/components/base/_rhf/rhf-password-input';
import { RHFPinInput } from '@/components/base/_rhf/rhf-pin-input';
import { Button } from '@/components/base/buttons/button';
import { useAuth } from '@/hooks/use-auth';
import {
  type RequestEmailChangeFormData,
  requestEmailChangeSchema,
  type VerifyEmailChangeFormData,
  verifyEmailChangeSchema,
} from '@/libs/validators';

import { useRequestEmailChange } from '../services/useRequestEmailChange';
import { useVerifyEmailChange } from '../services/useVerifyEmailChange';

const RESEND_COOLDOWN_SECONDS = 60;

type Step = 'request' | 'verify' | 'success';

export const ChangeEmailForm = () => {
  const { user, refreshUser } = useAuth();
  const [step, setStep] = useState<Step>('request');
  const [newEmail, setNewEmail] = useState('');
  const [countdown, setCountdown] = useState(0);

  const { mutate: requestEmailChange, isPending: isRequesting } = useRequestEmailChange();
  const { mutate: verifyEmailChange, isPending: isVerifying } = useVerifyEmailChange();

  const requestForm = useForm<RequestEmailChangeFormData>({
    resolver: zodResolver(requestEmailChangeSchema),
    defaultValues: {
      newEmail: '',
      currentPassword: '',
    },
  });

  const verifyForm = useForm<VerifyEmailChangeFormData>({
    resolver: zodResolver(verifyEmailChangeSchema),
    defaultValues: {
      code: '',
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

  const onRequestSubmit = (data: RequestEmailChangeFormData) => {
    requestEmailChange(data, {
      onSuccess: () => {
        setNewEmail(data.newEmail);
        setStep('verify');
        startCountdown();
      },
    });
  };

  const onVerifySubmit = (data: VerifyEmailChangeFormData) => {
    verifyEmailChange(data, {
      onSuccess: () => {
        refreshUser();
        setStep('success');
      },
    });
  };

  const handleComplete = (value: string) => {
    verifyEmailChange(
      { code: value },
      {
        onSuccess: () => {
          refreshUser();
          setStep('success');
        },
      },
    );
  };

  const handleReset = () => {
    setStep('request');
    setNewEmail('');
    requestForm.reset();
    verifyForm.reset();
  };

  const handleResend = () => {
    if (countdown > 0) return;

    const currentPassword = requestForm.getValues('currentPassword');
    requestEmailChange(
      { newEmail, currentPassword },
      {
        onSuccess: () => {
          startCountdown();
        },
      },
    );
  };

  const handleBack = () => {
    setStep('request');
    verifyForm.reset();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (step === 'success') {
    return (
      <div className="flex flex-col items-center gap-4 py-6 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-success-secondary">
          <CheckCircle className="size-6 text-success-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-primary">Email changed successfully</h3>
          <p className="mt-1 text-sm text-tertiary">
            Your email has been updated to{' '}
            <span className="font-medium text-secondary">{newEmail}</span>
          </p>
        </div>
        <Button type="button" color="secondary" onClick={handleReset}>
          Done
        </Button>
      </div>
    );
  }

  if (step === 'verify') {
    return (
      <form onSubmit={verifyForm.handleSubmit(onVerifySubmit)} className="flex flex-col gap-5">
        <p className="text-sm text-tertiary">
          Enter the verification code sent to{' '}
          <span className="font-medium text-secondary">{newEmail}</span>
        </p>

        <RHFPinInput
          name="code"
          control={verifyForm.control}
          maxLength={6}
          size="md"
          onComplete={handleComplete}
        />

        <div className="flex items-center gap-3">
          <Button type="button" color="secondary" onClick={handleBack} isDisabled={isVerifying}>
            Back
          </Button>
          <Button type="submit" color="primary" isLoading={isVerifying}>
            Verify & Change Email
          </Button>
        </div>

        <div className="text-sm text-tertiary">
          {countdown > 0 ? (
            <span>
              Resend code in{' '}
              <span className="font-medium text-secondary">{formatTime(countdown)}</span>
            </span>
          ) : (
            <Button
              type="button"
              color="link-gray"
              size="sm"
              onClick={handleResend}
              isDisabled={isRequesting}
            >
              Resend code
            </Button>
          )}
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={requestForm.handleSubmit(onRequestSubmit)} className="flex flex-col gap-5">
      <div className="rounded-lg border border-secondary bg-secondary p-4">
        <p className="text-sm text-tertiary">
          Current email: <span className="font-medium text-secondary">{user?.email}</span>
        </p>
      </div>

      <RHFInput
        name="newEmail"
        control={requestForm.control}
        label="New email"
        type="email"
        placeholder="Enter your new email"
        autoComplete="email"
      />

      <RHFPasswordInput
        name="currentPassword"
        control={requestForm.control}
        label="Current password"
        placeholder="Enter your current password"
        autoComplete="current-password"
      />

      <div className="flex justify-end">
        <Button type="submit" color="primary" isLoading={isRequesting}>
          Send verification code
        </Button>
      </div>
    </form>
  );
};
