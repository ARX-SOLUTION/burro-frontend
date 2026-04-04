import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { getErrorMessage } from '@/modules/common';

import { {{camelPlural}}API } from '../api/{{camelPlural}}API';
import { {{camelSingular}}QueryKeys } from '../constants';
import type { Update{{PascalSingular}}Request } from '../types';

export const useUpdate{{PascalSingular}} = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Update{{PascalSingular}}Request }) =>
      {{camelPlural}}API.update{{PascalSingular}}(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: {{camelSingular}}QueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: {{camelSingular}}QueryKeys.detail(variables.id) });
      toast.success('{{PascalSingular}} updated successfully');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, 'Failed to update {{camelSingular}}'));
    },
  });
};
