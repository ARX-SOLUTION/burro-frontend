import { useMutation, useQueryClient } from '@tanstack/react-query';

import { burroAPI } from '../api/burroAPI';
import { burroQueryKeys } from '../constants/query-keys';

export const useFinishAttempt = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (attemptId: string) => burroAPI.finishAttempt(attemptId),
    onSuccess: (_, attemptId) => {
      queryClient.invalidateQueries({ queryKey: burroQueryKeys.home() });
      queryClient.invalidateQueries({ queryKey: burroQueryKeys.profile() });
      queryClient.invalidateQueries({ queryKey: burroQueryKeys.statistics() });
      queryClient.invalidateQueries({ queryKey: burroQueryKeys.all });
      queryClient.removeQueries({ queryKey: burroQueryKeys.attempt(attemptId) });
    },
  });
};
