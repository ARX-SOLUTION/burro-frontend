import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { getErrorMessage } from '@/modules/common';

import { {{camelPlural}}API } from '../api/{{camelPlural}}API';
import { {{camelSingular}}QueryKeys } from '../constants';

export const useDelete{{PascalSingular}} = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: {{camelPlural}}API.delete{{PascalSingular}},
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: {{camelSingular}}QueryKeys.lists() });
      toast.success('{{PascalSingular}} deleted successfully');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, 'Failed to delete {{camelSingular}}'));
    },
  });
};
