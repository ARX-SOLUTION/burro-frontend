import { useMutation, useQueryClient } from '@tanstack/react-query';

import { burroAPI } from '../api/burroAPI';
import { burroQueryKeys } from '../constants/query-keys';

export const useUpdateStudentProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: burroAPI.updateStudentProfile,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: burroQueryKeys.profile() });
    },
  });
};
