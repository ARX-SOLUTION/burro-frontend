import { useMutation } from '@tanstack/react-query';

import { burroAPI } from '../api/burroAPI';

export const useStartAttempt = () => {
  return useMutation({
    mutationFn: (moduleId: string) => burroAPI.startAttempt(moduleId),
  });
};
