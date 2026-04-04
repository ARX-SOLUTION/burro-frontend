import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { getErrorMessage } from '@/modules/common';

import { usersAPI } from '../api/usersAPI';
import type { RequestEmailChangeRequest } from '../types';

export const useRequestEmailChange = () => {
  return useMutation({
    mutationFn: (data: RequestEmailChangeRequest) => usersAPI.requestEmailChange(data),
    onSuccess: () => {
      toast.success('Verification code sent to your new email');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, 'Failed to request email change'));
    },
  });
};
