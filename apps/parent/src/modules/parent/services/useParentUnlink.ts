import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

import { parentAPI } from '../api/parentAPI';
import { parentQueryKeys } from './useParentChildren';

export const useParentUnlink = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (childId: string) => parentAPI.unlinkChild(childId),
    onSuccess: () => {
      toast.success("Bola ro'yxatdan o'chirildi");
      queryClient.invalidateQueries({ queryKey: parentQueryKeys.children() });
      navigate('/burro/parent');
    },
    onError: () => {
      toast.error("Bolani o'chirib bo'lmadi");
    },
  });
};
