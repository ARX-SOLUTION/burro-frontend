import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useAuth } from '@/hooks/use-auth';

import { parentAPI } from '../api/parentAPI';

type SwitchResponse = { role: string; message: string };

export const useParentSwitch = () => {
  const queryClient = useQueryClient();
  const { refreshUser } = useAuth();

  return useMutation({
    mutationFn: parentAPI.switchToParent,
    onSuccess: (data: SwitchResponse) => {
      toast.success(data.message);
      refreshUser();
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: () => {
      toast.error("Ota-ona rejimiga o'tib bo'lmadi");
    },
  });
};
