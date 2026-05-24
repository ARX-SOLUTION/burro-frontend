import { useMutation } from '@tanstack/react-query';

import { burroAPI } from '../api/burroAPI';

export const useRestartAttempt = () => {
  return useMutation({
    mutationFn: burroAPI.restartAttempt,
  });
};
