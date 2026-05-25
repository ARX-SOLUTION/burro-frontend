import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { parentAPI } from '../api/parentAPI';
import { parentQueryKeys } from './useParentChildren';

export const useParentUpdateChild = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ childId, fullName }: { childId: string; fullName: string }) =>
      parentAPI.updateChild(childId, { fullName }),
    onSuccess: (_data, vars) => {
      toast.success('Ism o\'zgartirildi');
      queryClient.invalidateQueries({ queryKey: parentQueryKeys.childDetail(vars.childId) });
      queryClient.invalidateQueries({ queryKey: parentQueryKeys.children() });
    },
    onError: () => {
      toast.error("Ismni o'zgartirib bo'lmadi");
    },
  });
};
