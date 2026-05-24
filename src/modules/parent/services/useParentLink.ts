import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { parentAPI } from '../api/parentAPI';
import { parentQueryKeys } from './useParentChildren';

type LinkResponse = { success: boolean; child_name: string };

export const useParentLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (studentId: string) => parentAPI.linkChild(studentId),
    onSuccess: (data: LinkResponse) => {
      toast.success(`${data.child_name} ro'yxatga qo'shildi`);
      queryClient.invalidateQueries({ queryKey: parentQueryKeys.children() });
    },
    onError: () => {
      toast.error("Bolani bog'lab bo'lmadi");
    },
  });
};
