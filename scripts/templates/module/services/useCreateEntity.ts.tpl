import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { getErrorMessage } from '@/modules/common';

import { {{camelPlural}}API } from '../api/{{camelPlural}}API';
import { {{camelSingular}}QueryKeys } from '../constants';

export const useCreate{{PascalSingular}} = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: {{camelPlural}}API.create{{PascalSingular}},
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: {{camelSingular}}QueryKeys.lists() });
      toast.success('{{PascalSingular}} created successfully');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, 'Failed to create {{camelSingular}}'));
    },
  });
};
