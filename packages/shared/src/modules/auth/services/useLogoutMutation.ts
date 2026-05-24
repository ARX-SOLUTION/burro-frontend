import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { getErrorMessage } from '@burro/shared/modules/common/libs/getErrorMessage';

import { useAuth } from '@burro/shared/hooks/use-auth';

import { authAPI } from '../api/authAPI';

export const useLogoutMutation = () => {
  const { clearAuth } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => authAPI.logout(),
    onSuccess: () => {
      clearAuth();
      toast.success('Logged out successfully');
      navigate('/auth/login');
    },
    onError: (error: unknown) => {
      clearAuth();
      toast.error(getErrorMessage(error, 'Logout failed'));
      navigate('/auth/login');
    },
  });
};
